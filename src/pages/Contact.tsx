import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import BookingForm from "@/components/BookingForm";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [booking, setBooking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* Header */}
      <section className="pt-36 pb-20 bg-sand bg-grain">
        <div className="container text-center">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-4 animate-fade-up">Get in Touch</p>
          <h1 className="font-display text-5xl md:text-6xl mb-5 leading-[1.05] animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Contact Us
          </h1>
          <div className="premium-divider mb-6" />
          <p className="text-muted-foreground max-w-lg mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Reach out for reservations, questions, or just to say hello. We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="py-24 md:py-32">
        <div className="container grid md:grid-cols-2 gap-16 md:gap-20">
          <ScrollReveal direction="left">
            <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Reach Us</p>
            <h2 className="font-display text-3xl mb-3 leading-[1.1]">Get in Touch</h2>
            <div className="w-8 h-[2px] bg-warm mb-8" />

            <div className="flex flex-col gap-7">
              {[
                { icon: Phone, label: "Phone", value: "+355 69 452 8003", href: "tel:+355694528003" },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat with us anytime", href: "https://wa.me/355694528003" },
                { icon: Mail, label: "Email", value: "info@hotelsaly.com", href: "mailto:info@hotelsaly.com" },
                { icon: MapPin, label: "Address", value: "Durrës Plazh, Albania · 8F6J+P5", href: undefined },
              ].map((item) => {
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href
                  ? { href: item.href, target: item.href.startsWith("http") ? "_blank" as const : undefined, rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined }
                  : {};
                return (
                  <Wrapper key={item.label} {...wrapperProps} className="flex items-center gap-5 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-ocean-light flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-glow">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">{item.label}</p>
                      <p className="font-medium text-sm">{item.value}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            <div className="mt-10">
              <Button variant="warm" size="lg" onClick={() => setBooking(true)}>
                Make a Reservation
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} direction="right">
            <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-3">Message</p>
            <h2 className="font-display text-3xl mb-3 leading-[1.1]">Send a Message</h2>
            <div className="w-8 h-[2px] bg-warm mb-8" />

            {sent ? (
              <div className="bg-ocean-light rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Send size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-2xl mb-2">Message Sent</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thank you for reaching out. We'll respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {[
                  { name: "name", type: "text", label: "Your Name", placeholder: "Full name", required: true },
                  { name: "email", type: "email", label: "Your Email", placeholder: "your@email.com", required: true },
                  { name: "subject", type: "text", label: "Subject", placeholder: "How can we help?", required: false },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">{field.label}</label>
                    <input
                      required={field.required}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your plans..."
                    className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  />
                </div>
                <Button type="submit" variant="premium" size="lg" className="w-full mt-2">
                  Send Message
                </Button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Map */}
      <section>
        <iframe
          title="Hotel Saly Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d19.45!3d41.32!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350310470fac5db%3A0x40092af10653720!2sDurr%C3%ABs%20Beach!5e0!3m2!1sen!2s!4v1"
          className="w-full h-[450px] border-0"
          loading="lazy"
          allowFullScreen
        />
      </section>

      <BookingForm open={booking} onClose={() => setBooking(false)} />
    </>
  );
};

export default Contact;
