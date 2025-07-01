"use client";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import "./globals.css";
import dynamic from "next/dynamic";

const DynamicProjectSection = dynamic(() => import("./components/ProjectSection"), {
  loading: () => <div className="py-16 text-center text-purple-300">Loading projects...</div>
});

const DynamicContactForm = dynamic(() => import("./components/Contact"), {
  loading: () => <div className="py-16 text-center text-purple-300">Loading contact form...</div>
});
export default function Home() {
  return (    <main className="relative flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="flex-1 w-full mx-auto">
        <div id="home" className="flex items-center justify-center w-full">
          <HeroSection />
        </div>
        <div id="about" className="w-full py-16 sm:py-20 md:py-24 scroll-navbar-offset">
          <AboutSection />
        </div>
        <div className="w-full py-16 sm:py-20 md:py-24">
          <DynamicProjectSection />
        </div>
        <div id="contact" className="w-full py-16 sm:py-20 md:py-24 scroll-navbar-offset">
          <DynamicContactForm 
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