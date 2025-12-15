import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MEIFI Arquitetura - Espaços com Propósito',
  description: 'Transformando ideias em espaços que acolhem',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}




