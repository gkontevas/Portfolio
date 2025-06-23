import { motion } from "framer-motion"
import Spline from '@splinetool/react-spline'

const HeroSection = () => {
  return (
   <section className="relative flex flex-col-reverse items-center justify-between w-full min-h-screen px-4 overflow-visible gap-y-8 xl:flex-row xl:gap-y-0 xl:px-24 xl:h-screen    pt-24         /* <-- Adds top space on mobile, increase as needed */
        sm:pt-28">
      {/* Left Section (Text) */}
      <div className="z-40 flex flex-col items-center justify-center w-full mb-6 text-center xl:mb-0 xl:items-start xl:text-left xl:w-1/2">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 18,
            delay: 1.1,
            duration: 1.2,
          }}
          className="mb-4 font-extrabold tracking-tight text-transparent bg-clip-text drop-shadow-[0_4px_24px_rgba(168,85,247,0.5)] relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="block text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text">
            Welcome to
          </span>
          <span className="block py-2 text-5xl font-extrabold tracking-wider text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500 bg-clip-text sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-xl">
            The World Of Wonders
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
            delay: 1.3,
            duration: 1.2,
          }}
          className="max-w-xl mb-2 text-lg italic font-medium leading-relaxed text-purple-200 sm:mb-4 sm:text-2xl"
        >
          Explore creativity, code, and collaboration. Here, ideas turn into interactive experiences and every line of code brings new possibilities. Let’s build something amazing together!
        </motion.p>
      </div>
      {/* Right Section */}
    <div className="
        flex items-center justify-center
        w-full
        min-h-[180px] max-h-[300px]  /* mobile: size limit */
        sm:min-h-[250px] sm:max-h-[350px]
        md:min-h-[300px] md:max-h-[400px]
        xl:min-h-0 xl:max-h-none xl:w-1/2 xl:h-full
      ">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 40,
            damping: 25,
            delay: 1.7,
            duration: 1.5,
          }}
          className="relative flex items-center justify-center w-full h-full"
        >
          <div className="relative w-full h-full">
            <Spline
              className="!w-full !h-full"
              scene="https://prod.spline.design/f3Tb9mT378GDmn0P/scene.splinecode"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
export default HeroSection