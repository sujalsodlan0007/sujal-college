"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiOutlineUser } from "react-icons/hi";
import Button from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/utils/cn";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDashboardPage = pathname.startsWith("/account") || pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname.startsWith("/register");
  
  if (isDashboardPage) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "For Renters", href: "/find-a-home" },
    { name: "For Operators", href: "/operators" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Book Demo", href: "/book-demo" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm" 
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              PreLease <span className="text-blue-600 group-hover:text-slate-900">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center bg-slate-50/50 backdrop-blur-sm border border-slate-100 rounded-2xl px-2 py-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                  pathname === link.href
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-blue-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/account/dashboard">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors">
                    <HiOutlineUser className="w-5 h-5" />
                  </div>
                </Link>
                <Button variant="ghost" onClick={logout} size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors px-4">
                  Log in
                </Link>
                <Link href="/book-demo">
                  <Button size="md" className="rounded-xl font-bold px-6 py-2.5">
                    Book a Demo
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-bold transition-all",
                    pathname === link.href
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                {user ? (
                  <>
                    <Link href="/account/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="secondary" className="w-full">My Dashboard</Button>
                    </Link>
                    <Button variant="ghost" onClick={logout} className="w-full text-red-500 hover:bg-red-50">Logout</Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">Log in</Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
