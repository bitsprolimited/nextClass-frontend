import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HERO_IMAGES, slideConfigurations } from "@/lib/constants";

const HeroSectionCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const images = [
    HERO_IMAGES[currentIndex],
    HERO_IMAGES[(currentIndex + 1) % HERO_IMAGES.length],
    HERO_IMAGES[(currentIndex + 2) % HERO_IMAGES.length],
  ];
  const currentConfig =
    slideConfigurations[
      Math.floor(currentIndex / 3) % slideConfigurations.length
    ];

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        {images.map((image, index) => (
          <motion.img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className={`${
              currentConfig[`image${index + 1}` as keyof typeof currentConfig]
                .classes
            }`}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.7,
              delay:
                currentConfig[`image${index + 1}` as keyof typeof currentConfig]
                  .transitionDelay,
              ease: "easeInOut",
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://placehold.co/600x400/CCCCCC/000000?text=Error`;
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeroSectionCarousel;
