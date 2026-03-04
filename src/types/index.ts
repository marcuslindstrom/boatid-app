export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Boat {
  id: string;
  user_id: string;
  name: string;
  make?: string;
  model?: string;
  year?: number;
  photo_url?: string;
  hin?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  boat_id: string;
  user_id: string;
  file_url: string;
  file_name: string;
  category: 'receipt' | 'manual' | 'insurance' | 'registration' | 'protocol' | 'other';
  notes?: string;
  created_at: string;
}

export interface ServiceEvent {
  id: string;
  boat_id: string;
  user_id: string;
  date: string;
  description: string;
  cost?: number;
  document_id?: string;
  created_at: string;
}

export interface Reminder {
  id: string;
  boat_id: string;
  user_id: string;
  task_name: string;
  due_date: string;
  completed: boolean;
  created_at: string;
}

export interface Expense {
  id: string;
  boat_id: string;
  user_id: string;
  amount: number;
  category: 'fuel' | 'maintenance' | 'insurance' | 'docking' | 'winter_storage' | 'other';
  date: string;
  notes?: string;
  created_at: string;
}
