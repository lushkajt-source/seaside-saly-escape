import { useState } from "react";
import { Wifi, Wind, Eye, Bed, ArrowRight } from "lucide-react";
import deluxeImg from "@/assets/room-deluxe.jpg";
import seaviewImg from "@/assets/room-seaview.jpg";
import signatureImg from "@/assets/room-signature.jpg";
import heroImg from "@/assets/hero-adriatic.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import BookingForm from "@/components/BookingForm";

const rooms = [
  {
    name: "Deluxe Room",
    tag: "Comfort",
    price: "€120",
    img: deluxeImg,
    desc: "A warm, thoughtfully appointed retreat with a private balcony overlooking the hotel gardens. Soft linens, natural light, and quiet luxury in every detail.",
    features: ["King Bed", "Balcony", "Air Conditioning", "Free WiFi"],
  },
  {
    name: "Sea View Room",
    tag: "Elegance",
    price: "€180",
    img: seaviewImg,
    desc: "Wake to the shimmering Adriatic through floor-to-ceiling windows. Designed for those who want the sea as a constant companion — from sunrise to starlight.",
    features: ["King Bed", "Sea-View Balcony", "Air Conditioning", "Free WiFi"],
  },
  {
    name: "Signature Suite",
    tag: "Luxury",
    price: "€320",
    img: signatureImg,
    desc: "Our finest accommodation — a generous living area, private terrace with panoramic views, marble bath, and bespoke furnishings that define understated grandeur.",
    features: ["King Bed", "Private Terrace", "Air Conditioning", "Free WiFi", "Marble Bath", "Living Area"],
  },
];

const featureIcon = (f: string) => {
  if (f.includes("Bed")) return Bed;
  if (f.includes("Balcony") || f.includes("Terrace") || f.includes("View") || f.includes("Living")) return Eye;
  if (f.includes("Air")) return Wind;
  if (f.includes("WiFi")) return Wifi;
  if (f.includes("Bath")) return Bed;
  return Wifi;
};

const Rooms = () => {
  const [booking, setBooking] = useState<string | null>(null);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <img
          src={heroImg}
          alt="Hotel Saly rooms"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 text-center">
          <p
            className="font-body text-[11px] tracking-[0.5em] uppercase text-white/50 mb-5 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Accommodations
          </p>
          <h1
            className="font-display text-5xl md:text-7xl text-white font-light leading-[0.95] animate-fade-up"
            style={{ animationDelay: "0.25s", lineHeight: "0.95" }}
          >
            Rooms & Suites
          </h1>
          <div className="w-10 h-[1px] bg-white/30 mx-auto mt-8 animate-fade-up" style={{ animationDelay: "0.4s" }} />
        </div>
      </section>

      {/* ── ROOM LIST ── */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container flex flex-col gap-32 md:gap-40">
          {rooms.map((room, i) => {
            const reversed = i % 2 === 1;
            return (
              <ScrollReveal key={room.name}>
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                  {/* Image */}
                  <div className={`img-overlay rounded-xl overflow-hidden ${reversed ? "md:order-2" : ""}`}>
                    <img
                      src={room.img}
                      alt={room.name}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className={reversed ? "md:order-1" : ""}>
                    <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                      {room.tag}
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-light mb-3 leading-[1.05]">
                      {room.name}
                    </h2>
                    <div className="gold-line mb-6" />
                    <p className="text-muted-foreground leading-[1.9] text-[15px] font-light mb-8 max-w-md">
                      {room.desc}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-10">
                      {room.features.map((f) => {
                        const Icon = featureIcon(f);
                        return (
                          <div key={f} className="flex items-center gap-3 text-sm group">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground transition-colors duration-200 group-hover:bg-foreground group-hover:text-background">
                              <Icon size={14} />
                            </div>
                            <span className="text-foreground/70 font-light">{f}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-8">
                      <button
                        onClick={() => setBooking(room.name)}
                        className="bg-foreground text-background px-8 py-3.5 rounded-full text-[12px] font-medium tracking-[0.15em] uppercase transition-all duration-200 hover:bg-foreground/90 active:scale-[0.97]"
                      >
                        Book — {room.price}/night
                      </button>
                      <button
                        onClick={() => setBooking(room.name)}
                        className="hidden md:inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-200 group"
                      >
                        View Details
                        <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 md:py-44 bg-secondary bg-grain">
        <div className="container text-center max-w-xl">
          <ScrollReveal>
            <div className="gold-line mx-auto mb-8" />
            <h2 className="font-display text-4xl md:text-6xl font-light mb-6 leading-[1.05] italic">
              Find Your Perfect Stay
            </h2>
            <p className="text-muted-foreground leading-[1.9] text-[15px] font-light mb-12">
              Each room is a private sanctuary — designed for comfort, framed by the Adriatic.
            </p>
            <button
              onClick={() => setBooking("any")}
              className="bg-foreground text-background px-10 py-4 rounded-full text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:bg-foreground/90 active:scale-[0.97]"
            >
              Book Now
            </button>
          </ScrollReveal>
        </div>
      </section>

      <BookingForm open={!!booking} onClose={() => setBooking(null)} roomType={booking && booking !== "any" ? booking : undefined} />
    </>
  );
};

export default Rooms;
