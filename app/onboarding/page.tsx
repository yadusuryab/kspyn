'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  storeName: string;
  storeCategory: string;
  storeInstagram: string;
  websiteType: string;
  selectedDesign: string;
  primaryColor: string;
  agreedToTerms: boolean;
}

const CATEGORIES = [
  'Fashion Accessories', 'Footwears', 'Watches', 'Clothing',
  'Electronics', 'Home Decor', 'Beauty & Cosmetics', 'Jewelry',
  'Sports Equipment', 'Books', 'Other',
];

const PLANS = [
  { value: 'WhatsApp Orders', label: 'WhatsApp Orders', price: '₹5,000', icon: '💬' },
  { value: 'Online Payment', label: 'Online Payment', price: '₹7,000', icon: '💳', popular: true },
  { value: 'Custom', label: 'Custom / Offer Based', price: 'Contact Us', icon: '🚀' },
];

const DESIGNS = [
  { name: 'Modern Minimal', color: '#f1f5f9' },
  { name: 'Vibrant Commerce', color: '#fce7f3' },
  { name: 'Professional', color: '#e0e7ff' },
  { name: 'Creative Boutique', color: '#fef3c7' },
];

const inp = (err?: boolean) =>
  `w-full px-4 py-3 bg-black/30 border rounded-lg text-sm outline-none transition-all focus:border-white focus:ring-2 focus:ring-indigo-100 ${err ? 'border-red-400' : 'border-gray-200'}`;

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', phone: '', storeName: '', storeCategory: '',
    storeInstagram: '', websiteType: '', selectedDesign: '',
    primaryColor: '#6366f1', agreedToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (field: keyof FormData, value: unknown) => {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = (s: number) => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!form.fullName) e.fullName = 'Required';
      if (!form.email) e.email = 'Required';
      if (!form.phone) e.phone = 'Required';
    }
    if (s === 2) {
      if (!form.storeName) e.storeName = 'Required';
      if (!form.storeCategory) e.storeCategory = 'Required';
    }
    if (s === 3) {
      if (!form.websiteType) e.websiteType = 'Please select a plan';
    }
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => validate(step) && setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreedToTerms) return;
    setLoading(true);
    try {
      await fetch('/api/submit-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
      });
    } catch {}
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center max-w-sm w-full">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Request Submitted!</h2>
          <p className="text-gray-500 text-sm">Hi {form.fullName}, we'll contact you within 24 hours to set up <strong className="text-gray-700">{form.storeName || 'your store'}</strong>.</p>
        </motion.div>
      </div>
    );
  }

  const steps = ['You', 'Your Store', 'Plan', 'Confirm'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Top bar */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white text-md italic">Shopigo</span>
        </div>
        <span className="text-xs text-gray-400">Step {step} of {steps.length}</span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-gray-700">
        <motion.div className="h-full bg-indigo-500"
          animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4 }} />
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Step indicators */}
          <div className="flex justify-between mb-8 px-1">
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center gap-1">
                <div className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                  step > i + 1 ? 'bg-indigo-500 text-white' :
                  step === i + 1 ? 'bg-indigo-500 text-white ring-4 ring-indigo-500/30' :
                  'bg-gray-700 text-gray-400'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-semibold pt-2 ${step === i + 1 ? 'text-indigo-400' : 'text-gray-500'}`}>{s}</span>
              </div>
            ))}
          </div>

          <form onSubmit={submit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 space-y-4 shadow-xl">
                  <div>
                    <h2 className="text-lg font-semibold text-white">About You</h2>
                    <p className="text-sm text-gray-300">So we know who to contact</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Full Name *</label>
                    <input className={inp(!!errors.fullName)} type="text" placeholder="Your name"
                      value={form.fullName} onChange={e => set('fullName', e.target.value)} autoFocus />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Email *</label>
                    <input className={inp(!!errors.email)} type="email" placeholder="Email Address"
                      value={form.email} onChange={e => set('email', e.target.value)} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">WhatsApp / Phone *</label>
                    <input className={inp(!!errors.phone)} type="tel" placeholder="+91 98765 43210"
                      value={form.phone} onChange={e => set('phone', e.target.value)} />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 space-y-4 shadow-xl">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Your Store</h2>
                    <p className="text-sm text-gray-300">Basic info about your business</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Store Name *</label>
                    <input className={inp(!!errors.storeName)} type="text" placeholder="e.g. Fashion Hub"
                      value={form.storeName} onChange={e => set('storeName', e.target.value)} autoFocus />
                    {errors.storeName && <p className="text-red-400 text-xs mt-1">{errors.storeName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">Category *</label>
                    <select className={inp(!!errors.storeCategory)}
                      value={form.storeCategory} onChange={e => set('storeCategory', e.target.value)}>
                      <option value="">Select category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.storeCategory && <p className="text-red-400 text-xs mt-1">{errors.storeCategory}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Instagram Handle <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input className={inp()} type="text" placeholder="@yourstore"
                      value={form.storeInstagram} onChange={e => set('storeInstagram', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Brand Color <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <input type="color" className="w-10 h-10 rounded-lg border border-white/20 bg-white/10 cursor-pointer p-0.5"
                        value={form.primaryColor} onChange={e => set('primaryColor', e.target.value)} />
                      <span className="text-sm text-gray-300 font-mono">{form.primaryColor}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 space-y-5 shadow-xl">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Choose a Plan</h2>
                    <p className="text-sm text-gray-300">Pick what works best for your store</p>
                  </div>
                  <div className="space-y-2">
                    {PLANS.map(plan => (
                      <label key={plan.value}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                          form.websiteType === plan.value
                            ? 'border-indigo-500 bg-indigo-500/20'
                            : 'border-white/20 hover:border-white/40 bg-white/5'
                        }`}>
                        <input type="radio" name="plan" className="hidden"
                          checked={form.websiteType === plan.value}
                          onChange={() => set('websiteType', plan.value)} />
                        <span className="text-xl">{plan.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{plan.label}</span>
                            {plan.popular && (
                              <span className="px-1.5 py-0.5 rounded-md bg-indigo-500 text-white text-xs font-medium">Popular</span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-white shrink-0">{plan.price}</span>
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                          form.websiteType === plan.value ? 'border-indigo-500 bg-indigo-500' : 'border-white/40'
                        }`}>
                          {form.websiteType === plan.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </label>
                    ))}
                    {errors.websiteType && <p className="text-red-400 text-xs">{errors.websiteType}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Design Preference <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {DESIGNS.map(d => (
                        <div key={d.name} onClick={() => set('selectedDesign', d.name)}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            form.selectedDesign === d.name ? 'border-indigo-500 bg-indigo-500/20' : 'border-white/20 hover:border-white/40 bg-white/5'
                          }`}>
                          <div className="w-5 h-5 rounded shrink-0" style={{ background: d.color, border: '1px solid rgba(255,255,255,0.2)' }} />
                          <span className="text-xs font-medium text-white leading-tight">{d.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-xl">
                    <h2 className="text-lg font-semibold text-white mb-4">Review</h2>
                    <div className="space-y-2.5">
                      {[
                        { label: 'Name', value: form.fullName },
                        { label: 'Email', value: form.email },
                        { label: 'Phone', value: form.phone },
                        { label: 'Store', value: form.storeName },
                        { label: 'Category', value: form.storeCategory },
                        { label: 'Plan', value: form.websiteType },
                        { label: 'Design', value: form.selectedDesign || '—' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-center text-sm border-b border-white/10 pb-2.5 last:border-0 last:pb-0">
                          <span className="text-gray-400 w-20 shrink-0">{label}</span>
                          <span className="text-white font-medium text-right">{value || '—'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all bg-white/10 backdrop-blur-md ${
                    form.agreedToTerms ? 'border-indigo-500 bg-indigo-500/20' : 'border-white/20 hover:border-white/40'
                  }`}>
                    <div className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      form.agreedToTerms ? 'bg-indigo-500 border-indigo-500' : 'border-white/40'
                    }`}>
                      {form.agreedToTerms && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <input type="checkbox" className="hidden" checked={form.agreedToTerms}
                      onChange={e => set('agreedToTerms', e.target.checked)} />
                    <p className="text-sm text-gray-300">I confirm the above details are correct and agree to the{' '}
                      <span className="text-indigo-400 font-medium">Terms & Conditions</span>.
                    </p>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav */}
            <div className="flex items-center justify-between mt-5">
              {step > 1 ? (
                <Button type="button" onClick={prev} variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20">
                  ← Back
                </Button>
              ) : <div />}

              {step < 4 ? (
                <Button type="button" onClick={next} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Continue →
                </Button>
              ) : (
                <Button type="submit" disabled={loading || !form.agreedToTerms} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />}
                  {loading ? 'Submitting…' : 'Submit Request'}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}