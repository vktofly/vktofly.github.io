'use client';

import { ThemeProvider } from 'next-themes';
import Script from 'next/script';

export default function Providers({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      {children}
    </ThemeProvider>
  );
}


