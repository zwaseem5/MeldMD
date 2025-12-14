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

    const { action, appointment_id, calendar_provider } = await req.json()

    if (action === 'sync_appointment') {
      // Get appointment details
      const { data: appointment, error: appointmentError } = await supabaseClient
        .from('appointments')
        .select('*')
        .eq('id', appointment_id)
        .eq('user_id', user.id)
        .single()

      if (appointmentError || !appointment) {
        return new Response(
          JSON.stringify({ error: 'Appointment not found' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404,
          }
        )
      }

      // Create calendar event data
      const startDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`)
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // 1 hour duration

      const calendarEvent = {
        summary: `${appointment.appointment_type} - New Life`,
        description: `Appointment Type: ${appointment.appointment_type}\n${appointment.provider_name ? `Provider: ${appointment.provider_name}\n` : ''}${appointment.location ? `Location: ${appointment.location}\n` : ''}${appointment.notes ? `Notes: ${appointment.notes}` : ''}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'America/New_York'
        },
        location: appointment.location || 'New Life Healthcare',
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 24 hours before
            { method: 'popup', minutes: 30 } // 30 minutes before
          ]
        }
      }

      // Generate calendar links for different providers
      const calendarLinks = {
        google: generateGoogleCalendarLink(calendarEvent),
        outlook: generateOutlookCalendarLink(calendarEvent),
        apple: generateAppleCalendarLink(calendarEvent),
        ics: generateICSFile(calendarEvent)
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          calendar_links: calendarLinks,
          message: 'Calendar sync links generated successfully'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    if (action === 'get_all_appointments_ics') {
      // Get all user appointments
      const { data: appointments, error } = await supabaseClient
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'scheduled')
        .order('appointment_date', { ascending: true })

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch appointments' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          }
        )
      }

      // Generate ICS file for all appointments
      const icsContent = generateBulkICSFile(appointments)

      return new Response(icsContent, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/calendar',
          'Content-Disposition': 'attachment; filename="newlife-appointments.ics"'
        },
        status: 200,
      })
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )

  } catch (error) {
    console.error('Calendar sync error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

function generateGoogleCalendarLink(event: any): string {
  const startDate = new Date(event.start.dateTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const endDate = new Date(event.end.dateTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.summary,
    dates: `${startDate}/${endDate}`,
    details: event.description,
    location: event.location || ''
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function generateOutlookCalendarLink(event: any): string {
  const startDate = new Date(event.start.dateTime).toISOString()
  const endDate = new Date(event.end.dateTime).toISOString()
  
  const params = new URLSearchParams({
    subject: event.summary,
    startdt: startDate,
    enddt: endDate,
    body: event.description,
    location: event.location || ''
  })

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

function generateAppleCalendarLink(event: any): string {
  return generateICSFile(event, true)
}

function generateICSFile(event: any, isDataUrl = false): string {
  const startDate = new Date(event.start.dateTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const endDate = new Date(event.end.dateTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//New Life//Healthcare Appointments//EN',
    'BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}@newlife.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${event.summary}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location || ''}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Appointment Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  if (isDataUrl) {
    return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`
  }

  return icsContent
}

function generateBulkICSFile(appointments: any[]): string {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//New Life//Healthcare Appointments//EN'
  ]

  appointments.forEach(appointment => {
    const startDateTime = new Date(`${appointment.appointment_date}T${appointment.appointment_time}`)
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000)
    
    const startDate = startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const endDate = endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    
    const description = `Appointment Type: ${appointment.appointment_type}${appointment.provider_name ? `\\nProvider: ${appointment.provider_name}` : ''}${appointment.location ? `\\nLocation: ${appointment.location}` : ''}${appointment.notes ? `\\nNotes: ${appointment.notes}` : ''}`

    icsContent.push(
      'BEGIN:VEVENT',
      `UID:${appointment.id}@newlife.com`,
      `DTSTAMP:${now}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${appointment.appointment_type} - New Life`,
      `DESCRIPTION:${description}`,
      `LOCATION:${appointment.location || 'New Life Healthcare'}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT30M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Appointment Reminder',
      'END:VALARM',
      'END:VEVENT'
    )
  })

  icsContent.push('END:VCALENDAR')
  return icsContent.join('\r\n')
}