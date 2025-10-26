export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

export const isValidNRP = (nrp: string): boolean => {
  return /^[0-9]{8,12}$/.test(nrp);
};

export const isValidPassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password minimal 8 karakter' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password harus mengandung huruf besar' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password harus mengandung huruf kecil' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password harus mengandung angka' };
  }
  return { valid: true, message: '' };
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidDate = (date: string): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const isFutureDate = (date: string | Date): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d > new Date();
};

export const isPastDate = (date: string | Date): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d < new Date();
};

export const isWithinDateRange = (
  date: string | Date,
  startDate: string | Date,
  endDate: string | Date
): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  return d >= start && d <= end;
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '');
};

export const isNumeric = (value: string): boolean => {
  return /^\d+$/.test(value);
};

export const isAlphanumeric = (value: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(value);
};
