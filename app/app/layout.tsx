import type { Metadata } from 'next'
import { Inter, Rajdhani, Ubuntu } from 'next/font/google'
import '../globals.css'

const inter = Rajdhani({ subsets: ['latin'], weight: '600' })

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
		<main lang="en" className={`${inter.className} bg-background text-white dark`}>
			{children}
		</main>
	)
}
