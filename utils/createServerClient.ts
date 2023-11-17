import { createRouteHandlerClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./database.types";

/**
 * For use in page.tsx files.
 */
export const createServerClient = () => createServerComponentClient<Database>({ cookies });

/**
 * For use in API routing.
 */
export const createApiClient = () => createRouteHandlerClient<Database>({ cookies });

export const createAdminApiClient = () => createRouteHandlerClient<Database>({ cookies }, { supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY });