"use client";
import { useState, useEffect, useRef } from 'react';

const SplineModel = ({ scene, onLoad, onError }) => {
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
        
        await app.load(scene);
        // Remove all pointer events and interactions for Hero 3D model
        if (scene === 'https://prod.spline.design/tF28HXnwN4ohvRC9/scene.splinecode') {
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = 'none';
            containerRef.current.style.userSelect = 'none';
            containerRef.current.style.touchAction = 'none';
            containerRef.current.tabIndex = -1;
            // Remove all event listeners from the canvas
            // DO NOT replace the canvas node, just remove interaction
          }
        } else {
          // About section: allow zoom and watermark, only prevent page scroll when interacting with the 3D model
          if (app.camera) {
            app.camera.position.z = app.camera.position.z * 0.6; // Zoom in by moving camera closer
          }
          // Prevent page scroll when interacting with the 3D model
          const canvas = containerRef.current;
          if (canvas) {
            const preventWheelScroll = (e) => {
              if (e.target === canvas || canvas.contains(e.target)) {
                e.preventDefault();
                e.stopPropagation();
              }
            };
            const preventTouchScroll = (e) => {
              if (e.target === canvas || canvas.contains(e.target)) {
                e.preventDefault();
                e.stopPropagation();
              }
            };
            canvas.addEventListener('wheel', preventWheelScroll, { passive: false });
            canvas.addEventListener('touchmove', preventTouchScroll, { passive: false });
            canvas._preventWheelScroll = preventWheelScroll;
            canvas._preventTouchScroll = preventTouchScroll;
          }
          // No watermark hiding logic here (reverted to previous state)
        }
        
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
  }, [scene, onLoad, onError]);

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
            <p className="font-medium text-purple-200">
              {scene === 'https://prod.spline.design/tF28HXnwN4ohvRC9/scene.splinecode' ? 'Planet Loading...' : 'Loading Galaxy...'}
            </p>
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
      {/* Remove watermark covering and cosmic effects for Hero scene */}
      {scene !== 'https://prod.spline.design/tF28HXnwN4ohvRC9/scene.splinecode' && (
        <>
          {/* Enhanced watermark covering with cosmic effects */}
          <div className="absolute bottom-0 right-0 w-48 h-32 overflow-hidden">
            {/* Base solid coverage */}
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
            
            {/* Extra coverage */}
            <div 
              className="absolute bottom-0 right-0 w-40 h-24"
              style={{
                background: 'rgba(0, 0, 0, 1)',
                borderRadius: '0 0 60% 0'
              }}
            />
          </div>
        </>
      )}

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
      `}</style>
    </>
  );
};

export default SplineModel;
