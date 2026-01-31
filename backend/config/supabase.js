import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.log('Please add:');
  console.log('SUPABASE_URL=your-project-url');
  console.log('SUPABASE_SERVICE_KEY=your-service-role-key');
  process.exit(1);
}

// Create Supabase client with service role (bypasses RLS)
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Test connection function
export const connectSupabase = async () => {
  try {
    // Test connection by querying users table
    const { error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection failed');
      console.error('Error:', error.message);
      console.log('\n🔧 Make sure you:');
      console.log('1. Created tables using SQL in Supabase dashboard');
      console.log('2. Added correct SUPABASE_URL and SUPABASE_SERVICE_KEY in .env');
      console.log('3. Your Supabase project is active\n');
      global.isSupabaseConnected = false;
      return;
    }
    
    console.log('✅ Supabase Connected Successfully!');
    console.log(`📊 Database: PostgreSQL`);
    console.log(`🌐 Project URL: ${supabaseUrl}\n`);
    global.isSupabaseConnected = true;
    
  } catch (error) {
    console.error('❌ Supabase connection error:', error.message);
    global.isSupabaseConnected = false;
  }
};

export default supabase;
