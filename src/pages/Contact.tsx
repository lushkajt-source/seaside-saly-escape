import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="pt-32 pb-16 bg-sand">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We'd love to hear from you. Reach out for reservations, questions, or just to say hello.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid md:grid-cols-2 gap-16">
          <ScrollReveal>
            <h2 className="font-display text-2xl mb-8">Get in Touch</h2>
            <div className="flex flex-col gap-6">
              <a href="tel:+221339571234" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-ocean-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                  <p className="font-medium">+221 33 957 1234</p>
                </div>
              </a>

              <a href="https://wa.me/221339571234" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-ocean-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">WhatsApp</p>
                  <p className="font-medium">Chat with us</p>
                </div>
              </a>

              <a href="mailto:info@hotelsaly.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-ocean-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                  <p className="font-medium">info@hotelsaly.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-ocean-light flex items-center justify-center text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Address</p>
                  <p className="font-medium">Saly Portudal, Mbour, Senegal</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="font-display text-2xl mb-8">Send a Message</h2>
            {sent ? (
              <div className="bg-ocean-light rounded-lg p-8 text-center">
                <p className="font-display text-xl text-primary mb-2">Message Sent!</p>
                <p className="text-muted-foreground text-sm">Thank you for reaching out. We'll respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input required type="text" placeholder="Your Name" className="border border-input rounded px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                <input required type="email" placeholder="Your Email" className="border border-input rounded px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                <input type="text" placeholder="Subject" className="border border-input rounded px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                <textarea required rows={5} placeholder="Your Message" className="border border-input rounded px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                <button type="submit" className="bg-primary text-primary-foreground py-3 rounded font-semibold tracking-wide uppercase text-sm transition-transform hover:scale-[1.02] active:scale-[0.97]">
                  Send Message
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Map */}
      <section className="pb-0">
        <iframe
          title="Hotel Saly Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15436.98!2d-17.017!3d14.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10cf67e50e8f7%3A0x4b1dbb5c3fc82120!2sSaly%20Portudal!5e0!3m2!1sen!2s!4v1"
          className="w-full h-[400px] border-0"
          loading="lazy"
          allowFullScreen
        />
      </section>
    </>
  );
};

export default Contact;
