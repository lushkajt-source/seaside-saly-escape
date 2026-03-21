import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/rooms", label: "Rooms" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-premium py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-primary leading-none">
            Hotel Saly
          </span>
          <span className={`font-body text-[10px] tracking-[0.3em] uppercase ${scrolled ? "text-muted-foreground" : "text-foreground/50"}`}>
            Saly Portudal · Senegal
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-body text-[13px] font-medium tracking-[0.12em] uppercase transition-all duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:bg-primary after:transition-all after:duration-300 ${
                location.pathname === l.to
                  ? "text-primary after:w-full"
                  : `${scrolled ? "text-foreground/70" : "text-foreground/60"} hover:text-primary after:w-0 hover:after:w-full`
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground px-7 py-2.5 rounded-full text-[13px] font-semibold tracking-[0.12em] uppercase transition-all duration-200 hover:shadow-glow hover:scale-[1.02] active:scale-[0.97]"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card/98 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="container py-6 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`font-body text-base py-3 px-4 rounded-xl transition-all duration-200 ${
                  location.pathname === l.to ? "text-primary bg-ocean-light font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-6 py-3.5 rounded-full text-center font-semibold tracking-[0.1em] uppercase mt-4"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
