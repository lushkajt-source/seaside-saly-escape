import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/rooms", label: "Rooms" },
  { to: "/restaurant", label: "Restaurant" },
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
          ? "bg-background/95 backdrop-blur-md shadow-premium py-3"
          : "bg-foreground/30 backdrop-blur-sm py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className={`font-display text-2xl md:text-3xl font-semibold tracking-tight leading-none ${scrolled ? "text-foreground" : "text-white"}`}>
            Hotel Saly
          </span>
          <span className={`font-body text-[10px] tracking-[0.3em] uppercase ${scrolled ? "text-muted-foreground" : "text-white/50"}`}>
            Durrës · Albania
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-body text-[12px] font-medium tracking-[0.15em] uppercase transition-all duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:transition-all after:duration-300 ${
                location.pathname === l.to
                  ? `${scrolled ? "text-foreground" : "text-white"} after:w-full after:bg-current`
                  : `${scrolled ? "text-foreground/60" : "text-white/70"} hover:${scrolled ? "text-foreground" : "text-white"} after:w-0 hover:after:w-full after:bg-current`
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={`px-7 py-2.5 rounded-full text-[12px] font-medium tracking-[0.15em] uppercase transition-all duration-200 active:scale-[0.97] ${
              scrolled
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-white/15 text-white border border-white/30 hover:bg-white/25"
            }`}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 ${scrolled ? "text-foreground" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

{/* Mobile menu */}
      {open && (
        <div className={`md:hidden backdrop-blur-md border-t animate-fade-in ${
          scrolled 
            ? "bg-background/98 border-border" 
            : "bg-foreground/80 border-white/20"
        }`}>
          <div className="container py-6 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`font-body text-base py-3 px-4 rounded-xl transition-all duration-200 ${
                  location.pathname === l.to 
                    ? (scrolled ? "text-foreground bg-secondary font-semibold" : "text-white bg-white/20 font-semibold")
                    : (scrolled ? "text-foreground/70 hover:bg-muted" : "text-white/80 hover:bg-white/10")
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`px-6 py-3.5 rounded-full text-center font-medium tracking-[0.1em] uppercase mt-4 transition-all duration-200 ${
                scrolled
                  ? "bg-foreground text-background"
                  : "bg-white text-foreground"
              }`}
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
