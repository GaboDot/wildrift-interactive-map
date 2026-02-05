import { useRef } from 'react';

export const useMapCoordinates = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    const getCoordinates = (e: React.PointerEvent<Element> | PointerEvent) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const rect = svgRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        return { x, y };
    };

    return { svgRef, getCoordinates };
};
