import { Button } from '@/components/ui/button';
import { createServerClient } from '@/utils/createServerClient';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function AppDashboard()
{
	const supabase = createServerClient();

	const user = await (await supabase.auth.getUser()).data.user;

	if (!user)
		redirect('/auth');

	return (
		<main className="flex min-h-screen flex-col items-center gap-10 p-24">
			Home Page
		</main>
	)
}
