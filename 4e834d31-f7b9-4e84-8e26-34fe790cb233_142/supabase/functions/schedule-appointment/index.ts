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
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    const { 
      appointment_date, 
      appointment_time, 
      appointment_type, 
      provider_name, 
      location, 
      notes 
    } = await req.json()

    // Validate required fields
    if (!appointment_date || !appointment_time || !appointment_type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: appointment_date, appointment_time, appointment_type' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Insert appointment
    const { data, error } = await supabaseClient
      .from('appointments')
      .insert([
        {
          user_id: user.id,
          appointment_date,
          appointment_time,
          appointment_type,
          provider_name: provider_name || null,
          location: location || null,
          notes: notes || null,
          status: 'scheduled'
        }
      ])
      .select()

    if (error) {
      console.error('Error creating appointment:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to create appointment' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        appointment: data[0],
        message: 'Appointment scheduled successfully!' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})