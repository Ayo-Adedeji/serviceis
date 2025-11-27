
export const generateReference = () => {
  const date = new Date().toISOString().slice(0,10).replace(/-/g, ""); // YYYYMMDD
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();    // 6 chars
  return `RR-${date}-${rand}`; // e.g., RR-20251126-9XK2QD
};
