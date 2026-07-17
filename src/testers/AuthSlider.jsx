import { useState, useEffect } from "react";

/* High-quality Unsplash imagery; a branded gradient shows if a photo can't load */
const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1300&q=80",
    grad: "linear-gradient(150deg,#1a1a1a,#3a1a0a)",
    title: "Découvrez votre prochaine mission",
    text: "Testez en avant-première les applications Buyticle et façonnez les produits de demain.",
  },
  {
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1300&q=80",
    grad: "linear-gradient(150deg,#141414,#2a1206)",
    title: "Une communauté qui construit",
    text: "Rejoignez des centaines de testeurs à travers l'Afrique et partagez vos retours.",
  },
  {
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1300&q=80",
    grad: "linear-gradient(150deg,#241008,#0a0a0a)",
    title: "Vos retours, récompensés",
    text: "Chaque bug signalé et chaque idée compte — et vous rapporte des points.",
  },
];

export default function AuthSlider() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden lg:block flex-1 relative rounded-[28px] overflow-hidden bg-[#141414]">
      {SLIDES.map((s, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[1200ms]" style={{ opacity: i === slide ? 1 : 0, background: s.grad }}>
          <img
            src={s.img}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 p-10 text-white">
        <div className="flex gap-2 mb-6">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? "w-8 bg-white" : "w-4 bg-white/40"}`}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <h2 className="text-3xl font-extrabold leading-tight max-w-md">{SLIDES[slide].title}</h2>
        <p className="text-white/70 text-sm mt-3 max-w-md leading-relaxed">{SLIDES[slide].text}</p>
      </div>
    </div>
  );
}
