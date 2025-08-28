
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import InventoryCRUD from '@/components/crud/InventoryCRUD';
import { Package, Pill, Syringe, Clipboard, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data for inventory items
const inventoryData = [
  {
    id: '1',
    name: 'Obat Analgesik',
    category: 'Obat',
    stock: 1245,
    unit: 'Strip',
    threshold: 500,
    status: 'normal' as const,
  },
  {
    id: '2',
    name: 'Sarung Tangan Medis',
    category: 'Alkes',
    stock: 860,
    unit: 'Box',
    threshold: 200,
    status: 'warning' as const,
  },
  {
    id: '3',
    name: 'Jarum Suntik',
    category: 'Alkes',
    stock: 320,
    unit: 'Box',
    threshold: 350,
    status: 'critical' as const,
  },
  {
    id: '4',
    name: 'Antiseptik',
    category: 'Cairan',
    stock: 75,
    unit: 'Botol',
    threshold: 100,
    status: 'critical' as const,
  },
  {
    id: '5',
    name: 'Perban Steril',
    category: 'Alkes',
    stock: 430,
    unit: 'Roll',
    threshold: 200,
    status: 'normal' as const,
  }
];

// Mock data for inventory alerts
const inventoryAlerts = [
  {
    id: '1',
    title: 'Stok Kritis',
    item: 'Jarum Suntik',
    message: 'Sisa 320 box (di bawah threshold 350)',
    time: '15 menit yang lalu',
    priority: 'high' as const,
  },
  {
    id: '2',
    title: 'Stok Kritis',
    item: 'Antiseptik',
    message: 'Sisa 75 botol (di bawah threshold 100)',
    time: '30 menit yang lalu',
    priority: 'high' as const,
  },
  {
    id: '3',
    title: 'Stok Menipis',
    item: 'Sarung Tangan Medis',
    message: 'Sisa 860 box (mendekati threshold 200)',
    time: '1 jam yang lalu',
    priority: 'medium' as const,
  }
];

// Get stock status color
const getStockStatusColor = (status: 'normal' | 'warning' | 'critical') => {
  switch (status) {
    case 'normal':
      return 'bg-green-500';
    case 'warning':
      return 'bg-yellow-500';
    case 'critical':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

// Get priority badge color
const getPriorityClass = (priority: 'high' | 'medium' | 'low') => {
  switch (priority) {
    case 'high':
      return 'bg-tniau-red text-white';
    case 'medium':
      return 'bg-tniau-orange text-white';
    case 'low':
      return 'bg-tniau-blue text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

// Calculate stock percentage
const calculateStockPercentage = (stock: number, threshold: number) => {
  return Math.min(100, Math.round((stock / (threshold * 2)) * 100));
};

const LogisticsAndInventory = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Logistik & Inventori - CRUD Aktif</h1>
              <p className="text-muted-foreground">Manajemen persediaan dengan sistem role-based access control</p>
            </div>
            
            {/* Import the CRUD component */}
            <div className="mb-6">
              <InventoryCRUD />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 bg-blue-100 rounded-md mr-4">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Jenis Item</p>
                    <p className="text-2xl font-semibold">1,245</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 bg-green-100 rounded-md mr-4">
                    <Pill className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Obat-obatan</p>
                    <p className="text-2xl font-semibold">625</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 bg-purple-100 rounded-md mr-4">
                    <Syringe className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Alat Kesehatan</p>
                    <p className="text-2xl font-semibold">430</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center">
                  <div className="p-2 bg-red-100 rounded-md mr-4">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Stok Kritis</p>
                    <p className="text-2xl font-semibold">8</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inventory List - 2/3 width on large screens */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Inventaris Stok</CardTitle>
                      <Badge variant="outline" className="font-normal">Diperbarui 10 menit lalu</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="px-4 py-3 font-medium">Nama Item</th>
                            <th className="px-4 py-3 font-medium">Kategori</th>
                            <th className="px-4 py-3 font-medium">Stok</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {inventoryData.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">{item.name}</td>
                              <td className="px-4 py-3">{item.category}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center space-x-2">
                                  <span>{item.stock} {item.unit}</span>
                                  <Progress 
                                    value={calculateStockPercentage(item.stock, item.threshold)} 
                                    className="w-20 h-2"
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  <div className={`w-2 h-2 rounded-full mr-2 ${getStockStatusColor(item.status)}`}></div>
                                  <span>
                                    {item.status === 'normal' ? 'Normal' : 
                                     item.status === 'warning' ? 'Menipis' : 'Kritis'}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <Button variant="ghost" size="sm" className="h-8">
                                  Detail
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Button>Lihat Semua Item</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Riwayat Transaksi</CardTitle>
                      <Button variant="outline" size="sm" className="h-8">
                        Filter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-md">
                        <div className="p-2 bg-blue-100 rounded-full mr-4">
                          <ArrowUpRight className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">Pengiriman Obat Analgesik</p>
                            <p className="text-sm text-gray-500">Hari ini, 10:25</p>
                          </div>
                          <p className="text-sm text-gray-500">+250 Strip • RS Lanud Halim</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-50 rounded-md">
                        <div className="p-2 bg-blue-100 rounded-full mr-4">
                          <ArrowUpRight className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">Pengiriman Perban Steril</p>
                            <p className="text-sm text-gray-500">Hari ini, 09:15</p>
                          </div>
                          <p className="text-sm text-gray-500">+100 Roll • RS Lanud Adisutjipto</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-50 rounded-md">
                        <div className="p-2 bg-blue-100 rounded-full mr-4">
                          <ArrowUpRight className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">Pengiriman Sarung Tangan Medis</p>
                            <p className="text-sm text-gray-500">Kemarin, 15:40</p>
                          </div>
                          <p className="text-sm text-gray-500">+150 Box • RSPAU Hardjolukito</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <Button variant="outline">Lihat Semua Transaksi</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts - 1/3 width on large screens */}
              <div className="lg:col-span-1">
                <Card className="h-full overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-tniau-red" />
                        Peringatan Stok
                      </CardTitle>
                      <Badge className="font-normal bg-tniau-red">{inventoryAlerts.length} Peringatan</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-auto max-h-[500px]">
                      <ul className="divide-y">
                        {inventoryAlerts.map((alert) => (
                          <li key={alert.id} className="p-4 hover:bg-muted/50">
                            <div className="flex items-start">
                              <Badge className={`mr-3 mt-0.5 ${getPriorityClass(alert.priority)}`}>
                                {alert.priority === 'high' ? 'Tinggi' : alert.priority === 'medium' ? 'Sedang' : 'Rendah'}
                              </Badge>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{alert.title}: {alert.item}</h4>
                                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                                <div className="flex justify-end items-center mt-2">
                                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                    Pesan Stok
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        Lihat Semua Peringatan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LogisticsAndInventory;
