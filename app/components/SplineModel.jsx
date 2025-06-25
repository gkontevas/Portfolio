"use client";
import { useState, useEffect, useRef } from 'react';

const SplineModel = ({ onLoad, onError }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);
  const splineRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    
    const loadSpline = async () => {
      try {
        // Only load on client side after component mounts
        if (typeof window === 'undefined') return;
        
        // Dynamic import with proper error handling
        const { Application } = await import('@splinetool/runtime');
        
        if (!mounted || !containerRef.current) return;

        const app = new Application(containerRef.current);
        splineRef.current = app;
        
        await app.load('https://prod.spline.design/RJM68j1HsSWaPCIS/scene.splinecode');
        
        // Zoom in on the model to make it more prominent
        if (app.camera) {
          app.camera.position.z = app.camera.position.z * 0.6; // Zoom in by moving camera closer
        }
        
        // Prevent page scroll when interacting with the 3D model
        const canvas = containerRef.current;
        if (canvas) {
          const preventWheelScroll = (e) => {
            // Only prevent default if the user is scrolling over the canvas
            if (e.target === canvas || canvas.contains(e.target)) {
              e.preventDefault();
              e.stopPropagation();
            }
          };
          
          const preventTouchScroll = (e) => {
            // Only prevent default for touch events on the canvas
            if (e.target === canvas || canvas.contains(e.target)) {
              e.preventDefault();
              e.stopPropagation();
            }
          };
          
          canvas.addEventListener('wheel', preventWheelScroll, { passive: false });
          canvas.addEventListener('touchmove', preventTouchScroll, { passive: false });
          
          // Store event handlers for cleanup
          canvas._preventWheelScroll = preventWheelScroll;
          canvas._preventTouchScroll = preventTouchScroll;
        }
        
        // Hide Spline watermark with multiple strategies
        setTimeout(() => {
          // Method 1: Target known watermark selectors
          const watermarks = document.querySelectorAll('[class*="watermark"], [id*="watermark"], a[href*="spline"], [class*="spline"], [href*="spline.design"]');
          watermarks.forEach(el => {
            if (el && el.style) {
              el.style.display = 'none !important';
              el.style.visibility = 'hidden !important';
              el.style.opacity = '0 !important';
              el.style.pointerEvents = 'none !important';
              el.style.position = 'absolute !important';
              el.style.left = '-9999px !important';
              el.style.top = '-9999px !important';
              el.remove(); // Completely remove from DOM
            }
          });
          
          // Method 2: Add global CSS to hide any potential watermarks
          const style = document.createElement('style');
          style.innerHTML = `
            [class*="watermark"], 
            [id*="watermark"], 
            a[href*="spline"], 
            [class*="spline"], 
            [href*="spline.design"],
            canvas ~ div:last-child,
            canvas + div:last-child {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
            }
          `;
          document.head.appendChild(style);
          
          // Method 3: Check for any elements in the bottom-right corner
          const containerBounds = containerRef.current?.getBoundingClientRect();
          if (containerBounds) {
            const elementsInBottomRight = document.elementsFromPoint(
              containerBounds.right - 50, 
              containerBounds.bottom - 30
            );
            elementsInBottomRight.forEach(el => {
              if (el !== containerRef.current && !containerRef.current?.contains(el)) {
                const text = el.textContent?.toLowerCase() || '';
                if (text.includes('spline') || text.includes('design') || el.tagName === 'A') {
                  el.style.display = 'none !important';
                  el.remove();
                }
              }
            });
          }
        }, 1000);
        
        // Additional watermark check after longer delay
        setTimeout(() => {
          const allLinks = document.querySelectorAll('a');
          allLinks.forEach(link => {
            if (link.href?.includes('spline') || link.textContent?.toLowerCase().includes('spline')) {
              link.style.display = 'none !important';
              link.remove();
            }
          });
        }, 3000);
        
        if (mounted) {
          setIsLoaded(true);
          onLoad?.();
        }
      } catch (error) {
        console.error('Spline loading error:', error);
        if (mounted) {
          setHasError(true);
          onError?.(error);
        }
      }
    };

    // Add a small delay to ensure proper mounting
    const timer = setTimeout(loadSpline, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (splineRef.current) {
        try {
          splineRef.current.dispose?.();
        } catch (e) {
          console.warn('Error disposing Spline:', e);
        }
      }
      
      // Clean up scroll event listeners
      if (containerRef.current) {
        const canvas = containerRef.current;
        if (canvas._preventWheelScroll) {
          canvas.removeEventListener('wheel', canvas._preventWheelScroll);
        }
        if (canvas._preventTouchScroll) {
          canvas.removeEventListener('touchmove', canvas._preventTouchScroll);
        }
      }
    };
  }, [onLoad, onError]);

  if (hasError) {
    return (
      <div className="flex items-center justify-center w-full h-full rounded-lg">
        <div className="flex flex-col items-center gap-4 px-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400">
            <span className="text-2xl">🎨</span>
          </div>
          <div>
            <p className="mb-2 font-medium text-purple-200">3D Experience</p>
            <p className="text-sm text-purple-300">Creative content showcase</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-400 rounded-full border-t-transparent animate-spin"></div>
            <p className="font-medium text-purple-200">Loading Galaxy...</p>
          </div>
        </div>
      )}
      <canvas 
        ref={containerRef}
        className="w-full h-full rounded-full"
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block',
          borderRadius: '50%'
        }}
      />
      
      {/* MAXIMUM WATERMARK DESTROYER - Enhanced with better coverage */}
      <div className="absolute bottom-0 right-0 w-48 h-32 overflow-hidden">
        {/* Base solid coverage - no transparency */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at bottom right, 
                rgba(0, 0, 0, 1) 0%, 
                rgba(16, 16, 32, 1) 30%,
                rgba(25, 25, 112, 1) 60%, 
                rgba(75, 0, 130, 1) 80%,
                rgba(139, 69, 19, 0.9) 100%
              )
            `,
            borderRadius: '80% 0 80% 0'
          }}
        />
        
        {/* Animated pulsing overlay */}
        <div 
          className="absolute bottom-0 right-0 w-44 h-28"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(25, 25, 112, 1) 40%, rgba(75, 0, 130, 0.95) 80%, transparent 100%)',
            borderRadius: '0 0 70% 0',
            animation: 'pulse-coverage 3s ease-in-out infinite alternate'
          }}
        />
        
        {/* Extra thick coverage */}
        <div 
          className="absolute bottom-0 right-0 w-40 h-24"
          style={{
            background: 'rgba(0, 0, 0, 1)',
            borderRadius: '0 0 60% 0'
          }}
        />
        
        {/* Animated cosmic dust clouds */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={`dust-${i}`}
              className="absolute rounded-full opacity-95"
              style={{
                width: Math.random() * 12 + 6 + 'px',
                height: Math.random() * 12 + 6 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 6 + 's',
                animationDuration: (Math.random() * 8 + 4) + 's',
                background: `radial-gradient(circle, rgba(168, 85, 247, ${Math.random() * 1 + 0.6}) 0%, rgba(75, 0, 130, ${Math.random() * 1 + 0.5}) 70%, rgba(0, 0, 0, 1) 100%)`,
                animation: 'cosmic-drift 8s ease-in-out infinite alternate',
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
        
        {/* Swirling cosmic energy */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`energy-${i}`}
              className="absolute"
              style={{
                width: Math.random() * 20 + 15 + 'px',
                height: Math.random() * 20 + 15 + 'px',
                top: Math.random() * 90 + 5 + '%',
                left: Math.random() * 90 + 5 + '%',
                borderRadius: '50%',
                background: `conic-gradient(from ${Math.random() * 360}deg, 
                  rgba(168, 85, 247, 0.8) 0deg, 
                  rgba(75, 0, 130, 1) 120deg, 
                  rgba(0, 0, 0, 1) 240deg, 
                  rgba(168, 85, 247, 0.8) 360deg)`,
                animation: `cosmic-whirl ${Math.random() * 10 + 8}s linear infinite`,
                animationDelay: Math.random() * 5 + 's'
              }}
            />
          ))}
        </div>
        
        {/* Bright cosmic phenomena */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={`phenomena-${i}`}
              className="absolute text-yellow-100 opacity-95"
              style={{
                top: Math.random() * 85 + 5 + '%',
                left: Math.random() * 85 + 5 + '%',
                fontSize: Math.random() * 16 + 12 + 'px',
                animation: `cosmic-glow ${Math.random() * 6 + 3}s ease-in-out infinite alternate`,
                animationDelay: Math.random() * 5 + 's',
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))'
              }}
            >
              {['⭐', '✨', '🌟', '💫', '🔆', '💥'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
        
        {/* Master nebula overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from 45deg at 80% 80%, 
                rgba(0, 0, 0, 1) 0deg, 
                rgba(75, 0, 130, 1) 60deg, 
                rgba(168, 85, 247, 0.9) 120deg,
                rgba(25, 25, 112, 1) 180deg, 
                rgba(0, 0, 0, 1) 240deg,
                rgba(75, 0, 130, 1) 300deg,
                rgba(0, 0, 0, 1) 360deg
              )
            `,
            animation: 'master-nebula 15s linear infinite',
            borderRadius: '70% 0 70% 0'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes pulse-coverage {
          0% { 
            opacity: 0.9;
            transform: scale(1);
          }
          100% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes cosmic-drift {
          0% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-20px) translateX(-10px) scale(1.4) rotate(180deg);
            opacity: 1;
          }
          100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(360deg);
            opacity: 0.8;
          }
        }
        
        @keyframes cosmic-whirl {
          0% { 
            transform: rotate(0deg) scale(1);
          }
          50% { 
            transform: rotate(180deg) scale(1.2);
          }
          100% { 
            transform: rotate(360deg) scale(1);
          }
        }
        
        @keyframes master-nebula {
          0% { 
            transform: rotate(0deg) scale(1);
            opacity: 0.95;
          }
          33% { 
            transform: rotate(120deg) scale(1.1);
            opacity: 1;
          }
          66% { 
            transform: rotate(240deg) scale(0.95);
            opacity: 0.98;
          }
          100% { 
            transform: rotate(360deg) scale(1);
            opacity: 0.95;
          }
        }
        
        @keyframes cosmic-glow {
          0% { 
            opacity: 0.6;
            transform: scale(0.8) rotate(0deg);
            filter: brightness(1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
          }
          50% { 
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
            filter: brightness(1.8) drop-shadow(0 0 16px rgba(255, 255, 255, 1));
          }
          100% { 
            opacity: 0.6;
            transform: scale(0.8) rotate(360deg);
            filter: brightness(1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
          }
        }
      `}</style>
    </>
  );
};

export default SplineModel;
