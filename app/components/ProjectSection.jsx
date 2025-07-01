"use client"
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false, loading: () => <div style={{height: 300}} /> });
const ProjectCard = dynamic(() => import("./ProjectCard"), { loading: () => <div style={{height: 520}} /> });
import { motion } from "framer-motion"
import { ProjectsSkeleton } from "./Skeleton"
import { useLoading } from "../contexts/LoadingContext"
import { useIsMobileOrSlow } from "../hooks/useIsMobileOrSlow"

const ProjectSection = React.memo(() => {
  const ANIMATION_CONFIG = useMemo(() => ({
    section: (isMobile) => ({
      initial: { opacity: 0, y: isMobile ? 0 : 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: isMobile ? 0.3 : 0.7, ease: "easeOut" },
    }),
  }), []);

  const projectsData = useMemo(() => [
    {
      id: 1,
      title: "Stopwatch",
      description: "A simple stopwatch using Javascript, HTML and Css",
      image: "/images/projects/1.webp",
      gitUrl: "https://github.com/gkontevas/stopwatch",
    },
    {
      id: 2,
      title: "Calculator",
      description: "A calculator program using JS",
      image: "/images/projects/2.webp",
      gitUrl: "https://github.com/gkontevas/calculator",
    },
    {
      id: 3,
      title: "Countdown",
      description: "A countdown program I made using JS",
      image: "/images/projects/3.webp",
      gitUrl: "https://github.com/gkontevas/countdown",
    },
    {
      id: 4,
      title: "Heart",
      description: "A heart created by Python code",
      image: "/images/projects/4.webp",
      gitUrl: "https://github.com/gkontevas/LovePython",
    },
    {
      id: 5,
      title: "Nasa API Project",
      description: "An API using JS, Jquery and Boostrap for NASA Picture of the Day",
      image: "/images/projects/5.webp",
      gitUrl: "https://github.com/gkontevas/NASA-API",
    },
    {
      id: 6,
      title: "Weather API",
      description: "A weather API using OpenWeatherApi",
      image: "/images/projects/6.webp",
      gitUrl: "https://github.com/gkontevas/Weather-App",
    },
    {
      id: 7,
      title: "Job Finder ",
      description: "A job finding app developed with Next.js, Tailwind Css and the use of MongoDB. Developed in class with my teacher and classmates. Still under development.",
      image: "/images/projects/7.webp",
      gitUrl: "https://github.com/gkontevas/JobFinder",
    },
  ], []);

  const { isComponentLoading } = useLoading();
  const isLoading = isComponentLoading('projects');
  const [isMobileOrSlow, hasCheckedDevice] = useIsMobileOrSlow();

  if (isLoading || !hasCheckedDevice) {
    return <ProjectsSkeleton />;
  }

  return (
    <section className="px-0" aria-label="Projects">
      <motion.h2 
        {...ANIMATION_CONFIG.section(isMobileOrSlow)}
        viewport={{ once: true, amount: 0.3 }}
        className="relative mt-4 mb-16 overflow-visible text-4xl font-extrabold tracking-tight text-center sm:text-5xl md:text-6xl scroll-navbar-offset" 
      >
        <span className="block text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text drop-shadow-[0_4px_24px_rgba(168,85,247,0.4)]">
          My
        </span>
        <span className="block -mt-2 text-5xl font-black tracking-wider text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500 bg-clip-text sm:text-6xl md:text-7xl drop-shadow-xl">
          Work
        </span>
        <span className="absolute text-6xl font-black -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none left-1/2 top-1/2 opacity-15 blur-2xl sm:text-7xl md:text-8xl text-fuchsia-400">
          ⚡
        </span>
      </motion.h2>
      <div className="hidden w-full py-20 sm:block"  >
        <div className="py-12 overflow-visible">
          <Marquee
            gradient={!isMobileOrSlow}
            gradientColor="rgb(88, 28, 135)"
            gradientWidth={80}
            speed={isMobileOrSlow ? 20 : 60}
            pauseOnHover={true}
            pauseOnClick={true}
            loop={0}
            className="!overflow-visible"
            style={{ overflow: 'visible' }}
          >
          {projectsData.map((project) => (
            <motion.div
              className="mx-6 w-[500px] md:w-[650px] flex-shrink-0"
              key={project.id}
              whileHover={isMobileOrSlow ? undefined : {
                scale: 1.01,
                y: -2,
                rotateY: 0.5,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              }}
              whileTap={isMobileOrSlow ? undefined : { scale: 0.99 }}
              initial={{ opacity: 0.8 }}
              whileInView={{ opacity: 1 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
                isMobileOrSlow={isMobileOrSlow}
              />
            </motion.div>
          ))}
        </Marquee>
        </div>
      </div>
      {/* Mobile Stacked Cards */}
      <div className="flex flex-col items-center justify-center gap-7 sm:hidden">
        {projectsData.map((project, idx) => (
          <div key={project.id} className="w-[90vw] max-w-[430px]">
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              index={idx}
              isMobileOrSlow={isMobileOrSlow}
            />
          </div>
        ))}
      </div>
    </section>
  )
});
export default ProjectSection