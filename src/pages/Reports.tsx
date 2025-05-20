
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart4, FileText, Activity, Calendar, Users, Package } from 'lucide-react';

const Reports = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Laporan & Analitik</h1>
              <p className="text-muted-foreground">Laporan kinerja dan analisis data medis TNI AU</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <FileText className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Total Laporan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">248</div>
                  <p className="text-muted-foreground text-sm">Dibuat bulan ini</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Activity className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Efisiensi Operasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">86%</div>
                  <p className="text-muted-foreground text-sm">+3% dari bulan lalu</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Calendar className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Laporan Tertunda
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">12</div>
                  <p className="text-muted-foreground text-sm">Perlu diproses</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Kasus Medis</CardTitle>
                  <CardDescription>Kasus menurut kategori di seluruh RS (30 hari terakhir)</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex h-60 flex-col justify-between">
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sistem Pernapasan</span>
                          <span className="font-medium">215 kasus</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-tniau-lightblue h-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Penyakit Jantung</span>
                          <span className="font-medium">185 kasus</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-tniau-lightblue h-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Trauma & Cedera</span>
                          <span className="font-medium">120 kasus</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-tniau-lightblue h-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Infeksi Umum</span>
                          <span className="font-medium">95 kasus</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="bg-tniau-lightblue h-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right mt-2">
                      <a href="#" className="text-sm text-tniau-lightblue hover:underline">Lihat laporan lengkap</a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Penggunaan Sumber Daya</CardTitle>
                  <CardDescription>Persentase penggunaan sumber daya per rumah sakit</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex h-60 flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium">RSPAU Hardjolukito</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span>SDM: 85%</span>
                            <span>Alkes: 76%</span>
                            <span>Ruangan: 82%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-tniau-navy h-full" style={{ width: '81%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium">RS Lanud Halim</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span>SDM: 78%</span>
                            <span>Alkes: 82%</span>
                            <span>Ruangan: 75%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-tniau-navy h-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium">RS Lanud Adisutjipto</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span>SDM: 92%</span>
                            <span>Alkes: 78%</span>
                            <span>Ruangan: 90%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-tniau-red h-full" style={{ width: '87%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium">RS Lanud Husein S.</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span>SDM: 65%</span>
                            <span>Alkes: 72%</span>
                            <span>Ruangan: 68%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-tniau-navy h-full" style={{ width: '68%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right mt-2">
                      <a href="#" className="text-sm text-tniau-lightblue hover:underline">Unduh laporan</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>Rata-rata Pasien Harian</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-tniau-navy">124</div>
                    <div className="text-sm text-green-600 font-medium mt-1">▲ 5% dari bulan lalu</div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Apr</span>
                        <span className="text-xs text-muted-foreground">Mei</span>
                      </div>
                      <div className="flex items-end h-12 gap-1 mt-1">
                        {[35, 42, 58, 50, 65, 60, 78, 70, 85, 80, 90, 95].map((h, i) => (
                          <div 
                            key={i} 
                            className="flex-1 bg-tniau-lightblue rounded-sm opacity-90"
                            style={{ height: `${h}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    <span>Konsumsi Persediaan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-tniau-navy">82%</div>
                    <div className="text-sm text-red-600 font-medium mt-1">▲ 8% dari target</div>
                    <div className="mt-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Obat</span>
                            <span>78%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-tniau-lightblue h-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Alat Medis</span>
                            <span>85%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-tniau-lightblue h-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    <span>Rata-rata Waktu Rawat</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-tniau-navy">4.2</div>
                    <div className="text-xs font-medium mt-1">Hari</div>
                    <div className="text-sm text-green-600 font-medium mt-1">▼ 0.5 hari dari standar</div>
                    <div className="mt-4">
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div className="text-center p-2 bg-gray-50 rounded-md">
                          <div className="text-xl font-bold text-tniau-navy">5.1</div>
                          <div className="text-xs text-muted-foreground">RSPAU</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-md">
                          <div className="text-xl font-bold text-tniau-navy">3.8</div>
                          <div className="text-xs text-muted-foreground">RS Halim</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-md">
                          <div className="text-xl font-bold text-tniau-navy">3.7</div>
                          <div className="text-xs text-muted-foreground">RS Adisutjipto</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Laporan Terbaru</CardTitle>
                  <CardDescription>Laporan yang baru dibuat dalam 7 hari terakhir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Laporan Bulanan Operasional RSPAU</div>
                        <div className="text-xs text-muted-foreground">Dibuat oleh: Letkol dr. Ratna W.</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-tniau-lightblue">19 Mei 2025</div>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          <span className="text-xs">Disetujui</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Analisis Kinerja Medis Q2 2025</div>
                        <div className="text-xs text-muted-foreground">Dibuat oleh: Mayor dr. Handoko P.</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-tniau-lightblue">18 Mei 2025</div>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                          <span className="text-xs">Dalam Peninjauan</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Evaluasi SDM Medis TNI AU</div>
                        <div className="text-xs text-muted-foreground">Dibuat oleh: Kolonel dr. Bambang S.</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-tniau-lightblue">16 Mei 2025</div>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                          <span className="text-xs">Disetujui</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Laporan Logistik Medis Strategis</div>
                        <div className="text-xs text-muted-foreground">Dibuat oleh: Kapten Mira K.</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-tniau-lightblue">15 Mei 2025</div>
                        <div className="flex gap-2 items-center mt-1">
                          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                          <span className="text-xs">Dalam Peninjauan</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Laporan untuk Disetujui</CardTitle>
                  <CardDescription>Perlu persetujuan segera</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                      <div className="font-medium text-amber-700">Laporan Pembelian Alkes</div>
                      <div className="text-sm mb-1">ID-RPT-24-0842</div>
                      <div className="flex justify-between text-xs">
                        <span>Dibuat: 18 Mei 2025</span>
                        <span>Oleh: Kapten Rudi</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                      <div className="font-medium text-amber-700">Evaluasi Distribusi Logistik</div>
                      <div className="text-sm mb-1">ID-RPT-24-0841</div>
                      <div className="flex justify-between text-xs">
                        <span>Dibuat: 17 Mei 2025</span>
                        <span>Oleh: Mayor Tiara</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                      <div className="font-medium text-amber-700">Analisis Pasien Trauma</div>
                      <div className="text-sm mb-1">ID-RPT-24-0836</div>
                      <div className="flex justify-between text-xs">
                        <span>Dibuat: 16 Mei 2025</span>
                        <span>Oleh: dr. Fajar W.</span>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-center">
                      <button className="text-sm font-medium text-tniau-lightblue hover:underline">
                        Lihat semua (8)
                      </button>
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

export default Reports;
