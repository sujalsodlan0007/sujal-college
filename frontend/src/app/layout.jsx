import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { PropertyProvider } from "@/context/PropertyContext";

export const metadata = {
  title: "PreLease AI Platform | Modern Property SaaS",
  description: "Find your perfect home with AI-powered property search and management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body 
        className="bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900"
        suppressHydrationWarning
      >
        <AuthProvider>
          <PropertyProvider>
            <Toaster position="top-right" />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </PropertyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
