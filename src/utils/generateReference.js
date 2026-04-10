/**
 * Generates a unique reference number.
 * @param {'SRV' | 'BUY'} type
 * @returns {string} e.g. SIS-SRV-2025-04821
 */
export function generateReference(type) {
  const year = new Date().getFullYear();
  const digits = String(Math.floor(Math.random() * 99999) + 1).padStart(5, '0');
  return `SIS-${type}-${year}-${digits}`;
}
