import { motion, AnimatePresence } from "framer-motion";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal = ({ isOpen, onClose }: ErrorModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center error-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="error-modal p-8 md:p-10 mx-4 max-w-md w-full text-center relative"
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative hearts */}
            <div className="absolute -top-4 -left-4 text-3xl animate-pulse-heart">💔</div>
            <div className="absolute -top-4 -right-4 text-3xl animate-pulse-heart" style={{ animationDelay: "0.5s" }}>💔</div>

            {/* Error icon */}
            <div className="text-6xl mb-4">🚫</div>

            {/* Title */}
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
              Ошибка 404
            </h2>

            {/* Subtitle */}
            <p className="text-primary font-heading text-xl italic mb-4">
              Сердце не нашло варианта «НЕТ» ✨
            </p>

            {/* Message */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Пожалуйста, выбери <span className="text-primary font-bold">«ДА»</span> ❤️
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 mb-6 text-primary/40">
              <span>♥</span>
              <div className="h-px w-16 bg-border" />
              <span>♥</span>
              <div className="h-px w-16 bg-border" />
              <span>♥</span>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="valentine-btn-yes"
            >
              Попробовать снова 💕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
