import { Canvas } from "@react-three/fiber";
import Cube from "../cube";

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

export default Scene;