import "./globals.css"
import { LoadingProvider } from "./contexts/LoadingContext"
import SplineBackground from "./components/SplineBackground"
import Head from "next/head";
import { Analytics } from "./components/Analytics";
import BackToTopButton from "./components/BackToTopButton";

export const metadata = {
  title: "Dimos Gkontevas - Web Developer Portfolio",
  description: "Portfolio showcasing modern web development projects and skills in React, Next.js, and JavaScript.",
  keywords: ["web developer", "portfolio", "React", "Next.js", "JavaScript"],
  robots: "index, follow",
  openGraph: {
    title: "Dimos Gkontevas - Web Developer Portfolio",
    description: "Portfolio showcasing modern web development projects and skills in React, Next.js, and JavaScript.",
    url: "https://yourdomain.com/",
    siteName: "Dimos Gkontevas Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dimos Gkontevas Portfolio Preview"
      }
    ],
    locale: "en_US",
    type: "website"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <Head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        <meta name="robots" content={metadata.robots} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
      </Head>
      <body className="relative overflow-x-hidden antialiased">
        <LoadingProvider>
          <SplineBackground />
          <Analytics />
          <BackToTopButton />
          <div className="relative z-20 min-h-screen overflow-x-hidden">{children}</div>
        </LoadingProvider>
      </body>
    </html>
  );
}