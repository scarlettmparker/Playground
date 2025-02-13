import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

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

export default Cube;