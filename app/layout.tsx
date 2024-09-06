import { Mada } from "next/font/google"
// import type { Metadata } from "next";
import Navbar from "@/packages/components/Navbar";

export const metadata = {
  title: 'Xura',
  description: 'Control Escolar Xura TSJ',
  keywords: ['login, tsj'],
}

const mada = Mada({
  weight: ["300", "500", "600"],
  subsets: ["latin"],
});

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  const isAuthenticated = true;
  const userRole = 1;
  return (
      <html lang="en">
      <body className={mada.className}>
      <Navbar isAuthenticated={isAuthenticated} rol={userRole} />
      {children}
      </body>
      </html>
  )
}
