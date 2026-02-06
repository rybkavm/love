import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import RunawayButton from "@/components/RunawayButton";
import ErrorModal from "@/components/ErrorModal";
import Gallery from "@/components/Gallery";

const Index = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleYes = () => {
    setShowGallery(true);
  };

  const handleNoCatch = () => {
    setShowErrorModal(true);
  };

  return (
    <div className="min-h-screen valentine-gradient relative overflow-hidden">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {!showGallery ? (
          <motion.div
            key="question"
            className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Card */}
            <motion.div
              className="valentine-card px-8 py-12 md:px-16 md:py-16 max-w-xl w-full text-center"
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.2 }}
            >
              {/* Top decoration */}
              <div className="text-4xl md:text-5xl mb-6 animate-pulse-heart">💝</div>

              {/* Question */}
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight mb-3">
                Лизонька,
              </h1>
              <p className="font-heading text-2xl md:text-4xl text-primary italic mb-8">
                ты выйдешь за меня снова?
              </p>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-2 mb-8 text-primary/40">
                <span>♥</span>
                <div className="h-px w-16 bg-primary/20" />
                <span className="text-2xl text-primary">♥</span>
                <div className="h-px w-16 bg-primary/20" />
                <span>♥</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <motion.button
                  className="valentine-btn-yes"
                  onClick={handleYes}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Да! 💕
                </motion.button>

                <RunawayButton onCatchClick={handleNoCatch} />
              </div>
            </motion.div>

            {/* Bottom text */}
            <motion.p
              className="mt-8 text-muted-foreground text-sm italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              подсказка: ты знаешь правильный ответ 💌
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Gallery />
          </motion.div>
        )}
      </AnimatePresence>

      <ErrorModal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} />
    </div>
  );
};

export default Index;
