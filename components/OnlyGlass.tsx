"use client";

import React, { useRef } from "react";
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

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]}>
      <primitive object={gltf.scene} scale={0.8} />
    </group>
  );
}

const OnlyGlass: React.FC = () => {
  const glassesRef = useRef<THREE.Group | null>(null);
  const model = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url('/images/backgroundd.avif')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen flex flex-col justify-center items-center place-content-center overflow-hidden"
      >
        {/* Content */}
        <div className="relative z-10 w-8/12 mx-auto">
          {/* 3D Model */}
          <div className="flex items-center">
            <div
              ref={frameContainerRef}
              className="w-full relative flex justify-center items-center will-change-transform h-screen"
            >
              <motion.div
                className="relative origin-center w-full h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Canvas
                  ref={model}
                  className="w-full h-full"
                  camera={{ position: [-4, 0, 3], fov: 45 }}
                  style={{ width: "100%", height: "100%" }}
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

export default OnlyGlass;
