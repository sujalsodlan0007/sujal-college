"use client";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 font-display tracking-tight mb-12">Privacy Policy</h1>
        <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-8">
          <p>Last updated: May 20, 2026</p>
          <p>At Property Sense, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our platform.</p>
          
          <h3 className="text-2xl font-bold text-slate-900 font-display pt-8">1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, set up your preferences, or contact an operator. This includes your name, email, phone number, and property preferences.</p>
          
          <h3 className="text-2xl font-bold text-slate-900 font-display pt-8">2. How We Use Your Data</h3>
          <p>Your data is primarily used to power our PreLease AI matching engine. We share your information with property operators only when you explicitly submit an enquiry or book a viewing.</p>
          
          <h3 className="text-2xl font-bold text-slate-900 font-display pt-8">3. Data Security</h3>
          <p>We implement industry-standard security measures to protect your data from unauthorized access or disclosure.</p>
        </div>
      </section>
    </main>
  );
}
