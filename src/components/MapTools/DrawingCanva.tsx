import React, { type RefObject } from 'react';

export interface DrawingPath {
    d: string;
    color: string;
    width: number;
}

interface DrawingCanvaProps {
  svgRef: RefObject<SVGSVGElement | null>;
  isDrawing: boolean;
  isErasing: boolean;
  paths: DrawingPath[];
  currentPath: string;
  drawingColor: string;
  scale: number;
  onPointerDown: (e: React.PointerEvent<Element>) => void;
  onPointerMove: (e: React.PointerEvent<Element>) => void;
  onPointerUp: (e: React.PointerEvent<Element>) => void;
  onPointerLeave: (e: React.PointerEvent<Element>) => void;
  onPathClick?: (index: number) => void;
}

const DrawingCanva = ({
  svgRef,
  isDrawing,
  isErasing,
  paths,
  currentPath,
  drawingColor,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerLeave,
  onPathClick
}: DrawingCanvaProps) => {
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: isDrawing ? 'all' : 'none',
          zIndex: 10,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      {paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          stroke={path.color}
          strokeWidth={path.width}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={(e) => {
            if (isErasing && onPathClick) {
              e.stopPropagation(); // Prevent map click?
              onPathClick(index);
            }
          }}
          style={{
            cursor: isErasing ? 'crosshair' : 'inherit',
            pointerEvents: isErasing ? 'stroke' : 'none'
          }}
        />
      ))}
      
      {currentPath && (
        <path
          d={currentPath}
          stroke={drawingColor}
          strokeWidth={0.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </svg>
  );
};

export default DrawingCanva;
