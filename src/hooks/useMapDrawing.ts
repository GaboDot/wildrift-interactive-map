import { useState } from 'react';
import type { DrawingPath } from '@mapTools/DrawingCanva';

export const useMapDrawing = (
    getCoordinates: (e: React.PointerEvent<Element>) => { x: number; y: number },
    disableOtherModes: () => void
) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [drawingColor, setDrawingColor] = useState('#3b82f6');
    const [paths, setPaths] = useState<DrawingPath[]>([]);
    const [currentPath, setCurrentPath] = useState('');

    const handlePointerDown = (e: React.PointerEvent<Element>) => {
        if (!isDrawing) return;
        e.stopPropagation();
        (e.currentTarget as Element).setPointerCapture(e.pointerId);

        const { x, y } = getCoordinates(e);
        setCurrentPath(`M ${x} ${y}`);
    };

    const handlePointerMove = (e: React.PointerEvent<Element>) => {
        if (!isDrawing || !currentPath) return;
        e.preventDefault();
        e.stopPropagation();

        const { x, y } = getCoordinates(e);
        setCurrentPath(prev => `${prev} L ${x} ${y}`);
    };

    const handlePointerUp = (e: React.PointerEvent<Element>) => {
        if (!isDrawing || !currentPath) return;
        
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);

        setPaths(prev => [...prev, { d: currentPath, color: drawingColor, width: 0.5 }]); 
        setCurrentPath('');
    };

    const handleToggleDrawing = () => {
        const newIsDrawing = !isDrawing;
        setIsDrawing(newIsDrawing);
        
        if (newIsDrawing) {
            disableOtherModes(); // Call callback to disable ward/eraser
            setShowColorPicker(true);
        } else {
            setShowColorPicker(false);
        }
    };
    
    // Allow external control to force disable drawing
    const disableDrawing = () => {
        setIsDrawing(false);
        setShowColorPicker(false);
    };

    const removePath = (index: number) => {
        setPaths(prev => prev.filter((_, i) => i !== index));
    };

    const clearDrawing = () => {
        setPaths([]);
        setCurrentPath('');
    };

    return {
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
        removePath,
        clearDrawing
    };
};
