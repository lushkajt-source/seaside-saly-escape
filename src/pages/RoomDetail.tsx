import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bed, Eye, Wind, Wifi, Bath, Maximize, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import BookingForm from "@/components/BookingForm";

import roomDetail1 from "@/assets/room-detail-1.jpg";
import roomDetail2 from "@/assets/room-detail-2.jpg";
import roomDetail3 from "@/assets/room-detail-3.jpg";
import roomDetail4 from "@/assets/room-detail-4.jpg";
import deluxeImg from "@/assets/room-deluxe.jpg";
import seaviewImg from "@/assets/room-seaview.jpg";
import signatureImg from "@/assets/room-signature.jpg";

const roomData: Record<string, {
  name: string;
  tagline: string;
  price: string;
  size: string;
  guests: string;
  description: string;
  images: string[];
  amenities: { icon: typeof Bed; label: string }[];
}> = {
  "deluxe-room": {
    name: "Deluxe Room",
    tagline: "Comfort redefined",
    price: "€120",
    size: "35 m²",
    guests: "2 Adults",
    description:
      "A warm, thoughtfully appointed retreat bathed in Adriatic light. Every detail — from the hand-selected linens to the private balcony overlooking the gardens — speaks to quiet, effortless luxury. The kind of room where mornings feel unhurried and evenings stretch into something memorable.",
    images: [deluxeImg, roomDetail1, roomDetail2, roomDetail4],
    amenities: [
      { icon: Bed, label: "King Bed" },
      { icon: Eye, label: "Garden View" },
      { icon: Bath, label: "Private Bathroom" },
      { icon: Wind, label: "Air Conditioning" },
      { icon: Wifi, label: "Complimentary WiFi" },
      { icon: Maximize, label: "35 m² Space" },
    ],
  },
  "sea-view-room": {
    name: "Sea View Room",
    tagline: "The Adriatic, always present",
    price: "€180",
    size: "42 m²",
    guests: "2 Adults",
    description:
      "Wake to the shimmering Adriatic through floor-to-ceiling windows. Designed for those who want the sea as a constant companion — from sunrise coffee on your private balcony to starlight reflected on still waters. A room that feels like a gentle exhale.",
    images: [seaviewImg, roomDetail3, roomDetail1, roomDetail2],
    amenities: [
      { icon: Bed, label: "King Bed" },
      { icon: Eye, label: "Sea View Balcony" },
      { icon: Bath, label: "Private Bathroom" },
      { icon: Wind, label: "Air Conditioning" },
      { icon: Wifi, label: "Complimentary WiFi" },
      { icon: Maximize, label: "42 m² Space" },
    ],
  },
  "signature-suite": {
    name: "Signature Suite",
    tagline: "Understated grandeur",
    price: "€320",
    size: "68 m²",
    guests: "2 Adults + 1 Child",
    description:
      "Our finest accommodation — a generous living area flows into a private terrace with panoramic Adriatic views. Marble bath, bespoke furnishings, and the kind of space where time bends to your rhythm. This is not just a room; it is a destination within a destination.",
    images: [signatureImg, roomDetail3, roomDetail4, roomDetail1],
    amenities: [
      { icon: Bed, label: "King Bed" },
      { icon: Eye, label: "Panoramic Terrace" },
      { icon: Bath, label: "Marble Bathroom" },
      { icon: Wind, label: "Air Conditioning" },
      { icon: Wifi, label: "Complimentary WiFi" },
      { icon: Maximize, label: "68 m² Space" },
    ],
  },
};

const RoomDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [booking, setBooking] = useState(false);

  const room = slug ? roomData[slug] : null;

  const nextSlide = useCallback(() => {
    if (!room) return;
    setCurrentSlide((p) => (p + 1) % room.images.length);
  }, [room]);

  const prevSlide = useCallback(() => {
    if (!room) return;
    setCurrentSlide((p) => (p - 1 + room.images.length) % room.images.length);
  }, [room]);

  // Auto-advance slides
  useEffect(() => {
    if (!room) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, room]);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Room Not Found</h1>
          <button
            onClick={() => navigate("/rooms")}
            className="text-sm uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── IMAGE SLIDER ── */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        {room.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${room.name} — view ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate("/rooms")}
          className="absolute top-28 left-6 md:left-12 z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 text-[11px] uppercase tracking-[0.2em]"
        >
          <ArrowLeft size={14} />
          All Rooms
        </button>

        {/* Slide controls */}
        <div className="absolute bottom-8 right-6 md:right-12 z-10 flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 active:scale-95"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-white/50 text-[11px] font-body tracking-widest tabular-nums">
            {String(currentSlide + 1).padStart(2, "0")} / {String(room.images.length).padStart(2, "0")}
          </span>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 active:scale-95"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-6 md:left-12 z-10 flex gap-2">
          {room.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-[2px] rounded-full transition-all duration-500 ${
                i === currentSlide ? "w-8 bg-white" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── ROOM INFO ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-body text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
                {room.tagline}
              </p>
              <h1
                className="font-display text-5xl md:text-7xl font-light mb-4 italic"
                style={{ lineHeight: "1.05" }}
              >
                {room.name}
              </h1>
              <div className="gold-line mx-auto mt-6 mb-8" />
              <div className="flex items-center justify-center gap-6 text-[12px] font-body tracking-[0.1em] uppercase text-muted-foreground">
                <span>{room.size}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>{room.guests}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>From {room.price}/night</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-center text-muted-foreground leading-[2] text-[15px] md:text-base font-light max-w-2xl mx-auto">
              {room.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── AMENITIES ── */}
      <section className="py-20 md:py-28 bg-secondary bg-grain">
        <div className="container max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
                In-Room
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-light">Amenities</h2>
              <div className="gold-line mx-auto mt-5" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {room.amenities.map((a, i) => (
              <ScrollReveal key={a.label} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center py-8 px-4 rounded-2xl bg-background/60 backdrop-blur-sm transition-all duration-300 hover:bg-background hover:shadow-lg group">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                    <a.icon size={18} className="text-muted-foreground group-hover:text-background transition-colors duration-300" />
                  </div>
                  <span className="text-[13px] font-body tracking-[0.05em] text-foreground/70 font-light">
                    {a.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING SECTION ── */}
      <section className="py-24 md:py-36 bg-background">
        <div className="container max-w-xl text-center">
          <ScrollReveal>
            <div className="gold-line mx-auto mb-8" />
            <h2
              className="font-display text-4xl md:text-5xl font-light mb-4 italic"
              style={{ lineHeight: "1.1" }}
            >
              Reserve This Room
            </h2>
            <p className="text-muted-foreground leading-[1.9] text-[15px] font-light mb-10 max-w-sm mx-auto">
              Select your dates and let us prepare everything for your arrival on the Adriatic.
            </p>
            <button
              onClick={() => setBooking(true)}
              className="bg-foreground text-background px-12 py-4 rounded-full text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-200 hover:bg-foreground/90 active:scale-[0.97]"
            >
              Check Availability
            </button>
          </ScrollReveal>
        </div>
      </section>

      <BookingForm
        open={booking}
        onClose={() => setBooking(false)}
        roomType={room.name}
      />
    </>
  );
};

export default RoomDetail;
