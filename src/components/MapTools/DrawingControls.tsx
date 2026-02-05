import React from 'react';
import { Pencil } from 'lucide-react';
import ColorPicker from './ColorPicker';
import EraserControls from './EraserControls';

interface DrawingControlsProps {
  isDrawing: boolean;
  onToggleDrawing: () => void;
  showColorPicker: boolean;
  drawingColor: string;
  colors: { name: string; value: string }[];
  onSelectColor: (color: string) => void;
  onCloseColorPicker: () => void;
  isErasing: boolean;
  onToggleEraser: () => void;
}

const DrawingControls: React.FC<DrawingControlsProps> = ({
  isDrawing,
  onToggleDrawing,
  showColorPicker,
  drawingColor,
  colors,
  onSelectColor,
  onCloseColorPicker,
  isErasing,
  onToggleEraser
}) => {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'row', gap: '5px' }}>
      <button 
          className="control-btn" 
          title="Draw Mode"
          onClick={onToggleDrawing}
          style={{ backgroundColor: isDrawing ? 'rgba(59, 130, 246, 0.5)' : undefined }}
      >
        <Pencil size={20} color="#ffffff" style={{ opacity: isDrawing ? 1 : 0.7 }} />
      </button>
      <EraserControls isErasing={isErasing} onToggleEraser={onToggleEraser} />
      <ColorPicker
        show={showColorPicker}
        colors={colors}
        currentColor={drawingColor}
        onSelectColor={onSelectColor}
        onClose={onCloseColorPicker}
      />
    </div>
  );
};

export default DrawingControls;
