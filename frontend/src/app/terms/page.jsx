"use client";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 font-display tracking-tight mb-12">Terms of Service</h1>
        <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-8">
          <p>Last updated: May 20, 2026</p>
          <p>By using the Property Sense platform, you agree to comply with and be bound by the following terms and conditions.</p>
          
          <h3 className="text-2xl font-bold text-slate-900 font-display pt-8">1. User Eligibility</h3>
          <p>You must be at least 18 years old to create an account and use the leasing features of our platform.</p>
          
          <h3 className="text-2xl font-bold text-slate-900 font-display pt-8">2. Accurate Information</h3>
          <p>You agree to provide accurate and truthful information when setting up your renter profile and submitting enquiries.</p>
          
          <h3 className="text-2xl font-bold text-slate-900 font-display pt-8">3. Platform Usage</h3>
          <p>Our platform is intended to facilitate connections between renters and property operators. Property Sense does not act as a landlord or property manager.</p>
        </div>
      </section>
    </main>
  );
}
