'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, User, Mail, MessageSquare, Building, Phone } from 'lucide-react';

export default function BookDemoPopup({ isOpen, onClose, theme }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Demo request submitted:', formData);
      alert('Demo request submitted successfully! We\'ll contact you within 24 hours.');
      onClose();
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      });
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-md sm:max-w-lg mx-auto rounded-2xl sm:rounded-3xl shadow-2xl border transition-all duration-300 transform max-h-[90vh] overflow-y-auto ${theme.dark
          ? 'bg-[#030014] border-white/10'
          : 'bg-white border-slate-200'
          }`}
        style={{
          animation: isOpen ? 'slideUp 0.3s ease-out' : 'slideDown 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div className={`px-4 sm:px-6 py-4 sm:py-5 border-b flex items-center justify-between ${theme.dark ? 'border-white/10' : 'border-slate-200'
          }`}>
          <div>
            <h2 className={`text-xl font-bold ${theme.heading}`}>Book a Demo</h2>
            <p className={`text-sm ${theme.text} mt-1`}>
              See how Autoship can transform your logistics
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${theme.dark
              ? 'hover:bg-white/10 text-slate-400'
              : 'hover:bg-slate-100 text-slate-500'
              }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Name */}
            <div>
              <label className={`flex items-center gap-2 text-sm font-bold mb-3 ${theme.heading}`}>
                <User size={16} />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${theme.dark
                  ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className={`flex items-center gap-2 text-sm font-bold mb-3 ${theme.heading}`}>
                <Mail size={16} />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${theme.dark
                  ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Company */}
            <div>
              <label className={`flex items-center gap-2 text-sm font-bold mb-3 ${theme.heading}`}>
                <Building size={16} />
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${theme.dark
                  ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                placeholder="Your Company Ltd."
              />
            </div>

            {/* Phone */}
            <div>
              <label className={`flex items-center gap-2 text-sm font-bold mb-3 ${theme.heading}`}>
                <Phone size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${theme.dark
                  ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-bold mb-3 ${theme.heading}`}>
              <MessageSquare size={16} />
              Additional Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 resize-none ${theme.dark
                ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20'
                }`}
              placeholder="Tell us about your current logistics challenges..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all ${theme.dark
              ? 'bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-50 disabled:cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Demo Request
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className={`px-4 sm:px-6 py-3 sm:py-4 border-t text-center text-sm ${theme.text} ${theme.dark ? 'border-white/10' : 'border-slate-200'
          }`}>
          <p>We'll contact you within 24 hours to schedule your personalized demo</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
