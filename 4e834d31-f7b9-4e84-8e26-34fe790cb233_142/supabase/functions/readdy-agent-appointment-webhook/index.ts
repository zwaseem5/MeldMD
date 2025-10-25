import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const body = await req.json()
    console.log('Webhook received:', body)

    // Extract message content from the webhook
    const { message } = body

    // Check if this is an appointment scheduling request
    const appointmentKeywords = [
      'schedule', 'appointment', 'book', 'meeting', 'visit', 
      'consultation', 'checkup', 'exam', 'see doctor', 'medical appointment',
      'book appointment', 'make appointment', 'set up appointment'
    ]
    
    const messageText = message?.content?.toLowerCase() || ''
    const isAppointmentRequest = appointmentKeywords.some(keyword => 
      messageText.includes(keyword)
    )

    if (isAppointmentRequest) {
      // Direct users to use Calendly for appointment booking
      return new Response(
        JSON.stringify({ 
          success: true,
          message: "I'd be happy to help you schedule an appointment! However, I can't book appointments directly. Please use our convenient scheduling system by clicking the 'Schedule Appointment' button on the page. It will open our booking calendar where you can select your preferred date, time, and appointment type. This ensures your appointment is properly scheduled and confirmed."
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // For all other questions, provide helpful responses about the site
    const helpfulResponses = {
      services: "Meld Health offers comprehensive pharma and telehealth solutions including medication management, virtual consultations, provider networks, and wellness programs. We help clinics scale care reliably, compliantly, and affordably.",
      
      telehealth: "Our telehealth platform connects you with healthcare providers remotely through secure video consultations. You can access care from anywhere, get prescriptions, and receive follow-up care all through our HIPAA-compliant platform.",
      
      medications: "We provide comprehensive medication management services including prescription fulfillment, medication reviews, adherence monitoring, and direct coordination with your healthcare providers.",
      
      providers: "Our network includes licensed healthcare professionals specializing in various areas of medicine. All providers are thoroughly vetted and maintain the highest standards of care.",
      
      wellness: "Our wellness programs focus on preventive care, health education, and lifestyle management to help you maintain optimal health and prevent chronic conditions.",
      
      contact: "You can reach us through our contact page, or use this chat assistant for immediate questions. For appointments, please use our scheduling system on the homepage.",
      
      privacy: "We maintain strict HIPAA compliance and protect your health information with enterprise-grade security. Your privacy and data security are our top priorities.",
      
      game: "Try our Medical Knowledge Game to test your understanding of health topics while earning points. It's both educational and fun!",
      
      default: "I'm here to help answer questions about Meld Health's services, telehealth platform, medications, providers, wellness programs, and more. What would you like to know about our healthcare solutions?"
    }

    // Simple keyword matching for responses
    let responseMessage = helpfulResponses.default

    if (messageText.includes('service') || messageText.includes('what do you do') || messageText.includes('about')) {
      responseMessage = helpfulResponses.services
    } else if (messageText.includes('telehealth') || messageText.includes('virtual') || messageText.includes('online consultation')) {
      responseMessage = helpfulResponses.telehealth
    } else if (messageText.includes('medication') || messageText.includes('prescription') || messageText.includes('drug')) {
      responseMessage = helpfulResponses.medications
    } else if (messageText.includes('provider') || messageText.includes('doctor') || messageText.includes('physician')) {
      responseMessage = helpfulResponses.providers
    } else if (messageText.includes('wellness') || messageText.includes('health program') || messageText.includes('preventive')) {
      responseMessage = helpfulResponses.wellness
    } else if (messageText.includes('contact') || messageText.includes('reach') || messageText.includes('support')) {
      responseMessage = helpfulResponses.contact
    } else if (messageText.includes('privacy') || messageText.includes('security') || messageText.includes('hipaa')) {
      responseMessage = helpfulResponses.privacy
    } else if (messageText.includes('game') || messageText.includes('quiz') || messageText.includes('medical knowledge')) {
      responseMessage = helpfulResponses.game
    } else if (messageText.includes('hello') || messageText.includes('hi') || messageText.includes('hey')) {
      responseMessage = "Hello! Welcome to Meld Health. I'm here to answer any questions you have about our pharma and telehealth solutions. What would you like to know?"
    } else if (messageText.includes('help') || messageText.includes('what can you do')) {
      responseMessage = "I can help answer questions about Meld Health's services, including our telehealth platform, medication management, provider network, wellness programs, and more. I can also provide information about how to contact us or navigate our website. What specific information are you looking for?"
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: responseMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'I apologize, but I encountered an error. Please try again or contact our support team.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})