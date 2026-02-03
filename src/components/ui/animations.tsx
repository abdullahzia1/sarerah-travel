"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const; // ease-out-expo
const easingSmooth = [0.65, 0, 0.35, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const defaultTransition = {
  duration: 0.5,
  ease: easing,
};

const fastTransition = {
  duration: 0.35,
  ease: easing,
};

interface ViewportRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  once?: boolean;
  variant?: "fadeInUp" | "fadeIn";
}

/** Reveal content when it enters the viewport. Respects reduced motion. */
export function ViewportReveal({
  children,
  className,
  delay = 0,
  amount = 0.2,
  once = true,
  variant = "fadeInUp",
}: ViewportRevealProps) {
  const reduceMotion = useReducedMotion();
  const variants = variant === "fadeIn" ? fadeIn : fadeInUp;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once }}
      variants={variants}
      transition={{
        ...defaultTransition,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  amount?: number;
  once?: boolean;
}

/** Container for staggered child animations on scroll into view. */
export function StaggerContainer({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.08,
  amount = 0.15,
  once = true,
}: StaggerContainerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fadeInUp" | "fadeIn";
}

/** Single child inside StaggerContainer. */
export function StaggerChild({
  children,
  className,
  variant = "fadeInUp",
}: StaggerChildProps) {
  const variants = variant === "fadeIn" ? fadeIn : fadeInUp;
  return (
    <motion.div className={className} variants={variants} transition={defaultTransition}>
      {children}
    </motion.div>
  );
}

interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/** One-time fade-in-up on mount. */
export function FadeInUp({ children, className, delay = 0, duration = 0.5 }: FadeInUpProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatePresenceWrapperProps {
  children: React.ReactNode;
  show: boolean;
  className?: string;
  mode?: "wait" | "sync" | "popLayout";
}

/** AnimatePresence wrapper for mount/unmount (e.g. mobile menu). */
export function AnimatePresenceWrapper({
  children,
  show,
  className,
  mode = "sync",
}: AnimatePresenceWrapperProps) {
  if (!show) return null;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: easingSmooth }}
    >
      {children}
    </motion.div>
  );
}

export { motion };
