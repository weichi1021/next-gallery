import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
