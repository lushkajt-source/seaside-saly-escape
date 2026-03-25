import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-adriatic.jpg";
import deluxeImg from "@/assets/room-deluxe.jpg";
import seaviewImg from "@/assets/room-seaview.jpg";
import signatureImg from "@/assets/room-signature.jpg";
import beachImg from "@/assets/experience-beach.jpg";
import sunsetImg from "@/assets/experience-sunset.jpg";
import restaurantImg from "@/assets/restaurant-saly.jpg";
import restaurantDishImg from "@/assets/restaurant-dish.jpg";
import restaurantInteriorImg from "@/assets/restaurant-interior.jpg";
import poolImg from "@/assets/gallery-pool-adriatic.jpg";
import spaImg from "@/assets/gallery-spa-adriatic.jpg";
import aerialImg from "@/assets/gallery-aerial.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import BookingForm from "@/components/BookingForm";
import RestaurantBookingForm from "@/components/RestaurantBookingForm";

const rooms = [
  { name: "Deluxe Room", price: "€120", img: deluxeImg, desc: "Warm elegance with a private balcony" },
  { name: "Sea View Room", price: "€180", img: seaviewImg, desc: "Floor-to-ceiling Adriatic panoramas" },
  { name: "Signature Suite", price: "€320", img: signatureImg, desc: "Living area, terrace & marble bath" },
];

const galleryImages = [
  { src: heroImg, alt: "Hotel exterior", span: "md:col-span-2 md:row-span-2" },
  { src: poolImg, alt: "Infinity pool", span: "" },
  { src: spaImg, alt: "Spa", span: "" },
  { src: beachImg, alt: "Beach", span: "md:col-span-2" },
  { src: aerialImg, alt: "Aerial coast", span: "" },
];

const Index = () => {
  const [booking, setBooking] = useState(false);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Hotel Saly beachfront at golden hour on the Adriatic"
          className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p
            className="font-body text-[11px] tracking-[0.5em] uppercase text-white/50 mb-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Durrës · Albania
          </p>
          <h1
            className="font-display text-5xl sm:text-6xl md:text-8xl text-white font-light leading-[0.95] mb-6 animate-fade-up"
            style={{ animationDelay: "0.4s", lineHeight: "0.95" }}
          >
            Hotel Saly
          </h1>
          <p
            className="font-display text-xl md:text-2xl text-white/80 italic font-light mb-12 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            A Private Escape on the Adriatic
          </p>
          <div className="animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <button
              onClick={() => setBooking(true)}
              className="bg-white/15 text-white border border-white/30 px-10 py-4 rounded-full text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/25 active:scale-[0.97]"
            >
              Book Your Stay
            </button>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-[1px] h-10 bg-white/30" />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-32 md:py-44 bg-grain">
        <div className="container text-center max-w-xl">
          <ScrollReveal>
            <div className="gold-line mx-auto mb-8" />
            <h2 className="font-display text-3xl md:text-5xl font-light mb-8 leading-[1.1] italic">
              Where the sea meets serenity
            </h2>
            <p className="text-muted-foreground leading-[2] text-[15px] font-light">
              Perched on the sun-drenched shores of the Albanian Riviera, Hotel Saly
              is a sanctuary of understated luxury — where the gentle rhythm of the
              Adriatic sets the pace, and every detail is considered with quiet intention.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ROOMS PREVIEW ── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">Accommodations</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-[1.1]">
                Our Rooms
              </h2>
              <div className="premium-divider" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((room, i) => (
              <ScrollReveal key={room.name} delay={i * 120}>
                <div className="group cursor-pointer">
                  <div className="img-overlay aspect-[3/4] rounded-xl overflow-hidden mb-6">
                    <img
                      src={room.img}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-5 left-5 z-10">
                      <span className="bg-background/90 backdrop-blur-sm text-foreground text-[11px] font-medium px-4 py-2 rounded-full tracking-wide">
                        From {room.price}/night
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-light mb-2">{room.name}</h3>
                  <p className="text-muted-foreground text-sm font-light">{room.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-16">
              <Link
                to="/rooms"
                className="inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.15em] uppercase text-foreground transition-all duration-200 group"
              >
                Explore Rooms
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── EXPERIENCES ── */}
      <section className="py-28 md:py-36 bg-secondary">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">Experiences</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-[1.1]">
                Moments to Remember
              </h2>
              <div className="premium-divider" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ScrollReveal direction="left">
              <div className="relative group">
                <div className="img-overlay aspect-[4/3] rounded-xl overflow-hidden">
                  <img src={beachImg} alt="Beach relaxation" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute bottom-6 left-6 z-10">
                  <p className="font-body text-[11px] tracking-[0.3em] uppercase text-white/60 mb-1">Beach & Shore</p>
                  <h3 className="font-display text-2xl md:text-3xl text-white font-light">Private Beach Access</h3>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative group">
                <div className="img-overlay aspect-[4/3] rounded-xl overflow-hidden">
                  <img src={sunsetImg} alt="Sunset terrace" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute bottom-6 left-6 z-10">
                  <p className="font-body text-[11px] tracking-[0.3em] uppercase text-white/60 mb-1">Sunset Ritual</p>
                  <h3 className="font-display text-2xl md:text-3xl text-white font-light">Golden Hour Terrace</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── DINING ── */}
      <section className="relative py-36 md:py-48 overflow-hidden">
        <img src={diningImg} alt="Mediterranean dining" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10">
          <ScrollReveal>
            <div className="max-w-lg">
              <div className="w-10 h-[1px] bg-white/40 mb-8" />
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-white/40 mb-4">Culinary</p>
              <h2 className="font-display text-4xl md:text-6xl text-white font-light leading-[1.05] mb-6">
                Mediterranean dining by the sea
              </h2>
              <p className="text-white/60 leading-[1.9] text-[15px] font-light mb-10">
                Fresh Adriatic seafood, locally sourced produce, and Mediterranean
                tradition — served under the stars on our seaside terrace.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.15em] uppercase text-white/80 hover:text-white transition-all duration-200 group"
              >
                Discover More
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">Gallery</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-[1.1]">
                A Glimpse of Paradise
              </h2>
              <div className="premium-divider" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={img.alt} delay={i * 80} className={img.span}>
                <div className="img-overlay w-full h-full rounded-lg overflow-hidden">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-3 text-[12px] font-medium tracking-[0.15em] uppercase text-foreground transition-all duration-200 group"
              >
                View Full Gallery
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 md:py-44 bg-secondary bg-grain">
        <div className="container text-center max-w-xl">
          <ScrollReveal>
            <div className="gold-line mx-auto mb-8" />
            <h2 className="font-display text-4xl md:text-6xl font-light mb-6 leading-[1.05] italic">
              Reserve Your Escape
            </h2>
            <p className="text-muted-foreground leading-[1.9] text-[15px] font-light mb-12">
              Let the Adriatic breeze welcome you home. Your private seaside
              sanctuary awaits.
            </p>
            <button
              onClick={() => setBooking(true)}
              className="bg-foreground text-background px-10 py-4 rounded-full text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:bg-foreground/90 active:scale-[0.97]"
            >
              Book Now
            </button>
          </ScrollReveal>
        </div>
      </section>

      <BookingForm open={booking} onClose={() => setBooking(false)} />
    </>
  );
};

export default Index;
