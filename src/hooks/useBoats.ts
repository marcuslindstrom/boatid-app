import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Boat } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useBoats = () => {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBoats();
    }
  }, [user]);

  const fetchBoats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('boats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBoats(data || []);
    } catch (err) {
      setError('Failed to fetch boats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createBoat = async (boatData: Partial<Boat>) => {
    try {
      const { data, error } = await supabase
        .from('boats')
        .insert([boatData])
        .select()
        .single();

      if (error) throw error;
      setBoats([data, ...boats]);
      return data;
    } catch (err) {
      console.error('Failed to create boat:', err);
      throw err;
    }
  };

  const updateBoat = async (id: string, updates: Partial<Boat>) => {
    try {
      const { data, error } = await supabase
        .from('boats')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setBoats(boats.map(boat => boat.id === id ? data : boat));
      return data;
    } catch (err) {
      console.error('Failed to update boat:', err);
      throw err;
    }
  };

  const deleteBoat = async (id: string) => {
    try {
      const { error } = await supabase
        .from('boats')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBoats(boats.filter(boat => boat.id !== id));
    } catch (err) {
      console.error('Failed to delete boat:', err);
      throw err;
    }
  };

  return {
    boats,
    loading,
    error,
    fetchBoats,
    createBoat,
    updateBoat,
    deleteBoat,
  };
};
