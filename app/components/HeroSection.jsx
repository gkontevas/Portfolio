import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from 'react';
import { HeroSkeleton } from "./Skeleton";
import { useLoading } from "../contexts/LoadingContext";
import { useIsMobileOrSlow } from "../hooks/useIsMobileOrSlow";

// Lazy load SplineComponent for performance
const SplineComponent = dynamic(() => import("./SplineModel"), { ssr: false, loading: () => <div style={{height: 400}} /> });

const ANIMATION_CONFIG = {
  section: (isMobile) => ({
    initial: { opacity: 0, y: isMobile ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: isMobile ? 0.3 : 0.7, ease: "easeOut" },
  }),
};

const HeroSection = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: false, amount: 0.1 });
  const { isComponentLoading } = useLoading();
  const isLoading = isComponentLoading('hero');
  const [isMobileOrSlow, hasCheckedDevice] = useIsMobileOrSlow();

  if (isLoading || !hasCheckedDevice) {
    return <HeroSkeleton />;
  }

  // Only render Spline on desktop, never on mobile/slow
  const shouldRenderSpline = !isMobileOrSlow;

  return (
    <section
      ref={heroRef}
      aria-label="Hero"
      className={`
        relative flex flex-col-reverse items-center w-full        px-4 overflow-visible
        gap-y-0
        sm:gap-y-4
        min-h-auto
        sm:min-h-[90vh]
        justify-center
        sm:justify-between        xl:flex-row xl:px-24 xl:h-[90vh]
        pt-32 pb-8 sm:pt-36 md:pt-40 sm:pb-12
      `}
    >
      <div
        className="z-40 flex flex-col items-center justify-center w-full text-center xl:items-start xl:text-left xl:w-1/2"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 18,
            delay: 0.2,
            duration: 1.2,
          }}
          className="
            mb-0 font-extrabold tracking-tight text-transparent bg-clip-text drop-shadow-[0_4px_24px_rgba(168,85,247,0.5)]
            relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          "
        >
          <span className="block text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text">
            Welcome to
          </span>
          <span className="block py-0 text-5xl font-extrabold tracking-wider text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500 bg-clip-text sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-xl">
            <span className="whitespace-nowrap">The World</span>{' '}
            <span className="whitespace-nowrap">Of Wonders</span>
          </span>
          <span className="absolute font-black -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none left-1/2 top-1/2 opacity-20 blur-2xl text-8xl sm:text-9xl text-fuchsia-400">
            ★
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 18,
            delay: 0.4,
            duration: 1.2,
          }}
          className="max-w-xl mb-0 text-lg italic font-medium leading-snug text-purple-200 sm:mb-0 sm:text-2xl"
        >
        <b>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</b>  <i>- Martin Fowler </i>       </motion.p>
      </div>
      <div className="items-center justify-center hidden w-full sm:flex xl:w-1/2 xl:h-full">
        <motion.div
          {...ANIMATION_CONFIG.section(isMobileOrSlow)}
          className="
            relative w-full
            aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/9] xl:aspect-auto xl:h-full
            max-h-[600px] sm:max-h-[700px] md:max-h-[800px] xl:max-h-full
            min-h-[300px] sm:min-h-[400px] md:min-h-[500px]
          "
        >
          {shouldRenderSpline && (
            <SplineComponent
              className="!absolute !inset-0"
              scene="https://prod.spline.design/tF28HXnwN4ohvRC9/scene.splinecode"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;