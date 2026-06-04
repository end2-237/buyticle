import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import Navigation from "../nav";
import Footer from "../footer";

const services = [
  { num: "01", name: "Développement Web & Mobile", desc: "Applications sur mesure, SaaS, e-commerce, APIs. Nous utilisons les dernières technologies pour construire des produits performants et scalables.", icon: "10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", tag: "Full-stack" },
  { num: "02", name: "Design UI/UX", desc: "Identité visuelle, interfaces, design systèmes et expérience utilisateur. Du branding jusqu'à la maquette finale livrée.", icon: "4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z", tag: "Créatif" },
  { num: "03", name: "Infogérance & Cloud", desc: "Hébergement VPS, maintenance serveurs, monitoring 24/7 et mises à jour de sécurité pour vos applications en production.", icon: "5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2", tag: "DevOps" },
  { num: "04", name: "Commerce Général", desc: "Distribution, logistique, gestion de produits physiques et numériques. Connexion directe à notre réseau de partenaires commerciaux.", icon: "20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", tag: "Commerce" },
  { num: "05", name: "Prestation & Conseil", desc: "Accompagnement stratégique, audit digital, intégration de solutions métier et formation des équipes techniques.", icon: "17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z", tag: "Conseil" },
  { num: "06", name: "Support & Assistance", desc: "Aide technique disponible 7j/7. Une équipe dédiée pour répondre à toutes vos questions et résoudre rapidement vos incidents.", icon: "18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", tag: "Support" },
];

function BBagModel({ scrollY }) {
  const ref = useRef();
  const { scene } = useGLTF("/bbag.glb");

  useFrame(({ clock }) => {
    if (!ref.current) return;
    // Slow idle rotation + scroll-driven Y rotation
    ref.current.rotation.y = clock.getElapsedTime() * 0.18 + scrollY.get() * 0.002;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.08;
    // Float up/down
    ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.12 - 0.2;
    // Scroll-driven scale: shrinks slightly as user scrolls down
    const s = Math.max(0.7, 1.1 - scrollY.get() * 0.0003);
    ref.current.scale.setScalar(s);
  });

  return <primitive ref={ref} object={scene} />;
}

export default function ServicesPage() {
  const containerRef = useRef();
  const { scrollY } = useScroll();

  // Hero parallax
  const heroY = useTransform(scrollY, [0, 600], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  // Canvas drifts right as user scrolls
  const canvasX = useTransform(scrollY, [0, 1200], [0, 120]);

  return (
    <div ref={containerRef} className="bg-[#EDECEA] text-[#0A0A0A] min-h-screen">
      <Navigation />

      {/* ─── Hero with 3D object ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden border-b border-[#0A0A0A]/10">

        {/* 3D Canvas — full background */}
        <motion.div
          style={{ x: canvasX }}
          className="absolute inset-0 pointer-events-none"
        >
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 42 }}
            style={{ background: "transparent" }}
            gl={{ alpha: true, antialias: true }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 5]} intensity={2.2} castShadow />
            <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#FF6030" />
            <pointLight position={[0, -2, 3]} intensity={0.8} color="#FFE234" />
            <Suspense fallback={null}>
              <BBagModel scrollY={scrollY} />
              <ContactShadows position={[0, -1.6, 0]} opacity={0.18} scale={6} blur={2.5} far={4} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </motion.div>

        {/* Gradient overlay so text reads well */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EDECEA] via-[#EDECEA]/80 to-transparent pointer-events-none" />

        {/* Hero text */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 pt-40 pb-32 w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#0A0A0A]/40 font-mono text-[10px] tracking-[0.4em] uppercase mb-8"
          >
            ✦ Buyticle · Services
          </motion.p>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }} animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(52px,10vw,140px)] font-black leading-[0.88] tracking-[-0.03em]"
            >
              L'univers tech
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "100%" }} animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[clamp(52px,10vw,140px)] font-black leading-[0.88] tracking-[-0.03em]"
              style={{ WebkitTextStroke: "2px #0A0A0A", color: "transparent" }}
            >
              de Buyticle
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-[#0A0A0A]/50 text-base max-w-md leading-relaxed"
          >
            Développement, design, cloud et conseil — une équipe pluridisciplinaire
            basée à Douala pour porter vos ambitions digitales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex items-center gap-6 mt-12"
          >
            <a href="/contact"
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#EDECEA] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#FF4500] transition-colors duration-300 group"
            >
              Démarrer un projet
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <span className="text-[#0A0A0A]/30 font-mono text-xs tracking-widest">
              {services.length} offres disponibles
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#0A0A0A]/25 font-mono text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-[#0A0A0A]/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* ─── Services list ─── */}
      <section className="bg-[#E8E5E1] relative overflow-hidden">

        {/* Background 3D canvas — decorative, right side */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none hidden lg:block">
          <Canvas camera={{ position: [0, 0, 5], fov: 38 }} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[3, 5, 3]} intensity={1.5} />
            <Suspense fallback={null}>
              <BBagModel scrollY={scrollY} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-14 divide-y divide-[#0A0A0A]/10 relative z-10">
          {services.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="group grid md:grid-cols-12 gap-6 py-9 hover:bg-[#0A0A0A]/[0.03] -mx-6 px-6 md:-mx-14 md:px-14 transition-colors duration-200 cursor-default"
            >
              <div className="md:col-span-1 flex items-start pt-1">
                <span className="text-[#0A0A0A]/20 font-mono text-[10px]">{s.num}</span>
              </div>
              <div className="md:col-span-1 hidden md:flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0A0A0A]/20 group-hover:text-[#FF4500] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={`M${s.icon}`} />
                </svg>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-bold text-base md:text-xl tracking-tight group-hover:text-[#FF4500] transition-colors duration-300 mb-2">
                  {s.name}
                </h3>
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#0A0A0A]/25 group-hover:text-[#FF4500]/60 transition-colors duration-300">
                  {s.tag}
                </span>
              </div>
              <div className="md:col-span-5 flex items-center">
                <p className="text-[#0A0A0A]/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="md:col-span-1 flex items-center justify-end">
                <a href="/contact"
                  className="opacity-0 group-hover:opacity-100 text-[#0A0A0A]/40 group-hover:text-[#FF4500] group-hover:translate-x-0 -translate-x-2 transition-all duration-300 text-sm font-mono"
                >
                  →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Stats banner ─── */}
      <section className="py-20 border-y border-[#0A0A0A]/10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#0A0A0A]/10">
            {[
              { n: "6+",   label: "Services proposés" },
              { n: "4",    label: "Produits déployés" },
              { n: "2025", label: "Année de création" },
              { n: "DLA",  label: "Douala, Cameroun" },
            ].map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="md:px-10 text-center md:text-left"
              >
                <p className="text-[clamp(36px,5vw,64px)] font-black tracking-tight leading-none">{stat.n}</p>
                <p className="text-[#0A0A0A]/35 text-xs font-mono mt-2 tracking-widest uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-40 px-6 md:px-14 relative overflow-hidden">
        {/* Mini 3D accent */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 opacity-30 pointer-events-none hidden md:block">
          <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 6, 4]} intensity={2} />
            <directionalLight position={[-3, 1, -2]} intensity={0.6} color="#FF4500" />
            <Suspense fallback={null}>
              <BBagModel scrollY={scrollY} />
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[#0A0A0A]/30 font-mono text-[10px] tracking-[0.4em] uppercase mb-6"
          >
            ✦ Prêt à commencer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}
            className="text-[clamp(40px,6vw,80px)] font-black tracking-[-0.03em] leading-none mb-6"
          >
            Travaillons<br />
            <span style={{ WebkitTextStroke: "2px #0A0A0A", color: "transparent" }}>ensemble</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
            className="text-[#0A0A0A]/50 mb-10 text-sm leading-relaxed max-w-md mx-auto"
          >
            Un projet en tête ? Notre équipe est disponible pour discuter de vos besoins et construire la solution adaptée.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }} viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="/contact"
              className="inline-flex items-center gap-3 bg-[#0A0A0A] text-[#EDECEA] px-10 py-4 rounded-full font-semibold text-sm hover:bg-[#FF4500] transition-colors duration-300 group"
            >
              Nous contacter
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <a href="mailto:contact@buyticle.com"
              className="text-[#0A0A0A]/40 hover:text-[#0A0A0A] text-sm font-mono transition-colors duration-200"
            >
              contact@buyticle.com
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
