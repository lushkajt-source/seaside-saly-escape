import { useState } from "react";
import { X, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  roomType?: string;
}

const BookingForm = ({ open, onClose, roomType }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkin: "",
    checkout: "",
    guests: "",
  });

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send booking details to WhatsApp automatically
    const msg = encodeURIComponent(
      `📋 New Booking Request\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📅 Check-in: ${formData.checkin}\n📅 Check-out: ${formData.checkout}\n👥 Guests: ${formData.guests}${roomType ? `\n🏨 Room: ${roomType}` : ""}`
    );
    window.open(`https://wa.me/447777737080?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello, I'd like to book a ${roomType || "room"} at Hotel Saly.\n\nName: ${formData.name}\nCheck-in: ${formData.checkin}\nCheck-out: ${formData.checkout}\nGuests: ${formData.guests}`
    );
    window.open(`https://wa.me/447777737080?text=${msg}`, "_blank");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", checkin: "", checkout: "", guests: "" });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-card rounded-2xl shadow-premium-xl max-w-lg w-full relative overflow-hidden animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted/80 hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-all duration-200 z-10"
          aria-label="Close"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* Header accent bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-warm to-primary" />

        <div className="p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-ocean-light flex items-center justify-center mx-auto mb-5">
                <Check size={28} className="text-primary" />
              </div>
              <h2 className="font-display text-3xl mb-2">Booking Confirmed</h2>
              <div className="premium-divider my-4" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-6">
                Thank you, {formData.name}! We've received your reservation request
                {roomType ? ` for the ${roomType}` : ""}. We'll send a confirmation to {formData.email} shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="premium" onClick={handleClose}>
                  Done
                </Button>
                <Button variant="outline" onClick={handleWhatsApp} className="gap-2">
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="font-display text-3xl mb-1">Reserve Your Stay</h2>
                {roomType && (
                  <p className="text-muted-foreground text-sm">{roomType}</p>
                )}
                <div className="premium-divider mt-4 !mx-0" />
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Full Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Email</label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Check-in</label>
                    <input
                      required
                      name="checkin"
                      type="date"
                      value={formData.checkin}
                      onChange={handleChange}
                      className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Check-out</label>
                    <input
                      required
                      name="checkout"
                      type="date"
                      value={formData.checkout}
                      onChange={handleChange}
                      className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Guests</label>
                  <select
                    required
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  >
                    <option value="">Select guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <Button type="submit" variant="premium" size="lg" className="w-full">
                    Confirm Reservation
                  </Button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-green-500/30 bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-all duration-200 active:scale-[0.97]"
                  >
                    <MessageCircle size={16} />
                    Book via WhatsApp
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
