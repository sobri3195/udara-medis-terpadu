export const groupBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T extends Record<string, any>>(
  array: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterByDateRange = <T extends Record<string, any>>(
  array: T[],
  dateField: keyof T,
  startDate: string | Date,
  endDate: string | Date
): T[] => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  return array.filter((item) => {
    const itemDate = new Date(item[dateField]);
    return itemDate >= start && itemDate <= end;
  });
};

export const calculateTotal = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): number => {
  return array.reduce((sum, item) => sum + (Number(item[key]) || 0), 0);
};

export const calculateAverage = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): number => {
  if (array.length === 0) return 0;
  return calculateTotal(array, key) / array.length;
};

export const removeDuplicates = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
): T[] => {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

export const mergeArrays = <T extends Record<string, any>>(
  array1: T[],
  array2: T[],
  key: keyof T
): T[] => {
  const map = new Map(array1.map((item) => [item[key], item]));
  array2.forEach((item) => {
    if (map.has(item[key])) {
      map.set(item[key], { ...map.get(item[key]), ...item });
    } else {
      map.set(item[key], item);
    }
  });
  return Array.from(map.values());
};

export const paginate = <T>(array: T[], page: number, pageSize: number): T[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
};

export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export const flattenObject = (
  obj: Record<string, any>,
  prefix: string = ''
): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], prefixedKey));
    } else {
      acc[prefixedKey] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);
};
