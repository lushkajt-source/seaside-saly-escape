import heroImg from "@/assets/hero-hotel.jpg";
import lobbyImg from "@/assets/gallery-lobby.jpg";
import beachImg from "@/assets/gallery-beach.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => (
  <>
    {/* Header */}
    <section className="pt-36 pb-20 bg-sand bg-grain">
      <div className="container text-center">
        <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4 animate-fade-up">Our Story</p>
        <h1 className="font-display text-5xl md:text-6xl mb-5 leading-[1.05] animate-fade-up" style={{ animationDelay: "0.1s" }}>
          About Hotel Saly
        </h1>
        <div className="premium-divider mb-6" />
        <p className="text-muted-foreground max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          A story of warmth, ocean breezes, and unforgettable hospitality.
        </p>
      </div>
    </section>

    {/* Story */}
    <section className="py-24 md:py-32">
      <div className="container grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <ScrollReveal direction="left">
          <div className="img-overlay rounded-2xl overflow-hidden shadow-premium-lg">
            <img src={heroImg} alt="Hotel Saly exterior" className="w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150} direction="right">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Since 2005</p>
          <h2 className="font-display text-4xl mb-3 leading-[1.1]">Our Story</h2>
          <div className="w-8 h-[2px] bg-warm mb-6" />
          <div className="space-y-5 text-muted-foreground leading-[1.8]">
            <p>
              Founded on the sun-kissed Adriatic coast of Durrës Plazh in Albania, Hotel Saly was born from a simple dream: 
              to create a place where travelers could truly unwind. What started as a small family guesthouse has grown 
              into a beloved retreat, all while keeping that warm, personal touch.
            </p>
            <p>
              Every detail — from the locally sourced furnishings to the fresh flowers in the lobby — reflects our deep 
              connection to this land and its culture. We believe luxury doesn't have to be extravagant; sometimes it's 
              the quiet moments that matter most.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Atmosphere */}
    <section className="py-24 md:py-32 bg-sand bg-grain">
      <div className="container grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <ScrollReveal delay={150} className="md:order-1">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-3">The Experience</p>
          <h2 className="font-display text-4xl mb-3 leading-[1.1]">A Place of Peace</h2>
          <div className="w-8 h-[2px] bg-warm mb-6" />
          <div className="space-y-5 text-muted-foreground leading-[1.8]">
            <p>
              Step inside Hotel Saly and feel the world slow down. The gentle hush of waves, the shade of swaying 
              palms, the scent of tropical flowers — everything here is designed to restore your sense of calm.
            </p>
            <p>
              Located just steps from the golden beach, our hotel is the perfect base for exploring the vibrant 
              local markets, sampling fresh seafood cuisine, or simply doing nothing at all by the shore.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" className="md:order-2">
          <div className="img-overlay rounded-2xl overflow-hidden shadow-premium-lg">
            <img src={lobbyImg} alt="Hotel Saly lobby" className="w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Location */}
    <section className="py-24 md:py-32">
      <div className="container grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <ScrollReveal direction="left">
          <div className="img-overlay rounded-2xl overflow-hidden shadow-premium-lg">
            <img src={beachImg} alt="Saly beach" className="w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150} direction="right">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Location</p>
          <h2 className="font-display text-4xl mb-3 leading-[1.1]">Steps from the Shore</h2>
          <div className="w-8 h-[2px] bg-warm mb-6" />
          <div className="space-y-5 text-muted-foreground leading-[1.8]">
            <p>
              Durrës Plazh sits on Albania's stunning Adriatic coast, known for its pristine beaches, 
              warm waters, and year-round sunshine. Just 30 minutes from Tirana, it's the country's 
              most beloved seaside destination.
            </p>
            <p>
              Whether you're here for a weekend escape or an extended stay, Hotel Saly will feel like a second home 
              by the time you leave. And the Adriatic? It'll stay with you forever.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </>
);

export default About;
