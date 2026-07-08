import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "GT Planet Auto Parts Sdn. Bhd. | Japanese Used Auto Parts Since 2006",
  description:
    "GT Planet Auto Parts supplies quality used automotive spare parts and components, mainly imported from Japan. Based in Sungai Petani, Kedah with nationwide delivery across Malaysia.",
  keywords: [
    "used auto parts",
    "Japanese car parts",
    "Malaysia",
    "Kedah",
    "Sungai Petani",
    "engine",
    "gearbox",
    "Toyota",
    "Honda",
    "Nissan",
    "spare parts"
  ],
  openGraph: {
    title: "GT Planet Auto Parts Sdn. Bhd.",
    description:
      "Japanese used auto parts supplier based in Sungai Petani, Kedah since 2006.",
    type: "website",
    locale: "en_MY"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-white text-zinc-900 antialiased">
        <Script
          id="tailwind-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.tailwind = window.tailwind || {};
              window.tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      brand: {
                        black: '#0a0a0a',
                        dark: '#111111',
                        grey: '#1a1a1a',
                        metal: '#71717A',
                        metalLight: '#A1A1AA',
                        red: '#DC2626',
                        redDark: '#991B1B',
                        redDarker: '#7F1D1D',
                      }
                    },
                    fontFamily: {
                      sans: ['Inter', 'sans-serif'],
                      serif: ['Playfair Display', 'serif'],
                    }
                  }
                }
              };
            `
          }}
        />
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <Script src="https://code.iconify.design/3/3.1.0/iconify.min.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
