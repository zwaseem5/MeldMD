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
      appointment_id,
      appointment_date, 
      appointment_time, 
      appointment_type, 
      provider_name, 
      location, 
      notes,
      status
    } = await req.json()

    if (!appointment_id) {
      return new Response(
        JSON.stringify({ error: 'Missing appointment_id' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Update appointment
    const updateData: any = { updated_at: new Date().toISOString() }
    
    if (appointment_date) updateData.appointment_date = appointment_date
    if (appointment_time) updateData.appointment_time = appointment_time
    if (appointment_type) updateData.appointment_type = appointment_type
    if (provider_name !== undefined) updateData.provider_name = provider_name
    if (location !== undefined) updateData.location = location
    if (notes !== undefined) updateData.notes = notes
    if (status) updateData.status = status

    const { data, error } = await supabaseClient
      .from('appointments')
      .update(updateData)
      .eq('id', appointment_id)
      .eq('user_id', user.id)
      .select()

    if (error) {
      console.error('Error updating appointment:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to update appointment' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Appointment not found or access denied' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        appointment: data[0],
        message: 'Appointment updated successfully!' 
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