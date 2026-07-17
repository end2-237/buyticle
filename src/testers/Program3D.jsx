import { Suspense, useRef, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

/* Graceful error boundary — a model load failure must never crash the page */
class Boundary extends Component {
  constructor(p) { super(p); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? null : this.props.children; }
}

function Model({ url, scale, position }) {
  const ref = useRef();
  const { scene } = useGLTF(url);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.35;
    // gentle floating bob
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });
  return <primitive ref={ref} object={scene} scale={scale} position={position} />;
}

export default function Program3D({
  url = "/model/dji_fpv_by_sdc_-__high_performance_drone.glb",
  className = "", opacity = 0.5, scale = 3, position = [0, 0.2, 0],
}) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ opacity }} aria-hidden="true">
      <Boundary>
        <Canvas camera={{ position: [0, 0.6, 9], fov: 40 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 6, 4]} intensity={1.6} />
          <directionalLight position={[-5, -2, -3]} intensity={0.7} color="#FF4500" />
          <Suspense fallback={null}>
            <Model url={url} scale={scale} position={position} />
          </Suspense>
        </Canvas>
      </Boundary>
    </div>
  );
}
