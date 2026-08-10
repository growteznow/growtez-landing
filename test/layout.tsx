
import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Tablekard — Smart QR Ordering for Modern Restaurants',
  description: 'Tablekard provides seamless QR-based contactless dine-in ordering for restaurants. Turn every table into a smart, self-service ordering station to increase efficiency and revenue.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css?v=2" />
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js?v=2" async></script>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" async></script>
        <script src="https://unpkg.com/libphonenumber-js@1.10.44/bundle/libphonenumber-max.js" async></script>
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
