
-- Add source column to bookings
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS source text DEFAULT 'website';

-- Allow employees to read their own bookings
CREATE POLICY "Employees can read own bookings"
ON public.bookings FOR SELECT TO authenticated
USING (created_by = auth.uid() OR confirmed_by = auth.uid());
