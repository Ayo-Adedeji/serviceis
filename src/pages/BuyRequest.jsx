import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../lib/supabase';
import { generateReference } from '../utils/generateReference';
import logo from '../assets/SIS-TRT-B-.png';

const BRANDS_BY_CATEGORY = {
  Phone: ['Apple', 'Samsung', 'Tecno', 'Infinix', 'Google Pixel', 'Xiaomi', 'Other'],
  Laptop: ['Apple', 'HP', 'Dell', 'Lenovo', 'Asus', 'Microsoft', 'Other'],
  Tablet: ['Apple', 'Samsung', 'Lenovo', 'Other'],
  Accessories: ['Apple', 'Samsung', 'Anker', 'Baseus', 'Other'],
  Audio: ['Apple AirPods', 'Samsung', 'Sony', 'JBL', 'Bose', 'Other'],
  'Smart Home': ['Google', 'Amazon', 'Apple', 'Other'],
  Other: [],
};

const schema = yup.object({
  full_name: yup.string().trim().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().trim().required('WhatsApp number is required'),
  device_category: yup.string().required('Please select a device category'),
  device_brand: yup.string(),
  device_model: yup.string(),
  storage_ram_specs: yup.string(),
  color_preference: yup.string(),
  condition_preference: yup.string().required('Please select a condition'),
  budget_range: yup.string().required('Please select a budget range'),
  additional_notes: yup.string(),
});

const inputClass =
  'w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 transition';
const labelClass = 'block text-white/80 text-sm font-medium mb-1';
const errorClass = 'text-red-400 text-xs mt-1';

