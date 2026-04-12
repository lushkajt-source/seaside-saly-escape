const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ADMIN_EMAIL = "lushkajt@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { type, booking } = await req.json();

    if (!type || !booking) {
      return new Response(JSON.stringify({ error: "Missing type or booking" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    let to: string;
    let subject: string;
    let html: string;

    const guestName = booking.guest_name || "Guest";
    const checkIn = booking.check_in || "";
    const checkOut = booking.check_out || "";
    const roomType = booking.room_type || "N/A";
    const phone = booking.phone || "N/A";
    const email = booking.guest_email || "";
    const guests = booking.guests_count || 1;
    const specialRequest = booking.special_request || "None";

    if (type === "new_booking") {
      to = ADMIN_EMAIL;
      subject = "New Booking Request - Saly Hotel";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #faf8f5; padding: 30px;">
          <h1 style="color: #1e1c19; font-family: Georgia, serif; border-bottom: 2px solid #c4a44a; padding-bottom: 10px;">
            New Booking Request
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 8px 0; color: #888; width: 140px;">Guest Name</td><td style="padding: 8px 0; font-weight: bold;">${guestName}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Check-in</td><td style="padding: 8px 0;">${checkIn}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Check-out</td><td style="padding: 8px 0;">${checkOut}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Guests</td><td style="padding: 8px 0;">${guests}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Room Type</td><td style="padding: 8px 0;">${roomType}</td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Special Request</td><td style="padding: 8px 0;">${specialRequest}</td></tr>
          </table>
          <p style="margin-top: 25px; color: #888; font-size: 12px;">This is an automated notification from Saly Hotel booking system.</p>
        </div>
      `;
    } else if (type === "confirmed") {
      to = email;
      subject = "Your Reservation is Confirmed - Saly Hotel";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #faf8f5; padding: 30px;">
          <h1 style="color: #1e1c19; font-family: Georgia, serif; border-bottom: 2px solid #c4a44a; padding-bottom: 10px;">
            Reservation Confirmed ✓
          </h1>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Dear ${guestName},
          </p>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Your reservation has been confirmed. We look forward to welcoming you to Saly Hotel.
          </p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: white; padding: 15px; border-radius: 8px;">
            <tr><td style="padding: 8px 15px; color: #888;">Check-in</td><td style="padding: 8px 15px; font-weight: bold;">${checkIn}</td></tr>
            <tr><td style="padding: 8px 15px; color: #888;">Check-out</td><td style="padding: 8px 15px; font-weight: bold;">${checkOut}</td></tr>
            <tr><td style="padding: 8px 15px; color: #888;">Guests</td><td style="padding: 8px 15px;">${guests}</td></tr>
          </table>
          <p style="color: #888; font-size: 13px;">If you have any questions, please don't hesitate to contact us at +355 69 452 8003.</p>
          <p style="color: #888; font-size: 13px;">Best regards,<br/>The Saly Hotel Team</p>
        </div>
      `;
    } else if (type === "declined") {
      to = email;
      subject = "Reservation Update - Saly Hotel";
      const declineReason = booking.decline_reason || "No reason provided";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #faf8f5; padding: 30px;">
          <h1 style="color: #1e1c19; font-family: Georgia, serif; border-bottom: 2px solid #c4a44a; padding-bottom: 10px;">
            Reservation Update
          </h1>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Dear ${guestName},
          </p>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            We are sorry, but your reservation could not be accepted.
          </p>
          <div style="background: #fff3f3; border-left: 4px solid #e74c3c; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <strong>Reason:</strong> ${declineReason}
          </div>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Please feel free to contact us for alternative options at +355 69 452 8003 or via WhatsApp at +44 7777 737080.
          </p>
          <p style="color: #888; font-size: 13px;">Best regards,<br/>The Saly Hotel Team</p>
        </div>
      `;
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!to) {
      return new Response(JSON.stringify({ error: "No recipient email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email via Resend
    if (!RESEND_API_KEY) {
      console.log("RESEND_API_KEY not set, skipping email send. Would send to:", to, "Subject:", subject);
      return new Response(JSON.stringify({ success: true, skipped: true, message: "Email sending not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Saly Hotel <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
      }),
    });

    const emailData = await emailRes.json();

    if (!emailRes.ok) {
      console.error("Resend error:", emailData);
      return new Response(JSON.stringify({ error: "Failed to send email", details: emailData }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, data: emailData }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
