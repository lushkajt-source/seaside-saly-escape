import { useState } from "react";
import { ArrowRight } from "lucide-react";
import restaurantImg from "@/assets/restaurant-saly.jpg";
import restaurantDishImg from "@/assets/restaurant-dish.jpg";
import restaurantInteriorImg from "@/assets/restaurant-interior.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import RestaurantBookingForm from "@/components/RestaurantBookingForm";

const menuHighlights = [
  { category: "Starters", items: ["Adriatic Oysters", "Grilled Octopus", "Burrata & Heirloom Tomato"] },
  { category: "Mains", items: ["Whole Grilled Sea Bass", "Lobster Risotto", "Lamb Rack with Herbs"] },
  { category: "Desserts", items: ["Crème Brûlée", "Tiramisu", "Panna Cotta with Berries"] },
];

const Restaurant = () => {
  const [booking, setBooking] = useState(false);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <img
          src={restaurantImg}
          alt="Saly Restaurant seaside terrace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
        <div className="container relative z-10 pb-20 md:pb-28">
          <div className="max-w-lg">
            <p
              className="font-body text-[11px] tracking-[0.5em] uppercase text-white/50 mb-5 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Dining
            </p>
            <h1
              className="font-display text-5xl md:text-7xl text-white font-light leading-[0.95] mb-4 animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              Saly Restaurant
            </h1>
            <p
              className="font-display text-lg md:text-xl text-white/60 italic font-light mb-8 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              Mediterranean dining by the Adriatic
            </p>
            <div className="animate-fade-up" style={{ animationDelay: "0.55s" }}>
              <button
                onClick={() => setBooking(true)}
                className="bg-white/15 text-white border border-white/30 px-10 py-4 rounded-full text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/25 active:scale-[0.97]"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-28 md:py-36 bg-grain">
        <div className="container text-center max-w-xl">
          <ScrollReveal>
            <div className="gold-line mx-auto mb-8" />
            <h2 className="font-display text-3xl md:text-5xl font-light mb-8 leading-[1.1] italic">
              A Taste of the Adriatic
            </h2>
            <p className="text-muted-foreground leading-[2] text-[15px] font-light">
              Fresh seafood pulled from the morning catch, locally sourced produce,
              and time-honoured Mediterranean recipes — served on our seaside terrace
              as the sun sets over Durrës.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ScrollReveal direction="left">
              <div className="relative group">
                <div className="img-overlay aspect-[4/3] rounded-xl overflow-hidden">
                  <img src={restaurantDishImg} alt="Signature seafood dish" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute bottom-6 left-6 z-10">
                  <p className="font-body text-[11px] tracking-[0.3em] uppercase text-white/60 mb-1">Signature</p>
                  <h3 className="font-display text-2xl md:text-3xl text-white font-light">Fresh Seafood Daily</h3>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative group">
                <div className="img-overlay aspect-[4/3] rounded-xl overflow-hidden">
                  <img src={restaurantInteriorImg} alt="Restaurant interior" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute bottom-6 left-6 z-10">
                  <p className="font-body text-[11px] tracking-[0.3em] uppercase text-white/60 mb-1">Ambiance</p>
                  <h3 className="font-display text-2xl md:text-3xl text-white font-light">Intimate & Elegant</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── MENU HIGHLIGHTS ── */}
      <section className="py-28 md:py-36 bg-secondary bg-grain">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">The Menu</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-[1.1]">
                Curated Selections
              </h2>
              <div className="premium-divider" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {menuHighlights.map((section, i) => (
              <ScrollReveal key={section.category} delay={i * 120}>
                <div className="text-center">
                  <h3 className="font-display text-2xl font-light mb-6 italic">{section.category}</h3>
                  <div className="gold-line mx-auto mb-6" />
                  <ul className="space-y-4">
                    {section.items.map((item) => (
                      <li key={item} className="text-muted-foreground text-[15px] font-light">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="text-center text-muted-foreground/60 text-sm mt-16 italic">
              Menu changes seasonally · Dietary accommodations available upon request
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── INFO ── */}
      <section className="py-28 md:py-36 bg-background">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4">Visit Us</p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6 leading-[1.1]">
                Hours & Details
              </h2>
              <div className="premium-divider" />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div>
                <h4 className="font-display text-lg mb-3">Breakfast</h4>
                <p className="text-muted-foreground text-sm font-light">7:00 – 10:30</p>
              </div>
              <div>
                <h4 className="font-display text-lg mb-3">Lunch</h4>
                <p className="text-muted-foreground text-sm font-light">12:00 – 15:00</p>
              </div>
              <div>
                <h4 className="font-display text-lg mb-3">Dinner</h4>
                <p className="text-muted-foreground text-sm font-light">18:30 – 23:00</p>
              </div>
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
              Reserve Your Table
            </h2>
            <p className="text-muted-foreground leading-[1.9] text-[15px] font-light mb-12">
              An unforgettable evening awaits — dine under the stars on the Albanian coast.
            </p>
            <button
              onClick={() => setBooking(true)}
              className="bg-foreground text-background px-10 py-4 rounded-full text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:bg-foreground/90 active:scale-[0.97]"
            >
              Reserve Now
            </button>
          </ScrollReveal>
        </div>
      </section>

      <RestaurantBookingForm open={booking} onClose={() => setBooking(false)} />
    </>
  );
};

export default Restaurant;
