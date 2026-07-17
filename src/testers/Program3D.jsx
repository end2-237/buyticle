import { Suspense, useRef, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

/* Graceful error boundary — a model load failure must never crash the page */
class Boundary extends Component {
  constructor(p) { super(p); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? null : this.props.children; }
}

function Model({ url }) {
  const ref = useRef();
  const { scene } = useGLTF(url);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.18; });
  return <primitive ref={ref} object={scene} scale={2.4} position={[0, -0.4, 0]} />;
}

export default function Program3D({ url = "/model/3d_router.glb", className = "", opacity = 0.5 }) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ opacity }} aria-hidden="true">
      <Boundary>
        <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={1.1} />
          <directionalLight position={[4, 6, 4]} intensity={1.4} />
          <directionalLight position={[-5, -2, -3]} intensity={0.5} color="#FF4500" />
          <Suspense fallback={null}>
            <Model url={url} />
          </Suspense>
        </Canvas>
      </Boundary>
    </div>
  );
}
