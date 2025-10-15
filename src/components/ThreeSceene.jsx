import { useRef, useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model({ path }) {
  const group = useRef();
  const { scene } = useGLTF(path);
  const { camera } = useThree();

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z);
    const scale = 1 / maxAxis;
    scene.scale.set(scale, scale, scale);

    const center = box.getCenter(new THREE.Vector3());
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    camera.position.set(1.5, 1.2, 3);
    camera.lookAt(0, 0, 0);
  }, [scene, camera]);

  return <primitive ref={group} object={scene} />;
}

export default function ThreeScene({ path }) {
  return (
    <Canvas shadows camera={{ fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
      <pointLight position={[-5, 2, -3]} intensity={0.4} />
      <hemisphereLight skyColor={"#b1e1ff"} groundColor={"#ffffff"} intensity={0.3} />

      <Model path={path} />

      <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2.2} />
    </Canvas>
  );
}
