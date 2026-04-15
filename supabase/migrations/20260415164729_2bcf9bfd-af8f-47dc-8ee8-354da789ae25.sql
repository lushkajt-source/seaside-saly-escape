
-- Drop the restrictive employee read policy
DROP POLICY "Employees can read own bookings" ON public.bookings;

-- Allow all authenticated users (employees) to read all bookings
CREATE POLICY "Authenticated can read all bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (true);
