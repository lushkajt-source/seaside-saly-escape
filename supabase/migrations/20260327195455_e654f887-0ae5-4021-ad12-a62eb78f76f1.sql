
-- Create rooms table
CREATE TABLE public.rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 2,
  description TEXT,
  tag TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guests_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

-- Enable RLS
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Rooms are publicly readable
CREATE POLICY "Rooms are publicly readable"
  ON public.rooms FOR SELECT
  USING (true);

-- Anyone can insert bookings (public booking)
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Bookings are publicly readable (needed for availability checks)
CREATE POLICY "Bookings are publicly readable"
  ON public.bookings FOR SELECT
  USING (true);

-- Create index for availability queries
CREATE INDEX idx_bookings_room_dates ON public.bookings (room_id, check_in, check_out);
