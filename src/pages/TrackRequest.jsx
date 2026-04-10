// PHASE 2: Enable when tracking is live

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import logo from '../assets/SIS-TRT-B-.png';

const STEPS_SERVICE = ['Pending', 'Ongoing', 'Ready', 'Delivered'];
const STEPS_BUY = ['Pending', 'Contacted', 'Confirmed', 'Delivered'];

export default function TrackRequest() {
  const [reference, setReference] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleTrack(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    const ref = reference.trim().toUpperCase();

    // Search service_requests first, then buy_requests
    const { data: srvData } = await supabase
      .from('service_requests')
      .select('reference_number, full_name, status, created_at')
      .eq('reference_number', ref)
      .single();

    if (srvData) {
      setResult({ ...srvData, type: 'service' });
      setLoading(false);
      return;
    }

    const { data: buyData } = await supabase
      .from('buy_requests')
      .select('reference_number, full_name, status, created_at')
      .eq('reference_number', ref)
      .single();

    if (buyData) {
      setResult({ ...buyData, type: 'buy' });
    } else {
      setError('No request found with that reference number. Please check and try again.');
    }

    setLoading(false);
  }

  const steps = result?.type === 'buy' ? STEPS_BUY : STEPS_SERVICE;
  const currentStep = result ? steps.indexOf(result.status) : -1;

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-8">
          <img src={logo} alt="ServiceIS" className="h-8 w-auto" />
          <Link to="/" className="text-white/50 hover:text-white text-sm transition">← Home</Link>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Track Your Request</h1>
        <p className="text-white/60 text-sm mb-8">Enter your reference number to check the status of your request.</p>

        <form onSubmit={handleTrack} className="flex gap-3 mb-6">
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="e.g. SIS-SRV-2025-04821"
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            disabled={loading || !reference.trim()}
            className="bg-blue-500 hover:bg-blue-400 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-lg transition"
          >
            {loading ? '...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Reference</p>
            <p className="text-white font-mono font-bold text-lg mb-1">{result.reference_number}</p>
            <p className="text-white/60 text-sm mb-6">Client: {result.full_name}</p>

            {/* Progress stepper */}
            <div className="flex items-center gap-0">
              {steps.map((step, i) => {
                const done = i <= currentStep;
                const active = i === currentStep;
                return (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                        done ? 'bg-blue-500 border-blue-500 text-white' : 'bg-transparent border-white/20 text-white/30'
                      } ${active ? 'ring-2 ring-blue-400/40' : ''}`}>
                        {i + 1}
                      </div>
                      <span className={`text-xs mt-1 text-center ${done ? 'text-white' : 'text-white/30'}`}>{step}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < currentStep ? 'bg-blue-500' : 'bg-white/10'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
