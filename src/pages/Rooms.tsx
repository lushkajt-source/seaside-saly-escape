import { useState } from "react";
import { Wifi, Wind, Eye, Tv, Coffee, Bath, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import singleImg from "@/assets/room-single.jpg";
import doubleImg from "@/assets/room-double.jpg";
import suiteImg from "@/assets/room-suite.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import BookingForm from "@/components/BookingForm";

const rooms = [
  {
    name: "Single Room",
    price: "$65",
    img: singleImg,
    desc: "A cozy retreat with everything you need for a restful night. Perfect for solo travelers seeking comfort and simplicity by the sea.",
    features: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "Air Conditioning" },
      { icon: Tv, label: "Flat Screen TV" },
      { icon: Coffee, label: "Tea & Coffee" },
    ],
  },
  {
    name: "Double Room",
    price: "$110",
    img: doubleImg,
    desc: "Spacious and bright with stunning sea views from your private balcony. Ideal for couples or those wanting a little extra room to breathe.",
    features: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "Air Conditioning" },
      { icon: Eye, label: "Sea View" },
      { icon: Tv, label: "Flat Screen TV" },
      { icon: Coffee, label: "Minibar" },
    ],
  },
  {
    name: "Suite",
    price: "$195",
    img: suiteImg,
    desc: "Our finest accommodation featuring a separate living area, panoramic ocean views, and premium amenities for an unforgettable stay.",
    features: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "Air Conditioning" },
      { icon: Eye, label: "Panoramic View" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Full Minibar" },
      { icon: Bath, label: "Luxury Bath" },
    ],
  },
];

const Rooms = () => {
  const [booking, setBooking] = useState<string | null>(null);

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 bg-sand bg-grain">
        <div className="container text-center">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4 animate-fade-up">Accommodations</p>
          <h1 className="font-display text-5xl md:text-6xl mb-5 leading-[1.05] animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Our Rooms
          </h1>
          <div className="premium-divider mb-6" />
          <p className="text-muted-foreground max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            From comfortable singles to luxurious suites, every room is your personal seaside sanctuary.
          </p>
        </div>
      </section>

      {/* Room cards */}
      <section className="py-24 md:py-32">
        <div className="container flex flex-col gap-28">
          {rooms.map((room, i) => (
            <ScrollReveal key={room.name}>
              <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center`}>
                <div className={`img-overlay rounded-2xl overflow-hidden shadow-premium-lg ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <img src={room.img} alt={room.name} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                  <div className="absolute bottom-5 left-5 z-10">
                    <span className="bg-background/90 backdrop-blur-sm text-foreground font-semibold px-4 py-2 rounded-full text-sm">
                      From {room.price}/night
                    </span>
                  </div>
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                    {i === 0 ? "Comfort" : i === 1 ? "Elegance" : "Luxury"}
                  </p>
                  <h2 className="font-display text-4xl mb-3 leading-[1.1]">{room.name}</h2>
                  <div className="w-8 h-[2px] bg-warm mb-6" />
                  <p className="text-muted-foreground leading-[1.8] mb-8">{room.desc}</p>
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {room.features.map((f) => (
                      <div key={f.label} className="flex items-center gap-3 text-sm group">
                        <div className="w-9 h-9 rounded-full bg-ocean-light flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <f.icon size={15} />
                        </div>
                        <span className="text-foreground/80">{f.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="premium" size="lg" onClick={() => setBooking(room.name)}>
                      Book Now
                      <ArrowRight size={14} />
                    </Button>
                    <a
                      href={`https://wa.me/221339571234?text=${encodeURIComponent(`Hi, I'm interested in the ${room.name} at Hotel Saly.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="lg" className="gap-2 border-green-500/30 text-green-700 hover:bg-green-50">
                        <MessageCircle size={15} />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <BookingForm open={!!booking} onClose={() => setBooking(null)} roomType={booking || undefined} />
    </>
  );
};

export default Rooms;
