"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Types
interface Slide {
  title: string;
  subtitle: string;
  description: string;
}

interface GlassPosition {
  pos: [number, number, number];
  rot: { x: number; y: number; z: number };
}

interface CliffWelcomeProps {
  className?: string;
}

const CliffWelcome: React.FC<CliffWelcomeProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const glassesRef = useRef<THREE.Group[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const slide: Slide = {
    title: "Welcome",
    subtitle: "To",
    description: "Visinary Eyewear Cliff",
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 0.8, 20);
    pointLight1.position.set(-5, 3, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.6, 20);
    pointLight2.position.set(5, -3, 5);
    scene.add(pointLight2);

    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 50;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Create stylized glasses frames
    const createGlassFrame = (
      x: number,
      y: number,
      z: number,
      rotation: { x: number; y: number; z: number }
    ): THREE.Group => {
      const group = new THREE.Group();

      // Frame geometry
      const frameGeometry = new THREE.RingGeometry(0.8, 1, 32);
      const frameMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x333333,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.9,
      });

      // Left lens
      const leftLens = new THREE.Mesh(frameGeometry, frameMaterial);
      leftLens.position.set(-1.2, 0, 0);
      group.add(leftLens);

      // Right lens
      const rightLens = new THREE.Mesh(frameGeometry, frameMaterial);
      rightLens.position.set(1.2, 0, 0);
      group.add(rightLens);

      // Bridge
      const bridgeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.4);
      const bridgeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x444444,
        metalness: 0.8,
        roughness: 0.2,
      });
      const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);
      bridge.rotation.z = Math.PI / 2;
      bridge.position.set(0, 0, 0);
      group.add(bridge);

      // Glass lenses
      const lensGeometry = new THREE.CircleGeometry(0.9, 32);
      const lensMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.2,
        roughness: 0,
        metalness: 0,
        transmission: 0.9,
        thickness: 0.1,
      });

      const leftGlass = new THREE.Mesh(lensGeometry, lensMaterial);
      leftGlass.position.set(-1.2, 0, 0.01);
      group.add(leftGlass);

      const rightGlass = new THREE.Mesh(lensGeometry, lensMaterial);
      rightGlass.position.set(1.2, 0, 0.01);
      group.add(rightGlass);

      group.position.set(x, y, z);
      group.rotation.set(rotation.x, rotation.y, rotation.z);

      return group;
    };

    // Add multiple floating glasses
    const glassPositions: GlassPosition[] = [
      { pos: [3, 2, -5], rot: { x: 0.2, y: 0.3, z: 0.1 } },
      { pos: [-4, -1, -3], rot: { x: -0.1, y: -0.4, z: 0.2 } },
      { pos: [2, -3, -7], rot: { x: 0.3, y: 0.2, z: -0.1 } },
    ];

    glassPositions.forEach(({ pos, rot }) => {
      const glasses = createGlassFrame(pos[0], pos[1], pos[2], rot);
      scene.add(glasses);
      glassesRef.current.push(glasses);
    });

    // Animation loop
    const animate = (): void => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;
      }

      // Animate glasses
      glassesRef.current.forEach((glasses, index) => {
        glasses.rotation.y += 0.005 * (index + 1);
        glasses.rotation.x += 0.003 * (index + 1);
        glasses.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
      });

      // Camera movement
      camera.position.x = Math.sin(Date.now() * 0.0005) * 2;
      camera.position.y = Math.cos(Date.now() * 0.0003) * 1;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = (): void => {
      if (mountRef.current && cameraRef.current && rendererRef.current) {
        const camera = cameraRef.current;
        const renderer = rendererRef.current;
        camera.aspect =
          mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        );
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, []);

  return (
    <div
      className={`relative w-full h-screen bg-black overflow-hidden ${className}`}
    >
      {/* Three.js Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,20,40,0.3) 0%, rgba(0,0,0,1) 70%)",
        }}
      />

      {/* Loading Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-xl font-light tracking-wider">
              Loading Experience...
            </p>
          </div>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center max-w-4xl px-8">
          {/* Main Title */}
          <div className=" opacity-90">
            <h1
              className="text-8xl font-bold font-ramro"
              style={{
                textShadow: "0 0 30px rgba(255,215,0,0.5)",
                transform: `translateY(${Math.sin(Date.now() * 0.001) * 5}px)`,
              }}
            >
              {slide.title}
            </h1>
            <h2 className="text-4xl md:text-7xl mt-6 text-transparent bg-clip-text bg-gradient-to-r from-[#5a5959] via-[#ffffff] to-[#e7baba] font-light font-ramro tracking-widest ">
              {slide.subtitle}
            </h2>
            <p className="text-7xl font-ramro text-transparent bg-clip-text bg-gradient-to-r from-[#5a5959] via-[#ffffff] to-[#e7baba] mx-auto leading-relaxed">
              {slide.description}
            </p>
          </div>

          {/* Call to Action */}
          {/* <div className="space-y-6 pointer-events-auto">
            <button
              className="group px-8 py-4 bg-gradient-to-r from-[#5a5959] via-[#ffffff] to-[#e7baba] text-black rounded-full font-semibold tracking-wide hover:from-gray-500 hover:to-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
              onClick={() => console.log("Explore Collection clicked")}
            >
              <span className="mr-2">Explore Collection</span>
              <span className="inline-block transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

            <div className="flex justify-center space-x-4">
              <button
                className="px-6 py-3 border  text-white rounded-full hover:border-gray-800 hover:text-gray-200 transition-all duration-300"
                onClick={() => console.log("Virtual Try-On clicked")}
              >
                Virtual Try-On
              </button>
              <button
                className="px-6 py-3 border text-white rounded-full  hover:border-gray-800 hover:text-gray-200 transition-all duration-300"
                onClick={() => console.log("Find Store clicked")}
              >
                Find Store
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CliffWelcome;
