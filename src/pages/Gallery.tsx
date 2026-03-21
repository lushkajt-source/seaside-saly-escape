import { useState } from "react";
import { X } from "lucide-react";
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
  { src: heroImg, alt: "Hotel beachfront exterior" },
  { src: beachImg, alt: "Crystal clear beach" },
  { src: poolImg, alt: "Pool area" },
  { src: singleImg, alt: "Single room" },
  { src: doubleImg, alt: "Double room" },
  { src: suiteImg, alt: "Suite" },
  { src: restaurantImg, alt: "Restaurant dining" },
  { src: sunsetImg, alt: "Sunset view" },
  { src: lobbyImg, alt: "Hotel lobby" },
  { src: spaImg, alt: "Spa & wellness" },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <section className="pt-32 pb-16 bg-sand">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">Gallery</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Take a glimpse at the beauty awaiting you at Hotel Saly.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <ScrollReveal key={i} delay={i * 60} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <button
                  onClick={() => setLightbox(i)}
                  className="w-full h-full overflow-hidden rounded-lg group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-background/80 hover:text-background" aria-label="Close">
            <X size={28} />
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
};

export default Gallery;
