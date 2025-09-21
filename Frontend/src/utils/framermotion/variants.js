export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};
export const fadeeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    show: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: "tween",
        duration: 1.2,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};
export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};
// utils/framermotion/variants.js

export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.6, // موج آرام‌تر بین کارت‌ها
      delayChildren: 0.2, // تأخیر اولیه قبل از شروع اولین کارت
    },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // از پایین‌تر بیاد
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // حرکت آرام‌تر
      ease: "easeInOut", // نرم و طبیعی
    },
  },
};
export const contentContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // فاصله زمانی بین انیمیشن‌های فرزند
    },
  },
};

export const contentItem = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export const scaleFadeVariant = (delay = 0) => ({
  hidden: {
    opacity: 0,
    scale: 1.1, // Slight zoom-in, more subtle
    y: 20, // Slight vertical offset adds natural motion
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 1.4, // Slightly slower for more elegance
      delay,
      ease: [0.22, 1, 0.36, 1], // More fluid easing (easeOutExpo-like)
    },
  },
});
