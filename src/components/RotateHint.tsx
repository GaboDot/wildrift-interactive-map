import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import rotateAnimation from '@animations/Rotate-Phone.json';

interface RotateHintProps {
  show: boolean;
}

const RotateHint = ({ show }: RotateHintProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            height: '100%',
            zIndex: 99,
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(3px)',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <div style={{ width: '100%', height: '100%', maxWidth: 300, maxHeight: 300 }}>
            <Lottie animationData={rotateAnimation} loop={true} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RotateHint;
