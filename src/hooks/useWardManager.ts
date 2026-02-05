import { useState } from 'react';

interface Ward {
  id: number;
  x: number;
  y: number;
  type: 'normal' | 'pink';
}

export const useWardManager = (
    getCoordinates: (e: React.PointerEvent<Element>) => { x: number; y: number },
    onModeChange?: () => void
) => {
    const [wards, setWards] = useState<Ward[]>([]);
    const [isPlacingWard, setIsPlacingWard] = useState(false);
    const [isPlacingPinkWard, setIsPlacingPinkWard] = useState(false);
    const [isErasing, setIsErasing] = useState(false);
    const [draggedWardId, setDraggedWardId] = useState<number | null>(null);

    const handleAddWard = () => {
        const newState = !isPlacingWard;
        setIsPlacingWard(newState);
        setIsPlacingPinkWard(false);
        setIsErasing(false);
        if (newState && onModeChange) onModeChange();
    };

    const handleAddPinkWard = () => {
        const newState = !isPlacingPinkWard;
        setIsPlacingPinkWard(newState);
        setIsPlacingWard(false);
        setIsErasing(false);
        if (newState && onModeChange) onModeChange();
    };

    const handleToggleEraser = () => {
        const newState = !isErasing;
        setIsErasing(newState);
        setIsPlacingWard(false);
        setIsPlacingPinkWard(false);
         if (newState && onModeChange) onModeChange();
    };

    const handleRemoveWard = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (isErasing) {
            setWards(prev => prev.filter(w => w.id !== id));
        }
    };

    const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isPlacingWard && !isPlacingPinkWard) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const newWard: Ward = {
            id: Date.now(),
            x,
            y,
            type: isPlacingPinkWard ? 'pink' : 'normal',
        };
        setWards(prev => [...prev, newWard]);
    };

    // Dragging Logic
    const handleWardPointerDown = (e: React.PointerEvent<HTMLDivElement>, id: number) => {
        if (isErasing || isPlacingWard || isPlacingPinkWard) return;
        
        e.stopPropagation();
        e.preventDefault();
        (e.currentTarget as Element).setPointerCapture(e.pointerId);
        setDraggedWardId(id);
    };

    const handleWardPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (draggedWardId === null) return;
        e.stopPropagation();

        const { x, y } = getCoordinates(e);
        
        setWards(prev => prev.map(w => w.id === draggedWardId ? { ...w, x, y } : w));
    };

    const handleWardPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (draggedWardId === null) return;
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);
        setDraggedWardId(null);
    };

    // Disable modes helper (usually called by other hooks)
    const disableWardModes = () => {
        setIsPlacingWard(false);
        setIsPlacingPinkWard(false);
        setIsErasing(false);
    };

    return {
        wards,
        isPlacingWard,
        isPlacingPinkWard,
        isErasing,
        draggedWardId,
        setIsPlacingWard,
        setIsPlacingPinkWard,
        setIsErasing,
        handleAddWard,
        handleAddPinkWard,
        handleToggleEraser,
        handleRemoveWard,
        handleMapClick,
        handleWardPointerDown,
        handleWardPointerMove,
        handleWardPointerUp,
        disableWardModes
    };
};
