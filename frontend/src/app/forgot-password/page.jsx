"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { HiOutlineMail, HiOutlineArrowLeft } from "react-icons/hi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // In a real app, call API
      // await authService.forgotPassword(email);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      toast.success("Reset link sent to your email!");
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Property <span className="text-blue-600">Sense</span>
            </span>
          </Link>
          
          {!isSubmitted ? (
            <>
              <h2 className="text-3xl font-bold text-slate-900 font-display">Forgot Password?</h2>
              <p className="text-slate-500 mt-4 font-medium leading-relaxed">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <HiOutlineMail className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 font-display">Check your email</h2>
              <p className="text-slate-500 mt-4 font-medium leading-relaxed">
                We've sent a password reset link to <span className="text-slate-900 font-bold">{email}</span>.
              </p>
            </>
          )}
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-2xl py-4"
            />

            <Button 
              type="submit" 
              className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-200" 
              isLoading={isLoading}
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <Button 
              variant="secondary"
              onClick={() => setIsSubmitted(false)}
              className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest border-2"
            >
              Resend Email
            </Button>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
          >
            <HiOutlineArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
