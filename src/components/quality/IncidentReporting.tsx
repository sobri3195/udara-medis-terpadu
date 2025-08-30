import { useCRUD } from "@/hooks/useCRUD";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plus, Eye } from "lucide-react";

export function IncidentReporting() {
  const { data: incidents } = useCRUD({ table: 'incident_reports', orderBy: { column: 'created_at', ascending: false } });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Incident Reports
              </CardTitle>
              <CardDescription>Track and manage safety incidents</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Report Incident
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident #</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents?.map((incident: any) => (
                <TableRow key={incident.id}>
                  <TableCell>
                    <div className="font-medium">{incident.incident_number}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{incident.incident_type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={incident.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>
                    <Badge variant={incident.investigation_status === 'closed' ? 'default' : 'secondary'}>
                      {incident.investigation_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(incident.incident_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
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