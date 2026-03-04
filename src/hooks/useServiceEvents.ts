import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ServiceEvent } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useServiceEvents = (boatId?: string) => {
  const [events, setEvents] = useState<ServiceEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && boatId) {
      fetchEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, boatId]);

  const fetchEvents = async () => {
    if (!boatId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('service_events')
        .select('*')
        .eq('boat_id', boatId)
        .order('date', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError('Failed to fetch service events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Partial<ServiceEvent>) => {
    if (!boatId || !user) return;

    try {
      const { data, error } = await supabase
        .from('service_events')
        .insert([
          {
            ...eventData,
            boat_id: boatId,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setEvents([data, ...events]);
      return data;
    } catch (err) {
      console.error('Failed to create service event:', err);
      throw err;
    }
  };

  const updateEvent = async (id: string, updates: Partial<ServiceEvent>) => {
    try {
      const { data, error } = await supabase
        .from('service_events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setEvents(events.map((event) => (event.id === id ? data : event)));
      return data;
    } catch (err) {
      console.error('Failed to update service event:', err);
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('service_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setEvents(events.filter((event) => event.id !== id));
    } catch (err) {
      console.error('Failed to delete service event:', err);
      throw err;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
