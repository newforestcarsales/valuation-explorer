
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatRegistration(reg: string): string {
  // Formats registration to uppercase and removes spaces
  return reg.toUpperCase().replace(/\s/g, '');
}

export function isValidUKRegistration(reg: string): boolean {
  // Basic validation for UK registration formats
  const formattedReg = formatRegistration(reg);
  
  // Various UK registration patterns
  const patterns = [
    /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/, // Current format AA00AAA
    /^[A-Z][0-9]{1,3}[A-Z]{3}$/, // A000AAA
    /^[A-Z]{3}[0-9]{1,3}[A-Z]$/, // AAA000A
    /^[A-Z]{3}[0-9]{1,3}$/, // AAA000
    /^[0-9]{1,4}[A-Z]{1,3}$/, // 0000AAA
    /^[A-Z]{1,2}[0-9]{1,4}$/ // AA0000
  ];
  
  return patterns.some(pattern => pattern.test(formattedReg));
}
