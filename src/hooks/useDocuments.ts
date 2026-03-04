import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Document } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useDocuments = (boatId?: string) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && boatId) {
      fetchDocuments();
    }
  }, [user, boatId]);

  const fetchDocuments = async () => {
    if (!boatId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('boat_id', boatId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (err) {
      setError('Failed to fetch documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (
    file: File,
    category: Document['category'],
    notes?: string
  ) => {
    if (!boatId || !user) return;

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${boatId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Create document record
      const { data, error: dbError } = await supabase
        .from('documents')
        .insert([
          {
            boat_id: boatId,
            user_id: user.id,
            file_url: publicUrl,
            file_name: file.name,
            category,
            notes,
          },
        ])
        .select()
        .single();

      if (dbError) throw dbError;
      setDocuments([data, ...documents]);
      return data;
    } catch (err) {
      console.error('Failed to upload document:', err);
      throw err;
    }
  };

  const deleteDocument = async (id: string, fileUrl: string) => {
    try {
      // Extract file path from URL
      const pathMatch = fileUrl.match(/documents\/(.+)$/);
      if (pathMatch) {
        const filePath = pathMatch[1];
        await supabase.storage.from('documents').remove([filePath]);
      }

      // Delete database record
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setDocuments(documents.filter((doc) => doc.id !== id));
    } catch (err) {
      console.error('Failed to delete document:', err);
      throw err;
    }
  };

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
  };
};
