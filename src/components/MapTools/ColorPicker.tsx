import { motion } from 'framer-motion';

interface ColorOption {
  name: string;
  value: string;
}

interface ColorPickerProps {
  show: boolean;
  colors: ColorOption[];
  currentColor: string;
  onSelectColor: (color: string) => void;
  onClose: () => void;
}

const ColorPicker = ({ show, colors, currentColor, onSelectColor, onClose }: ColorPickerProps) => {
  if (!show) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="color-picker-popover" 
      style={{
        position: 'absolute',
        bottom: '100%',
        left: '5px',
        transform: 'translateX(-50%)',
        marginBottom: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: '8px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 100,
        backdropFilter: 'blur(4px)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        alignItems: 'center'
    }}>
        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          {colors.map(c => (
              <button
                  key={c.name}
                  onClick={() => { onSelectColor(c.value); onClose(); }}
                  style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: c.value,
                      border: currentColor === c.value ? '2px solid white' : '1px solid #444',
                      cursor: 'pointer',
                      padding: 0
                  }}
                  title={c.name}
              />
          ))}
        </div>
    </motion.div>
  );
};

export default ColorPicker;
