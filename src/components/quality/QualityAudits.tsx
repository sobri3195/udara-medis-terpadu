import { useCRUD } from "@/hooks/useCRUD";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Plus } from "lucide-react";

export function QualityAudits() {
  const { data: audits } = useCRUD({ table: 'quality_audits', orderBy: { column: 'created_at', ascending: false } });
  const { data: findings } = useCRUD({ table: 'audit_findings', orderBy: { column: 'created_at', ascending: false } });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Quality Audits
              </CardTitle>
              <CardDescription>Manage quality assurance audits and compliance</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Audit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audit Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {audits?.map((audit: any) => (
                <TableRow key={audit.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{audit.audit_title}</div>
                      <div className="text-sm text-muted-foreground">{audit.auditor_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{audit.audit_type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={audit.status === 'completed' ? 'default' : 'secondary'}>
                      {audit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {audit.overall_score ? `${audit.overall_score}/100` : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(audit.audit_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
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
          <CardTitle>Recent Findings</CardTitle>
          <CardDescription>Latest audit findings requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {findings?.slice(0, 5).map((finding: any) => (
              <div key={finding.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{finding.description}</div>
                  <div className="text-sm text-muted-foreground">{finding.category}</div>
                </div>
                <Badge variant={finding.severity === 'critical' ? 'destructive' : 'secondary'}>
                  {finding.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}