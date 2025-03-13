"use client"
import { useState, useRef } from "react"
import ProjectCard from "./ProjectCard"
import ProjectTag from "./ProjectTag"
import { motion, useInView } from "framer-motion"

const projectsData = [
  {
    id: 1,
    title: "Stopwatch",
    description: "A simple stopwatch using Javascript, HTML and Css",
    image: "/images/projects/1.png",
    tag: ["All", "JS"],
    gitUrl: "https://github.com/gkontevas/stopwatch",
    previewUrl: "http://127.0.0.1:3001/stopwatch/index.html",
  },
  {
    id: 2,
    title: "Calculator",
    description: "A calculator program using JS",
    image: "/images/projects/2.png",
    tag: ["All", "JS"],
    gitUrl: "https://github.com/gkontevas/calculator",
    previewUrl: "http://127.0.0.1:3001/calculator/index.html",
  },
  {
    id: 3,
    title: "Countdown",
    description: "A countdown program I made using JS",
    image: "/images/projects/3.png",
    tag: ["All", "JS"],
    gitUrl: "https://github.com/gkontevas/countdown",
    previewUrl: "http://127.0.0.1:3001/countdown/index.html",
  },
  {
    id: 4,
    title: "Heart",
    description: "A heart created by Python code",
    image: "/images/projects/4.png",
    tag: ["All", "Python"],
    gitUrl: "https://github.com/gkontevas/LovePython",
    previewUrl: "https://media.tenor.com/Z4H2w7dmSGgAAAAM/error-april-fool.gif",
  },
  {
    id: 5,
    title: "Nasa API Project",
    description: "An API using JS, Jquery and Boostrap for NASA Picture of the Day",
    image: "/images/projects/5.png",
    tag: ["All", "JS"],
    gitUrl: "https://github.com/gkontevas/NASA-API",
    previewUrl: "https://media.tenor.com/Z4H2w7dmSGgAAAAM/error-april-fool.gif",
  },
  {
    id: 6,
    title: "Weather API",
    description: "A weather API using OpenWeatherApi",
    image: "/images/projects/6.png",
    tag: ["All", "JS"],
    gitUrl: "https://github.com/gkontevas/Weather-App",
    previewUrl: "https://media.tenor.com/Z4H2w7dmSGgAAAAM/error-april-fool.gif",
  },
]
const ProjectSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const [tag, setTag] = useState("All")

  const handleTabChange = (newTag) => {
    setTag(newTag)
  }

  const filteredProjects = projectsData.filter((project) => project.tag.includes(tag))

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 100 },
  }

  return (
    <section>
      <h2 className="text-slate-300 text-center text-4xl font-extrabold mt-4 mb-10" id="projects">
        My small Projects!
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag onClick={handleTabChange} name="All" isSelected={tag === "All"} />
        <ProjectTag onClick={handleTabChange} name="Python" isSelected={tag === "Python"} />
        <ProjectTag onClick={handleTabChange} name="JS" isSelected={tag === "JS"} />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 1, delay: index * 0.2 }}
            key={index}
            className="h-full"
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              tags={project}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default ProjectSection


