"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion } from "framer-motion";
import { AboutSkeleton } from "./Skeleton";
import { useLoading } from "../contexts/LoadingContext";
import Spline from '@splinetool/react-spline';

// ============================================================================
// TAB DATA CONFIGURATION
// ============================================================================
const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="space-y-3 list-none">
        {["React", "Next.js", "MongoDB", "Javascript", "Wordpress", "HTML", "CSS"].map((skill, index) => (
          <motion.li 
            key={skill}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 font-medium text-purple-200"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400"></span>
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
      <ul className="space-y-4 list-none">
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
            className="flex items-start gap-3 font-medium leading-relaxed text-purple-200"
          >
            <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400"></span>
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
      <ul className="space-y-3 list-none">
        {["E.C.D.L. Certificate", "Senior High School Lykeio Lehaiou Certificate"].map((cert, index) => (
          <motion.li 
            key={cert}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 font-medium text-purple-200"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400"></span>
            {cert}
          </motion.li>
        ))}
      </ul>
    ),
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AboutSection = () => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);
  const { isComponentLoading } = useLoading();
  const isLoading = isComponentLoading('about');

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  const handleTabChange = (id) => setTab(id);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    setSplineError(false);
    
    setTimeout(() => {
      // Remove watermark elements
      const watermarks = document.querySelectorAll('a[href*="spline"], [class*="watermark"], [id*="watermark"]');
      watermarks.forEach(el => el.remove());
      
      // Hide bottom-right positioned elements
      const splineContainer = document.querySelector('[data-spline-container]');
      if (splineContainer) {
        const style = document.createElement('style');
        style.innerHTML = `
          [data-spline-container] a,
          [data-spline-container] [style*="position: absolute"][style*="bottom"],
          [data-spline-container] [style*="position: fixed"][style*="bottom"] {
            display: none !important;
          }
        `;
        document.head.appendChild(style);
      }
      
      // Add scroll prevention ONLY to canvas elements within the About section
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const aboutCanvases = aboutSection.querySelectorAll('canvas');
        aboutCanvases.forEach(canvas => {
          canvas.addEventListener('wheel', (e) => { e.preventDefault(); e.stopPropagation(); }, { passive: false });
          canvas.addEventListener('touchmove', (e) => { e.preventDefault(); e.stopPropagation(); }, { passive: false });
          canvas.style.touchAction = 'none';
        });
      }
    }, 1000);
  };

  const handleSplineError = () => {
    setSplineError(true);
    setSplineLoaded(false);
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // ============================================================================
  // LOADING STATE
  // ============================================================================
  if (isLoading) {
    return (
      <section className="text-white" id="about" style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <div className="max-w-6xl px-4 pt-4 pb-8 mx-auto sm:pt-8 sm:pb-12">
          <AboutSkeleton />
        </div>
      </section>
    );
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <section className="text-white" id="about" style={{ fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div className="flex flex-col items-center max-w-6xl gap-8 px-4 pt-4 pb-8 mx-auto md:items-start md:flex-row sm:pt-8 sm:pb-12 xl:gap-12">
        
        {/* ========== 3D GALAXY PORTAL COLUMN ========== */}
        <motion.div className="flex justify-center w-full md:w-1/2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="relative w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] aspect-square">
            <motion.div
              className="relative w-full h-full overflow-hidden rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(75, 0, 130, 0.2) 50%, rgba(25, 25, 112, 0.1) 100%)',
                boxShadow: '0 0 50px rgba(138, 43, 226, 0.3), inset 0 0 50px rgba(75, 0, 130, 0.2)',
                aspectRatio: '1 / 1'
              }}
            >
              {/* Portal Border Animations */}
              <motion.div className="absolute inset-0 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ background: 'conic-gradient(from 0deg, transparent, rgba(138, 43, 226, 0.4), transparent, rgba(75, 0, 130, 0.4), transparent)', mask: 'radial-gradient(circle, transparent 95%, black 98%)', WebkitMask: 'radial-gradient(circle, transparent 95%, black 98%)' }} />
              <motion.div className="absolute rounded-full inset-1" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ background: 'conic-gradient(from 180deg, transparent, rgba(168, 85, 247, 0.6), transparent, rgba(139, 69, 19, 0.4), transparent)', mask: 'radial-gradient(circle, transparent 92%, black 95%)', WebkitMask: 'radial-gradient(circle, transparent 92%, black 95%)' }} />
              <motion.div className="absolute inset-0 rounded-full" animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(75, 0, 130, 0.1) 50%, transparent 70%)', filter: 'blur(2px)' }} />
              
              {/* 3D Model Container */}
              <div className="absolute overflow-hidden rounded-full inset-4 bg-black/20" onWheel={(e) => { e.preventDefault(); e.stopPropagation(); }} onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }} style={{ touchAction: 'none' }}>
                <div className="relative w-full h-full">
                  {/* Loading State */}
                  {!splineLoaded && !splineError && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40">
                      <div className="text-center">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 mx-auto mb-4 border-4 border-purple-400 rounded-full border-t-transparent" />
                        <p className="font-medium text-purple-200">Loading Galaxy...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Error State */}
                  {splineError && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40">
                      <div className="text-center">
                        <div className="mb-4 text-6xl">🌌</div>
                        <p className="font-medium text-purple-200">Galaxy Experience</p>
                        <p className="mt-2 text-sm text-purple-300">Interactive 3D content</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Spline 3D Model */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <Spline
                      scene="https://prod.spline.design/RJM68j1HsSWaPCIS/scene.splinecode"
                      onLoad={handleSplineLoad}
                      onError={handleSplineError}
                      onWheel={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      style={{
                        width: '150%', height: '150%', position: 'absolute', 
                        top: '50%', left: '50%', 
                        transform: 'translate(-52%, -50%) scale(1.2)',
                        borderRadius: '50%', opacity: splineLoaded ? 1 : 0, 
                        transition: 'opacity 0.5s ease-in-out',
                        pointerEvents: 'auto'
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ========== TEXT CONTENT COLUMN ========== */}
        <div className="w-full text-center md:w-1/2">
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.2, duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative mb-6 text-4xl font-extrabold tracking-tight text-center sm:text-5xl md:text-6xl"
          >
            <span className="text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text drop-shadow-[0_4px_24px_rgba(168,85,247,0.4)]">About </span>
            <span className="text-5xl font-black tracking-wider text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500 bg-clip-text sm:text-6xl md:text-7xl drop-shadow-xl">Me</span>
            <span className="absolute text-6xl font-black -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none left-1/2 top-1/2 opacity-15 blur-2xl sm:text-7xl md:text-8xl text-fuchsia-400">✨</span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.4, duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-base lg:text-lg mb-6 mx-auto md:mx-0 max-w-[500px] md:max-w-none font-medium leading-relaxed text-purple-200/90 italic"
          >
            I'm a 20-year-old aspiring developer with a big passion for coding and the world of technology. Trying to improve every day and get the best out of myself! Below you can check my education and skills. My main focus is JavaScript, mainly on libraries like React, NextJs etc. Eager to learn more and more!
          </motion.p>

          {/* Divider */}
          <motion.div className="mx-auto md:mx-0 max-w-[500px] md:max-w-none mb-6" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} style={{ height: "3px", background: "linear-gradient(90deg, #8a00c4 0%, #3c339a 100%)", borderRadius: "2px", originX: 0 }} />

          {/* Tab Buttons */}
          <div className="flex flex-col flex-wrap justify-center w-full max-w-xs gap-2 mx-auto mb-8 md:flex-row md:gap-4 md:max-w-none md:w-auto">
            {TAB_DATA.map(({ id, title }) => (
              <TabButton key={id} selectTab={() => handleTabChange(id)} active={tab === id} className="w-full px-4 py-2 text-base md:w-auto md:text-lg">
                {title}
              </TabButton>
            ))}
          </div>

          {/* Tab Content */}
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