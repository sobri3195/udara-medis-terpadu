import { useCRUD } from "@/hooks/useCRUD";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw, CheckCircle, XCircle } from "lucide-react";

export function ExternalIntegration() {
  const { data: systems } = useCRUD({ table: 'external_systems' });
  const { data: logs } = useCRUD({ table: 'integration_logs', orderBy: { column: 'created_at', ascending: false } });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            External Systems
          </CardTitle>
          <CardDescription>Manage connections to external systems</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>System</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systems?.map((system: any) => (
                <TableRow key={system.id}>
                  <TableCell>
                    <div className="font-medium">{system.system_name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{system.system_type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={system.connection_status === 'active' ? 'default' : 'destructive'}>
                      {system.connection_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {system.last_sync ? new Date(system.last_sync).toLocaleString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Sync
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Integration Logs</CardTitle>
          <CardDescription>Recent synchronization activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs?.slice(0, 10).map((log: any) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="font-medium">{log.operation_type}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {log.status === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                        {log.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{log.records_processed || 0}</TableCell>
                  <TableCell>
                    {new Date(log.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}