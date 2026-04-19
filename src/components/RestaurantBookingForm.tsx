import { useState } from "react";
import { X, MessageCircle, Check, Clock, Users, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

const RestaurantBookingForm = ({ open, onClose }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    notes: "",
  });

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `🍽️ Restaurant Reservation — Saly Restaurant\n\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n📅 Date: ${formData.date}\n🕐 Time: ${formData.time}\n👥 Guests: ${formData.guests}${formData.notes ? `\n📝 Notes: ${formData.notes}` : ""}`
    );
    window.open(`https://wa.me/447777737080?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello, I'd like to reserve a table at Saly Restaurant.\n\nName: ${formData.name}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests}`
    );
    window.open(`https://wa.me/447777737080?text=${msg}`, "_blank");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", phone: "", date: "", time: "", guests: "", notes: "" });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-card rounded-2xl shadow-premium-xl max-w-lg w-full relative overflow-hidden animate-scale-in">
        {/* Close button - high contrast, always visible */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-foreground text-background hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-all duration-200 shadow-xl ring-2 ring-background active:scale-95"
          aria-label="Close reservation form"
        >
          <X size={22} strokeWidth={3} />
        </button>

        {/* Header accent bar - warm tones for restaurant */}
        <div className="h-1 bg-gradient-to-r from-warm via-primary to-warm" />

        <div className="p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-warm/20 flex items-center justify-center mx-auto mb-5">
                <Check size={28} className="text-warm" />
              </div>
              <h2 className="font-display text-3xl mb-2">Table Reserved</h2>
              <div className="premium-divider my-4" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-6">
                Thank you, {formData.name}! Your table for {formData.guests} on {formData.date} at {formData.time} has been requested. We'll confirm shortly.
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
                <p className="font-body text-[11px] tracking-[0.4em] uppercase text-muted-foreground mb-2">Saly Restaurant</p>
                <h2 className="font-display text-3xl mb-1">Reserve a Table</h2>
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
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Phone Number</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+355..."
                    className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block flex items-center gap-1.5">
                      <CalendarDays size={12} /> Date
                    </label>
                    <input
                      required
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block flex items-center gap-1.5">
                      <Clock size={12} /> Time
                    </label>
                    <select
                      required
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    >
                      <option value="">Select time</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="21:30">9:30 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block flex items-center gap-1.5">
                    <Users size={12} /> Guests
                  </label>
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
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7-8">7-8 Guests</option>
                    <option value="9+">9+ Guests (Large Party)</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Special Requests (optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Dietary requirements, celebrations, seating preference..."
                    rows={2}
                    className="w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  />
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
                    Reserve via WhatsApp
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

export default RestaurantBookingForm;
