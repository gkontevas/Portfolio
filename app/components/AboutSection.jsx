"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion } from "framer-motion";
import { useEffect } from "react";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
      <li>React</li>
    <li>Next.js</li>
    <li>Python</li>
    <li>MongoDB</li>
      <li>Javascript</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>On-going Studies at IEK EUROPROODOS.</li>
        <li>On-going workshops, seminars and online courses.</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
       <li>E.C.D.L. Certificate</li>
       <li>Senior High School Lykeio Lehaiou Certificate</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };
  const [isHovered, setIsHovered] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [randomValues, setRandomValues] = useState(null)

  // Generate random values only once on client-side
  useEffect(() => {
    setIsClient(true)

    // Generate random positions for particles
    const particles = Array(5)
      .fill(0)
      .map(() => ({
        positions: [
          { x: Math.random() * 500, y: Math.random() * 500 },
          { x: Math.random() * 500, y: Math.random() * 500 },
          { x: Math.random() * 500, y: Math.random() * 500 },
        ],
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
      }))

    setRandomValues({ particles })
  }, [])

  // Don't render animations until client-side
  if (!isClient || !randomValues) {
    return (
      <div className="relative w-fit mx-auto">
        <div className="relative rounded-lg overflow-hidden">
          <Image src="/images/about-image.png" alt="about-image" width={500} height={500} />
        </div>
      </div>
    )
  }

  return (
    <section className="text-white px-0" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-0 xl:gap-16 sm:py-16">
      <motion.div
      className="relative w-fit mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Continuously animated dashed border */}
      <motion.div
        className="absolute -inset-4 rounded-lg z-0"
        style={{
          background: "transparent",
        }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="none"
            stroke="#8a00c4"
            strokeWidth="0.5"
            strokeDasharray="6 3"
            initial={{ pathLength: 1 }}
            animate={{
              rotate: 360,
              strokeDashoffset: [0, -18],
            }}
            transition={{
              rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              strokeDashoffset: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            }}
          />
        </svg>
      </motion.div>

      {/* Secondary pulsing border */}
      <motion.div
        className="absolute -inset-2 rounded-lg border border-purple-400/30 z-0"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.98, 1.01, 0.98],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Decorative corner elements */}
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-purple-500 z-10"
        animate={{
          x: isHovered ? -5 : 0,
          y: isHovered ? -5 : 0,
          borderColor: isHovered ? "#8a00c4" : "rgb(168, 85, 247)",
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-purple-500 z-10"
        animate={{
          x: isHovered ? 5 : 0,
          y: isHovered ? -5 : 0,
          borderColor: isHovered ? "#8a00c4" : "rgb(168, 85, 247)",
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-purple-500 z-10"
        animate={{
          x: isHovered ? -5 : 0,
          y: isHovered ? 5 : 0,
          borderColor: isHovered ? "#8a00c4" : "rgb(168, 85, 247)",
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-purple-500 z-10"
        animate={{
          x: isHovered ? 5 : 0,
          y: isHovered ? 5 : 0,
          borderColor: isHovered ? "#8a00c4" : "rgb(168, 85, 247)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-purple-300/20 opacity-0 z-20 pointer-events-none mix-blend-overlay"
        animate={{
          opacity: isHovered ? 0.8 : 0,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-purple-400/40"
            initial={{
              x: Math.random() * 500,
              y: Math.random() * 500,
              scale: 0,
            }}
            animate={{
              x: [Math.random() * 500, Math.random() * 500, Math.random() * 500],
              y: [Math.random() * 500, Math.random() * 500, Math.random() * 500],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Subtle shadow animation */}
      <motion.div
        className="relative rounded-lg overflow-hidden"
        animate={{
          boxShadow: isHovered
            ? "0 20px 25px -5px rgba(60, 51, 154, 0.5), 0 8px 10px -6px rgba(138, 0, 196, 0.3)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Main image with scale effect */}
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          <Image src="/images/about-image.png" alt="about-image" width={500} height={500} className="relative z-10" />
        </motion.div>
      </motion.div>

      {/* Glowing dot that orbits the image */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-purple-600 shadow-lg shadow-purple-500/50 z-20"
        style={{
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute w-full h-full rounded-full bg-purple-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0.2, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-purple-700 mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
          I'm a 20 year old beginner developer with a big passion about coding and the world of technology. Trying to improve everyday and get the better out of myself! Below you can check my education and skills.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
