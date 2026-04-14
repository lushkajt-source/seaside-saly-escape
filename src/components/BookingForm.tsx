import { useState, useEffect } from "react";
import { X, MessageCircle, Check, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
  roomType?: string;
}

interface AvailableRoom {
  id: string;
  name: string;
  price: number;
  slug: string;
}

const BookingForm = ({ open, onClose, roomType }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: "",
    room_id: "",
    message: "",
  });

  useEffect(() => {
    if (!open || !formData.checkin || !formData.checkout) {
      setAvailableRooms([]);
      return;
    }
    if (formData.checkout <= formData.checkin) {
      setAvailableRooms([]);
      return;
    }

    const checkAvailability = async () => {
      setChecking(true);
      setError(null);
      try {
        const { data: allRooms, error: roomsErr } = await supabase
          .from("rooms")
          .select("id, name, price, slug");
        if (roomsErr) throw roomsErr;

        const { data: conflicting, error: bookErr } = await supabase
          .from("bookings")
          .select("room_id")
          .in("status", ["pending", "confirmed"])
          .lt("check_in", formData.checkout)
          .gt("check_out", formData.checkin);
        if (bookErr) throw bookErr;

        const bookedIds = new Set(conflicting?.map((b) => b.room_id) ?? []);
        const available = (allRooms ?? []).filter((r) => !bookedIds.has(r.id));
        setAvailableRooms(available);

        if (roomType && !formData.room_id) {
          const match = available.find((r) => r.name === roomType);
          if (match) setFormData((prev) => ({ ...prev, room_id: match.id }));
        }
      } catch {
        setError("Could not check availability. Please try again.");
      } finally {
        setChecking(false);
      }
    };

    checkAvailability();
  }, [formData.checkin, formData.checkout, open, roomType]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.room_id) {
      setError("Please select a room.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: conflicts } = await supabase
        .from("bookings")
        .select("id")
        .eq("room_id", formData.room_id)
        .in("status", ["pending", "confirmed"])
        .lt("check_in", formData.checkout)
        .gt("check_out", formData.checkin);

      if (conflicts && conflicts.length > 0) {
        setError("This room is no longer available for the selected dates.");
        setFormData((prev) => ({ ...prev, room_id: "" }));
        setLoading(false);
        return;
      }

      const selectedRoom = availableRooms.find((r) => r.id === formData.room_id);

      const { error: insertErr } = await supabase.from("bookings").insert({
        room_id: formData.room_id,
        check_in: formData.checkin,
        check_out: formData.checkout,
        guest_name: formData.name,
        guest_email: formData.email,
        phone: formData.phone || null,
        guests_count: parseInt(formData.guests) || 1,
        room_type: selectedRoom?.name || roomType || null,
        special_request: formData.message || null,
      });

      if (insertErr) throw insertErr;

      // Send admin notification email
      try {
        await supabase.functions.invoke("send-booking-email", {
          body: {
            type: "new_booking",
            booking: {
              guest_name: formData.name,
              guest_email: formData.email,
              phone: formData.phone,
              check_in: formData.checkin,
              check_out: formData.checkout,
              guests_count: parseInt(formData.guests) || 1,
              room_type: selectedRoom?.name || roomType || "N/A",
              special_request: formData.message,
            },
          },
        });
      } catch {
        // Email failure shouldn't block booking
      }

      // WhatsApp notification
      const msg = encodeURIComponent(
        `📋 New Booking\n\n👤 ${formData.name}\n📧 ${formData.email}\n📞 ${formData.phone}\n📅 ${formData.checkin} → ${formData.checkout}\n👥 ${formData.guests} guests\n🏨 ${selectedRoom?.name ?? roomType ?? "N/A"}\n💬 ${formData.message || "No message"}`
      );
      window.open(`https://wa.me/447777737080?text=${msg}`, "_blank");

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const selectedRoom = availableRooms.find((r) => r.id === formData.room_id);
    const msg = encodeURIComponent(
      `Hello, I'd like to book a ${selectedRoom?.name || roomType || "room"} at Hotel Saly.\n\nName: ${formData.name}\nCheck-in: ${formData.checkin}\nCheck-out: ${formData.checkout}\nGuests: ${formData.guests}`
    );
    window.open(`https://wa.me/447777737080?text=${msg}`, "_blank");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setError(null);
      setAvailableRooms([]);
      setFormData({ name: "", email: "", phone: "", checkin: "", checkout: "", guests: "", room_id: "", message: "" });
    }, 300);
  };

  const today = new Date().toISOString().split("T")[0];

  const inputClass = "w-full border border-input rounded-xl px-5 py-3.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";
  const labelClass = "font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-card rounded-2xl shadow-premium-xl max-w-lg w-full relative overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        <button onClick={handleClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted/80 hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-all duration-200 z-10" aria-label="Close">
          <X size={18} strokeWidth={2.5} />
        </button>

        <div className="h-1 bg-gradient-to-r from-primary via-warm to-primary" />

        <div className="p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-ocean-light flex items-center justify-center mx-auto mb-5">
                <Check size={28} className="text-primary" />
              </div>
              <h2 className="font-display text-3xl mb-2">Booking Submitted</h2>
              <div className="premium-divider my-4" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-6">
                Thank you, {formData.name}! Your reservation request has been received.
                We'll review it and send a confirmation to {formData.email} shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="premium" onClick={handleClose}>Done</Button>
                <Button variant="outline" onClick={handleWhatsApp} className="gap-2">
                  <MessageCircle size={16} />Chat on WhatsApp
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="font-display text-3xl mb-1">Reserve Your Stay</h2>
                {roomType && <p className="text-muted-foreground text-sm">{roomType}</p>}
                <div className="premium-divider mt-4 !mx-0" />
              </div>

              {error && (
                <div className="flex items-start gap-3 p-4 mb-5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" /><span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input required name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input required name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+355 69 xxx xxxx" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Check-in</label>
                    <input required name="checkin" type="date" min={today} value={formData.checkin} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Check-out</label>
                    <input required name="checkout" type="date" min={formData.checkin || today} value={formData.checkout} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Available Rooms
                    {checking && <Loader2 size={12} className="inline ml-2 animate-spin" />}
                  </label>
                  {formData.checkin && formData.checkout && formData.checkout > formData.checkin ? (
                    checking ? (
                      <div className="flex items-center gap-2 py-3 text-sm text-muted-foreground">
                        <Loader2 size={14} className="animate-spin" />Checking availability…
                      </div>
                    ) : availableRooms.length > 0 ? (
                      <select required name="room_id" value={formData.room_id} onChange={handleChange} className={inputClass}>
                        <option value="">Select a room</option>
                        {availableRooms.map((r) => (
                          <option key={r.id} value={r.id}>{r.name} — €{r.price}/night</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-sm text-destructive py-2">No rooms available for these dates.</p>
                    )
                  ) : (
                    <p className="text-sm text-muted-foreground py-2">Select dates to see available rooms.</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Guests</label>
                  <select required name="guests" value={formData.guests} onChange={handleChange} className={inputClass}>
                    <option value="">Select guests</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Additional Message (Optional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Any special requests or notes..." rows={3} className={inputClass + " resize-none"} />
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <Button type="submit" variant="premium" size="lg" className="w-full" disabled={loading || !formData.room_id}>
                    {loading ? (
                      <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" />Booking…</span>
                    ) : "Confirm Reservation"}
                  </Button>
                  <button type="button" onClick={handleWhatsApp} className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-green-500/30 bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-all duration-200 active:scale-[0.97]">
                    <MessageCircle size={16} />Book via WhatsApp
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
