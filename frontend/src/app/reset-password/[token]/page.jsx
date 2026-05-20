"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { HiOutlineLockClosed, HiOutlineCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams();
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    // Simulate token validation
    const validateToken = async () => {
      setCheckingToken(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Logic to check token validity from backend
        setIsValidToken(true); 
      } catch (error) {
        setIsValidToken(false);
      } finally {
        setCheckingToken(false);
      }
    };
    validateToken();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    
    setIsLoading(true);
    try {
      // In a real app, call API
      // await authService.resetPassword(token, formData.password);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
      </div>
    );
  }

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

          {!isValidToken ? (
            <>
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <HiOutlineExclamationCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 font-display">Invalid Link</h2>
              <p className="text-slate-500 mt-4 font-medium leading-relaxed">
                This password reset link is invalid or has expired. Please request a new one.
              </p>
            </>
          ) : isSuccess ? (
            <>
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <HiOutlineCheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 font-display">Success!</h2>
              <p className="text-slate-500 mt-4 font-medium leading-relaxed">
                Your password has been reset successfully. You can now log in with your new password.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-slate-900 font-display">Reset Password</h2>
              <p className="text-slate-500 mt-4 font-medium leading-relaxed">
                Please enter your new password below.
              </p>
            </>
          )}
        </div>

        {!isValidToken ? (
          <div className="space-y-6">
            <Link href="/forgot-password">
              <Button className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-200">
                Request New Link
              </Button>
            </Link>
          </div>
        ) : isSuccess ? (
          <div className="space-y-6">
            <Link href="/login">
              <Button className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-200">
                Proceed to Login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="New Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="rounded-2xl py-4"
            />
            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="rounded-2xl py-4"
            />

            <Button 
              type="submit" 
              className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-200" 
              isLoading={isLoading}
            >
              Update Password
            </Button>
          </form>
        )}

        <div className="mt-10 text-center">
          <Link 
            href="/login" 
            className="font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
