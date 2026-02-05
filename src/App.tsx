import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useMapDrawing } from '@hooks/useMapDrawing';
import { useRoleManager } from '@hooks/useRoleManager';
import { useWardManager } from '@hooks/useWardManager';
import { useMapCoordinates } from '@hooks/useMapCoordinates';
import RoleTools, { RoleControls } from '@mapTools/RoleTools';
import WardTools, { WardControls } from '@mapTools/WardTools';
import RotateHint from '@components/RotateHint'
import SwapBaseHint from '@components/SwapBaseHint'
import ZoomTools from '@mapTools/ZoomTools';
import DrawingControls from '@mapTools/DrawingControls';
import DrawingCanva from '@mapTools/DrawingCanva';
import mapImg from '@images/wr_map.webp';
import mapRedImg from '@images/wr_map_red.webp';
import colors from '@drawingColors'
import './App.scss'

const ZOOM_MIN_SCALE = 1;
const ZOOM_MAX_SCALE = 6;
const ZOOM_STEP = 0.5;
const MIN_ROLE_SCALE = 1.25;
const MAX_ROLE_SCALE = 2.5;
const ROLE_SCALE_STEP = 0.35;

const App = () => {

  const [showHint, setShowHint] = useState(!window.matchMedia("(orientation: landscape)").matches);
  const [showSwap, setShowSwap] = useState(false);
  const [degRotation, setDegRotation] = useState(-45);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(ZOOM_MIN_SCALE);
  const [roleScale , setRoleScale] = useState(MIN_ROLE_SCALE);
  const controls = useAnimation();
  const [actualMap, setActualMap] = useState<'normal' | 'red'>('normal');
  const [isMobile, setIsMobile] = useState(false);
  const { svgRef, getCoordinates } = useMapCoordinates();
  const disableWardModesRef = useRef<() => void>(() => {});
  const disableDrawingRef = useRef<() => void>(() => {});

  const {
    wards,
    isPlacingWard,
    isPlacingPinkWard,
    isErasing,
    handleAddWard,
    handleAddPinkWard,
    handleToggleEraser,
    handleRemoveWard,
    handleMapClick,
    handleWardPointerDown,
    handleWardPointerMove,
    handleWardPointerUp,
    disableWardModes
  } = useWardManager(getCoordinates, () => {
      if (disableDrawingRef.current) disableDrawingRef.current();
  });

  const {
    isDrawing,
    showColorPicker,
    setShowColorPicker,
    drawingColor,
    setDrawingColor,
    paths,
    currentPath,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleToggleDrawing,
    disableDrawing,
    removePath
  } = useMapDrawing(getCoordinates, () => {
    if (disableWardModesRef.current) disableWardModesRef.current();
  });

  useEffect(() => {
    disableWardModesRef.current = disableWardModes;
    disableDrawingRef.current = disableDrawing;
  }, [disableWardModes, disableDrawing]);

  const {
      visibleRoles,
      rolePositions,
      draggedRoleId,
      handleToggleRole,
      handleRolePointerDown,
      handleRolePointerMove,
      handleRolePointerUp,
      resetRoles,
      rotateRoles
  } = useRoleManager(getCoordinates);


  const handleResetRoles = () => {
    resetRoles(actualMap);
  };

  useEffect(() => {
    controls.start({ 
      scale: scale
    });
  }, [scale, controls]);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: landscape)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (!window.matchMedia("(min-width: 1024px)").matches) {
           setShowHint(!e.matches);
      } else {
           setShowHint(false);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (showSwap) {
      const timer = setTimeout(() => {
        setShowSwap(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showSwap]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + ZOOM_STEP, ZOOM_MAX_SCALE));
    setRoleScale(prev => Math.min(prev + ROLE_SCALE_STEP, MAX_ROLE_SCALE));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - ZOOM_STEP, ZOOM_MIN_SCALE));
    setRoleScale(prev => Math.max(prev - ROLE_SCALE_STEP, MIN_ROLE_SCALE));
  };

  const handleReset = () => {
    setScale(ZOOM_MIN_SCALE);
    setRoleScale(MIN_ROLE_SCALE);
    controls.start({ x: 0, y: 0, scale: ZOOM_MIN_SCALE, rotate: 0 });
    disableWardModes();
  };

  const handleMapChange = () => {
    setActualMap(prev => (prev === 'normal' ? 'red' : 'normal'));
    setShowSwap(prev => !prev);
    setDegRotation(prev => prev - 180);
    rotateRoles();
  };
  
  const scaleRef = useRef(scale);
  useEffect(() => { scaleRef.current = scale; }, [scale]);

  useEffect(() => {
    const container = containerRef.current as HTMLDivElement | null;
    if (!container) return;

    let initialDistance: number | null = null;
    let initialScale = 1;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        initialScale = scaleRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistance !== null) {
        e.preventDefault(); // Prevent browser default zoom
        
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
        
        if (initialDistance > 0) {
           const scaleFactor = currentDistance / initialDistance;
           const newScale = Math.min(Math.max(initialScale * scaleFactor, ZOOM_MIN_SCALE), ZOOM_MAX_SCALE);
           setScale(newScale);
        }
      }
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
        if (e.touches.length < 2) {
            initialDistance = null;
        }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="mapa-container" ref={containerRef}>
      <SwapBaseHint show={showSwap} rotation={degRotation} />
      <RotateHint show={showHint && isMobile} />
      <motion.div
        className="map-wrapper"
        drag={!isPlacingWard && !isPlacingPinkWard && !isErasing && !isDrawing && scale > 1}
        dragElastic={0.1}
        animate={controls}
        onClick={handleMapClick}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ 
            position: 'relative',
            display: 'inline-block',
            cursor: (isPlacingWard || isPlacingPinkWard || isDrawing) ? 'crosshair' : (isErasing ? 'not-allowed' : (scale > 1 ? 'grab' : 'default')),
            transformOrigin: 'center center',
            touchAction: 'none'
        }}
        whileTap={{ cursor: (isPlacingWard || isPlacingPinkWard || isDrawing) ? 'crosshair' : (isErasing ? 'not-allowed' : (scale > 1 ? 'grabbing' : 'default')) }}
      >
        <img 
        src={actualMap === 'red' ? mapRedImg : mapImg} 
        alt="Mapa Interactivo"
        className="mapa-img"
        style={{ 
            pointerEvents: 'none',
            maxWidth: '100%', 
            maxHeight: '100%',
            display: 'block'
        }}
      />
      <DrawingCanva
        svgRef={svgRef}
        isDrawing={isDrawing}
        isErasing={isErasing}
        paths={paths}
        currentPath={currentPath}
        drawingColor={drawingColor}
        scale={scale}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPathClick={removePath}
      />
      <RoleTools
          rolePositions={rolePositions}
          visibleRoles={visibleRoles}
          isDrawing={isDrawing}
          isErasing={isErasing}
          isPlacingWard={isPlacingWard}
          scale={roleScale}
          draggedRoleId={draggedRoleId}
          onRolePointerDown={handleRolePointerDown}
          onRolePointerMove={handleRolePointerMove}
          onRolePointerUp={handleRolePointerUp}
      />
      <WardTools 
        wards={wards} 
        scale={scale} 
        isErasing={isErasing} 
        onRemoveWard={handleRemoveWard}
        onWardPointerDown={handleWardPointerDown}
        onWardPointerMove={handleWardPointerMove}
        onWardPointerUp={handleWardPointerUp}
      />
      </motion.div>
      <ZoomTools 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        onMapChange={handleMapChange} 
        onReset={handleReset} 
      />
      <div className="map-edition">
        <DrawingControls
            isDrawing={isDrawing}
            onToggleDrawing={handleToggleDrawing}
            showColorPicker={showColorPicker}
            drawingColor={drawingColor}
            colors={colors}
            onSelectColor={setDrawingColor}
            onCloseColorPicker={() => setShowColorPicker(false)}
            isErasing={isErasing}
            onToggleEraser={handleToggleEraser}
        />
        <WardControls 
            isPlacingWard={isPlacingWard} 
            isPlacingPinkWard={isPlacingPinkWard}
            isErasing={isErasing} 
            onToggleEraser={handleToggleEraser} 
            onAddWard={handleAddWard} 
            onAddPinkWard={handleAddPinkWard}
        />
        <RoleControls 
            visibleRoles={visibleRoles} 
            onToggleRole={handleToggleRole} 
            onResetRoles={handleResetRoles} 
        />
      </div>
    </div>
  )
}

export default App
