"use client";
import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Purple color palette
  const purpleColors = [
    "#a855f7", // Vibrant purple
    "#c084fc", // Lighter purple
    "#e879f9", // Pinkish purple
    "#d8b4fe", // Pastel purple
    "#9333ea"  // Deep purple
  ];

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { 
            color: { 
              value: "#0f172a" // Keep dark background for contrast
            } 
          },
          fpsLimit: isMobile ? 60 : 120,
          interactivity: {
            events: {
              onClick: {
                enable: !isMobile,
                mode: "push",
              },
              onHover: {
                enable: !isMobile,
                mode: "repulse",
              },
            },
            modes: {
              repulse: {
                distance: isMobile ? 50 : 100,
                duration: 0.4
              },
              push: {
                quantity: 2
              }
            }
          },
          particles: {
            color: { 
              value: purpleColors 
            },
            links: {
              color: "#c084fc", // Medium purple links
              distance: isMobile ? 80 : 120,
              enable: true,
              opacity: 0.5,
              width: 1.2
            },
            move: {
              enable: true,
              speed: isMobile ? 0.8 : 1.6,
              direction: "none",
              outModes: {
                default: "bounce-vertical" // More dynamic purple flow
              }
            },
            number: {
              value: isMobile ? 35 : 70,
              density: {
                enable: true,
                area: isMobile ? 500 : 900
              }
            },
            opacity: {
              value: { min: 0.2, max: 0.8 }, // More vibrant
              animation: {
                enable: !isMobile,
                speed: 1.5
              }
            },
           shape: isMobile
  ? { type: "circle" }
  : {
      type: ["circle", "char"],
      character: [
        {
          value: ["</>", "{}", "()", "#", "=>"],
          font: "Courier",
          style: "",
          weight: "400",
          fill: true
        }
      ]
    },
            size: {
              value: isMobile ? { min: 2, max: 5 } : { min: 3, max: 8 },
              animation: {
                enable: !isMobile,
                speed: 3
              }
            },
            wobble: {
              enable: !isMobile,
              distance: 5,
              speed: 2
            }
          },
          detectRetina: true
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
