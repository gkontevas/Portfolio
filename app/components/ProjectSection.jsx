"use client"
import { useState } from "react"
import ProjectCard from "./ProjectCard"
import Marquee from "react-fast-marquee"
import { motion } from "framer-motion"
const projectsData = [
  {
    id: 1,
    title: "Stopwatch",
    description: "A simple stopwatch using Javascript, HTML and Css",
    image: "/images/projects/1.png",
    gitUrl: "https://github.com/gkontevas/stopwatch",
  },
  {
    id: 2,
    title: "Calculator",
    description: "A calculator program using JS",
    image: "/images/projects/2.png",
    gitUrl: "https://github.com/gkontevas/calculator",
  },
  {
    id: 3,
    title: "Countdown",
    description: "A countdown program I made using JS",
    image: "/images/projects/3.png",
    gitUrl: "https://github.com/gkontevas/countdown",
  },
  {
    id: 4,
    title: "Heart",
    description: "A heart created by Python code",
    image: "/images/projects/4.png",
    gitUrl: "https://github.com/gkontevas/LovePython",
  },
  {
    id: 5,
    title: "Nasa API Project",
    description: "An API using JS, Jquery and Boostrap for NASA Picture of the Day",
    image: "/images/projects/5.png",
    gitUrl: "https://github.com/gkontevas/NASA-API",
  },
  {
    id: 6,
    title: "Weather API",
    description: "A weather API using OpenWeatherApi",
    image: "/images/projects/6.png",
    gitUrl: "https://github.com/gkontevas/Weather-App",
  },
  {
    id: 7,
    title: "Job Finder ",
    description: "A job finding app developed with Next.js, Tailwind Css and the use of MongoDB. Developed in class with my teacher and classmates. Still under development.",
    image: "/images/projects/7.png",
    gitUrl: "https://github.com/gkontevas/Portfolio.git",
  },
]
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.4,
    },
  },
}
const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}
const ProjectSection = () => {
  return (
    <section className="px-0">
      <h2 className="mt-4 mb-10 text-4xl font-extrabold text-center text-slate-300" id="projects">
        My small Projects!
      </h2>
      {}
      <div className="hidden w-full py-4 sm:block">
        <Marquee
          gradient={false}
          speed={120}
          pauseOnHover={true}
          loop={0}
        >
          {projectsData.map((project) => (
            <div
              className="mx-6 w-[500px] md:w-[650px] flex-shrink-0"
              key={project.id}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl}
              />
            </div>
          ))}
        </Marquee>
      </div>
      {}
           <motion.ul
        className="flex flex-col items-center justify-center gap-7 sm:hidden"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projectsData.map((project, idx) => (
          <motion.li key={project.id} variants={cardVariant} className="w-[90vw] max-w-[430px]">
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
export default ProjectSection