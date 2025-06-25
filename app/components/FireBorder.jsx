"use client";
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { ShaderMaterial, Vector3, Color } from 'three';
import * as THREE from 'three';

// Extend Three.js with custom shader material
extend({ ShaderMaterial });

// More realistic fire vertex shader
const fireVertexShader = `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  // Simplex noise for organic-looking distortion
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vUv = uv;
    
    // Determine if the vertex is on the border
    float edgeDistance = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    float borderMask = smoothstep(0.0, 0.1, edgeDistance) * smoothstep(0.15, 0.05, edgeDistance);

    vec3 newPosition = position;
    if (borderMask > 0.0) {
      // Create a turbulent displacement for a flickering flame shape
      float turbulence = snoise(vec3(position.xy * 4.0, uTime * 1.5));
      float displacement = turbulence * 0.05 * uIntensity * borderMask;
      
      newPosition += normal * displacement;
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// More realistic fire fragment shader
const fireFragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uColor1; // Deepest purple
  uniform vec3 uColor2; // Mid purple
  uniform vec3 uColor3; // Bright purple/violet
  uniform vec3 uColor4; // White-hot center
  varying vec2 vUv;

  // Simplex noise function (same as vertex shader)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  // Fractal Brownian Motion for detailed noise
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0;
    for (int i = 0; i < 4; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    // Constrain effect to a border
    float borderWidth = 0.1;
    float edgeDistance = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float borderMask = smoothstep(0.0, borderWidth, edgeDistance) * smoothstep(borderWidth + 0.05, borderWidth, edgeDistance);

    if (borderMask < 0.01) {
      discard;
    }

    // Animate UVs to make the fire rise and flicker
    vec2 motion = vec2(vUv.x, vUv.y + uTime * 0.4); // Upward motion
    float noise = fbm(vec3(motion * 3.0, uTime * 0.5));
    
    // Add turbulence
    float turbulence = fbm(vec3(motion * 5.0, uTime * 0.8));
    noise = (noise + turbulence) * 0.5;

    // Shape the noise into flames
    float firePattern = 1.0 - smoothstep(0.2, 0.7, noise);
    
    // Combine with the border mask
    float fireIntensity = borderMask * firePattern;

    if (fireIntensity < 0.1) {
      discard;
    }

    // Map intensity to a purple fire color gradient
    vec3 color = mix(uColor1, uColor2, smoothstep(0.1, 0.4, fireIntensity));
    color = mix(color, uColor3, smoothstep(0.3, 0.7, fireIntensity));
    color = mix(color, uColor4, smoothstep(0.6, 0.9, fireIntensity));

    // Final alpha based on intensity
    float alpha = smoothstep(0.0, 0.2, fireIntensity) * uIntensity;

    gl_FragColor = vec4(color, alpha);
  }
`;

function FireBorderMesh({ intensity = 1.0 }) {
  const meshRef = useRef();
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      // Realistic purple fire color gradient
      uColor1: { value: new Color('#48047A') }, // Dark violet (base)
      uColor2: { value: new Color('#9006F9') }, // Electric purple
      uColor3: { value: new Color('#E387FF') }, // Light orchid
      uColor4: { value: new Color('#FFFFFF') }, // White-hot center
    }),
    []
  );

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uIntensity.value = intensity;
    }
  }, [intensity]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[1.0, 1.0, 1]}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={fireVertexShader}
        fragmentShader={fireFragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Simplified particle system for rising sparks/embers
function FireParticles() {
  const pointsRef = useRef();
  const materialRef = useRef();

  const particleCount = 100;
  
  // Store initial positions and random data for each particle
  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 3); // x: lifetime, y: speed, z: horizontal drift

    for (let i = 0; i < particleCount; i++) {
      // Start at the border (mostly bottom)
      positions[i * 3] = (Math.random() - 0.5) * 1.8; // x
      positions[i * 3 + 1] = -0.9 + (Math.random() - 0.5) * 0.2; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1; // z
      
      randoms[i * 3] = 1.0 + Math.random() * 2.0; // Lifetime
      randoms[i * 3 + 1] = 0.3 + Math.random() * 0.5; // Speed
      randoms[i * 3 + 2] = (Math.random() - 0.5) * 0.2; // Drift
    }
    
    return { positions, randoms };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }

    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      const randoms = pointsRef.current.geometry.attributes.random.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const lifetime = randoms[i3];
        const speed = randoms[i3 + 1];
        const drift = randoms[i3 + 2];

        // Simple particle lifecycle
        const progress = (time * speed) % lifetime;
        
        // Move upwards
        positions[i3 + 1] = -0.9 + progress;
        // Apply horizontal drift
        positions[i3] += drift * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-random"
          count={particleCount}
          array={particleData.randoms}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new Color('#E387FF') }, // Bright spark color
        }}
        vertexShader={`
          uniform float uTime;
          attribute vec3 random; // { lifetime, speed, drift }
          varying float vAlpha;
          
          void main() {
            float lifetime = random.x;
            float speed = random.y;
            float progress = mod(uTime * speed, lifetime) / lifetime;
            
            // Fade out at the end of life
            vAlpha = 1.0 - progress;
            vAlpha = pow(vAlpha, 2.0);

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = (1.0 - progress) * 80.0 / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) {
              discard;
            }
            gl_FragColor = vec4(uColor, vAlpha * 0.5);
          }
        `}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

const FireBorder = ({ children, intensity = 1.0, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10">
        {children}
      </div>
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 2], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <FireBorderMesh intensity={intensity} />
          <FireParticles />
        </Canvas>
      </div>
    </div>
  );
};

export default FireBorder;
