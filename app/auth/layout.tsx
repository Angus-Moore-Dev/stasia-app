import type { Metadata } from 'next'
import { Inter, Rajdhani, Ubuntu } from 'next/font/google'
import '../globals.css'
import AppNavbar from '@/components/AppNavbar';

const inter = Rajdhani({ subsets: ['latin'], weight: '600' });
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Stasia',
	description: 'The Free Note Taker, Project Documentation and Wiki App.',
	icons: {
		icon: '/favicon.ico'
	}
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<main lang="en" className={`${inter.className} bg-background text-white dark min-h-screen flex flex-col`}>
			<AppNavbar />
			{children}
		</main>
	)
}
