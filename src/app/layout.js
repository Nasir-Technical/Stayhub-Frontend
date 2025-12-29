import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'StayHub - Find Your Perfect Stay',
  description: 'Multi-hotel booking platform for seamless travel experiences.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
