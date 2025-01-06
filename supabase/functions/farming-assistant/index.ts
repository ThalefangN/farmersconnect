import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.2.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message, imageUrl } = await req.json()

    // Initialize OpenAI
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set')
    }

    const configuration = new Configuration({ apiKey: openAIApiKey })
    const openai = new OpenAIApi(configuration)

    console.log('Received request:', { message, imageUrl })

    let messages = [
      {
        role: 'system',
        content: 'You are a knowledgeable farming assistant focused on agriculture in Botswana. Provide clear, practical advice about farming techniques, crop management, and agricultural best practices specific to Botswana\'s climate and conditions. Keep responses concise and actionable.'
      },
      {
        role: 'user',
        content: message
      }
    ]

    if (imageUrl) {
      messages = [
        ...messages,
        {
          role: 'user',
          content: `I'm also sharing an image with you: ${imageUrl}. Please analyze this image in the context of my question.`
        }
      ]
    }

    console.log('Sending request to OpenAI...')
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 500
    })

    console.log('Received response from OpenAI')
    const response = completion.data.choices[0].message?.content || 'Sorry, I could not generate a response.'

    return new Response(
      JSON.stringify({ response }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process request',
        details: error.message 
      }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})