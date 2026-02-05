import wardImg from '../../assets/img/ward.png';
import pinkWardImg from '../../assets/img/pink_ward.png';

interface Ward {
  id: number;
  x: number;
  y: number;
  type: 'normal' | 'pink';
}

interface WardToolsProps {
  wards: Ward[];
  scale: number;
  isErasing: boolean;
  onRemoveWard: (e: React.MouseEvent, id: number) => void;
  onWardPointerDown: (e: React.PointerEvent<HTMLDivElement>, id: number) => void;
  onWardPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onWardPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
}

const WardTools = ({ 
  wards, 
  scale, 
  isErasing, 
  onRemoveWard,
  onWardPointerDown,
  onWardPointerMove,
  onWardPointerUp
}: WardToolsProps) => {
  return (
    <>
      {wards.map((ward) => (
        <div
          key={ward.id}
          onClick={(e) => onRemoveWard(e, ward.id)}
          onPointerDown={(e) => onWardPointerDown(e, ward.id)}
          onPointerMove={onWardPointerMove}
          onPointerUp={onWardPointerUp}
          style={{
            position: 'absolute',
            left: `${ward.x}%`,
            top: `${ward.y}%`,
            transform: 'translate(-50%, -50%)',
            cursor: isErasing ? 'not-allowed' : 'grab',
            touchAction: 'none',
            pointerEvents: 'auto' 
          }}
        >
          <img 
            src={ward.type === 'normal' || !ward.type ? wardImg : pinkWardImg} 
            width={30 / scale} 
            alt="ward" 
            style={{ transition: 'width 0.2s', maxWidth: 'none' }} 
          />
        </div>
      ))}
    </>
  );
};

interface WardControlsProps {
  isPlacingWard: boolean;
  isPlacingPinkWard: boolean;
  isErasing: boolean;
  onToggleEraser: () => void;
  onAddWard: () => void;
  onAddPinkWard: () => void;
}

export const WardControls = ({ 
  isPlacingWard, 
  isPlacingPinkWard, 
  onAddWard,
  onAddPinkWard 
}: WardControlsProps) => {
  return (
    <>
      <button  
        className="control-btn" 
        onClick={onAddWard} 
        title="Add Ward"
        style={{ backgroundColor: isPlacingWard ? 'rgba(74, 222, 128, 0.3)' : undefined }}
      >
        <img src={wardImg} width={20} alt="Add Ward" style={{ opacity: isPlacingWard ? 1.25 : 0.85 }} />
      </button>
      <button  
        className="control-btn" 
        onClick={onAddPinkWard} 
        title="Add Pink Ward"
        style={{ backgroundColor: isPlacingPinkWard ? 'rgba(74, 222, 128, 0.3)' : undefined }}
      >
        <img src={pinkWardImg} width={20} alt="Add Pink Ward" style={{ opacity: isPlacingPinkWard ? 1.25 : 0.85 }} />
      </button>
    </>
    
  );
};

export default WardTools;
