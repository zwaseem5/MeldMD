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
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Get user from JWT
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    const body = await req.json()
    const { 
      appointment_id,
      appointment_date,
      appointment_time,
      appointment_type,
      provider_name,
      location,
      notes,
      status
    } = body

    if (!appointment_id) {
      throw new Error('Appointment ID is required')
    }

    // Prepare update data
    const updateData: any = {
      updated_at: new Date().toISOString()
    }

    if (appointment_date) updateData.appointment_date = appointment_date
    if (appointment_time) updateData.appointment_time = appointment_time
    if (appointment_type) updateData.appointment_type = appointment_type
    if (provider_name !== undefined) updateData.provider_name = provider_name
    if (location !== undefined) updateData.location = location
    if (notes !== undefined) updateData.notes = notes
    if (status) updateData.status = status

    // Update the guest appointment
    const { data, error } = await supabaseClient
      .from('guest_appointments')
      .update(updateData)
      .eq('id', appointment_id)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Response(
      JSON.stringify({ appointment: data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error updating guest appointment:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})