export default function BuyRequest() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const selectedCategory = watch('device_category');
  const brands = BRANDS_BY_CATEGORY[selectedCategory] ?? [];
  const showBrandText = selectedCategory === 'Other' || brands.length === 0;

  const onCategoryChange = (e) => {
    setValue('device_category', e.target.value);
    setValue('device_brand', '');
  };

  const onSubmit = async (data) => {
    setSubmitError(null);
    const reference = generateReference('BUY');

    const { error } = await supabase.from('buy_requests').insert({
      reference_number: reference,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      device_category: data.device_category,
      device_brand: data.device_brand || null,
      device_model: data.device_model || null,
      storage_ram_specs: data.storage_ram_specs || null,
      color_preference: data.color_preference || null,
      condition_preference: data.condition_preference,
      budget_range: data.budget_range,
      additional_notes: data.additional_notes || null,
      status: 'Pending',
    });

    if (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
      return;
    }

    // Fire email notification via FormSubmit (non-blocking)
    fetch('https://formsubmit.co/ajax/ictweare.support@ictweare.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `🛒 New Buy Request — ${reference}`,
        Reference: reference,
        Name: data.full_name,
        Email: data.email,
        Phone: data.phone,
        Category: data.device_category,
        Brand: data.device_brand || 'N/A',
        Model: data.device_model || 'N/A',
        Specs: data.storage_ram_specs || 'N/A',
        Color: data.color_preference || 'N/A',
        Condition: data.condition_preference,
        Budget: data.budget_range,
        Notes: data.additional_notes || 'N/A',
        Submitted: new Date().toLocaleString(),
      }),
    }).catch(() => {}); // silently ignore email errors

    navigate('/receipt', { state: { type: 'buy', reference, data } });
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto">
        <span className="text-amber-400 font-bold text-xl tracking-tight">
          <img src={logo} alt="ServiceIS" className="h-8 w-auto" />
        </span>
        <Link to="/" className="text-white/60 hover:text-white text-sm transition">
          ← Back to Home
        </Link>
      </div>

      {/* Card */}
      <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 mt-2">
        <h1 className="text-2xl font-bold text-white mb-1">Request a Device</h1>
        <p className="text-white/60 text-sm mb-3">
          Tell us exactly what you're looking for. Once submitted, you'll get a reference number and our team will source the device, check pricing and availability, then reach out to you on WhatsApp. You only pay if you're happy with what we find.
        </p>
        <div className="flex items-center gap-2 mb-6 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2.5">
          <span className="text-amber-400 text-xs">🔒</span>
          <p className="text-amber-300/80 text-xs">We will always contact you from our official number and quote your reference. Never pay anyone who cannot provide your reference number.</p>
        </div>

        {submitError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Full Name */}
          <div>
            <label className={labelClass}>Full Name</label>
            <input {...register('full_name')} type="text" className={inputClass} placeholder="Your full name" />
            {errors.full_name && <p className={errorClass}>{errors.full_name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email Address</label>
            <input {...register('email')} type="email" className={inputClass} placeholder="you@example.com" />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className={labelClass}>
              WhatsApp Number{' '}
              <span className="text-white/40 font-normal">— We will contact you on this number</span>
            </label>
            <input {...register('phone')} type="text" className={inputClass} placeholder="+234 800 000 0000" />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>

          {/* Device Category */}
          <div>
            <label className={labelClass}>Device Category</label>
            <select
              {...register('device_category')}
              onChange={onCategoryChange}
              className={inputClass}
            >
              <option value="" className="bg-[#0A0F1E]">Select a category</option>
              {['Phone', 'Laptop', 'Tablet', 'Accessories', 'Smart Home', 'Audio', 'Other'].map((cat) => (
                <option key={cat} value={cat} className="bg-[#0A0F1E]">{cat}</option>
              ))}
            </select>
            {errors.device_category && <p className={errorClass}>{errors.device_category.message}</p>}
          </div>

          {/* Brand Preference */}
          {selectedCategory && (
            <div>
              <label className={labelClass}>Brand Preference <span className="text-white/40 font-normal">(optional)</span></label>
              {showBrandText ? (
                <input
                  {...register('device_brand')}
                  type="text"
                  className={inputClass}
                  placeholder="Enter brand name"
                />
              ) : (
                <select {...register('device_brand')} className={inputClass}>
                  <option value="" className="bg-[#0A0F1E]">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand} className="bg-[#0A0F1E]">{brand}</option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Specific Model */}
          <div>
            <label className={labelClass}>Specific Model <span className="text-white/40 font-normal">(optional)</span></label>
            <input
              {...register('device_model')}
              type="text"
              className={inputClass}
              placeholder="e.g. iPhone 15 Pro Max, MacBook Air M2"
            />
          </div>

          {/* Storage / RAM / Specs */}
          <div>
            <label className={labelClass}>Storage / RAM / Specs <span className="text-white/40 font-normal">(optional)</span></label>
            <input
              {...register('storage_ram_specs')}
              type="text"
              className={inputClass}
              placeholder="e.g. 256GB, 8GB RAM, 120Hz display"
            />
          </div>

          {/* Color Preference */}
          <div>
            <label className={labelClass}>Color Preference <span className="text-white/40 font-normal">(optional)</span></label>
            <input
              {...register('color_preference')}
              type="text"
              className={inputClass}
              placeholder="e.g. Midnight Black, Silver, Any"
            />
          </div>

          {/* Condition */}
          <div>
            <label className={labelClass}>Condition</label>
            <select {...register('condition_preference')} className={inputClass}>
              <option value="" className="bg-[#0A0F1E]">Select condition</option>
              {['New', 'Fairly Used (UK Used)', 'Either'].map((c) => (
                <option key={c} value={c} className="bg-[#0A0F1E]">{c}</option>
              ))}
            </select>
            {errors.condition_preference && <p className={errorClass}>{errors.condition_preference.message}</p>}
          </div>

          {/* Budget Range */}
          <div>
            <label className={labelClass}>Budget Range</label>
            <select {...register('budget_range')} className={inputClass}>
              <option value="" className="bg-[#0A0F1E]">Select budget range</option>
              {[
                'Under ₦50,000',
                '₦50,000 – ₦100,000',
                '₦100,000 – ₦200,000',
                '₦200,000 – ₦500,000',
                '₦500,000 – ₦1,000,000',
                'Above ₦1,000,000',
              ].map((b) => (
                <option key={b} value={b} className="bg-[#0A0F1E]">{b}</option>
              ))}
            </select>
            {errors.budget_range && <p className={errorClass}>{errors.budget_range.message}</p>}
          </div>

          {/* Additional Notes */}
          <div>
            <label className={labelClass}>Additional Notes <span className="text-white/40 font-normal">(optional)</span></label>
            <textarea
              {...register('additional_notes')}
              rows={3}
              className={inputClass}
              placeholder="Any other requirements or preferences..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-400 text-[#0A0F1E] font-semibold py-3 rounded-lg transition mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Buy Request'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
