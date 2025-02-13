import React, { useRef } from "react";
import styles from "./three.module.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cube component that follows the mouse.
 * 
 * @param position Position vector for x, y, and z value of the cube.
 * @return Cube component.
 */
const Cube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { camera, mouse } = useThree();

  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const intersection = useRef(new THREE.Vector3());

  useFrame(() => {
    // compute the intersection point with the plane
    raycaster.current.setFromCamera(mouse, camera);
    raycaster.current.ray.intersectPlane(plane.current, intersection.current);

    // update the cube's position based on the intersection
    if (meshRef.current) {
      meshRef.current.position.set(intersection.current.x, intersection.current.y, 0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

/**
 * Three Scene component. Used for drawing the scene and any components within.
 * @return Three Scene component.
 */
const Scene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        background: "transparent",
      }}
      gl={{ alpha: true }} // transparent background
    >
      <Cube></Cube>
    </Canvas>
  );
};

const Three: React.FC = () => {
  return (
    <>
      <div className={styles.threescene}>
        <Scene />
      </div>
      <div className={styles.background}></div>
    </>
  );
};

export default Three;