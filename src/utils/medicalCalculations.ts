export const calculateBMI = (weightKg: number, heightCm: number): number => {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(2));
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Kurus';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Gemuk';
  return 'Obesitas';
};

export const calculateBMR = (
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female'
): number => {
  if (gender === 'male') {
    return 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
  }
};

export const calculateDosage = (
  weightKg: number,
  dosagePerKg: number,
  maxDose?: number
): number => {
  const calculatedDose = weightKg * dosagePerKg;
  return maxDose ? Math.min(calculatedDose, maxDose) : calculatedDose;
};

export const calculateDripRate = (
  volumeML: number,
  durationMinutes: number,
  dropFactor: number = 20
): number => {
  return Math.round((volumeML * dropFactor) / durationMinutes);
};

export const calculateBloodPressureCategory = (
  systolic: number,
  diastolic: number
): string => {
  if (systolic < 120 && diastolic < 80) return 'Normal';
  if (systolic < 130 && diastolic < 80) return 'Elevated';
  if (systolic < 140 || diastolic < 90) return 'Hipertensi Stage 1';
  if (systolic < 180 || diastolic < 120) return 'Hipertensi Stage 2';
  return 'Krisis Hipertensi';
};

export const calculateGFR = (
  creatinineMgDL: number,
  age: number,
  gender: 'male' | 'female',
  weightKg?: number
): number => {
  const k = gender === 'male' ? 1 : 0.85;
  const gfr = ((140 - age) * (weightKg || 72)) / (72 * creatinineMgDL);
  return Number((gfr * k).toFixed(2));
};

export const calculatePulseOxygenSaturation = (spo2: number): string => {
  if (spo2 >= 95) return 'Normal';
  if (spo2 >= 90) return 'Ringan';
  if (spo2 >= 85) return 'Sedang';
  return 'Berat';
};

export const calculateAPGARScore = (scores: {
  appearance: number;
  pulse: number;
  grimace: number;
  activity: number;
  respiration: number;
}): { total: number; category: string } => {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  let category = 'Normal';
  if (total < 4) category = 'Kritis';
  else if (total < 7) category = 'Perlu Perhatian';
  return { total, category };
};

export const calculateIVFluidRate = (
  volumeML: number,
  durationHours: number
): number => {
  return Math.round(volumeML / durationHours);
};

export const calculateCalorieRequirement = (
  bmr: number,
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
): number => {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9,
  };
  return Math.round(bmr * activityMultipliers[activityLevel]);
};
