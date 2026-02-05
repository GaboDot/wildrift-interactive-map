import { Eraser } from 'lucide-react';

interface EraserControlsProps {
    isErasing: boolean;
    onToggleEraser: () => void;
}

const EraserControls = ({ isErasing, onToggleEraser }: EraserControlsProps) => {
    return (
        <button 
            className="control-btn" 
            title="Erase Mode"
            onClick={onToggleEraser}
            style={{ backgroundColor: isErasing ? 'rgba(239, 68, 68, 0.5)' : undefined }}
        >
            <Eraser size={20} color="#ffffff" style={{ opacity: isErasing ? 1 : 0.7 }} />
        </button>
    );
};

export default EraserControls;
