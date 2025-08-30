import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCRUD } from "@/hooks/useCRUD";
import { toast } from "sonner";
import { Network, ArrowRightLeft, Truck, Plus, AlertTriangle, CheckCircle } from "lucide-react";

export function MultiHospitalNetwork() {
  const { data: transfers, loading, create, update } = useCRUD({ 
    table: 'inter_hospital_transfers',
    orderBy: { column: 'created_at', ascending: false }
  });
  
  const { data: hospitals } = useCRUD({ table: 'hospitals' });
  const { data: inventory } = useCRUD({ table: 'inventory' });

  const [showNewTransfer, setShowNewTransfer] = useState(false);
  const [newTransfer, setNewTransfer] = useState({
    from_hospital_id: '',
    to_hospital_id: '',
    item_id: '',
    quantity: 1,
    transfer_type: 'regular',
    priority: 'normal',
    notes: ''
  });

  const createTransfer = async () => {
    try {
      await create({
        ...newTransfer,
        status: 'requested',
        quantity: parseInt(newTransfer.quantity.toString())
      });
      setNewTransfer({
        from_hospital_id: '',
        to_hospital_id: '',
        item_id: '',
        quantity: 1,
        transfer_type: 'regular',
        priority: 'normal',
        notes: ''
      });
      setShowNewTransfer(false);
      toast.success('Transfer request created successfully');
    } catch (error: any) {
      toast.error('Failed to create transfer: ' + error.message);
    }
  };

  const updateTransferStatus = async (id: string, status: string) => {
    try {
      const updateData: any = { status };
      if (status === 'delivered') {
        updateData.actual_delivery = new Date().toISOString();
      }
      await update(id, updateData);
      toast.success(`Transfer ${status} successfully`);
    } catch (error: any) {
      toast.error('Failed to update transfer: ' + error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'requested': return 'secondary';
      case 'approved': return 'default';
      case 'in_transit': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'normal': return 'default';
      case 'low': return 'outline';
      default: return 'default';
    }
  };

  // Mock network statistics
  const networkStats = {
    activeTransfers: transfers?.filter((t: any) => ['approved', 'in_transit'].includes(t.status)).length || 0,
    completedToday: transfers?.filter((t: any) => {
      if (t.status !== 'delivered' || !t.actual_delivery) return false;
      const deliveryDate = new Date(t.actual_delivery);
      const today = new Date();
      return deliveryDate.toDateString() === today.toDateString();
    }).length || 0,
    emergencyTransfers: transfers?.filter((t: any) => t.priority === 'critical').length || 0,
    avgDeliveryTime: '2.5 hours'
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="transfers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transfers">Active Transfers</TabsTrigger>
          <TabsTrigger value="network">Network Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="transfers" className="space-y-6">
          {/* Create Transfer */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Inter-Hospital Transfers
                  </CardTitle>
                  <CardDescription>
                    Manage resource sharing between medical facilities
                  </CardDescription>
                </div>
                <Dialog open={showNewTransfer} onOpenChange={setShowNewTransfer}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Transfer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create Transfer Request</DialogTitle>
                      <DialogDescription>
                        Request resources from another hospital facility
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="from-hospital">From Hospital</Label>
                          <Select value={newTransfer.from_hospital_id} onValueChange={(value) => setNewTransfer({...newTransfer, from_hospital_id: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select hospital" />
                            </SelectTrigger>
                            <SelectContent>
                              {hospitals?.map((hospital: any) => (
                                <SelectItem key={hospital.id} value={hospital.id}>
                                  {hospital.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="to-hospital">To Hospital</Label>
                          <Select value={newTransfer.to_hospital_id} onValueChange={(value) => setNewTransfer({...newTransfer, to_hospital_id: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select hospital" />
                            </SelectTrigger>
                            <SelectContent>
                              {hospitals?.map((hospital: any) => (
                                <SelectItem key={hospital.id} value={hospital.id}>
                                  {hospital.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="item">Item</Label>
                          <Select value={newTransfer.item_id} onValueChange={(value) => setNewTransfer({...newTransfer, item_id: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select item" />
                            </SelectTrigger>
                            <SelectContent>
                              {inventory?.map((item: any) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.item_name} ({item.current_stock} {item.unit})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            value={newTransfer.quantity}
                            onChange={(e) => setNewTransfer({...newTransfer, quantity: parseInt(e.target.value) || 1})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">Transfer Type</Label>
                          <Select value={newTransfer.transfer_type} onValueChange={(value) => setNewTransfer({...newTransfer, transfer_type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="regular">Regular</SelectItem>
                              <SelectItem value="emergency">Emergency</SelectItem>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select value={newTransfer.priority} onValueChange={(value) => setNewTransfer({...newTransfer, priority: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          value={newTransfer.notes}
                          onChange={(e) => setNewTransfer({...newTransfer, notes: e.target.value})}
                          placeholder="Additional notes or special requirements..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={createTransfer}>Create Transfer</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
          </Card>

          {/* Network Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{networkStats.activeTransfers}</div>
                <p className="text-sm text-muted-foreground">In progress</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Completed Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{networkStats.completedToday}</div>
                <p className="text-sm text-muted-foreground">Deliveries</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Emergency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{networkStats.emergencyTransfers}</div>
                <p className="text-sm text-muted-foreground">Critical priority</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Avg Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{networkStats.avgDeliveryTime}</div>
                <p className="text-sm text-muted-foreground">Response time</p>
              </CardContent>
            </Card>
          </div>

          {/* Transfers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Requests</CardTitle>
              <CardDescription>Manage and track inter-hospital resource transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transfers?.slice(0, 10).map((transfer: any) => (
                    <TableRow key={transfer.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="text-sm">
                            <div className="font-medium">From: Hospital A</div>
                            <div className="text-muted-foreground">To: Hospital B</div>
                          </div>
                          <ArrowRightLeft className="h-4 w-4 text-gray-400" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">Medical Item</div>
                          <div className="text-sm text-muted-foreground">
                            Qty: {transfer.quantity}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(transfer.priority) as any}>
                          {transfer.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(transfer.status) as any}>
                          {transfer.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">
                            {transfer.status === 'delivered' ? 'Completed' :
                             transfer.status === 'in_transit' ? 'In Transit' :
                             transfer.status === 'approved' ? 'Ready' : 'Pending'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {transfer.status === 'requested' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateTransferStatus(transfer.id, 'approved')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateTransferStatus(transfer.id, 'cancelled')}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {transfer.status === 'approved' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateTransferStatus(transfer.id, 'in_transit')}
                            >
                              Start Transit
                            </Button>
                          )}
                          {transfer.status === 'in_transit' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateTransferStatus(transfer.id, 'delivered')}
                            >
                              Mark Delivered
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Network Overview</CardTitle>
              <CardDescription>Real-time status of all connected facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitals?.map((hospital: any) => (
                  <Card key={hospital.id} className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{hospital.name}</CardTitle>
                      <CardDescription>{hospital.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Available Beds:</span>
                          <span className="font-medium">{hospital.available_beds}/{hospital.total_beds}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Ambulances:</span>
                          <span className="font-medium">{hospital.available_ambulances}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Status:</span>
                          <Badge variant={hospital.emergency_status === 'normal' ? 'default' : 'destructive'}>
                            {hospital.emergency_status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Analytics</CardTitle>
              <CardDescription>Performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Most Requested Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Emergency Supplies</span>
                        <span className="font-medium">24 requests</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medications</span>
                        <span className="font-medium">18 requests</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Surgical Equipment</span>
                        <span className="font-medium">12 requests</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Network Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Success Rate:</span>
                        <span className="font-medium text-green-600">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Response Time:</span>
                        <span className="font-medium">45 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cost Savings:</span>
                        <span className="font-medium text-blue-600">22%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}