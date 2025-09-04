
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, Map, Calendar, Clock } from 'lucide-react';
import DistributionCRUD from '@/components/crud/DistributionCRUD';

const Distribution = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Distribusi - CRUD Aktif</h1>
              <p className="text-muted-foreground">Manajemen distribusi dengan sistem role-based access control</p>
            </div>

            {/* CRUD Component for Distribution */}
            <div className="mb-6">
              <DistributionCRUD />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Truck className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Pengiriman Aktif
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">8</div>
                  <p className="text-muted-foreground text-sm">Sedang dalam proses</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Package className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Total Logistik
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">1.4t</div>
                  <p className="text-muted-foreground text-sm">Dalam distribusi bulan ini</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Map className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Jangkauan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">12</div>
                  <p className="text-muted-foreground text-sm">Kota di seluruh Indonesia</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Clock className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Waktu Pengiriman
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">36j</div>
                  <p className="text-muted-foreground text-sm">Rata-rata waktu transit</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Pengiriman Aktif</CardTitle>
                  <CardDescription>Status pengiriman yang sedang berlangsung</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between mb-3">
                        <div>
                          <span className="font-medium">ID-24050022</span>
                          <span className="ml-3 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Dalam Perjalanan</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Diperbarui 2 jam lalu</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Dari</div>
                          <div>Depot Pusat Jakarta</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Estimasi Tiba</div>
                          <div>21 Mei 2025, 14:30</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Ke</div>
                          <div>RSPAU Hardjolukito</div>
                        </div>
                      </div>
                      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between mb-3">
                        <div>
                          <span className="font-medium">ID-24050018</span>
                          <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Tiba Hari Ini</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Diperbarui 30 menit lalu</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Dari</div>
                          <div>RS Lanud Halim</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Estimasi Tiba</div>
                          <div>20 Mei 2025, 16:00</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Ke</div>
                          <div>RS Lanud Adisutjipto</div>
                        </div>
                      </div>
                      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between mb-3">
                        <div>
                          <span className="font-medium">ID-24050015</span>
                          <span className="ml-3 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Sedang Diproses</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Diperbarui 5 jam lalu</div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <div className="text-sm text-muted-foreground">Dari</div>
                          <div>Depot Pusat Jakarta</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Estimasi Tiba</div>
                          <div>23 Mei 2025, 09:00</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Ke</div>
                          <div>RS Lanud Husein S.</div>
                        </div>
                      </div>
                      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Permintaan Mendesak</CardTitle>
                  <CardDescription>Permintaan logistik prioritas tinggi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-3 rounded-md border border-red-200">
                      <div className="font-medium text-tniau-red">RS Lanud Adisutjipto</div>
                      <div className="text-sm mb-1">Darah Golongan O- (15 Unit)</div>
                      <div className="text-xs text-gray-500">Diperlukan sebelum 21 Mei</div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-md border border-red-200">
                      <div className="font-medium text-tniau-red">RSPAU Hardjolukito</div>
                      <div className="text-sm mb-1">Ventilator ICU (2 Unit)</div>
                      <div className="text-xs text-gray-500">Diperlukan sebelum 22 Mei</div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                      <div className="font-medium text-amber-700">RS Lanud Halim</div>
                      <div className="text-sm mb-1">Antibiotik Meropenem (50 Vial)</div>
                      <div className="text-xs text-gray-500">Diperlukan sebelum 25 Mei</div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                      <div className="font-medium text-amber-700">RS Lanud Hasanuddin</div>
                      <div className="text-sm mb-1">Set Alat Bedah Minor (3 Set)</div>
                      <div className="text-xs text-gray-500">Diperlukan sebelum 27 Mei</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Jadwal Pengiriman Mendatang</CardTitle>
                  <CardDescription>Pengiriman terjadwal dalam 7 hari ke depan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Pengiriman Rutin Depot Jakarta</div>
                        <div className="text-sm text-muted-foreground">Ke RS Lanud Halim</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tniau-lightblue">22 Mei 2025</div>
                        <div className="text-sm">Logistik Reguler</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Pengiriman Khusus Depot Bandung</div>
                        <div className="text-sm text-muted-foreground">Ke RSPAU Hardjolukito</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tniau-lightblue">24 Mei 2025</div>
                        <div className="text-sm">Alat Medis</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Pengiriman Rutin Depot Jakarta</div>
                        <div className="text-sm text-muted-foreground">Ke RS Lanud Adisutjipto</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tniau-lightblue">25 Mei 2025</div>
                        <div className="text-sm">Logistik Reguler</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Pengiriman Khusus Depot Surabaya</div>
                        <div className="text-sm text-muted-foreground">Ke RS Lanud Husein S.</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tniau-lightblue">26 Mei 2025</div>
                        <div className="text-sm">Vaksin & Obat</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Armada Transportasi</CardTitle>
                  <CardDescription>Status kendaraan logistik</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Armada</span>
                      <span className="font-medium">24 Kendaraan</span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Siap Operasi</span>
                        <span>18 Kendaraan</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div className="bg-green-500 h-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Dalam Misi</span>
                        <span>5 Kendaraan</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div className="bg-amber-500 h-full" style={{ width: '21%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Dalam Perawatan</span>
                        <span>1 Kendaraan</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div className="bg-red-500 h-full" style={{ width: '4%' }}></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span>Tipe Kendaraan</span>
                        <span></span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>• Truk Logistik</span>
                        <span>12 Unit</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>• Van Medis</span>
                        <span>8 Unit</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>• SUV Operasional</span>
                        <span>4 Unit</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Distribution;
