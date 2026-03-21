import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  roomType?: string;
}

const BookingForm = ({ open, onClose, roomType }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-card rounded-lg shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
        <button
          onClick={() => { onClose(); setSubmitted(false); }}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="font-display text-2xl mb-1">Book Your Stay</h2>
          {roomType && (
            <p className="text-muted-foreground text-sm mb-6">{roomType} Room</p>
          )}

          {submitted ? (
            <div className="text-center py-8">
              <p className="font-display text-xl text-primary mb-2">Thank you!</p>
              <p className="text-muted-foreground text-sm">We'll get back to you shortly to confirm your reservation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                required
                type="text"
                placeholder="Full Name"
                className="border border-input rounded px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="border border-input rounded px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Check-in</label>
                  <input
                    required
                    type="date"
                    className="border border-input rounded px-4 py-3 text-sm bg-background w-full focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Check-out</label>
                  <input
                    required
                    type="date"
                    className="border border-input rounded px-4 py-3 text-sm bg-background w-full focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <select
                required
                className="border border-input rounded px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Number of Guests</option>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
              </select>
              <button
                type="submit"
                className="bg-primary text-primary-foreground py-3 rounded font-semibold tracking-wide uppercase text-sm transition-transform hover:scale-[1.02] active:scale-[0.97] mt-2"
              >
                Request Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
