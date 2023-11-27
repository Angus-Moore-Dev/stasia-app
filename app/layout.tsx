import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Notifications } from '@mantine/notifications';

import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
const inter = Inter({ subsets: ['latin'] });

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
		<html lang="en">
			<head>
				<ColorSchemeScript color='dark' forceColorScheme='dark' defaultColorScheme='dark' />
			</head>
			<body className={inter.className}>
				<MantineProvider defaultColorScheme='dark' >
					<Notifications />
					{children}
				</MantineProvider>
			</body>
		</html>
	)
}
