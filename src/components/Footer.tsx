import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/70">
    <div className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <h3 className="font-display text-3xl text-background mb-2">Hotel Saly</h3>
          <div className="w-10 h-[2px] bg-warm mb-5" />
          <p className="text-sm leading-relaxed max-w-sm">
            Your relaxing escape by the sea. Nestled along the stunning Adriatic coast in Durrës Plazh, Albania, 
            offering comfort, charm, and unforgettable ocean views since 2005.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-3">
          <h4 className="font-body text-xs uppercase tracking-[0.2em] text-background/40 mb-6">Navigate</h4>
          <div className="flex flex-col gap-3 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/rooms", label: "Rooms" },
              { to: "/about", label: "About" },
              { to: "/gallery", label: "Gallery" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-background transition-colors duration-200 w-fit">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <h4 className="font-body text-xs uppercase tracking-[0.2em] text-background/40 mb-6">Contact</h4>
          <div className="flex flex-col gap-4 text-sm">
            <a href="tel:+355694528003" className="flex items-center gap-3 hover:text-background transition-colors">
              <Phone size={15} />
              <span>+355 69 452 8003</span>
            </a>
            <a href="mailto:info@hotelsaly.com" className="flex items-center gap-3 hover:text-background transition-colors">
              <Mail size={15} />
              <span>info@hotelsaly.com</span>
            </a>
            <a
              href="https://www.google.com/maps/dir//hotel+saly+durres/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x134fd92b4911a017:0x178c04e896ffacf7?sa=X&ved=1t:155782&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-background transition-colors"
            >
              <MapPin size={15} />
              <span>Durrës Plazh, Albania</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-background/8">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-xs text-background/30">
          © {new Date().getFullYear()} Hotel Saly. All rights reserved.
        </p>
        <p className="text-xs text-background/30">
          Designed with care for unforgettable stays
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
