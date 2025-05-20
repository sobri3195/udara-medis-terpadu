
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, Clock, Calendar, List, FileText } from 'lucide-react';

const MedicalServices = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Pelayanan Medis</h1>
              <p className="text-muted-foreground">Manajemen pelayanan medis dan monitoring pasien</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Activity className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Pasien Aktif
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">402</div>
                  <p className="text-muted-foreground text-sm">+12 dalam 24 jam terakhir</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Dokter Bertugas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">45</div>
                  <p className="text-muted-foreground text-sm">Dari total 68 dokter</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Clock className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Waktu Tunggu Rata-rata
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">24m</div>
                  <p className="text-muted-foreground text-sm">-5m dari minggu lalu</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Penggunaan Kamar</CardTitle>
                  <CardDescription>Status penggunaan ruang di seluruh rumah sakit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Ruang Rawat Inap</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-tniau-navy h-2 w-16 rounded-full overflow-hidden">
                          <span className="bg-tniau-lightblue h-full block" style={{ width: '78%' }}></span>
                        </span>
                        <span>78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Ruang ICU</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-tniau-navy h-2 w-16 rounded-full overflow-hidden">
                          <span className="bg-tniau-red h-full block" style={{ width: '92%' }}></span>
                        </span>
                        <span>92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Ruang Operasi</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-tniau-navy h-2 w-16 rounded-full overflow-hidden">
                          <span className="bg-tniau-lightblue h-full block" style={{ width: '65%' }}></span>
                        </span>
                        <span>65%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">IGD</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-tniau-navy h-2 w-16 rounded-full overflow-hidden">
                          <span className="bg-tniau-red h-full block" style={{ width: '88%' }}></span>
                        </span>
                        <span>88%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pasien Emergensi Terkini</CardTitle>
                  <CardDescription>Kasus emergensi dalam 24 jam terakhir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-tniau-red pl-3 py-1">
                      <div className="font-medium">Kasus Trauma Multi-Organ</div>
                      <div className="text-sm text-muted-foreground">RSPAU Hardjolukito - 2 jam lalu</div>
                    </div>
                    <div className="border-l-4 border-tniau-red pl-3 py-1">
                      <div className="font-medium">Serangan Jantung Akut</div>
                      <div className="text-sm text-muted-foreground">RS Lanud Adisutjipto - 4 jam lalu</div>
                    </div>
                    <div className="border-l-4 border-amber-400 pl-3 py-1">
                      <div className="font-medium">Kecelakaan Kendaraan</div>
                      <div className="text-sm text-muted-foreground">RS Lanud Halim - 6 jam lalu</div>
                    </div>
                    <div className="border-l-4 border-amber-400 pl-3 py-1">
                      <div className="font-medium">Luka Bakar Serius</div>
                      <div className="text-sm text-muted-foreground">RS Lanud Hasanuddin - 7 jam lalu</div>
                    </div>
                    <div className="mt-2 text-center">
                      <a href="#" className="text-sm text-tniau-lightblue hover:underline">Lihat semua kasus emergensi</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Jadwal Operasi</CardTitle>
                  <CardDescription>Operasi terjadwal untuk hari ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Apendektomi</div>
                        <div className="text-sm text-muted-foreground">Dokter Mia Purnama, SpB</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tniau-lightblue">09:00 - 10:30</div>
                        <div className="text-sm">Ruang OP-2</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Hernioplasti</div>
                        <div className="text-sm text-muted-foreground">Dr. Budi Santoso, SpB</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tniau-lightblue">11:00 - 12:30</div>
                        <div className="text-sm">Ruang OP-1</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div>
                        <div className="font-medium">Tiroidektomi</div>
                        <div className="text-sm text-muted-foreground">Dr. Rina Wijaya, SpB</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-tniau-lightblue">13:30 - 15:30</div>
                        <div className="text-sm">Ruang OP-3</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dokumen Medis</CardTitle>
                  <CardDescription>Dokumen yang memerlukan perhatian</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-3 items-center">
                      <FileText className="h-5 w-5 text-tniau-navy" />
                      <div>
                        <div className="font-medium">Laporan Medis Bulanan</div>
                        <div className="text-xs text-muted-foreground">Perlu ditandatangani</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <FileText className="h-5 w-5 text-tniau-navy" />
                      <div>
                        <div className="font-medium">Surat Rujukan (5)</div>
                        <div className="text-xs text-muted-foreground">Perlu diproses</div>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center">
                      <FileText className="h-5 w-5 text-tniau-navy" />
                      <div>
                        <div className="font-medium">Riwayat Medis Pasien</div>
                        <div className="text-xs text-muted-foreground">Perlu diperbarui</div>
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

export default MedicalServices;
