import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cube component that follows the mouse.
 * @return Cube component.
 */
const Cube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { camera, gl } = useThree();

  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const intersection = useRef(new THREE.Vector3());

  // store pointer coordinates for canvas
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      setPointer({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl.domElement]);

  useFrame(() => {
    // convert pointer coordinates to normalized coords
    const ndc = new THREE.Vector2(
      (pointer.x / gl.domElement.clientWidth) * 2 - 1,
      -(pointer.y / gl.domElement.clientHeight) * 2 + 1
    );

    // get intersection and update mouse pos
    raycaster.current.setFromCamera(ndc, camera);
    raycaster.current.ray.intersectPlane(plane.current, intersection.current);

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
