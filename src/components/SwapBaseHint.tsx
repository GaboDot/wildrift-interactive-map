import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react'
import swapAnimation from '@animations/Swap-base.json';

interface SwapBaseHintProps {
  show: boolean;
  rotation: number;
}

const SwapBaseHint = ({ show, rotation }: SwapBaseHintProps) => {
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
            zIndex: 30,
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, .45)',
            backdropFilter: 'blur(3px)',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <div style={{ width: 250, height: 300 }}>
            <Lottie style={{transform: `rotate(${rotation}deg)`}} animationData={swapAnimation} loop={true} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SwapBaseHint;
