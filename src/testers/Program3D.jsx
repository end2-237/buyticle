import { Suspense, useRef, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Bounds } from "@react-three/drei";

/* Graceful error boundary — a model load failure must never crash the page */
class Boundary extends Component {
  constructor(p) { super(p); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? null : this.props.children; }
}

function Model({ url }) {
  const ref = useRef();
  const { scene } = useGLTF(url);
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.35;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
  });
  return <primitive ref={ref} object={scene} />;
}

export default function Program3D({
  url = "/model/logitech_mx_master_3s.glb",
  className = "", opacity = 0.5,
}) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ opacity }} aria-hidden="true">
      <Boundary>
        <Canvas camera={{ position: [3, 1.5, 5], fov: 42 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 6, 4]} intensity={1.7} />
          <directionalLight position={[-5, -1, -3]} intensity={0.8} color="#FF4500" />
          <Suspense fallback={null}>
            <Bounds fit clip margin={1.25}>
              <Model url={url} />
            </Bounds>
          </Suspense>
        </Canvas>
      </Boundary>
    </div>
  );
}
