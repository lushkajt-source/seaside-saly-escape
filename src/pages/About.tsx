import heroImg from "@/assets/hero-hotel.jpg";
import lobbyImg from "@/assets/gallery-lobby.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const About = () => (
  <>
    <section className="pt-32 pb-16 bg-sand">
      <div className="container text-center">
        <h1 className="font-display text-4xl md:text-5xl mb-4">About Hotel Saly</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          A story of warmth, ocean breezes, and unforgettable hospitality.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <img src={heroImg} alt="Hotel Saly exterior" className="rounded-lg w-full aspect-[4/3] object-cover" loading="lazy" />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="font-display text-3xl mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Founded on the sun-drenched coast of Saly Portudal in Senegal, Hotel Saly was born from a simple dream: 
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

    <section className="py-20 bg-sand">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal delay={100} className="md:order-2">
          <img src={lobbyImg} alt="Hotel Saly lobby" className="rounded-lg w-full aspect-[4/3] object-cover" loading="lazy" />
        </ScrollReveal>
        <ScrollReveal className="md:order-1">
          <h2 className="font-display text-3xl mb-6">A Place of Peace</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Step inside Hotel Saly and feel the world slow down. The gentle hush of waves, the shade of swaying 
              palms, the scent of tropical flowers — everything here is designed to restore your sense of calm.
            </p>
            <p>
              Located just steps from the golden beach, our hotel is the perfect base for exploring the vibrant 
              local markets, sampling fresh seafood cuisine, or simply doing nothing at all by the shore.
            </p>
            <p>
              Whether you're here for a weekend escape or an extended stay, Hotel Saly will feel like a second home 
              by the time you leave.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </>
);

export default About;
