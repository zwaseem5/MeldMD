
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface Appointment {
  id: string;
  user_id?: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  provider_name?: string;
  location?: string;
  notes?: string;
  status: string;
  created_at: string;
  updated_at?: string;
  source?: 'direct' | 'assistant';
  patient_name?: string;
  phone_number?: string;
}

export function useAppointments() {
  const { user, session } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    if (!user || !session) {
      setAppointments([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error('Supabase URL not configured');
      }

      // Use the correct function name that exists
      const response = await fetch(`${supabaseUrl}/functions/v1/get-appointments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to fetch appointments'}`);
      }

      const data = await response.json();
      setAppointments(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to fetch appointments: ${String(err)}`;
      setError(errorMessage);
      console.error('Error fetching appointments:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // New function to search guest appointments by name and phone
  const searchGuestAppointments = async (name: string, phone: string) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error('Supabase URL not configured');
      }

      // Clean phone number - remove all non-digits
      const cleanPhone = phone.replace(/\D/g, '');
      
      const response = await fetch(`${supabaseUrl}/functions/v1/get-appointments-by-patient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to search appointments'}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setAppointments(data);
        return { success: true, appointments: data };
      } else {
        setAppointments([]);
        return { success: false, message: 'No appointments found. Please check the name and phone number.' };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to search appointments: ${String(err)}`;
      setError(errorMessage);
      console.error('Error searching appointments:', errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const scheduleAppointment = async (appointmentData: {
    appointment_date: string;
    appointment_time: string;
    appointment_type: string;
    provider_name?: string;
    location?: string;
    notes?: string;
  }) => {
    if (!user || !session) {
      throw new Error('User must be logged in to schedule appointments');
    }

    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/schedule-appointment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule appointment');
      }

      await fetchAppointments();
      return { success: true, appointment: data.appointment };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to schedule appointment';
      setError(error);
      return { success: false, error };
    }
  };

  const updateAppointment = async (appointmentId: string, updateData: {
    appointment_date?: string;
    appointment_time?: string;
    appointment_type?: string;
    provider_name?: string;
    location?: string;
    notes?: string;
    status?: string;
  }) => {
    if (!user || !session) {
      throw new Error('User must be logged in to update appointments');
    }

    try {
      const isGuestAppointment = appointmentId.startsWith('guest_');
      const realId = isGuestAppointment ? appointmentId.replace('guest_', '') : appointmentId;
      
      const endpoint = isGuestAppointment 
        ? 'update-guest-appointment'
        : 'update-appointment';

      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointment_id: realId,
          ...updateData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update appointment');
      }

      await fetchAppointments();
      return { success: true, appointment: data.appointment };
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Failed to update appointment';
      setError(error);
      return { success: false, error };
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    return updateAppointment(appointmentId, { status: 'cancelled' });
  };

  useEffect(() => {
    fetchAppointments();
  }, [user, session]);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    searchGuestAppointments,
    scheduleAppointment,
    updateAppointment,
    cancelAppointment,
  };
}
