import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, imageUrl } = await req.json()

    // Create the system message with context about Botswana farming
    const systemMessage = `You are a knowledgeable farming assistant specializing in agriculture in Botswana. 
    You understand the local climate, soil conditions, and farming practices. 
    Provide practical advice that's relevant to Botswana's agricultural context.`

    // Prepare the messages array
    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: imageUrl 
        ? `Image: ${imageUrl}\n\nQuestion: ${message}`
        : message 
      }
    ]

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
    })

    const data = await openAIResponse.json()
    const response = data.choices[0].message.content

    return new Response(
      JSON.stringify({ response }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})