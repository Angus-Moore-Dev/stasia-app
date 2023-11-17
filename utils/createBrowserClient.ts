import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";

/**
 * For use in files with the "use client" pragma.
 */
export const createBrowserClient = () => createClientComponentClient<Database>({ 
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});