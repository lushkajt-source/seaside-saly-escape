import { useState } from "react";
import { Wifi, Wind, Eye, Tv, Coffee, Bath } from "lucide-react";
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
    desc: "A cozy retreat with everything you need for a restful night. Perfect for solo travelers seeking comfort and simplicity.",
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
    desc: "Spacious and bright with stunning sea views from your private balcony. Ideal for couples or those wanting a little extra room.",
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
    desc: "Our finest accommodation with a separate living area, panoramic ocean views, and premium amenities for an unforgettable stay.",
    features: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "Air Conditioning" },
      { icon: Eye, label: "Panoramic Sea View" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Full Minibar" },
      { icon: Bath, label: "Luxury Bathroom" },
    ],
  },
];

const Rooms = () => {
  const [booking, setBooking] = useState<string | null>(null);

  return (
    <>
      <section className="pt-32 pb-16 bg-sand">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">Our Rooms</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From comfortable singles to luxurious suites, every room is your personal seaside sanctuary.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container flex flex-col gap-20">
          {rooms.map((room, i) => (
            <ScrollReveal key={room.name}>
              <div className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                <div className={`overflow-hidden rounded-lg ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <img src={room.img} alt={room.name} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <h2 className="font-display text-3xl mb-2">{room.name}</h2>
                  <p className="text-primary text-2xl font-semibold mb-4">
                    {room.price}<span className="text-muted-foreground text-base font-normal"> / night</span>
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{room.desc}</p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {room.features.map((f) => (
                      <div key={f.label} className="flex items-center gap-2 text-sm text-foreground/80">
                        <f.icon size={16} className="text-primary" />
                        {f.label}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setBooking(room.name)}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded text-sm font-semibold tracking-wide uppercase transition-transform hover:scale-[1.02] active:scale-[0.97]"
                  >
                    Book Now
                  </button>
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
