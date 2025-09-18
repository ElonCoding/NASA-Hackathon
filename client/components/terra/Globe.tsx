import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Suspense, useMemo, useEffect, useState } from "react";
import { TextureLoader, Texture } from "three";

function Earth({ autoRotate, layers }: { autoRotate: boolean; layers?: string[] }) {
  const localColor = "/textures/earthmap.jpg";
  const cdnTexture =
    "https://cdn.builder.io/api/v1/image/assets%2Fc89b2bcccff34daeac7e499342800fef%2F82d7d9f733b44b269c364136c5db28b5?format=webp&width=1600";

  const [colorMap, setColorMap] = useState<Texture | null>(null);
  const [bumpMap, setBumpMap] = useState<Texture | null>(null);

  useEffect(() => {
    let mounted = true;
    const loader = new TextureLoader();
    loader.crossOrigin = "anonymous";

    // Try local color texture first, then CDN fallback
    loader.load(
      localColor,
      (tex) => {
        if (!mounted) return;
        tex.needsUpdate = true;
        setColorMap(tex);
      },
      undefined,
      () => {
        // Local color missing — load CDN texture
        loader.load(
          cdnTexture,
          (tex2) => {
            if (!mounted) return;
            tex2.needsUpdate = true;
            setColorMap(tex2);
          },
          undefined,
          (err) => {
            console.warn("Failed to load earth texture from CDN:", err);
          },
        );
      },
    );

    // Try local bump map first; users can upload a bump map to public/textures/earthbump.jpg
    const localBump = "/textures/earthbump.jpg";
    loader.load(
      localBump,
      (tex) => {
        if (!mounted) return;
        tex.needsUpdate = true;
        setBumpMap(tex);
      },
      undefined,
      () => {
        // Local bump missing — attempt a lightweight fallback hosted bump
        const fallbackBump = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r146/examples/textures/earthbump1k.jpg";
        loader.load(
          fallbackBump,
          (tex2) => {
            if (!mounted) return;
            tex2.needsUpdate = true;
            setBumpMap(tex2);
          },
          undefined,
          (err2) => {
            console.warn("No bump map available, continuing without bump:", err2);
          },
        );
      },
    );

    return () => {
      mounted = false;
    };
  }, [localColor, cdnTexture]);

  const materialProps = useMemo(
    () => ({
      roughness: 1,
      metalness: 0,
    }),
    [],
  );

  return (
    <group>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.8, 64, 64]} />
        {colorMap ? (
          <meshStandardMaterial map={colorMap} bumpMap={bumpMap || undefined} {...materialProps} />
        ) : (
          <meshStandardMaterial color={"#0b2b30"} {...materialProps} />
        )}
      </mesh>

      {/* Simple cloud overlay when selected */}
      {layers && layers.includes("clouds") && (
        <mesh>
          <sphereGeometry args={[1.82, 64, 64]} />
          <meshStandardMaterial color="#e6f7ff" transparent opacity={0.08} depthWrite={false} />
        </mesh>
      )}

      {/* Simple atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.83, 64, 64]} />
        <meshBasicMaterial color="#39d0c1" transparent opacity={0.08} />
      </mesh>
      {/* Soft light */}
      <directionalLight position={[5, 3, 5]} intensity={2.1} color="#fff" />
      <ambientLight intensity={0.25} />
      <OrbitControls enablePan={false} autoRotate={autoRotate} autoRotateSpeed={0.6} maxDistance={8} minDistance={3} />
    </group>
  );
}

export default function Globe({ autoRotate = true }: { autoRotate?: boolean }) {
  return (
    <div className="relative h-[520px] w-full md:h-[600px]">
      <Canvas gl={{ antialias: true }} shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 4.5]} />
          <Stars radius={50} depth={30} count={4000} factor={3} fade speed={1} />
          <Earth autoRotate={autoRotate} />
        </Suspense>
      </Canvas>
    </div>
  );
}
