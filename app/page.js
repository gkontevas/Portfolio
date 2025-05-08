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
    <main className="flex min-h-screen flex-col w-full relative">
      {/* Particles Background */}
      <div className="absolute inset-0 -z-10">
        <ParticlesBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="container mt-12 mx-auto px-12 py-14">
          <div id="home">
            <HeroSection />
          </div>
          <div id="achievements">
            <Achievements />
          </div>
          <br/>
          <div id="about">
            <AboutSection />
          </div>
          <br/>
          <div id="projects">
            <ProjectSection />
          </div>
          <br/>
          <div id="contact" className="w-full flex justify-center mt-24 mx-auto px-4 sm:px-6 lg:px-8 py-4">
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