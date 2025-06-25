import { motion, useInView } from "framer-motion";
import dynamic from 'next/dynamic';
import { useRef } from 'react';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center w-full h-full rounded-lg bg-purple-900/20 animate-pulse">
    <div className="text-purple-300">Loading 3D Scene...</div>
  </div>
});
const HeroSection = () => {
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });
  
  return (
    <section
      ref={heroRef}
      className={`
        relative flex flex-col-reverse items-center w-full        px-4 overflow-visible
        gap-y-0
        sm:gap-y-4
        min-h-auto
        sm:min-h-screen
        justify-center
        sm:justify-between        xl:flex-row xl:px-24 xl:h-screen
        pt-2 pb-0 sm:pt-8 md:pt-12 sm:pb-0
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
          Explore creativity, code, and collaboration. Here, ideas turn into interactive experiences and every line of code brings new possibilities. Let’s build something amazing together!        </motion.p>
      </div>
      <div className="items-center justify-center hidden w-full sm:flex xl:w-1/2 xl:h-full">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 40,
            damping: 25,
            delay: 0.6,
            duration: 1.5,
          }}
          className="
            relative w-full
            aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/9] xl:aspect-auto xl:h-full
            max-h-[600px] sm:max-h-[700px] md:max-h-[800px] xl:max-h-full
            min-h-[300px] sm:min-h-[400px] md:min-h-[500px]
          "
        >
          <Spline
            className="!absolute !inset-0"
            scene="https://prod.spline.design/f3Tb9mT378GDmn0P/scene.splinecode"
          />
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;
