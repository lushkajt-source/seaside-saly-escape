import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

import heroImg from "@/assets/hero-hotel.jpg";
import singleImg from "@/assets/room-single.jpg";
import doubleImg from "@/assets/room-double.jpg";
import suiteImg from "@/assets/room-suite.jpg";
import beachImg from "@/assets/gallery-beach.jpg";
import poolImg from "@/assets/gallery-pool.jpg";
import restaurantImg from "@/assets/gallery-restaurant.jpg";
import sunsetImg from "@/assets/gallery-sunset.jpg";
import lobbyImg from "@/assets/gallery-lobby.jpg";
import spaImg from "@/assets/gallery-spa.jpg";

const images = [
  { src: heroImg, alt: "Hotel beachfront exterior", label: "The Hotel" },
  { src: beachImg, alt: "Crystal clear beach", label: "The Beach" },
  { src: poolImg, alt: "Pool area", label: "Pool" },
  { src: singleImg, alt: "Single room", label: "Single Room" },
  { src: doubleImg, alt: "Double room", label: "Double Room" },
  { src: suiteImg, alt: "Suite", label: "Suite" },
  { src: restaurantImg, alt: "Restaurant dining", label: "Restaurant" },
  { src: sunsetImg, alt: "Sunset view", label: "Sunset" },
  { src: lobbyImg, alt: "Hotel lobby", label: "Lobby" },
  { src: spaImg, alt: "Spa & wellness", label: "Spa" },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const navigate = (dir: -1 | 1) => {
    if (lightbox === null) return;
    setLightbox((lightbox + dir + images.length) % images.length);
  };

  // Keyboard navigation & swipe
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightbox((prev) => ((prev ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") setLightbox((prev) => ((prev ?? 0) - 1 + images.length) % images.length);
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 bg-sand bg-grain">
        <div className="container text-center">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4 animate-fade-up">Visual Tour</p>
          <h1 className="font-display text-5xl md:text-6xl mb-5 leading-[1.05] animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Gallery
          </h1>
          <div className="premium-divider mb-6" />
          <p className="text-muted-foreground max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Take a glimpse at the beauty awaiting you at Hotel Saly.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {images.map((img, i) => (
              <ScrollReveal key={i} delay={i * 50} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <button
                  onClick={() => setLightbox(i)}
                  className="img-overlay w-full h-full rounded-xl md:rounded-2xl group relative"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={`w-full h-full object-cover ${i === 0 ? "aspect-[16/10]" : "aspect-square"}`}
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 z-10 text-background/90 text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.label}
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-background/60 hover:text-background transition-colors z-10" aria-label="Close">
            <X size={24} />
          </button>
          <button
            className="absolute left-4 md:left-8 text-background/60 hover:text-background transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            className="absolute right-4 md:right-8 text-background/60 hover:text-background transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            aria-label="Next"
          >
            <ChevronRight size={32} />
          </button>
          <div className="text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl"
            />
            <p className="text-background/50 text-sm mt-4 font-body tracking-wide">
              {images[lightbox].label} — {lightbox + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
