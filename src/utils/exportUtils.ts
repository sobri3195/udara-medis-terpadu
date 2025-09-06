// Export utility functions for generating reports

export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv');
};

export const exportToJSON = (data: any[], filename: string) => {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, filename, 'application/json');
};

export const exportToPDF = async (htmlContent: string, filename: string) => {
  // Simple HTML to PDF export using print functionality
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .header { text-align: center; margin-bottom: 20px; }
          .meta { color: #666; font-size: 12px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Laporan Sistem Medis TNI AU</h1>
          <div class="meta">Digenerate pada: ${new Date().toLocaleString('id-ID')}</div>
        </div>
        ${htmlContent}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate sample data for different report types
export const generateSampleReportData = (reportType: string) => {
  const timestamp = new Date().toISOString().split('T')[0];
  
  switch (reportType) {
    case 'inventory':
      return [
        { item_name: 'Paracetamol 500mg', current_stock: 1250, minimum_stock: 500, category: 'Obat', supplier: 'PT Kimia Farma', expiry_date: '2025-12-31' },
        { item_name: 'Thermometer Digital', current_stock: 45, minimum_stock: 20, category: 'Alat Medis', supplier: 'PT Onemed', expiry_date: null },
        { item_name: 'Masker N95', current_stock: 2800, minimum_stock: 1000, category: 'APD', supplier: 'PT 3M Indonesia', expiry_date: '2026-06-15' },
        { item_name: 'Stetoskop', current_stock: 25, minimum_stock: 15, category: 'Alat Medis', supplier: 'PT Riester', expiry_date: null },
        { item_name: 'Antibiotik Amoxicillin', current_stock: 800, minimum_stock: 300, category: 'Obat', supplier: 'PT Dexa Medica', expiry_date: '2025-08-20' }
      ];
    
    case 'personnel':
      return [
        { name: 'Kolonel dr. Ahmad Surya', rank: 'Kolonel', position: 'Kepala RS', unit: 'RSPAU Hardjolukito', status: 'active' },
        { name: 'Letkol dr. Sari Wulandari', rank: 'Letkol', position: 'Dokter Spesialis', unit: 'RSPAU Hardjolukito', status: 'active' },
        { name: 'Mayor dr. Budi Santoso', rank: 'Mayor', position: 'Dokter Umum', unit: 'RS Lanud Halim', status: 'active' },
        { name: 'Kapten Ns. Rini Astuti', rank: 'Kapten', position: 'Kepala Perawat', unit: 'RS Lanud Adisutjipto', status: 'active' },
        { name: 'Lettu Apt. Eko Prasetyo', rank: 'Lettu', position: 'Apoteker', unit: 'RS Lanud Husein S.', status: 'active' }
      ];
    
    case 'hospitals':
      return [
        { name: 'RSPAU Hardjolukito', location: 'Yogyakarta', total_beds: 150, available_beds: 32, operating_rooms: 5, emergency_status: 'normal' },
        { name: 'RS Lanud Halim', location: 'Jakarta', total_beds: 120, available_beds: 18, operating_rooms: 4, emergency_status: 'busy' },
        { name: 'RS Lanud Adisutjipto', location: 'Yogyakarta', total_beds: 80, available_beds: 8, operating_rooms: 3, emergency_status: 'critical' },
        { name: 'RS Lanud Husein S.', location: 'Bandung', total_beds: 75, available_beds: 25, operating_rooms: 2, emergency_status: 'normal' },
        { name: 'RS Lanud Hasanuddin', location: 'Makassar', total_beds: 85, available_beds: 25, operating_rooms: 2, emergency_status: 'normal' }
      ];
    
    case 'distributions':
      return [
        { destination: 'RSPAU Hardjolukito', item_name: 'Paracetamol 500mg', quantity: 500, status: 'completed', distribution_date: '2025-01-05' },
        { destination: 'RS Lanud Halim', item_name: 'Masker N95', quantity: 1000, status: 'pending', distribution_date: '2025-01-06' },
        { destination: 'RS Lanud Adisutjipto', item_name: 'Thermometer Digital', quantity: 10, status: 'in_transit', distribution_date: '2025-01-04' },
        { destination: 'RS Lanud Husein S.', item_name: 'Antibiotik Amoxicillin', quantity: 200, status: 'completed', distribution_date: '2025-01-03' },
        { destination: 'RS Lanud Hasanuddin', item_name: 'Stetoskop', quantity: 5, status: 'pending', distribution_date: '2025-01-06' }
      ];
    
    default:
      return [];
  }
};