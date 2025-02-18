import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, otp } = await req.json();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Farmers Connect <onboarding@resend.dev>',
        to: [to],
        subject: 'Password Reset OTP',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #166534; text-align: center;">Password Reset Request</h1>
            <p>Hello,</p>
            <p>You have requested to reset your password for your Farmers Connect account. Here is your One-Time Password (OTP):</p>
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h2 style="color: #166534; margin: 0;">${otp}</h2>
            </div>
            <p>This code will expire in 10 minutes for security purposes.</p>
            <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
            <p style="margin-top: 30px;">Best regards,<br>The Farmers Connect Team</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});