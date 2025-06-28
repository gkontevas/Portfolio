import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from 'react';
import { HeroSkeleton } from "./Skeleton";
import { useLoading } from "../contexts/LoadingContext";
import { useIsMobileOrSlow } from "../hooks/useIsMobileOrSlow";

const ANIMATION_CONFIG = {
  section: (isMobile) => ({
    initial: { opacity: 0, y: isMobile ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: isMobile ? 0.3 : 0.7, ease: "easeOut" },
  }),
};

const SplineComponent = ({ scene, className, disableSpline }) => {
  const [mounted, setMounted] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current || disableSpline) return;
    let splineApp = null;
    const loadSpline = async () => {
      try {
        const { Application } = await import('@splinetool/runtime');
        if (!containerRef.current) return;
        splineApp = new Application(containerRef.current);
        splineApp.load(scene)
          .then(() => {
            setSplineLoaded(true);
            const canvas = containerRef.current?.querySelector('canvas');
            if (canvas) {
              canvas.style.pointerEvents = 'none';
              canvas.style.userSelect = 'none';
              canvas.style.touchAction = 'none';
            }
          })
          .catch((error) => {
            setError(true);
          });
      } catch (importError) {
        setError(true);
      }
    };
    loadSpline();
    return () => {
      if (splineApp) {
        try {
          splineApp.dispose();
        } catch (e) {}
      }
    };
  }, [mounted, scene, disableSpline]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center w-full h-full rounded-lg bg-purple-900/20 animate-pulse">
        <div className="text-center">
          <div className="text-purple-300">Initializing...</div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full border rounded-lg bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 border-purple-500/20">
        <div className="text-center">
          <div className="mb-4 text-6xl">🌟</div>
          <div className="text-purple-300">3D Scene Unavailable</div>
          <div className="mt-2 text-sm text-purple-400">Interactive experience loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div 
      className={className} 
      style={{ 
        pointerEvents: 'none',
        touchAction: 'none',
        userSelect: 'none'
      }}
    >
      <canvas 
        ref={containerRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block',
          pointerEvents: 'none',
          touchAction: 'none',
          userSelect: 'none'
        }}
      />
      {!splineLoaded && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-purple-900/20 animate-pulse">
          <div className="text-center">
            <div className="text-purple-300">Loading 3D Scene...</div>
            <div className="mt-1 text-xs text-purple-400">Please wait...</div>
          </div>
        </div>
      )}
    </div>
  );
};

const HeroSection = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });
  const { isComponentLoading } = useLoading();
  const isLoading = isComponentLoading('hero');
  const [disableSpline, setDisableSpline] = useState(false);
  const [isMobileOrSlow, hasCheckedDevice] = useIsMobileOrSlow();

  useEffect(() => {
    setDisableSpline(isMobileOrSlow);
  }, [isMobileOrSlow]);

  if (isLoading || !hasCheckedDevice) {
    return <HeroSkeleton />;
  }

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
          {disableSpline ? null : (
            <SplineComponent
              className="!absolute !inset-0"
              scene="https://prod.spline.design/tF28HXnwN4ohvRC9/scene.splinecode"
              disableSpline={disableSpline}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;