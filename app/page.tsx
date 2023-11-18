import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function Home()
{
	return (
		<main className="flex min-h-screen flex-col items-center gap-10 p-24">
			<Image src='/logo.png' alt='Logo' width={768} height={129} />
			<span className='text-primary text-2xl font-semibold'>
				The Free Note-Taking tool for personal use, team documentation or wikis.
			</span>
		</main>
	)
}
