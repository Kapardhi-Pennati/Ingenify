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
    'w-full rounded-2xl border dark:border-slate-500/30 border-slate-400/40 dark:bg-slate-900/40 bg-slate-100/60 px-4 py-3 text-sm dark:text-slate-100 text-slate-900 outline-none transition dark:focus:border-indigo-300/70 focus:border-indigo-500/60 dark:focus:ring-2 focus:ring-2 dark:focus:ring-indigo-400/20 focus:ring-indigo-500/20';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-[0.2em] dark:text-slate-300 text-slate-600">
          Name
        </label>
        <input id="name" {...register('name')} className={inputClass} placeholder="Jordan Lee" />
        {errors.name && <p className="mt-1 text-xs dark:text-rose-300 text-rose-600">{errors.name.message}</p>}
      </div>

      <div>
        <label
          htmlFor="businessEmail"
          className="mb-1 block text-xs uppercase tracking-[0.2em] dark:text-slate-300 text-slate-600"
        >
          Business Email
        </label>
        <input
          id="businessEmail"
          type="email"
          {...register('businessEmail')}
          className={inputClass}
          placeholder="jordan@company.com"
        />
        {errors.businessEmail && <p className="mt-1 text-xs dark:text-rose-300 text-rose-600">{errors.businessEmail.message}</p>}
      </div>

      <div>
        <label
          htmlFor="companySize"
          className="mb-1 block text-xs uppercase tracking-[0.2em] dark:text-slate-300 text-slate-600"
        >
          Company Size
        </label>
        <select id="companySize" {...register('companySize')} className={inputClass}>
          <option value="">Select your size</option>
          {companySizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        {errors.companySize && <p className="mt-1 text-xs dark:text-rose-300 text-rose-600">{errors.companySize.message}</p>}
      </div>

      <fieldset className="space-y-2">
        <legend className="mb-1 block text-xs uppercase tracking-[0.2em] dark:text-slate-300 text-slate-600">Inquiry Type</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {inquiryTypeOptions.map((inquiryType) => (
            <label
              key={inquiryType}
              className="flex cursor-pointer items-center gap-2 rounded-2xl dark:border-slate-500/30 border-slate-400/40 dark:bg-slate-900/55 bg-slate-100/50 px-3 py-2 text-sm dark:text-slate-100 text-slate-900 transition dark:hover:border-indigo-300/65 hover:border-indigo-500/50"
            >
              <input
                type="radio"
                value={inquiryType}
                {...register('inquiryType')}
                className="h-4 w-4 dark:border-slate-400 border-slate-500 dark:text-indigo-500 text-indigo-600"
              />
              <span>{inquiryType}</span>
            </label>
          ))}
        </div>
        {errors.inquiryType && <p className="mt-1 text-xs dark:text-rose-300 text-rose-600">{errors.inquiryType.message}</p>}
      </fieldset>

      {serverError && (
        <div className="flex items-start gap-2 rounded-2xl dark:border-rose-400/35 border-rose-300/40 dark:bg-rose-500/10 bg-rose-100/30 p-3 text-sm dark:text-rose-100 text-rose-700">
          <AlertTriangle className="mt-0.5 h-4 w-4" />
          <span>{serverError}</span>
        </div>
      )}

      {isSuccess && (
        <div className="flex items-start gap-2 rounded-2xl dark:border-emerald-400/35 border-emerald-300/40 dark:bg-emerald-500/10 bg-emerald-100/30 p-3 text-sm dark:text-emerald-100 text-emerald-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4" />
          <span>Request received. Our team will reach out shortly.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-indigo-300/70 bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Request Access
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
