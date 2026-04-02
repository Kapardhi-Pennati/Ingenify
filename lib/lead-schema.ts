import { z } from 'zod';

export const companySizeOptions = ['1-10', '11-50', '51-200', '201-1000', '1000+'] as const;
export const inquiryTypeOptions = ['Demo', 'Full SaaS Service'] as const;

const companySizeSet = new Set(companySizeOptions);
const inquiryTypeSet = new Set(inquiryTypeOptions);

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(80, 'Name is too long'),
  businessEmail: z
    .string()
    .trim()
    .email('Please enter a valid business email')
    .max(120, 'Email is too long'),
  companySize: z
    .string()
    .min(1, 'Please select a company size')
    .refine((value) => companySizeSet.has(value as (typeof companySizeOptions)[number]), {
      message: 'Please select a valid company size',
    }),
  inquiryType: z
    .string()
    .min(1, 'Please select an inquiry type')
    .refine((value) => inquiryTypeSet.has(value as (typeof inquiryTypeOptions)[number]), {
      message: 'Please select a valid inquiry type',
    }),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
