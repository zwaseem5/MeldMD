import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing')
    }

    const supabaseClient = createClient(supabaseUrl, supabaseKey)

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header provided' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Get user from JWT
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Get user profile to find name and phone
    const { data: profile } = await supabaseClient
      .from('user_profiles')
      .select('full_name, phone')
      .eq('id', user.id)
      .single()

    // Get appointments from appointments table (authenticated user appointments)
    const { data: userAppointments, error: userError } = await supabaseClient
      .from('appointments')
      .select('*')
      .eq('user_id', user.id)
      .order('appointment_date', { ascending: true })

    if (userError) {
      console.error('Error fetching user appointments:', userError)
    }

    // Get appointments from guest_appointments table (assistant appointments)
    let guestAppointments = []
    
    // Try to get guest appointments by name (using patient_name field)
    if (profile?.full_name) {
      const { data: nameData, error: nameError } = await supabaseClient
        .from('guest_appointments')
        .select('*')
        .ilike('patient_name', `%${profile.full_name}%`)
        .order('appointment_date', { ascending: true })

      if (!nameError && nameData) {
        guestAppointments = [...guestAppointments, ...nameData]
      }
    }

    // Try to get guest appointments by phone (using phone_number field)
    if (profile?.phone) {
      const { data: phoneData, error: phoneError } = await supabaseClient
        .from('guest_appointments')
        .select('*')
        .eq('phone_number', profile.phone)
        .order('appointment_date', { ascending: true })

      if (!phoneError && phoneData) {
        // Avoid duplicates
        const existingIds = guestAppointments.map(apt => apt.id)
        const newPhoneData = phoneData.filter(apt => !existingIds.includes(apt.id))
        guestAppointments = [...guestAppointments, ...newPhoneData]
      }
    }

    // Try to get guest appointments by email if no name/phone match
    if (guestAppointments.length === 0 && user.email) {
      const { data: emailGuestData } = await supabaseClient
        .from('guest_appointments')
        .select('*')
        .ilike('notes', `%${user.email}%`)
        .order('appointment_date', { ascending: true })

      if (emailGuestData) {
        guestAppointments = emailGuestData
      }
    }

    // Map guest appointments with proper format to match appointments table structure
    const formattedGuestAppointments = guestAppointments.map(apt => ({
      id: `guest_${apt.id}`,
      user_id: user.id,
      appointment_date: apt.appointment_date,
      appointment_time: apt.appointment_time,
      appointment_type: apt.appointment_type,
      provider_name: apt.provider_name,
      location: apt.location,
      notes: apt.notes,
      status: apt.status,
      created_at: apt.created_at,
      updated_at: apt.updated_at,
      source: 'assistant',
      patient_name: apt.patient_name,
      phone_number: apt.phone_number
    }))

    // Combine and sort all appointments
    const allAppointments = [
      ...(userAppointments || []).map(apt => ({ ...apt, source: 'direct' })),
      ...formattedGuestAppointments
    ].sort((a, b) => {
      const dateA = new Date(`${a.appointment_date}T${a.appointment_time}`)
      const dateB = new Date(`${b.appointment_date}T${b.appointment_time}`)
      return dateA.getTime() - dateB.getTime()
    })

    return new Response(
      JSON.stringify({ 
        success: true,
        appointments: allAppointments,
        total: allAppointments.length,
        user_appointments: userAppointments?.length || 0,
        guest_appointments: guestAppointments.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error in get-all-user-appointments function:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Internal server error', 
        appointments: [],
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})