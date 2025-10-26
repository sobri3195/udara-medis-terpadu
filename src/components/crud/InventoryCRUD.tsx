import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useCRUD } from '@/hooks/useCRUD';

interface InventoryItem {
  id: string;
  item_name: string;
  category: string;
  current_stock: number;
  minimum_stock: number;
  unit: string;
  supplier: string;
  last_restock_date: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
}

const InventoryCRUD = () => {
  const { data: inventory, loading, create, update, remove } = useCRUD({
    table: 'inventory',
    orderBy: { column: 'item_name', ascending: true }
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    item_name: '',
    category: '',
    current_stock: 0,
    minimum_stock: 0,
    unit: '',
    supplier: '',
    last_restock_date: '',
    expiry_date: ''
  });

  const canEdit = true;

  const resetForm = () => {
    setFormData({
      item_name: '',
      category: '',
      current_stock: 0,
      minimum_stock: 0,
      unit: '',
      supplier: '',
      last_restock_date: '',
      expiry_date: ''
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await update(editingId, formData);
    } else {
      await create(formData);
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (item: InventoryItem) => {
    setFormData({
      item_name: item.item_name,
      category: item.category,
      current_stock: item.current_stock,
      minimum_stock: item.minimum_stock,
      unit: item.unit,
      supplier: item.supplier || '',
      last_restock_date: item.last_restock_date ? item.last_restock_date.split('T')[0] : '',
      expiry_date: item.expiry_date ? item.expiry_date.split('T')[0] : ''
    });
    setEditingId(item.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      await remove(id);
    }
  };

  const getStockStatus = (currentStock: number, minimumStock: number) => {
    if (currentStock <= minimumStock) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Stok Rendah
        </Badge>
      );
    }
    return <Badge variant="default">Normal</Badge>;
  };

  const isExpiringSoon = (expiryDate: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const threeDaysFromNow = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));
    return expiry <= threeDaysFromNow;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manajemen Inventori</CardTitle>
        {canEdit && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit Item' : 'Tambah Item'}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="item_name">Nama Item</Label>
                    <Input
                      id="item_name"
                      value={formData.item_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, item_name: e.target.value }))}
                      placeholder="Nama item"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Kategori</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="Kategori item"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="current_stock">Stok Saat Ini</Label>
                    <Input
                      id="current_stock"
                      type="number"
                      value={formData.current_stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, current_stock: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minimum_stock">Stok Minimum</Label>
                    <Input
                      id="minimum_stock"
                      type="number"
                      value={formData.minimum_stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, minimum_stock: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Satuan</Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                      placeholder="pcs, box, dll"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
                    placeholder="Nama supplier"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="last_restock_date">Tanggal Restock Terakhir</Label>
                    <Input
                      id="last_restock_date"
                      type="date"
                      value={formData.last_restock_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_restock_date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry_date">Tanggal Kadaluarsa</Label>
                    <Input
                      id="expiry_date"
                      type="date"
                      value={formData.expiry_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Batal
                  </Button>
                  <Button onClick={handleSubmit}>
                    <Save className="h-4 w-4 mr-2" />
                    Simpan
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Item</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Kadaluarsa</TableHead>
                {canEdit && <TableHead>Aksi</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item: InventoryItem) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.item_name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{item.current_stock} {item.unit}</span>
                      <span className="text-xs text-muted-foreground">
                        Min: {item.minimum_stock} {item.unit}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStockStatus(item.current_stock, item.minimum_stock)}</TableCell>
                  <TableCell>{item.supplier || '-'}</TableCell>
                  <TableCell>
                    {item.expiry_date ? (
                      <div className={`${isExpiringSoon(item.expiry_date) ? 'text-red-600' : ''}`}>
                        {new Date(item.expiry_date).toLocaleDateString('id-ID')}
                        {isExpiringSoon(item.expiry_date) && (
                          <Badge variant="destructive" className="ml-2">
                            Segera Expired
                          </Badge>
                        )}
                      </div>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryCRUD;