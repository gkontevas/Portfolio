import "./globals.css"
import { LoadingProvider } from "./contexts/LoadingContext"

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
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -10,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
           </div>
        <LoadingProvider>
          <div className="relative z-10 min-h-screen overflow-x-hidden">{children}</div>
        </LoadingProvider>
      </body>
    </html>
  );
}
