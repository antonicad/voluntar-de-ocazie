// supabaseClient.jsx
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gdanjfqvbfnytsynciit.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkYW5qZnF2YmZueXRzeW5jaWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzY4NTMsImV4cCI6MjA1ODA1Mjg1M30.ETjUPMP91nAKZa7KqkTvldVdkydsMvwezdvEfq2_Dig';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
