import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
// Camera controller for smooth fly-to inside Canvas (to use R3F hooks)
function CameraController({
  cameraRef,
  selectedPos,
}: {
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  selectedPos: [number, number, number] | null;
}) {
  const defaultCameraPos = new THREE.Vector3(0, 0, 7);

  useFrame(() => {
    if (!cameraRef.current) return;
    const targetPos = selectedPos
      ? new THREE.Vector3(selectedPos[0] * 1.9, selectedPos[1] * 1.9, selectedPos[2] + 1.9)
      : defaultCameraPos;
    cameraRef.current.position.lerp(targetPos, 0.05);
    cameraRef.current.lookAt(0, 0, 0);
  });

  return null;
}
import { OrbitControls, Sphere, Stars, Html, useTexture, Line } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getNeoWs } from '../services/api';
import type { NeoObject } from '../services/api';

// Rotating Earth component with texture
function RotatingEarth({ rotate }: { rotate: boolean }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/textures/earth_daymap.jpg'); // ensure texture exists in public/textures

  useFrame(() => {
    if (rotate && earthRef.current) {
      earthRef.current.rotation.y += 0.003;
    }
  });
  return (
    <Sphere ref={earthRef} args={[1, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
}

// Single asteroid with orbit animation, hover tooltip, entrance animation, texture, and selection
function OrbitingAsteroid({
  obj,
  index,
  rotate,
  selectedId,
  onSelect,
}: {
  obj: NeoObject;
  index: number;
  rotate: boolean;
  selectedId: string | null;
  onSelect: (id: string, position: [number, number, number]) => void;
}) {
  const asteroidRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const texture = useTexture('/textures/asteroid.jpg');

  // Trigger entrance animation once mounted (staggered per index)
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), index * 50);
    return () => clearTimeout(timeout);
  }, [index]);

  // Orbit parameters
  const radius = 2 + (index % 10) * 0.3;
  const speed = 0.2 + (index % 5) * 0.05;
  const offset = index * 0.3;
  const z = (index % 5) * 0.2 - 0.5;

  const pos = useRef<[number, number, number]>([0, 0, 0]);

  useFrame(({ clock }) => {
    if (!asteroidRef.current) return;
    const t = clock.getElapsedTime();
    const angle = rotate ? t * speed + offset : offset;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    asteroidRef.current.position.set(x, y, z);
    pos.current = [x, y, z];
    if (rotate) asteroidRef.current.rotation.y += 0.01;
  });

  const diameter = Math.round(obj.estimated_diameter_m);
  const isSelected = selectedId === obj.id;
  const scale = visible ? (isSelected ? 2 : hovered ? 1.5 : 1) : 0;

  return (
    <group>
      <Sphere
        ref={asteroidRef}
        args={[0.05 + Math.min(diameter / 200, 0.2), 16, 16]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(obj.id, pos.current)}
        scale={scale}
      >
        <meshStandardMaterial
          map={texture}
          color={obj.is_potentially_hazardous ? 'red' : 'white'}
          emissive={isSelected ? 'yellow' : 'black'}
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
        {hovered && (
          <Html
            distanceFactor={10}
            style={{
              pointerEvents: 'none',
              color: 'white',
              background: 'rgba(0,0,0,0.5)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
            }}
          >
            <div>{obj.name}</div>
            <div>{diameter} m</div>
            {obj.is_potentially_hazardous && <div>⚠ Hazardous</div>}
          </Html>
        )}
      </Sphere>

      {/* Orbit highlight if selected */}
      {isSelected && (
        <Line
          points={Array.from({ length: 64 }, (_, i) => {
            const theta = (i / 64) * 2 * Math.PI;
            return [Math.cos(theta) * radius, Math.sin(theta) * radius, z];
          })}
          color="yellow"
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      )}
    </group>
  );
}

// Asteroids from data
function Asteroids({
  data,
  rotate,
  selectedId,
  onSelect,
}: {
  data: NeoObject[];
  rotate: boolean;
  selectedId: string | null;
  onSelect: (id: string, position: [number, number, number]) => void;
}) {
  return (
    <>
      {data.map((obj, i) => (
        <OrbitingAsteroid
          key={obj.id}
          obj={obj}
          index={i}
          rotate={rotate}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

export default function NeoWs3D() {
  const { data, isLoading, isError } = useQuery<NeoObject[]>({
    queryKey: ['neows-3d'],
    queryFn: () => getNeoWs(),
    retry: 0,
  });

  const [showHazardousOnly, setShowHazardousOnly] = useState(false);
  const [rotate, setRotate] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPos, setSelectedPos] = useState<[number, number, number] | null>(null);

  // Camera ref for direct manipulation
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const filteredData =
    !data || showHazardousOnly
      ? data?.filter((d: NeoObject) => d.is_potentially_hazardous) || []
      : data || [];

  const selectedObject = data?.find((d: NeoObject) => d.id === selectedId) || null;

  const handleSelect = (id: string, position: [number, number, number]) => {
    setSelectedId(id);
    setSelectedPos(position);
  };

  return (
    <motion.div
      className="w-full h-[85vh] bg-black rounded-lg overflow-hidden shadow-lg flex flex-col relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Controls */}
      <div className="flex gap-4 p-2 bg-gray-900 text-white text-sm z-10">
        <button
          onClick={() => setShowHazardousOnly((v) => !v)}
          className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          {showHazardousOnly ? 'Show All' : 'Show Hazardous Only'}
        </button>
        <button
          onClick={() => setRotate((v) => !v)}
          className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 transition"
        >
          {rotate ? 'Pause Rotation' : 'Resume Rotation'}
        </button>
      </div>

      <div className="flex-1">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          onCreated={({ camera }) => {
            cameraRef.current = camera as THREE.PerspectiveCamera;
          }}
        >
          <CameraController cameraRef={cameraRef} selectedPos={selectedPos} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <RotatingEarth rotate={rotate} />
            {!isLoading && !isError && filteredData.length > 0 ? (
              <Asteroids
                data={filteredData.slice(0, 50)}
                rotate={rotate}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            ) : null}
            <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade />
            <OrbitControls enableZoom={true} />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom details panel */}
      {selectedObject && (
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gray-900/80 text-white p-4 flex justify-between items-center text-sm backdrop-blur-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
        >
          <div>
            <div className="font-bold text-lg">{selectedObject.name}</div>
            <div>Diameter: {Math.round(selectedObject.estimated_diameter_m)} m</div>
            {selectedObject.is_potentially_hazardous && <div className="text-red-400">⚠ Hazardous</div>}
            {selectedObject.close_approach_date && (
              <div>Next Close Approach: {selectedObject.close_approach_date}</div>
            )}
          </div>
          <button
            onClick={() => {
              setSelectedId(null);
              setSelectedPos(null);
            }}
            className="px-3 py-1 bg-yellow-600 rounded hover:bg-yellow-700 transition"
          >
            Clear Selection
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}