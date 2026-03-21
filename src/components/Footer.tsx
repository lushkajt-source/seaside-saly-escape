import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="container py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h3 className="font-display text-xl text-background mb-4">Hotel Saly</h3>
        <p className="text-sm leading-relaxed max-w-xs">
          Your relaxing escape by the sea. Nestled along the beautiful coast of Saly, 
          offering comfort, charm, and unforgettable ocean views.
        </p>
      </div>
      <div>
        <h4 className="font-display text-lg text-background mb-4">Quick Links</h4>
        <div className="flex flex-col gap-2 text-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/rooms", label: "Rooms" },
            { to: "/about", label: "About" },
            { to: "/gallery", label: "Gallery" },
            { to: "/contact", label: "Contact" },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-background transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display text-lg text-background mb-4">Contact</h4>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+221 33 957 1234</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>info@hotelsaly.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Saly Portudal, Senegal</span>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-background/10 py-6">
      <p className="text-center text-xs text-background/50">
        © {new Date().getFullYear()} Hotel Saly. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
