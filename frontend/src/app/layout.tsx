import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LinkNest Frontend',
  description: 'Next.js frontend for LinkNest'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
