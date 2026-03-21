import { useState } from "react";
import { Link } from "react-router-dom";
import { Wifi, Wind, Eye, Star } from "lucide-react";
import heroImg from "@/assets/hero-hotel.jpg";
import singleImg from "@/assets/room-single.jpg";
import doubleImg from "@/assets/room-double.jpg";
import suiteImg from "@/assets/room-suite.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import BookingForm from "@/components/BookingForm";

const rooms = [
  { name: "Single Room", price: "$65", img: singleImg, features: ["WiFi", "AC", "Garden View"] },
  { name: "Double Room", price: "$110", img: doubleImg, features: ["WiFi", "AC", "Sea View"] },
  { name: "Suite", price: "$195", img: suiteImg, features: ["WiFi", "AC", "Panoramic Sea View", "Living Area"] },
];

const testimonials = [
  { name: "Marie L.", text: "An absolutely magical stay. The sound of the waves, the warm staff — we felt truly at home. Can't wait to return.", rating: 5 },
  { name: "Ahmed K.", text: "Perfect location, spotless rooms, and the restaurant serves the freshest seafood I've ever had. Highly recommended!", rating: 5 },
  { name: "Claire D.", text: "We booked a suite for our anniversary and it exceeded every expectation. The sunset views from the balcony were breathtaking.", rating: 5 },
];

const Index = () => {
  const [booking, setBooking] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <img src={heroImg} alt="Hotel Saly beachfront at golden hour" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="font-display text-4xl md:text-6xl text-background leading-[1.1] mb-6 text-balance">
              Welcome to Hotel Saly — Your Relaxing Escape by the Sea
            </h1>
            <p className="text-background/85 text-lg md:text-xl mb-8 max-w-lg font-light leading-relaxed">
              Discover serenity on the sun-kissed shores of Saly Portudal. Where comfort meets the ocean breeze.
            </p>
            <button
              onClick={() => setBooking(true)}
              className="bg-primary text-primary-foreground px-8 py-4 rounded text-sm font-semibold tracking-widest uppercase transition-transform hover:scale-[1.03] active:scale-[0.97] shadow-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-sand">
        <div className="container text-center max-w-2xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl mb-6">A Coastal Haven</h2>
            <p className="text-muted-foreground leading-relaxed">
              Tucked along the golden coastline of Senegal, Hotel Saly offers a peaceful retreat 
              where the rhythm of the ocean sets the pace. With thoughtfully designed rooms, 
              warm hospitality, and steps-to-the-beach convenience, every stay feels like coming home.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24">
        <div className="container">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl text-center mb-4">Our Rooms</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
              Each room is designed for restful comfort with modern amenities and coastal charm.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <ScrollReveal key={room.name} delay={i * 100}>
                <div className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={room.img}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display text-xl">{room.name}</h3>
                      <span className="text-primary font-semibold">{room.price}<span className="text-muted-foreground text-sm font-normal">/night</span></span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {room.features.map((f) => (
                        <span key={f} className="text-xs bg-ocean-light text-ocean-dark px-2.5 py-1 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                    <Link
                      to="/rooms"
                      className="block text-center bg-primary text-primary-foreground py-2.5 rounded text-sm font-semibold tracking-wide uppercase transition-transform hover:scale-[1.02] active:scale-[0.97]"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-sand">
        <div className="container">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl text-center mb-12">What Our Guests Say</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 80}>
                <div className="bg-card p-8 rounded-lg shadow-sm">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                  <p className="font-semibold text-sm">{t.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <BookingForm open={booking} onClose={() => setBooking(false)} />
    </>
  );
};

export default Index;
