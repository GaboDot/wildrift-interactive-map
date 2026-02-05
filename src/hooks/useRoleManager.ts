import { useState } from 'react';
import { INITIAL_ROLES, type RoleType } from '@roleConstants';

export const useRoleManager = (
    getCoordinates: (e: React.PointerEvent<Element>) => { x: number; y: number }
) => {
    const [visibleRoles, setVisibleRoles] = useState<Record<RoleType, boolean>>({
        top: false,
        jungle: false,
        mid: false,
        adc: false,
        support: false
    });

    const [rolePositions, setRolePositions] = useState(INITIAL_ROLES);
    const [draggedRoleId, setDraggedRoleId] = useState<string | null>(null);

    const handleToggleRole = (role: RoleType) => {
        setVisibleRoles(prev => ({ ...prev, [role]: !prev[role] }));
    };

    const handleRolePointerDown = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
        e.stopPropagation();
        e.preventDefault(); 
        (e.currentTarget as Element).setPointerCapture(e.pointerId);
        setDraggedRoleId(id);
    };
    
    const handleRolePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggedRoleId) return;
        e.stopPropagation();
      
        const { x, y } = getCoordinates(e);
        
        setRolePositions(prev => prev.map(r => r.id === draggedRoleId ? { ...r, x, y } : r));
    };
    
    const handleRolePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggedRoleId) return;
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);
        setDraggedRoleId(null);
    };

    const resetRoles = (actualMap: 'normal' | 'red') => {
        if (actualMap === 'normal') {
            setRolePositions(INITIAL_ROLES);
        } else {
            setRolePositions(INITIAL_ROLES.map(r => {
                if (r.role === 'top' || r.role === 'adc' || r.role === 'support') {
                     return {
                        ...r,
                        x: 100 - r.x,
                        y: 95 - r.y
                    };
                }
                else {
                    return {
                        ...r,
                        color: r.color === 'blue' ? 'red' : 'blue'
                    }
                }
                return r;
            }));
        }
    };

    const rotateRoles = () => {
        setRolePositions(prev => prev.map(r => {
            if (r.role === 'top' || r.role === 'adc' || r.role === 'support') {
              return {
                ...r,
                x: 100 - r.x,
                y: 95 - r.y
              };
            }
            else {
                return {
                    ...r,
                    color: r.color === 'blue' ? 'red' : 'blue'
                }
            }
            return r;
        }));
    };

    return {
        visibleRoles,
        rolePositions,
        draggedRoleId,
        handleToggleRole,
        handleRolePointerDown,
        handleRolePointerMove,
        handleRolePointerUp,
        resetRoles,
        rotateRoles
    };
};
