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
    const { to, name } = await req.json();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Farmers Connect <onboarding@resend.dev>',
        to: [to],
        subject: 'Welcome to Farmers Connect!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #166534; text-align: center;">Welcome to Farmers Connect!</h1>
            <p>Dear ${name},</p>
            <p>We're thrilled to welcome you to Farmers Connect, your one-stop platform for agricultural collaboration in Botswana!</p>
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #166534; margin-top: 0;">Here's what you can do with Farmers Connect:</h3>
              <ul style="color: #166534;">
                <li>Connect with fellow farmers and agricultural experts</li>
                <li>Access valuable resources and equipment</li>
                <li>Join farming communities and share knowledge</li>
                <li>Buy and sell agricultural products</li>
                <li>Stay updated with latest farming trends and practices</li>
              </ul>
            </div>
            <p>Get started by exploring our platform and connecting with other farmers in your area!</p>
            <p>If you have any questions, our support team is always here to help.</p>
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