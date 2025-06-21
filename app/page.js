"use client";
import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import Footer from "./components/Footer";
import ContactForm from "./components/Contact";
import Achievements from "./components/Achievements";
import "./globals.css";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";


const ParticlesBackground = dynamic(() => import("./components/ParticlesBackground"), { ssr: false });

export default function Home() {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    // Optionally check for device memory
    const isLowEnd = navigator.deviceMemory && navigator.deviceMemory <= 2;
    setShowParticles(!isMobile && !isLowEnd);
  }, []);
  
  return (
    <main className="relative flex flex-col w-full min-h-screen overflow-x-hidden">

      <div className="absolute inset-0 -z-10">
      {showParticles && <ParticlesBackground />}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-full px-4 py-8 sm:px-8 md:px-12">
        <Navbar />
        <div className="w-full mx-auto">
          {/* Increased margin-top for more space */}
          <div id="home" className="flex items-center justify-center w-full py-12 mt-8 sm:py-16 md:py-24 sm:mt-16 md:mt-0">
            <HeroSection />
          </div>
          <div id="achievements" className="w-full py-8 sm:py-12 md:py-16">
            <Achievements />
          </div>
          <div id="about" className="w-full py-12 sm:py-16 md:py-24">
            <AboutSection />
          </div>
          <div id="projects" className="w-full py-12 sm:py-16 md:py-24">
            <ProjectSection />
          </div>
          <div id="contact" className="w-full py-12 sm:py-16 md:py-24">
            <ContactForm 
              github="https://github.com/gkontevas"
              linkedin="https://www.linkedin.com/in/dimos-gkontevas-bb87a22b3/"
              phone="6945004617"
              email="dimosgkontevas1@gmail.com"
              instagram="gkontevas_"
            />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
