import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest)
{
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    // Get the path, and if it's not /auth, check if the user is logged in
    // const path = req.nextUrl.pathname;
    // if (path !== '/auth' && !(await supabase.auth.getUser()).data.user)
    // {
    //     return NextResponse.redirect(new URL('/auth', req.nextUrl));
    // }

    await supabase.auth.getSession();
    return res;
}