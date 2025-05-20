
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, FileText, Activity, Shield } from 'lucide-react';

const Personnel = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">SDM & Personel</h1>
              <p className="text-muted-foreground">Manajemen sumber daya manusia dan personel medis TNI AU</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Total Personel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">587</div>
                  <p className="text-muted-foreground text-sm">Di seluruh RS TNI AU</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Shield className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Dokter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">68</div>
                  <p className="text-muted-foreground text-sm">Spesialis & Umum</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Activity className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Perawat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">215</div>
                  <p className="text-muted-foreground text-sm">+5 rekrutmen baru</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Calendar className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Cuti
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">12</div>
                  <p className="text-muted-foreground text-sm">Personel sedang cuti</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Distribusi Personel</CardTitle>
                  <CardDescription>Sebaran personel di seluruh RS TNI AU</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">RSPAU Hardjolukito</span>
                        <span>205 personel</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-tniau-lightblue h-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">RS Lanud Halim</span>
                        <span>165 personel</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-tniau-lightblue h-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">RS Lanud Adisutjipto</span>
                        <span>112 personel</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-tniau-lightblue h-full" style={{ width: '19%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">RS Lanud Husein S.</span>
                        <span>58 personel</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-tniau-lightblue h-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">RS Lanud Hasanuddin</span>
                        <span>47 personel</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-tniau-lightblue h-full" style={{ width: '8%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rekrutmen & Pelatihan</CardTitle>
                  <CardDescription>Status rekrutmen dan pelatihan personel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-3 py-1">
                      <div className="font-medium">Rekrutmen Perawat</div>
                      <div className="text-sm text-muted-foreground">15 posisi - 5 terisi</div>
                    </div>
                    
                    <div className="border-l-4 border-amber-400 pl-3 py-1">
                      <div className="font-medium">Pelatihan Tanggap Darurat</div>
                      <div className="text-sm text-muted-foreground">Berlangsung - 45 peserta</div>
                    </div>
                    
                    <div className="border-l-4 border-tniau-lightblue pl-3 py-1">
                      <div className="font-medium">Sertifikasi Medis Udara</div>
                      <div className="text-sm text-muted-foreground">Pendaftaran dibuka - 20 slot</div>
                    </div>
                    
                    <div className="border-l-4 border-gray-300 pl-3 py-1">
                      <div className="font-medium">Rekrutmen Dokter Spesialis</div>
                      <div className="text-sm text-muted-foreground">Akan dibuka - Juni 2025</div>
                    </div>
                    
                    <div className="mt-2 text-center">
                      <a href="#" className="text-sm text-tniau-lightblue hover:underline">Lihat semua program</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personel Terbaru</CardTitle>
                  <CardDescription>Personel yang baru ditugaskan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-4 items-center bg-gray-50 p-3 rounded-md">
                        <div className="h-10 w-10 bg-tniau-navy rounded-full flex items-center justify-center text-white">
                          {String.fromCharCode(64 + i)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Letda Kes {['Budi Santoso', 'Rini Wulandari', 'Agus Purnomo', 'Diana Kusuma'][i-1]}</div>
                          <div className="text-sm text-muted-foreground">{['Dokter Umum', 'Perawat', 'Ahli Gizi', 'Apoteker'][i-1]}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-tniau-lightblue">{['RSPAU Hardjolukito', 'RS Lanud Halim', 'RS Lanud Adisutjipto', 'RS Lanud Husein S.'][i-1]}</div>
                          <div className="text-sm text-muted-foreground">Bergabung: {['15 Mei', '2 Mei', '28 April', '20 April'][i-1]} 2025</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kebutuhan SDM</CardTitle>
                  <CardDescription>Kebutuhan personel mendesak</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded-md border border-red-200">
                      <div className="font-medium text-tniau-red">Dokter Spesialis Anestesi</div>
                      <div className="text-sm">RS Lanud Adisutjipto - Prioritas Tinggi</div>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                      <div className="font-medium text-amber-700">Perawat ICU (3)</div>
                      <div className="text-sm">RSPAU Hardjolukito - Prioritas Sedang</div>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                      <div className="font-medium text-amber-700">Radiografer (2)</div>
                      <div className="text-sm">RS Lanud Halim - Prioritas Sedang</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                      <div className="font-medium text-blue-700">Staf Administrasi (4)</div>
                      <div className="text-sm">Berbagai lokasi - Prioritas Normal</div>
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

export default Personnel;
