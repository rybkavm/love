import { motion } from "framer-motion";

interface PhotoItem {
  id: number;
  src: string;
  caption: string;
}

const photos: PhotoItem[] = [
  { id: 1, src: "/01.jpg", caption: "Вспомни начало ☀️" },
  { id: 2, src: "/02.jpg", caption: "Наша свадьба 💒" },
  { id: 3, src: "/03.jpg", caption: "Наше путешествие ✈️" },
  { id: 4, src: "/04.jpg", caption: "Романтический вечер 🌹" },
  { id: 5, src: "/05.jpg", caption: "Вместе навсегда 💑" },
  { id: 6, src: "/06.jpg", caption: "Первый круиз 🚤" },
  { id: 7, src: "/07.jpg", caption: "Горячеключевское тусео 😍" },
  { id: 8, src: "/08.jpg", caption: "Вот такие МЫ 🫶" },
  { id: 9, src: "/09.jpg", caption: "Счастливый момент 🥰" },
  { id: 10, src: "/10.jpg", caption: "А тут ты королева, ни меньше 👸" },
  { id: 11, src: "/11.jpg", caption: "415-ая база ответьте.. 💕" },
  { id: 12, src: "/12.jpg", caption: "Люблю тебя 💛" },
];

const interludeMessages = [
  { emoji: "👇", text: "Листай дальше, там ещё больше нежности…" },
  { emoji: "💫", text: "Не останавливайся, впереди ещё есть моменты" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 200 },
  },
};

const Gallery = () => {
  return (
    <motion.div
      className="min-h-screen valentine-gradient px-4 py-12 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-primary text-lg md:text-xl mb-3">✨ Она сказала ДА! ✨</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
            С Днём Всех Влюблённых!
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
            Наши самые тёплые воспоминания 💕
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-primary/40">
            <span>♥</span>
            <div className="h-px w-20 bg-primary/20" />
            <span className="text-2xl text-primary">♥</span>
            <div className="h-px w-20 bg-primary/20" />
            <span>♥</span>
          </div>
        </motion.div>

        {/* Photo Grid with Interludes */}
        {[0, 1, 2].map((groupIndex) => {
          const groupPhotos = photos.slice(groupIndex * 4, groupIndex * 4 + 4);
          const interlude = interludeMessages[groupIndex];

          return (
            <div key={groupIndex}>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {groupPhotos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    className="gallery-card"
                    variants={itemVariants}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <p className="font-heading text-lg font-semibold text-foreground">
                        {photo.caption}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Interlude message after groups 1 and 2 */}
              {interlude && (
                <motion.div
                  className="text-center my-12 md:my-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="valentine-card inline-block px-8 py-6 md:px-12 md:py-8 max-w-lg">
                    <div className="text-3xl md:text-4xl mb-3">{interlude.emoji}</div>
                    <p className="font-heading text-xl md:text-2xl text-primary italic">
                      {interlude.text}
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-primary/40">
                      <span>♥</span>
                      <div className="h-px w-12 bg-primary/20" />
                      <span>♥</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Final Message */}
        <motion.div
          className="text-center mt-16 md:mt-24 pb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="valentine-card inline-block px-8 py-10 md:px-16 md:py-14 max-w-2xl">
            <div className="text-5xl md:text-6xl mb-6 animate-pulse-heart">❤️</div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Спасибо, что ты со мной!
            </h2>
            <p className="font-heading text-2xl md:text-3xl text-primary italic mb-6">
              Люблю тебя!
            </p>
            <div className="flex items-center justify-center gap-2 text-primary/40 mb-6">
              <span>♥</span>
              <div className="h-px w-12 bg-primary/20" />
              <span>♥</span>
              <div className="h-px w-12 bg-primary/20" />
              <span>♥</span>
            </div>
            <p className="text-muted-foreground text-lg md:text-xl">
              Твой <span className="text-primary font-bold font-heading text-2xl">первый жум</span> 💕
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Gallery;
