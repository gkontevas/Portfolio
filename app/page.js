"use client";

import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import Footer from "./components/Footer";
import ContactForm from "./components/Contact";
import Achievements from "./components/Achievements";
import "./globals.css";

export default function Home() {
  return (
    <main className="relative flex flex-col w-full min-h-screen">
      {/* Navbar stays outside content for sticky behavior if needed */}
      <Navbar />
      <div className="flex-1 w-full mx-auto">
        {/* HERO: No extra margin/padding around hero section */}
        <div id="home" className="flex items-center justify-center w-full min-h-screen">
          <HeroSection />
        </div>
        {/* <div id="achievements" className="w-full py-8 sm:py-12 md:py-16">
          <Achievements />
        </div> */}
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
    </main>
  );
}