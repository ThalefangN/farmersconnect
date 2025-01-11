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
    const { to, orderDetails } = await req.json();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Farmers Connect <onboarding@resend.dev>',
        to: [to],
        subject: 'Your Order Confirmation',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #166534; text-align: center;">Order Confirmation</h1>
            <p>Thank you for your purchase on Farmers Connect!</p>
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #166534; margin-top: 0;">Order Details:</h3>
              <p><strong>Order ID:</strong> ${orderDetails.id}</p>
              <p><strong>Product:</strong> ${orderDetails.title}</p>
              <p><strong>Quantity:</strong> ${orderDetails.quantity} ${orderDetails.unit_type}</p>
              <p><strong>Total Amount:</strong> BWP ${orderDetails.totalAmount}</p>
              <p><strong>Delivery/Pickup:</strong> ${orderDetails.deliveryType}</p>
              <p><strong>Delivery Address:</strong> ${orderDetails.deliveryAddress || 'Not provided'}</p>
            </div>
            <p>You can track your order status in your account dashboard.</p>
            <p>If you have any questions about your order, please don't hesitate to contact us.</p>
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