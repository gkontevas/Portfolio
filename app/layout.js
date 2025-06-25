import "./globals.css"
import { LoadingProvider } from "./contexts/LoadingContext"
import SplineBackground from "./components/SplineBackground"

export const metadata = {
  title: "Dimos Gkontevas - Web Developer Portfolio",
  description: "Portfolio showcasing modern web development projects and skills in React, Next.js, and JavaScript",
  keywords: ["web developer", "portfolio", "React", "Next.js", "JavaScript"],
  robots: "index, follow"
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body className="relative overflow-x-hidden antialiased">
        <LoadingProvider>
          <SplineBackground />
          <div className="relative z-20 min-h-screen overflow-x-hidden">{children}</div>
        </LoadingProvider>
      </body>
    </html>
  );
}