export interface ReportMetadata {
  title: string;
  generatedAt: Date;
  generatedBy: string;
  period?: { start: Date; end: Date };
  department?: string;
}

export const generateReportHeader = (metadata: ReportMetadata): string => {
  const { title, generatedAt, generatedBy, period, department } = metadata;
  
  let header = `=================================\n`;
  header += `${title.toUpperCase()}\n`;
  header += `=================================\n\n`;
  header += `Dibuat pada: ${generatedAt.toLocaleString('id-ID')}\n`;
  header += `Dibuat oleh: ${generatedBy}\n`;
  
  if (department) {
    header += `Departemen: ${department}\n`;
  }
  
  if (period) {
    header += `Periode: ${period.start.toLocaleDateString('id-ID')} - ${period.end.toLocaleDateString('id-ID')}\n`;
  }
  
  header += `\n`;
  return header;
};

export const generateSummaryTable = (
  data: Record<string, string | number>[],
  columns: { key: string; label: string; width?: number }[]
): string => {
  let table = '';
  
  const columnWidths = columns.map((col) => col.width || 20);
  
  table += columns.map((col, i) => col.label.padEnd(columnWidths[i])).join(' | ') + '\n';
  table += columnWidths.map((w) => '-'.repeat(w)).join('-+-') + '\n';
  
  data.forEach((row) => {
    table += columns
      .map((col, i) => String(row[col.key] || '-').padEnd(columnWidths[i]))
      .join(' | ') + '\n';
  });
  
  return table;
};

export const calculateStatistics = (numbers: number[]): {
  min: number;
  max: number;
  mean: number;
  median: number;
  stdDev: number;
} => {
  if (numbers.length === 0) {
    return { min: 0, max: 0, mean: 0, median: 0, stdDev: 0 };
  }
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const mean = numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
  
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  
  const variance = numbers.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / numbers.length;
  const stdDev = Math.sqrt(variance);
  
  return { min, max, mean, median, stdDev };
};

export const generateTrendAnalysis = (
  data: { date: Date; value: number }[]
): { trend: 'increasing' | 'decreasing' | 'stable'; changePercent: number } => {
  if (data.length < 2) {
    return { trend: 'stable', changePercent: 0 };
  }
  
  const sorted = [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
  const firstValue = sorted[0].value;
  const lastValue = sorted[sorted.length - 1].value;
  
  const changePercent = ((lastValue - firstValue) / firstValue) * 100;
  
  let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
  if (changePercent > 5) trend = 'increasing';
  else if (changePercent < -5) trend = 'decreasing';
  
  return { trend, changePercent: Number(changePercent.toFixed(2)) };
};

export const generateAlertsSummary = (
  alerts: { level: 'low' | 'medium' | 'high' | 'critical'; message: string }[]
): string => {
  const grouped = {
    critical: alerts.filter((a) => a.level === 'critical'),
    high: alerts.filter((a) => a.level === 'high'),
    medium: alerts.filter((a) => a.level === 'medium'),
    low: alerts.filter((a) => a.level === 'low'),
  };
  
  let summary = 'RINGKASAN PERINGATAN\n';
  summary += '===================\n\n';
  
  if (grouped.critical.length > 0) {
    summary += `🔴 KRITIS (${grouped.critical.length}):\n`;
    grouped.critical.forEach((alert) => {
      summary += `   - ${alert.message}\n`;
    });
    summary += '\n';
  }
  
  if (grouped.high.length > 0) {
    summary += `🟠 TINGGI (${grouped.high.length}):\n`;
    grouped.high.forEach((alert) => {
      summary += `   - ${alert.message}\n`;
    });
    summary += '\n';
  }
  
  if (grouped.medium.length > 0) {
    summary += `🟡 SEDANG (${grouped.medium.length}):\n`;
    grouped.medium.forEach((alert) => {
      summary += `   - ${alert.message}\n`;
    });
    summary += '\n';
  }
  
  if (grouped.low.length > 0) {
    summary += `🟢 RENDAH (${grouped.low.length}):\n`;
    grouped.low.forEach((alert) => {
      summary += `   - ${alert.message}\n`;
    });
    summary += '\n';
  }
  
  return summary;
};

export const generateComparisonReport = (
  current: Record<string, number>,
  previous: Record<string, number>
): { key: string; current: number; previous: number; change: number; changePercent: number }[] => {
  return Object.keys(current).map((key) => {
    const currentVal = current[key] || 0;
    const previousVal = previous[key] || 0;
    const change = currentVal - previousVal;
    const changePercent = previousVal !== 0 ? (change / previousVal) * 100 : 0;
    
    return {
      key,
      current: currentVal,
      previous: previousVal,
      change,
      changePercent: Number(changePercent.toFixed(2)),
    };
  });
};
