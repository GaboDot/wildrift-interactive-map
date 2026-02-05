import { ZoomIn, ZoomOut, RefreshCw, Fullscreen } from 'lucide-react';

interface ZoomToolsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onMapChange: () => void;
  onReset: () => void;
}

const ZoomTools = ({ onZoomIn, onZoomOut, onMapChange, onReset }: ZoomToolsProps) => {
  return (
    <div className="map-controls">
      <button className="control-btn" onClick={onZoomIn} title="Zoom In">
        <ZoomIn size={20} color="#ffffff" />
      </button>
      <button className="control-btn" onClick={onZoomOut} title="Zoom Out">
        <ZoomOut size={20} color="#ffffff" />
      </button>
      <button className="control-btn" onClick={onMapChange} title="Rotate Map">
        <RefreshCw size={20} color="#ffffff" />
      </button>
      <button className="control-btn" onClick={onReset} title="Reset">
        <Fullscreen size={18} color="#ffffff" />
      </button>
    </div>
  );
};

export default ZoomTools;
