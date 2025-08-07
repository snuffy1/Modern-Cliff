"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, MutableRefObject } from "react";
import { GLTF } from "three/examples/jsm/Addons.js";

gsap.registerPlugin(ScrollTrigger);

// ---- MODEL COMPONENT ----
type GlassesModelProps = {
  groupRef: MutableRefObject<THREE.Group | null>;
};

function GlassesModel({ groupRef }: GlassesModelProps) {
  const gltf = useGLTF("/models/eye_glasses.glb") as unknown as GLTF;
  const [chasmaSize, setChasmaSize] = React.useState(0.8);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setChasmaSize(0.5);
    }
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]}>
      <primitive object={gltf.scene} scale={chasmaSize} />
    </group>
  );
}

const Glass: React.FC = () => {
  const glassesRef = useRef<THREE.Group | null>(null);
  const model = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameContainerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(frameContainerRef.current, {
        opacity: 1,
        y: 100,
        scale: 1,
      });

      gsap.set(titleRef.current, {
        opacity: 0,
        y: 50,
      });

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 50,
      });

      // Create timeline for sequential animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          markers: false, // Set to true for debugging
        },
      });

      // Animate 3D model first
      tl.to(frameContainerRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      })
        // Then animate title
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        ) // Start slightly before previous animation ends
        // Finally animate description
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // Optional: Add a separate animation for the 3D model rotation enhancement
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          if (glassesRef.current) {
            const rotation = self.progress * Math.PI * 2;
            gsap.to(glassesRef.current.rotation, {
              y: rotation,
              duration: 0.3,
              ease: "none",
            });
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert(); // Cleanup
    };
  }, []);

  return (
    <div
      className="w-full h-[100vh] overflow-hidden"
      style={{
        backgroundImage: `url('/images/backgroundd.avif')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section
        ref={sectionRef}
        className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden"
      >
        {/* Content */}
        <div className="z-10 w-8/12 mx-auto px-4">
          {/* 3D Model */}
          <div className="flex items-center">
            <div
              ref={frameContainerRef}
              className="w-full flex justify-center items-center will-change-transform h-[500px]"
            >
              <motion.div
                className="origin-center w-full h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Canvas
                  ref={model}
                  className="absolute inset-0 h-screen w-screen -translate-x-[50px] sm:-translate-x-[300px]"
                  camera={{ position: [-4, 0, 3], fov: 45 }}
                  style={{ height: "100vh", width: "100vw" }}
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 3]} intensity={1} />
                  <Suspense fallback={null}>
                    <GlassesModel groupRef={glassesRef} />
                    <Environment preset="sunset" />
                  </Suspense>
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 4}
                  />
                </Canvas>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Glass;
