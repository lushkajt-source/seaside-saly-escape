import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-hotel.jpg";
import singleImg from "@/assets/room-single.jpg";
import doubleImg from "@/assets/room-double.jpg";
import suiteImg from "@/assets/room-suite.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import BookingForm from "@/components/BookingForm";

const rooms = [
  { name: "Single Room", price: "$65", img: singleImg, features: ["WiFi", "AC", "Garden View"] },
  { name: "Double Room", price: "$110", img: doubleImg, features: ["WiFi", "AC", "Sea View"] },
  { name: "Suite", price: "$195", img: suiteImg, features: ["WiFi", "AC", "Panoramic View", "Living Area"] },
];

const testimonials = [
  { name: "Marie Laurent", location: "Paris, France", text: "An absolutely magical stay. The sound of the waves, the warm staff — we felt truly at home. This is the kind of place you dream about long after you leave.", rating: 5 },
  { name: "Ahmed Keita", location: "Dakar, Senegal", text: "Perfect location, spotless rooms, and the restaurant serves the freshest seafood I've ever had. A hidden gem on the Petite Côte.", rating: 5 },
  { name: "Claire Dubois", location: "Brussels, Belgium", text: "We booked the suite for our anniversary and it exceeded every expectation. The sunset views from the balcony were absolutely breathtaking.", rating: 5 },
];

const Index = () => {
  const [booking, setBooking] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-end">
        <img src={heroImg} alt="Hotel Saly beachfront at golden hour" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="container relative z-10 pb-20 md:pb-28 pt-40">
          <div className="max-w-2xl">
            <p className="font-body text-[11px] tracking-[0.4em] uppercase text-background/60 mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Saly Portudal · Senegal
            </p>
            <h1
              className="font-display text-5xl md:text-7xl text-background leading-[1.05] mb-6 text-balance animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Your Relaxing Escape by the Sea
            </h1>
            <p
              className="text-background/75 text-lg md:text-xl mb-10 max-w-lg font-light leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              Discover serenity on the sun-kissed shores of Saly. Where comfort meets the gentle ocean breeze.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <Button variant="warm" size="xl" onClick={() => setBooking(true)}>
                Book Your Stay
              </Button>
              <Link to="/rooms">
                <Button variant="outline" size="xl" className="border-background/30 text-background hover:bg-background/10 hover:border-background/50">
                  Explore Rooms
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-28 md:py-36 bg-grain">
        <div className="container text-center max-w-2xl">
          <ScrollReveal>
            <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">Welcome</p>
            <h2 className="font-display text-4xl md:text-5xl mb-5 leading-[1.1]">A Coastal Haven</h2>
            <div className="premium-divider mb-8" />
            <p className="text-muted-foreground leading-[1.8] text-base">
              Tucked along the golden coastline of Senegal, Hotel Saly offers a peaceful retreat 
              where the rhythm of the ocean sets the pace. With thoughtfully designed rooms, 
              warm hospitality, and steps-to-the-beach convenience, every stay feels like coming home.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-28 md:py-36 bg-sand">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">Accommodations</p>
              <h2 className="font-display text-4xl md:text-5xl mb-5 leading-[1.1]">Our Rooms</h2>
              <div className="premium-divider mb-6" />
              <p className="text-muted-foreground max-w-md mx-auto">
                Each room is your personal seaside sanctuary — designed for restful comfort with modern amenities.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <ScrollReveal key={room.name} delay={i * 100}>
                <div className="group bg-card rounded-2xl overflow-hidden shadow-premium hover-lift">
                  <div className="img-overlay aspect-[4/3]">
                    <img
                      src={room.img}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="bg-background/90 backdrop-blur-sm text-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                        From {room.price}/night
                      </span>
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-2xl mb-3">{room.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.features.map((f) => (
                        <span key={f} className="text-xs font-medium bg-ocean-light text-ocean-dark px-3 py-1.5 rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                    <Link to="/rooms">
                      <Button variant="default" className="w-full">
                        View Details
                        <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 md:py-36 bg-grain">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">Testimonials</p>
              <h2 className="font-display text-4xl md:text-5xl mb-5 leading-[1.1]">Guest Experiences</h2>
              <div className="premium-divider" />
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 100}>
                <div className="bg-card p-8 md:p-10 rounded-2xl shadow-premium hover-lift h-full flex flex-col">
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-warm text-warm" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-[1.8] mb-6 flex-1 italic">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-foreground/65" />
        <div className="container relative z-10 text-center">
          <ScrollReveal>
            <p className="font-body text-[11px] tracking-[0.4em] uppercase text-background/50 mb-4">Ready?</p>
            <h2 className="font-display text-4xl md:text-5xl text-background mb-5 leading-[1.1] text-balance">
              Start Planning Your Escape
            </h2>
            <div className="w-12 h-[2px] bg-warm mx-auto mb-8" />
            <p className="text-background/70 max-w-md mx-auto mb-10 leading-relaxed">
              Whether you seek adventure or tranquility, Hotel Saly is your gateway to the perfect seaside holiday.
            </p>
            <Button variant="warm" size="xl" onClick={() => setBooking(true)}>
              Reserve Your Room
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <BookingForm open={booking} onClose={() => setBooking(false)} />
    </>
  );
};

export default Index;
