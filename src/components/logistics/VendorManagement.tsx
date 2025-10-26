import { useState } from "react";
import { useCRUD } from "@/hooks/useCRUD";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Star, FileText, TrendingUp, AlertCircle, Package, DollarSign, Clock, CheckCircle } from "lucide-react";

export function VendorManagement() {
  const { data: vendors } = useCRUD({ table: 'vendors' });
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  const vendorStats = {
    totalVendors: vendors?.length || 0,
    activeVendors: vendors?.filter((v: any) => v.status === 'active').length || 0,
    averageRating: vendors?.length ? (vendors.reduce((sum: number, v: any) => sum + (v.quality_rating || 0), 0) / vendors.length).toFixed(1) : '0.0',
    topPerformers: vendors?.filter((v: any) => (v.quality_rating || 0) >= 4.5).length || 0
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{vendorStats.totalVendors}</div>
            <p className="text-sm text-muted-foreground">{vendorStats.activeVendors} active</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4" />
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{vendorStats.averageRating}</div>
            <p className="text-sm text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{vendorStats.topPerformers}</div>
            <p className="text-sm text-muted-foreground">Rating ≥ 4.5</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Package className="h-4 w-4" />
              Active Contracts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {vendors?.filter((v: any) => v.contract_status === 'active').length || 0}
            </div>
            <p className="text-sm text-muted-foreground">Current period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Vendor Management
          </CardTitle>
          <CardDescription>Manage suppliers, contracts, and performance tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>On-Time Delivery</TableHead>
                <TableHead>Contract Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors?.map((vendor: any) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vendor.name || 'Unknown Vendor'}</div>
                      <div className="text-sm text-muted-foreground">{vendor.vendor_code || '-'}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {vendor.category || vendor.vendor_type || 'General'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{vendor.quality_rating?.toFixed(1) || '0.0'}</span>
                      </div>
                      <Progress value={(vendor.quality_rating || 0) * 20} className="h-1" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {(vendor.delivery_rating || 0) >= 0.9 ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        <span>{((vendor.delivery_rating || 0) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(vendor.delivery_rating || 0) * 100} className="h-1" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={vendor.status === 'active' || vendor.contract_status === 'active' ? 'default' : 'secondary'}>
                      {vendor.status || vendor.contract_status || 'inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedVendor(vendor)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!vendors || vendors.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No vendors found. Add vendors to start managing suppliers.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedVendor && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Vendor Details: {selectedVendor.name}
              </span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedVendor(null)}>
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Vendor Code</div>
                <div className="font-medium">{selectedVendor.vendor_code || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Contact</div>
                <div className="font-medium">{selectedVendor.contact_email || selectedVendor.contact || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="font-medium">{selectedVendor.contact_phone || selectedVendor.phone || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Quality Rating</div>
                <div className="font-medium flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  {selectedVendor.quality_rating?.toFixed(1) || '0.0'} / 5.0
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Delivery Performance</div>
                <div className="font-medium">{((selectedVendor.delivery_rating || 0) * 100).toFixed(0)}%</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
                <div className="font-medium">{selectedVendor.total_orders || 0}</div>
              </div>
            </div>
            
            {selectedVendor.notes && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">Notes</div>
                <div className="p-3 bg-muted rounded">{selectedVendor.notes}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}