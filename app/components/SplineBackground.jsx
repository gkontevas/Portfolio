"use client";

import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 0,
        opacity: 0.2,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <Spline
        scene="https://prod.spline.design/wi8Tux3i5Tk1zou0/scene.splinecode"
        onLoad={() => console.log('🎉 Background Spline scene loaded!')}
        onError={(error) => console.error('❌ Background Spline error:', error)}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
