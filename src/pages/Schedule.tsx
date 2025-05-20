
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, List } from 'lucide-react';

const Schedule = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Jadwal & Tugas</h1>
              <p className="text-muted-foreground">Manajemen jadwal dan penugasan personel medis TNI AU</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Calendar className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Jadwal Hari Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">86</div>
                  <p className="text-muted-foreground text-sm">Shift aktif</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Personel Bertugas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">235</div>
                  <p className="text-muted-foreground text-sm">Saat ini</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <List className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Tugas Tertunda
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">12</div>
                  <p className="text-muted-foreground text-sm">Perlu tindak lanjut</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Clock className="h-5 w-5 text-tniau-lightblue mr-2" />
                    Pergantian Shift
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-tniau-navy">2j</div>
                  <p className="text-muted-foreground text-sm">Hingga shift berikutnya</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Jadwal Harian</CardTitle>
                  <CardDescription>20 Mei 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground py-2 border-b">
                      <div className="col-span-3">Waktu</div>
                      <div className="col-span-3">Departemen</div>
                      <div className="col-span-3">Personel</div>
                      <div className="col-span-3">Status</div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 py-2 border-b">
                      <div className="col-span-3">
                        <div className="font-medium">07:00 - 15:00</div>
                        <div className="text-xs text-muted-foreground">Shift Pagi</div>
                      </div>
                      <div className="col-span-3">
                        <div>IGD</div>
                        <div className="text-xs text-muted-foreground">RSPAU Hardjolukito</div>
                      </div>
                      <div className="col-span-3">
                        <div>Dr. Budi S.</div>
                        <div className="text-xs text-muted-foreground">+8 Personel</div>
                      </div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-800 mr-1"></span>
                          Aktif
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 py-2 border-b">
                      <div className="col-span-3">
                        <div className="font-medium">07:00 - 15:00</div>
                        <div className="text-xs text-muted-foreground">Shift Pagi</div>
                      </div>
                      <div className="col-span-3">
                        <div>Poli Umum</div>
                        <div className="text-xs text-muted-foreground">RS Lanud Halim</div>
                      </div>
                      <div className="col-span-3">
                        <div>Dr. Maya W.</div>
                        <div className="text-xs text-muted-foreground">+6 Personel</div>
                      </div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-800 mr-1"></span>
                          Aktif
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 py-2 border-b">
                      <div className="col-span-3">
                        <div className="font-medium">15:00 - 23:00</div>
                        <div className="text-xs text-muted-foreground">Shift Sore</div>
                      </div>
                      <div className="col-span-3">
                        <div>IGD</div>
                        <div className="text-xs text-muted-foreground">RSPAU Hardjolukito</div>
                      </div>
                      <div className="col-span-3">
                        <div>Dr. Rina P.</div>
                        <div className="text-xs text-muted-foreground">+7 Personel</div>
                      </div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-800 mr-1"></span>
                          Mendatang
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 py-2 border-b">
                      <div className="col-span-3">
                        <div className="font-medium">15:00 - 23:00</div>
                        <div className="text-xs text-muted-foreground">Shift Sore</div>
                      </div>
                      <div className="col-span-3">
                        <div>Poli Umum</div>
                        <div className="text-xs text-muted-foreground">RS Lanud Halim</div>
                      </div>
                      <div className="col-span-3">
                        <div>Dr. Agus H.</div>
                        <div className="text-xs text-muted-foreground">+5 Personel</div>
                      </div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-800 mr-1"></span>
                          Mendatang
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 py-2 border-b">
                      <div className="col-span-3">
                        <div className="font-medium">23:00 - 07:00</div>
                        <div className="text-xs text-muted-foreground">Shift Malam</div>
                      </div>
                      <div className="col-span-3">
                        <div>IGD</div>
                        <div className="text-xs text-muted-foreground">RSPAU Hardjolukito</div>
                      </div>
                      <div className="col-span-3">
                        <div>Dr. Irfan S.</div>
                        <div className="text-xs text-muted-foreground">+6 Personel</div>
                      </div>
                      <div className="col-span-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-800 mr-1"></span>
                          Mendatang
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tugas Mendesak</CardTitle>
                  <CardDescription>Perlu diselesaikan hari ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded-md border border-red-200">
                      <div className="font-medium text-tniau-red">Verifikasi Data Emergensi</div>
                      <div className="text-sm mb-1">RSPAU Hardjolukito</div>
                      <div className="flex justify-between items-center text-xs">
                        <div>Penanggung jawab: Kapten Adi</div>
                        <div>10:00</div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-md border border-red-200">
                      <div className="font-medium text-tniau-red">Laporan Insiden Medis</div>
                      <div className="text-sm mb-1">RS Lanud Adisutjipto</div>
                      <div className="flex justify-between items-center text-xs">
                        <div>Penanggung jawab: Mayor Dina</div>
                        <div>12:30</div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                      <div className="font-medium text-amber-700">Update Protokol COVID-19</div>
                      <div className="text-sm mb-1">Semua RS</div>
                      <div className="flex justify-between items-center text-xs">
                        <div>Penanggung jawab: Letkol dr. Farida</div>
                        <div>15:00</div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                      <div className="font-medium text-amber-700">Pengecekan Stok Darurat</div>
                      <div className="text-sm mb-1">RS Lanud Halim</div>
                      <div className="flex justify-between items-center text-xs">
                        <div>Penanggung jawab: Letda Rudi</div>
                        <div>16:30</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personel Siaga</CardTitle>
                  <CardDescription>Personel siaga emergensi 24 jam</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-tniau-navy text-white flex items-center justify-center font-medium">AS</div>
                        <div>
                          <div className="font-medium">dr. Adi Suryanto, SpB</div>
                          <div className="text-xs text-muted-foreground">Dokter Bedah - RSPAU Hardjolukito</div>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-800 mr-1"></span>
                          Siap
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-tniau-navy text-white flex items-center justify-center font-medium">RM</div>
                        <div>
                          <div className="font-medium">dr. Rina Mulyani, SpJP</div>
                          <div className="text-xs text-muted-foreground">Dokter Jantung - RS Lanud Halim</div>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-800 mr-1"></span>
                          Siap
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-tniau-navy text-white flex items-center justify-center font-medium">FW</div>
                        <div>
                          <div className="font-medium">dr. Fajar Wicaksono, SpAn</div>
                          <div className="text-xs text-muted-foreground">Dokter Anestesi - RS Lanud Adisutjipto</div>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-800 mr-1"></span>
                          Siap
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-tniau-navy text-white flex items-center justify-center font-medium">DW</div>
                        <div>
                          <div className="font-medium">dr. Dewi Wulandari, SpOG</div>
                          <div className="text-xs text-muted-foreground">Dokter Kandungan - RSPAU Hardjolukito</div>
                        </div>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-800 mr-1"></span>
                          Sedang Bertugas
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kegiatan Mendatang</CardTitle>
                  <CardDescription>Kegiatan dalam 7 hari ke depan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-tniau-lightblue pl-3 py-1">
                      <div className="font-medium">Pelatihan Evakuasi Medis</div>
                      <div className="text-sm mb-1">21 Mei 2025, 09:00 - 15:00</div>
                      <div className="text-xs text-muted-foreground">RSPAU Hardjolukito</div>
                    </div>

                    <div className="border-l-4 border-tniau-lightblue pl-3 py-1">
                      <div className="font-medium">Rapat Koordinasi Komando</div>
                      <div className="text-sm mb-1">22 Mei 2025, 13:30 - 16:00</div>
                      <div className="text-xs text-muted-foreground">Markas TNI AU</div>
                    </div>

                    <div className="border-l-4 border-tniau-lightblue pl-3 py-1">
                      <div className="font-medium">Simulasi Bencana Alam</div>
                      <div className="text-sm mb-1">25 Mei 2025, 08:00 - 13:00</div>
                      <div className="text-xs text-muted-foreground">RS Lanud Halim</div>
                    </div>

                    <div className="border-l-4 border-tniau-lightblue pl-3 py-1">
                      <div className="font-medium">Workshop SDM Medis</div>
                      <div className="text-sm mb-1">26 Mei 2025, 09:00 - 17:00</div>
                      <div className="text-xs text-muted-foreground">RS Lanud Adisutjipto</div>
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

export default Schedule;
