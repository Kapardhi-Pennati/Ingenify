'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  companySizeOptions,
  inquiryTypeOptions,
  leadSchema,
  type LeadFormValues,
} from '@/lib/lead-schema';

export default function RequestAccessForm() {
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      businessEmail: '',
      companySize: '',
      inquiryType: 'Demo',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: LeadFormValues) => {
    setServerError('');
    setIsSuccess(false);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Submission failed. Please try again in a moment.');
      }

      setIsSuccess(true);
      reset({
        name: '',
        businessEmail: '',
        companySize: '',
        inquiryType: 'Demo',
      });
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Submission failed. Please try again in a moment.');
      }
    }
  };

  const inputClass =
    'w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-[13px] text-white/90 placeholder:text-white/20 outline-none transition-all duration-300 focus:border-indigo-400/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-indigo-400/20 hover:border-white/[0.14]';

  const labelClass =
    'mb-2 block font-mono text-[9px] tracking-[0.25em] uppercase text-white/35 font-medium';

  const errorClass = 'mt-1.5 font-mono text-[10px] tracking-wide text-rose-400/80';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          className={inputClass}
          placeholder="Jordan Lee"
          autoComplete="name"
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      {/* Business Email */}
      <div>
        <label htmlFor="businessEmail" className={labelClass}>
          Business Email
        </label>
        <input
          id="businessEmail"
          type="email"
          {...register('businessEmail')}
          className={inputClass}
          placeholder="jordan@company.com"
          autoComplete="email"
        />
        {errors.businessEmail && (
          <p className={errorClass}>{errors.businessEmail.message}</p>
        )}
      </div>

      {/* Company Size */}
      <div>
        <label htmlFor="companySize" className={labelClass}>
          Company Size
        </label>
        <div className="relative">
          <select
            id="companySize"
            {...register('companySize')}
            className={`${inputClass} appearance-none cursor-pointer pr-10`}
          >
            <option value="" className="bg-black text-white/40">
              Select your size
            </option>
            {companySizeOptions.map((size) => (
              <option key={size} value={size} className="bg-black text-white/90">
                {size}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-white/25"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {errors.companySize && (
          <p className={errorClass}>{errors.companySize.message}</p>
        )}
      </div>

      {/* Inquiry Type */}
      <fieldset className="space-y-2.5">
        <legend className={labelClass}>Inquiry Type</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {inquiryTypeOptions.map((inquiryType) => (
            <label
              key={inquiryType}
              className="group flex cursor-pointer items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-[13px] text-white/60 transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.04] hover:text-white/80 has-[:checked]:border-indigo-400/30 has-[:checked]:bg-indigo-500/[0.06] has-[:checked]:text-white/90"
            >
              <input
                type="radio"
                value={inquiryType}
                {...register('inquiryType')}
                className="sr-only"
              />
              {/* Custom radio indicator */}
              <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/[0.15] transition-all duration-300 group-has-[:checked]:border-indigo-400/60 group-has-[:checked]:bg-indigo-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 opacity-0 transition-opacity duration-300 group-has-[:checked]:opacity-100" />
              </span>
              <span className="font-medium">{inquiryType}</span>
            </label>
          ))}
        </div>
        {errors.inquiryType && (
          <p className={errorClass}>{errors.inquiryType.message}</p>
        )}
      </fieldset>

      {/* Server Error */}
      {serverError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/[0.06] p-3.5 text-[12px] text-rose-300/90 backdrop-blur-sm">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Success Message */}
      {isSuccess && (
        <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3.5 text-[12px] text-emerald-300/90 backdrop-blur-sm">
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>Request received. Our team will reach out shortly.</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative mt-2 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-6 py-3.5 text-[12px] font-bold tracking-[0.1em] uppercase text-black shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(99,102,241,0.3)] hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {/* Gradient shine effect on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        {isSubmitting ? (
          <>
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Request Access
            <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
