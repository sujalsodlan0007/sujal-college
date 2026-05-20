"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineCheckCircle, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineUserGroup } from "react-icons/hi";
import Button from "@/components/common/Button";

export default function PricingPage() {
  const plans = [
    {
      name: "Lite",
      price: "£499",
      desc: "Perfect for boutique developments and independent operators.",
      features: [
        "Up to 10 Unit Listings",
        "Basic PreLease AI Scoring",
        "Standard Renter Dashboard",
        "Email Support",
        "Place-3D Ready",
        "Basic Analytics"
      ],
      color: "border-slate-100",
      icon: HiOutlineUserGroup
    },
    {
      name: "Professional",
      price: "£1,299",
      desc: "For high-growth portfolios requiring deep AI intelligence.",
      features: [
        "Unlimited Unit Listings",
        "Full AI Lifestyle Matching",
        "Advanced CRM Integration",
        "Priority 24/7 Support",
        "Custom Virtual Tours",
        "Advanced Lead Analytics",
        "Automated WhatsApp Qualify",
        "Performance Reports"
      ],
      color: "border-blue-600 ring-4 ring-blue-50 shadow-2xl",
      featured: true,
      icon: HiOutlineLightningBolt
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Bespoke solutions for national operators and major funds.",
      features: [
        "Multi-portfolio Management",
        "White-label Renter App",
        "Dedicated Account Manager",
        "Full API Access",
        "Custom Feature Development",
        "Quarterly Strategic Reviews",
        "On-site Team Training",
        "SLA Guarantees"
      ],
      color: "border-slate-100",
      icon: HiOutlineShieldCheck
    }
  ];

  return (
    <main className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 font-display tracking-tight leading-[1.1] mb-8">
              Simple, transparent <br />
              <span className="text-blue-600 font-black">growth packages.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Choose the level of intelligence your portfolio needs to scale. All plans include core platform features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white p-12 rounded-[3.5rem] border ${plan.color} relative flex flex-col h-full`}
              >
                {plan.featured && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-200">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-10">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                    <plan.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 font-display tracking-tight mb-2">{plan.name}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm mb-8">{plan.desc}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900 font-display tracking-tighter">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">/ month</span>}
                  </div>
                </div>

                <ul className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <HiOutlineCheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-bold text-slate-600 tracking-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className="mt-auto">
                  <Button variant={plan.featured ? "primary" : "secondary"} className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs border-2 shadow-xl shadow-slate-100">
                    {plan.price === "Custom" ? "Contact Enterprise" : "Start Free Trial"}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-slate-500 font-medium">Need something custom for a portfolio over 500 units? <Link href="/contact" className="text-blue-600 font-black hover:underline">Speak to our Strategy Team.</Link></p>
          </div>
        </div>
      </section>

      {/* FAQ Simplified */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 font-display tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-10">
            {[
              { q: "How long is the setup process?", a: "For Lite and Pro plans, we can have your first development live within 48 hours." },
              { q: "Can we integrate our existing CRM?", a: "Yes, our Professional and Enterprise plans support full two-way sync with major CRMs like Reapit and Alto." },
              { q: "Do you offer multi-site discounts?", a: "Yes, our Enterprise pricing is specifically designed to be cost-effective for large portfolios." }
            ].map((faq, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-3 font-display">{faq.q}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
