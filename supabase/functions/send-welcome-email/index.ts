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
          <h1>Welcome to Farmers Connect, ${name}!</h1>
          <p>We're excited to have you join our community of farmers. Here at Farmers Connect, you'll find:</p>
          <ul>
            <li>A supportive community of fellow farmers</li>
            <li>Access to valuable resources and equipment</li>
            <li>Opportunities to learn and grow</li>
            <li>A marketplace to buy and sell agricultural products</li>
          </ul>
          <p>Get started by exploring our platform and connecting with other farmers!</p>
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