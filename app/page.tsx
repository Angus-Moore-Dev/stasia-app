import Image from 'next/image';

import { createServerClient } from '@/utils/createServerClient';
import SignUpModal from '@/components/SignUpModal';
import SignOutButton from '@/components/SignOutButton';
import DreamDashboard from '@/components/DreamDashboard';

export default async function Home()
{
	const supabase = createServerClient();
	const user = (await supabase.auth.getUser()).data.user;

	return <main className="flex min-h-screen flex-col items-center gap-5 p-24 max-w-5xl mx-auto">
		<Image src='/logo.png' alt='Logo' width={384} height={64.5} />
		<span className='text-primary text-2xl font-semibold mb-5'>
			A free dream recording / insights tool.
		</span>
		{
			user &&
			<SignOutButton user={user} />
		}
		{/* <p className='text-center'>
			Easily write down and store your dreams here, tagging them for deriving insights. To begin, simply type out your dream in the editor below.
			If you need to sign in, please do so below. It&apos;s completely free, and you can use it as much as you want. Updates will occur randomly, so check back often.
		</p> */}
		{
			!user &&
			<SignUpModal />
		}
		{
			user &&
			<DreamDashboard user={user} />
		}
	</main>
}