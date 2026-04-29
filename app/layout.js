import './globals.css';
import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import GlobalTransition from '@/components/GlobalTransition';

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
});

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif' 
});

export const metadata = {
  title: 'Sweety Fashion',
  description: 'Premium minimalist fashion for the modern woman.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <div className="global-bg" />
        <GlobalTransition />
        {children}
      </body>
    </html>
  );
}

