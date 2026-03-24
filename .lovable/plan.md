

## Plan: Fix Close Button Visibility & Update Location to Durrës, Albania

### What needs to change

**1. BookingForm close button** — The X button already exists in `BookingForm.tsx` (line 50-56). It's present on both the form and confirmation views. No code change needed here — it already works.

**However**, I'll verify it's clearly visible and well-styled. The current implementation looks correct with the X icon from lucide-react at `absolute top-5 right-5`.

**2. Update all location references from Saly Portudal, Senegal → Durrës Plazh, Albania**

Files to update:

- **`src/components/Footer.tsx`** — Change description text and address from "Saly Portudal, Mbour, Senegal" to "Durrës Plazh, Albania" with plus code `8F6J+P5 Durrës, Albania`
- **`src/pages/Contact.tsx`** — Update address and Google Maps embed URL to point to Durrës Plazh, Albania (8F6J+P5)
- **`src/pages/About.tsx`** — Rewrite the founding story and location section to reference Durrës, the Adriatic coast, and Albania instead of Senegal/Petite Côte/Dakar
- **`src/pages/Contact.tsx`** — Update WhatsApp number if needed (keep as-is unless user specifies)

**3. Google Maps embed** — Replace the current Saly Portudal embed with one pointing to the plus code `8F6J+P5 Durrës, Albania` (Durrës beach area coordinates: approximately 41.32°N, 19.45°E)

### Summary of changes
- 3 files updated with new location references (Footer, Contact, About)
- Google Maps embed URL updated to Durrës Plazh
- No booking form changes needed — X close button already functional

