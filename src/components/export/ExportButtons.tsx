import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileDown, Printer } from 'lucide-react';
import { exportToCSV, exportToJSON, exportToPDF, generateSampleReportData } from '@/utils/exportUtils';
import { toast } from 'sonner';

interface ExportButtonsProps {
  reportType: string;
  data?: any[];
  title?: string;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ 
  reportType, 
  data, 
  title = reportType 
}) => {
  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    const exportData = data || generateSampleReportData(reportType);
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `laporan_${reportType}_${timestamp}`;

    switch (format) {
      case 'csv':
        exportToCSV(exportData, `${filename}.csv`);
        toast.success(`Laporan ${title} berhasil diekspor ke CSV`);
        break;
      case 'json':
        exportToJSON(exportData, `${filename}.json`);
        toast.success(`Laporan ${title} berhasil diekspor ke JSON`);
        break;
      case 'pdf':
        const htmlContent = generateReportHTML(title, exportData);
        exportToPDF(htmlContent, `${filename}.pdf`);
        toast.success(`Laporan ${title} berhasil diekspor ke PDF`);
        break;
    }
  };

  const generateReportHTML = (reportTitle: string, exportData: any[]) => {
    if (!exportData || exportData.length === 0) return '<p>Tidak ada data untuk ditampilkan</p>';

    const headers = Object.keys(exportData[0]);
    const rows = exportData.map(row => 
      `<tr>${headers.map(header => `<td>${row[header] || '-'}</td>`).join('')}</tr>`
    ).join('');

    return `
      <h2>Laporan ${reportTitle.charAt(0).toUpperCase() + reportTitle.slice(1)}</h2>
      <table>
        <thead>
          <tr>${headers.map(header => `<th>${header.replace(/_/g, ' ').toUpperCase()}</th>`).join('')}</tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleExport('csv')}
        className="text-xs"
      >
        <Download className="h-3 w-3 mr-1" />
        CSV
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleExport('json')}
        className="text-xs"
      >
        <FileDown className="h-3 w-3 mr-1" />
        JSON
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleExport('pdf')}
        className="text-xs"
      >
        <Printer className="h-3 w-3 mr-1" />
        PDF
      </Button>
    </div>
  );
};

export default ExportButtons;