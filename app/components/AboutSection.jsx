"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion } from "framer-motion";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="pl-2 font-audiowide">
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
      <ul className="pl-2 font-audiowide">
        <li>On-going Studies at IEK EUROPROODOS.</li>
        <li>On-going workshops, seminars, and online courses.</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="pl-2 font-audiowide">
        <li>E.C.D.L. Certificate</li>
        <li>Senior High School Lykeio Lehaiou Certificate</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [randomValues, setRandomValues] = useState(null);

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  useEffect(() => {
    setIsClient(true);
    
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Audiowide&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

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
      }));

    setRandomValues({ particles });
  }, []);

  if (!isClient || !randomValues) {
    return (
      <div className="relative w-fit mx-auto">
        <div className="relative rounded-lg overflow-hidden">
          <Image src="/images/about-image.png" alt="about-image" width={500} height={500} />
        </div>
      </div>
    );
  }

  return (
    <section className="text-white px-0" id="about" style={{ fontFamily: "'Audiowide', cursive" }}>
      <div className="flex flex-col md:flex-row items-center gap-8 py-8 sm:py-16 xl:gap-12 max-w-6xl mx-auto px-4">
        {/* Image Column - takes 50% width on medium screens and up */}
        <motion.div 
          className="w-full md:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="relative w-full max-w-[500px] mx-auto"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              className="absolute -inset-4 rounded-lg z-0"
              style={{ background: "transparent" }}
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
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                  }}
                />
              </svg>
            </motion.div>

            <motion.div
              className="relative w-full h-auto mx-auto"
              animate={{
                boxShadow: isHovered
                  ? "0 20px 25px -5px rgba(60, 51, 154, 0.5), 0 8px 10px -6px rgba(138, 0, 196, 0.3)"
                  : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/images/about-image.png"
                  alt="about-image"
                  width={900}
                  height={900}
                  className="relative z-10 w-full h-auto rounded-lg"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Text Content Column - takes 50% width on medium screens and up */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-700 mb-4">
            About Me
          </h2>
          <p className="text-base lg:text-lg mb-6">
            I'm a 20-year-old aspiring developer with a big passion for coding and the world of technology. Trying to improve every day and get the best out of myself! Below you can check my education and skills. My main focus is JavaScript, mainly on libraries like React, NextJs etc. Eager to learn more and more!
          </p>
          <div className="flex flex-wrap justify-start gap-2 mb-8">
            <TabButton 
              selectTab={() => handleTabChange("skills")} 
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton 
              selectTab={() => handleTabChange("education")} 
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton 
              selectTab={() => handleTabChange("certifications")} 
              active={tab === "certifications"}
            >
              Certifications
            </TabButton>
          </div>
          <div className="mt-4">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;