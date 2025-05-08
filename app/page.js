import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectSection from "./components/ProjectSection";
import Footer from "./components/Footer";
import ContactForm from "./components/Contact";
import Achievements from "./components/Achievements";
import ParticlesBackground from "./components/ParticlesBackground";
import "./globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full relative overflow-x-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 -z-10">
        <ParticlesBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-full px-4 sm:px-8 md:px-12 py-8">
        <Navbar />
        <div className="w-full mx-auto">
          <div id="home" className="w-full flex justify-center items-center py-12 sm:py-16 md:py-24">
            <HeroSection />
          </div>
          {/* Reduced Gap for Achievements */}
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
