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
    )

    const { name, phone } = await req.json()

    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Clean phone number - remove all non-digits
    const cleanPhone = phone ? phone.replace(/\D/g, '') : ''

    // First try: Search by name and phone (if provided)
    let query = supabaseClient
      .from('guest_appointments')
      .select('*')
      .ilike('patient_name', `%${name.trim()}%`)

    const { data: allData, error } = await query.order('appointment_date', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch appointments' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    let filteredData = allData || []

    // If we have phone number, filter by phone in code for better matching
    if (cleanPhone && filteredData.length > 0) {
      filteredData = filteredData.filter(appointment => {
        if (!appointment.phone_number) return false
        
        const storedCleanPhone = appointment.phone_number.replace(/\D/g, '')
        
        // Exact match
        if (storedCleanPhone === cleanPhone) return true
        
        // Check if phones are similar (allow 1-2 digit differences for typos)
        if (storedCleanPhone.length === cleanPhone.length) {
          let differences = 0
          for (let i = 0; i < storedCleanPhone.length; i++) {
            if (storedCleanPhone[i] !== cleanPhone[i]) {
              differences++
            }
          }
          return differences <= 2 // Allow up to 2 digit differences
        }
        
        // Check if last 7 digits match (in case area code is different)
        if (storedCleanPhone.length >= 7 && cleanPhone.length >= 7) {
          const storedLast7 = storedCleanPhone.slice(-7)
          const searchLast7 = cleanPhone.slice(-7)
          return storedLast7 === searchLast7
        }
        
        return false
      })
    }

    return new Response(
      JSON.stringify(filteredData),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})