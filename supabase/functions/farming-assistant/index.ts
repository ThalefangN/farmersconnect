import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, imageUrl } = await req.json();
    console.log('Received request:', { message, imageUrl });

    // System message to ensure farming-focused responses
    const systemMessage = `You are an expert farming assistant specializing in agriculture in Botswana. 
    You understand local climate conditions, soil types, and farming practices. 
    Provide practical, actionable advice that's relevant to Botswana's agricultural context. 
    Only answer questions related to farming, agriculture, and related topics. 
    If asked about non-farming topics, politely redirect the conversation back to farming.`;

    // Prepare the messages array
    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: imageUrl 
        ? `Image: ${imageUrl}\n\nQuestion: ${message}`
        : message 
      }
    ];

    console.log('Calling OpenAI API with messages:', messages);

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!openAIResponse.ok) {
      const error = await openAIResponse.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await openAIResponse.json();
    console.log('OpenAI API response:', data);

    return new Response(
      JSON.stringify({ response: data.choices[0].message.content }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error in farming-assistant function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process your request. Please try again.',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});