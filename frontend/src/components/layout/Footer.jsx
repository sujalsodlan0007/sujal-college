"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const isDashboardPage = pathname.startsWith("/account") || pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname.startsWith("/register");
  if (isDashboardPage) return null;

  const footerLinks = [
    {
      title: "Solutions",
      links: [
        { name: "For Renters", href: "/find-a-home" },
        { name: "For Operators", href: "/operators" },
        { name: "PreLease AI", href: "/platform" },
        { name: "Lettings", href: "/lettings" },
      ],
    },
    {
      title: "Platform",
      links: [
        { name: "How it works", href: "/how-it-works" },
        { name: "Pricing", href: "/pricing" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Book a Demo", href: "/book-demo" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-8 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                PreLease <span className="text-blue-600">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed font-medium">
              The B2B and B2C solution for modern rental living. We use advanced AI to match your lifestyle with the world's most premium developments.
            </p>
            <div className="flex items-center space-x-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-8">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
          <p>© {currentYear} PreLease AI Platform. All rights reserved.</p>
          <div className="mt-6 md:mt-0 flex items-center space-x-8">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
