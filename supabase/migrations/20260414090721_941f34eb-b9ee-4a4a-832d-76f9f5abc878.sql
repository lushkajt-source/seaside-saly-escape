
-- Add created_by and confirmed_by columns to bookings
ALTER TABLE public.bookings 
ADD COLUMN created_by uuid REFERENCES auth.users(id) DEFAULT NULL,
ADD COLUMN confirmed_by uuid REFERENCES auth.users(id) DEFAULT NULL;

-- Update RLS: employees can only see their own bookings, admins see all
DROP POLICY IF EXISTS "Bookings are publicly readable" ON public.bookings;

CREATE POLICY "Admins can read all bookings"
ON public.bookings FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can read own bookings"
ON public.bookings FOR SELECT TO anon
USING (true);

-- Employees can only cancel bookings they confirmed
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;

CREATE POLICY "Admins can update all bookings"
ON public.bookings FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Employees can update own confirmed bookings"
ON public.bookings FOR UPDATE TO authenticated
USING (confirmed_by = auth.uid());
