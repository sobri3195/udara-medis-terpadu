import { useCRUD } from "@/hooks/useCRUD";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, Plus, AlertCircle } from "lucide-react";

export function DrugSafetyMonitoring() {
  const { data: events } = useCRUD({ table: 'adverse_events', orderBy: { column: 'created_at', ascending: false } });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                Drug Safety Monitoring
              </CardTitle>
              <CardDescription>Track adverse events and drug interactions</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Report Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event #</TableHead>
                <TableHead>Drug</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Outcome</TableHead>
                <TableHead>Causality</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events?.map((event: any) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="font-medium">{event.event_number}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{event.drug_name}</div>
                      <div className="text-sm text-muted-foreground">{event.drug_batch_number}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={event.severity === 'severe' ? 'destructive' : 'secondary'}>
                      {event.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{event.outcome || 'Unknown'}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{event.causality_assessment}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(event.reported_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Review
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