import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/SIS-TRT-B-.png';

export default function Receipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    if (!state) navigate('/');
  }, [state, navigate]);

  if (!state) return null;

  const { type, reference, data } = state;
  const isService = type === 'service';

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .receipt-card { box-shadow: none !important; border: 1px solid #e5e7eb !important; }
        }
      `}</style>

      <div className="min-h-screen bg-[#0A0F1E] py-10 px-4">

        {/* Receipt card */}
        <div className="max-w-2xl mx-auto bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden receipt-card">

          {/* Header */}
          <div className={`px-8 py-6 ${isService ? 'bg-teal-600' : 'bg-amber-500'}`}>
            <div className="flex items-center justify-between">
              <div>
                <img src={logo} alt="ServiceIS" className="h-10 w-auto mb-1" />
                <p className="text-white/80 text-sm mt-0.5">Private IT department for modern homes</p>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-xs uppercase tracking-widest">
                  {isService ? 'Service Request' : 'Buy Request'}
                </p>
                <p className="text-white font-mono font-bold text-lg mt-0.5">{reference}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">

            {/* Status + date row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
                <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">Pending Review</span>
              </div>
              <span className="text-xs text-gray-400">{new Date().toLocaleString()}</span>
            </div>

            {/* What happens next banner */}
            <div className={`rounded-xl p-4 mb-6 border ${isService ? 'bg-teal-50 border-teal-100' : 'bg-amber-50 border-amber-100'}`}>
              <p className={`text-sm font-semibold mb-1 ${isService ? 'text-teal-700' : 'text-amber-700'}`}>
                What happens next?
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isService
                  ? 'Our team has received your service request. We will review the details and reach out to you via WhatsApp or call using our official number to confirm pickup, discuss the repair, and agree on pricing before any work begins.'
                  : 'Our team has received your buy request. We will source the device, check availability and pricing, then reach out to you via WhatsApp using our official number. You only pay if you are happy with what we find.'}
              </p>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* Client details */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Your Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 rounded-lg px-4 py-3">
                  <p className="text-gray-400 text-xs mb-0.5">Full Name</p>
                  <p className="font-medium text-gray-900">{data.full_name}</p>
                </div>
                <div className="bg-gray-50 rounded-lg px-4 py-3">
                  <p className="text-gray-400 text-xs mb-0.5">Phone / WhatsApp</p>
                  <p className="font-medium text-gray-900">{data.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg px-4 py-3 sm:col-span-2">
                  <p className="text-gray-400 text-xs mb-0.5">Email</p>
                  <p className="font-medium text-gray-900">{data.email}</p>
                </div>
              </div>
            </div>

            {/* Request details */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Request Details</p>
              <div className="space-y-2 text-sm">
                {isService ? (
                  <>
                    {data.device_type && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Device Type</span>
                        <span className="font-medium text-gray-900">{data.device_type}</span>
                      </div>
                    )}
                    {data.device_brand && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Brand</span>
                        <span className="font-medium text-gray-900">{data.device_brand}</span>
                      </div>
                    )}
                    {data.device_model && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Model</span>
                        <span className="font-medium text-gray-900">{data.device_model}</span>
                      </div>
                    )}
                    {data.issue_description && (
                      <div className="py-2 border-b border-gray-100">
                        <p className="text-gray-500 mb-1">Issue Description</p>
                        <p className="font-medium text-gray-900 leading-relaxed">{data.issue_description}</p>
                      </div>
                    )}
                    {data.image_url && (
                      <div className="pt-2">
                        <p className="text-gray-500 mb-2">Device Photo</p>
                        <img
                          src={data.image_url}
                          alt="Device"
                          className="w-40 h-40 object-cover rounded-xl border border-gray-200"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {data.device_category && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Category</span>
                        <span className="font-medium text-gray-900">{data.device_category}</span>
                      </div>
                    )}
                    {data.device_brand && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Brand</span>
                        <span className="font-medium text-gray-900">{data.device_brand}</span>
                      </div>
                    )}
                    {data.device_model && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Model</span>
                        <span className="font-medium text-gray-900">{data.device_model}</span>
                      </div>
                    )}
                    {data.storage_ram_specs && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Specs</span>
                        <span className="font-medium text-gray-900">{data.storage_ram_specs}</span>
                      </div>
                    )}
                    {data.color_preference && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Color</span>
                        <span className="font-medium text-gray-900">{data.color_preference}</span>
                      </div>
                    )}
                    {data.condition_preference && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Condition</span>
                        <span className="font-medium text-gray-900">{data.condition_preference}</span>
                      </div>
                    )}
                    {data.budget_range && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Budget</span>
                        <span className="font-medium text-gray-900">{data.budget_range}</span>
                      </div>
                    )}
                    {data.additional_notes && (
                      <div className="py-2">
                        <p className="text-gray-500 mb-1">Additional Notes</p>
                        <p className="font-medium text-gray-900">{data.additional_notes}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* Security note */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                <span className="font-semibold text-gray-700">Important: </span>
                {isService
                  ? 'Keep your reference number safe. Our team will always quote it when contacting you. Do not hand over your device to anyone who cannot provide this reference.'
                  : 'Our team will always quote your reference number when contacting you. Anyone reaching out without this reference is NOT from ServiceIS. Do not make any payment without verifying.'}
              </p>
            </div>

            {/* Contact */}
            <p className="text-xs text-gray-400 text-center">
              ictweare.support@ictweare.com &nbsp;·&nbsp; 09133706582
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="no-print max-w-2xl mx-auto mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.print()}
            className={`px-6 py-3 rounded-xl font-semibold text-white transition ${isService ? 'bg-teal-600 hover:bg-teal-500' : 'bg-amber-500 hover:bg-amber-400 text-[#0A0F1E]'}`}
          >
            Download Receipt
          </button>
          <Link
            to="/"
            className="border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
          >
            Return to Home
          </Link>
        </div>

      </div>
    </>
  );
}
