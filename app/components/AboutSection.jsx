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
      <ul className="list-none space-y-3">
        {["React", "Next.js", "MongoDB", "Javascript", "Wordpress", "HTML", "CSS"].map((skill, index) => (
          <motion.li 
            key={skill}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-purple-200 font-medium"
          >
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full"></span>
            {skill}
          </motion.li>
        ))}
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-none space-y-4">
        {[
          "On-going Studies at IEK EUROPROODOS.",
          "On-going workshops, seminars, and online courses.",
          "Currently undertaking a 6-month legally authorized internship, working collaboratively in a team of two Web Developers/Designers."
        ].map((education, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-start gap-3 text-purple-200 font-medium leading-relaxed"
          >
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full mt-2 flex-shrink-0"></span>
            {education}
          </motion.li>
        ))}
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-none space-y-3">
        {[
          "E.C.D.L. Certificate",
          "Senior High School Lykeio Lehaiou Certificate"
        ].map((cert, index) => (
          <motion.li 
            key={cert}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-purple-200 font-medium"
          >
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full"></span>
            {cert}
          </motion.li>
        ))}
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleTabChange = (id) => {
    setTab(id);
  };

  useEffect(() => {
    setIsClient(true);

    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <section
      className="text-white"
      id="about"
      style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <div className="flex flex-col items-center max-w-6xl gap-8 px-4 pt-4 pb-8 mx-auto md:items-start md:flex-row sm:pt-8 sm:pb-12 xl:gap-12">
        {/* Image Column - takes 50% width on medium screens and up */}
        <motion.div
          className="flex justify-center w-full md:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              className="absolute z-0 rounded-lg -inset-4"
              style={{ background: "transparent" }}
            >
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
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
                    strokeDashoffset: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                />
              </svg>
            </motion.div>

            <motion.div
              className="relative w-full h-auto"
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
                  src="/images/about-image.webp"
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
        <div className="w-full text-center md:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 18,
              delay: 0.2,
              duration: 1.2,
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative mb-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center md:text-left tracking-tight"
          >
            <span className="block text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text drop-shadow-[0_4px_24px_rgba(168,85,247,0.4)]">
              About
            </span>
            <span className="block text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500 bg-clip-text text-5xl sm:text-6xl md:text-7xl font-black tracking-wider drop-shadow-xl -mt-2">
              Me
            </span>
            <span className="absolute font-black -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none left-1/2 top-1/2 opacity-15 blur-2xl text-6xl sm:text-7xl md:text-8xl text-fuchsia-400">
              ✨
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 18,
              delay: 0.4,
              duration: 1.2,
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-base lg:text-lg mb-6 mx-auto md:mx-0 max-w-[500px] md:max-w-none font-medium leading-relaxed text-purple-200/90 italic"
          >
            I'm a 20-year-old aspiring developer with a big passion for coding
            and the world of technology. Trying to improve every day and get
            the best out of myself! Below you can check my education and skills.
            My main focus is JavaScript, mainly on libraries like React, NextJs
            etc. Eager to learn more and more!
          </motion.p>
          <motion.div
            className="mx-auto md:mx-0 max-w-[500px] md:max-w-none mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              height: "3px",
              background: "linear-gradient(90deg, #8a00c4 0%, #3c339a 100%)",
              borderRadius: "2px",
              originX: 0,
            }}
          />
          <div className="flex flex-col flex-wrap justify-center w-full max-w-xs gap-2 mx-auto mb-8 md:flex-row md:gap-4 md:max-w-none md:w-auto">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
              className="w-full px-4 py-2 text-base md:w-auto md:text-lg"
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
              className="w-full px-4 py-2 text-base md:w-auto md:text-lg"
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
              className="w-full px-4 py-2 text-base md:w-auto md:text-lg"
            >
              Certifications
            </TabButton>
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-left">
              {TAB_DATA.find((t) => t.id === tab).content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;