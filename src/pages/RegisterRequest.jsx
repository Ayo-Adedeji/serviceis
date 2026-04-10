import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '../lib/supabase';
import { generateReference } from '../utils/generateReference';
import logo from '../assets/SIS-TRT-B-.png';

const schema = yup.object({
  full_name: yup.string().trim().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().trim().required('Phone number is required'),
  device_type: yup.string().required('Please select a device type'),
  device_brand: yup.string(),
  device_model: yup.string(),
  issue_description: yup.string().trim().required('Please describe the issue'),
});

const inputClass =
  'w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400 transition';
const labelClass = 'block text-white/80 text-sm font-medium mb-1';
const errorClass = 'text-red-400 text-xs mt-1';

export default function RegisterRequest() {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  function handleFileChange(e) {
    const file = e.target.files[0];
    setImageError('');
    setImageFile(null);
    setImagePreview(null);

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image must be under 5MB');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function onSubmit(data) {
    setSubmitError('');

    let imageUrl = null;

    if (imageFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('device-images')
        .upload(`${Date.now()}-${imageFile.name}`, imageFile, {
          contentType: imageFile.type,
        });
      imageUrl = uploadError
        ? null
        : supabase.storage
            .from('device-images')
            .getPublicUrl(uploadData.path).data.publicUrl;
    }

    const reference = generateReference('SRV');

    const { error } = await supabase.from('service_requests').insert({
      reference_number: reference,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      device_type: data.device_type,
      device_brand: data.device_brand || null,
      device_model: data.device_model || null,
      issue_description: data.issue_description,
      image_url: imageUrl || null,
      status: 'Pending',
    });

    if (error) {
      setSubmitError('Something went wrong. Please try again.');
      return;
    }

    // Fire email notification via FormSubmit (non-blocking)
    fetch('https://formsubmit.co/ajax/ictweare.support@ictweare.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `🔧 New Service Request — ${reference}`,
        Reference: reference,
        Name: data.full_name,
        Email: data.email,
        Phone: data.phone,
        'Device Type': data.device_type,
        Brand: data.device_brand || 'N/A',
        Model: data.device_model || 'N/A',
        Issue: data.issue_description,
        'Device Image': imageUrl || 'No image uploaded',
        Submitted: new Date().toLocaleString(),
      }),
    }).catch(() => {}); // silently ignore email errors

    navigate('/receipt', {
      state: {
        type: 'service',
        reference,
        data: { ...data, image_url: imageUrl },
      },
    });
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      {/* Top bar */}
      <div className="max-w-2xl mx-auto px-4 py-5 flex items-center justify-between">
        <span className="text-teal-400 font-bold text-xl tracking-tight">
          <img src={logo} alt="ServiceIS" className="h-8 w-auto" />
        </span>
        <Link
          to="/"
          className="text-white/60 hover:text-teal-400 text-sm transition flex items-center gap-1"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Card */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-2">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-white mb-2">
            Register a Service Request
          </h1>
          <p className="text-white/60 mb-2 text-sm leading-relaxed">
            Tell us about your device and the issue. Once submitted, you'll get a reference number and our team will reach out to you via WhatsApp or call to confirm pickup, discuss the repair, and agree on pricing — before any work begins.
          </p>
          <div className="flex items-center gap-2 mb-8 mt-3 bg-teal-500/10 border border-teal-500/20 rounded-lg px-4 py-2.5">
            <span className="text-teal-400 text-xs">🔒</span>
            <p className="text-teal-300/80 text-xs">We will always contact you from our official number. Never hand over your device without your reference number.</p>
          </div>

          {/* Error banner */}
          {submitError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-6">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Full Name */}
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                {...register('full_name')}
                type="text"
                placeholder="Your full name"
                className={inputClass}
              />
              {errors.full_name && (
                <p className={errorClass}>{errors.full_name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email Address</label>
              <input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className={inputClass}
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>Phone / WhatsApp</label>
              <input
                {...register('phone')}
                type="text"
                placeholder="+1 234 567 8900"
                className={inputClass}
              />
              {errors.phone && (
                <p className={errorClass}>{errors.phone.message}</p>
              )}
            </div>

            {/* Device Type */}
            <div>
              <label className={labelClass}>Device Type</label>
              <select
                {...register('device_type')}
                className={`${inputClass} bg-[#0A0F1E]`}
                defaultValue=""
              >
                <option value="" disabled className="text-white/40">
                  Select a device type
                </option>
                <option value="Phone">Phone</option>
                <option value="Laptop">Laptop</option>
                <option value="Tablet">Tablet</option>
                <option value="Smart Home Device">Smart Home Device</option>
                <option value="Other">Other</option>
              </select>
              {errors.device_type && (
                <p className={errorClass}>{errors.device_type.message}</p>
              )}
            </div>

            {/* Device Brand + Model — side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>
                  Device Brand{' '}
                  <span className="text-white/30 font-normal">(optional)</span>
                </label>
                <input
                  {...register('device_brand')}
                  type="text"
                  placeholder="e.g. Samsung, Apple, HP"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Device Model{' '}
                  <span className="text-white/30 font-normal">(optional)</span>
                </label>
                <input
                  {...register('device_model')}
                  type="text"
                  placeholder="e.g. iPhone 14 Pro, Galaxy S23"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Issue Description */}
            <div>
              <label className={labelClass}>Issue Description</label>
              <textarea
                {...register('issue_description')}
                rows={4}
                placeholder="Describe what is wrong with your device..."
                className={`${inputClass} resize-none`}
              />
              {errors.issue_description && (
                <p className={errorClass}>{errors.issue_description.message}</p>
              )}
            </div>

            {/* Upload Device Photo */}
            <div>
              <label className={labelClass}>
                Upload Device Photo{' '}
                <span className="text-white/30 font-normal">(optional)</span>
              </label>
              <label className="flex flex-col items-center justify-center w-full border border-dashed border-white/20 rounded-lg py-6 px-4 cursor-pointer hover:border-teal-400/60 transition bg-white/5 hover:bg-white/10">
                <svg
                  className="w-8 h-8 text-white/30 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4-4a3 3 0 014.24 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M8 10a2 2 0 100-4 2 2 0 000 4zm-6 8a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12z"
                  />
                </svg>
                <span className="text-white/40 text-sm">
                  Click to upload — JPG, PNG, WebP · Max 5MB
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {imageError && <p className={errorClass}>{imageError}</p>}
              {imagePreview && (
                <div className="mt-3 rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={imagePreview}
                    alt="Device preview"
                    className="w-full max-h-56 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition mt-4 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Register My Request'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
