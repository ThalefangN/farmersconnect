import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { phoneNumber } = await req.json();

    // Here you would integrate with your SMS provider
    // For now, we'll just simulate sending an SMS
    console.log('Sending welcome SMS to:', phoneNumber);

    const message = `Welcome to Farmers Connect! 🌱\n\nThank you for subscribing to updates. You'll receive notifications about:\n- New product listings\n- Equipment availability\n- Order updates\n\nGrow with us! 🚜`;

    // Here you would actually send the SMS using your preferred provider
    // For example, using Twilio or a similar service

    return new Response(
      JSON.stringify({ success: true, message: 'Welcome message sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});