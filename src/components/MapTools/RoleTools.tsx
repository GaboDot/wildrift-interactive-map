import { motion } from 'framer-motion';
import { RefreshCcwDot } from 'lucide-react';
import { roleImages, type RoleType } from '@roleConstants';

export interface RoleEntity {
  id: string;
  role: RoleType;
  x: number;
  y: number;
  color: string;
}

interface RoleToolsProps {
  rolePositions: RoleEntity[];
  visibleRoles: Record<string, boolean>;
  isDrawing: boolean;
  isErasing: boolean;
  isPlacingWard: boolean;
  scale: number;
  draggedRoleId: string | null;
  onRolePointerDown: (e: React.PointerEvent<HTMLDivElement>, id: string) => void;
  onRolePointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onRolePointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
}

const RoleTools = ({
  rolePositions,
  visibleRoles,
  isDrawing,
  isErasing,
  isPlacingWard,
  scale,
  draggedRoleId,
  onRolePointerDown,
  onRolePointerMove,
  onRolePointerUp
}: RoleToolsProps) => {
  return (
    <>
      {rolePositions.map((roleEntity) => (
        <motion.div
           key={roleEntity.id}
           onPointerDown={(e) => onRolePointerDown(e, roleEntity.id)}
           onPointerMove={onRolePointerMove}
           onPointerUp={onRolePointerUp}
           onPointerLeave={onRolePointerUp} // Safety release
           whileHover={{ scale: 1.1, cursor: 'grab' }}
           whileTap={{ scale: 1.2, cursor: 'grabbing', zIndex: 100 }}
           style={{
             position: 'absolute',
             left: `${roleEntity.x}%`,
             top: `${roleEntity.y}%`,
             width: `${35 / scale}px`, // Inverse scaling like wards
             opacity: visibleRoles[roleEntity.role] ? 1.5 : 0,
             pointerEvents: visibleRoles[roleEntity.role] && !isDrawing && !isErasing && !isPlacingWard ? 'auto' : 'none',
             zIndex: draggedRoleId === roleEntity.id ? 100 : 20,
             filter: `drop-shadow(0 0 4px ${roleEntity.color}) drop-shadow(0 0 8px ${roleEntity.color})`,
             borderRadius: '50%'
           }}
        >
          <img 
            src={roleImages[roleEntity.role]} 
            alt={roleEntity.role}
            style={{ 
               width: '100%', 
               height: 'auto',
               userSelect: 'none',
               pointerEvents: 'none',
               borderRadius: '50%'
            }} 
           />
        </motion.div>
      ))}
    </>
  );
};

interface RoleControlsProps {
  visibleRoles: Record<string, boolean>;
  onToggleRole: (role: RoleType) => void;
  onResetRoles: () => void;
}

export const RoleControls = ({ visibleRoles, onToggleRole, onResetRoles }: RoleControlsProps) => {
  return (
    <>
      <button 
          className="control-btn" 
          title="Top Laner"
          onClick={() => onToggleRole('top')}
          style={{ backgroundColor: visibleRoles.top ? 'rgba(59, 130, 246, 0.3)' : undefined }}
      >
        <img src={roleImages.top} width={35} alt="Top Laner" style={{ opacity: visibleRoles.top ? 1.5 : 0.85 }}/>
      </button>
      <button 
          className="control-btn" 
          title="Jungler"
          onClick={() => onToggleRole('jungle')}
          style={{ backgroundColor: visibleRoles.jungle ? 'rgba(59, 130, 246, 0.3)' : undefined }}
      >
        <img src={roleImages.jungle} width={35} alt="Jungler" style={{ opacity: visibleRoles.jungle ? 1.5 : 0.85 }}/>
      </button>
      <button 
          className="control-btn" 
          title="Mid Laner"
          onClick={() => onToggleRole('mid')}
          style={{ backgroundColor: visibleRoles.mid ? 'rgba(59, 130, 246, 0.3)' : undefined }}
      >
        <img src={roleImages.mid} width={35} alt="Mid Laner" style={{ opacity: visibleRoles.mid ? 1.5 : 0.85 }}/>
      </button>
      <button 
          className="control-btn" 
          title="Bot Laner or ADC"
          onClick={() => onToggleRole('adc')}
          style={{ backgroundColor: visibleRoles.adc ? 'rgba(59, 130, 246, 0.3)' : undefined }}
      >
        <img src={roleImages.adc} width={35} alt="ADC" style={{ opacity: visibleRoles.adc ? 1.5 : 0.85 }}/>
      </button>
      <button 
          className="control-btn" 
          title="Support"
          onClick={() => onToggleRole('support')}
          style={{ backgroundColor: visibleRoles.support ? 'rgba(59, 130, 246, 0.3)' : undefined }}
      >
        <img src={roleImages.support} width={35} alt="Support" style={{ opacity: visibleRoles.support ? 1.5 : 0.7 }}/>
      </button>
      <button 
        className="control-btn"
        title="Reset Roles Positions"
        onClick={onResetRoles}
      >
        <RefreshCcwDot size={20} color="#ffffff" style={{ opacity: 1 }} />
      </button>
    </>
  );
};

export default RoleTools;
