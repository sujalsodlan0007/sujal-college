"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/account/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              PreLease <span className="text-blue-600">AI</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Enter your details to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id="email"
          />
          <div className="space-y-1">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
            />
            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full py-4 rounded-xl text-lg" 
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link 
              href="/register" 
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
