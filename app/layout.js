import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-serif' 
});

export const metadata = {
  title: 'NOVAELLE | Modern Luxury Fashion',
  description: 'Premium minimalist fashion for the modern woman.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <div className="global-bg" />
        {children}
      </body>
    </html>

  );
}
