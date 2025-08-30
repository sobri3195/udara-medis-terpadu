-- Create RLS policies for all new tables

-- Inventory Forecasting policies
CREATE POLICY "All authenticated users can view inventory forecasting" 
ON public.inventory_forecasting FOR SELECT USING (true);

CREATE POLICY "Admins and logistics can manage inventory forecasting" 
ON public.inventory_forecasting FOR ALL 
USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));

-- Cold Chain Sensors policies
CREATE POLICY "All authenticated users can view cold chain sensors" 
ON public.cold_chain_sensors FOR SELECT USING (true);

CREATE POLICY "Admins and logistics can manage cold chain sensors" 
ON public.cold_chain_sensors FOR ALL 
USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));

-- Cold Chain Alerts policies
CREATE POLICY "All authenticated users can view cold chain alerts" 
ON public.cold_chain_alerts FOR SELECT USING (true);

CREATE POLICY "Admins and logistics can manage cold chain alerts" 
ON public.cold_chain_alerts FOR ALL 
USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));

-- Inter Hospital Transfers policies
CREATE POLICY "All authenticated users can view inter hospital transfers" 
ON public.inter_hospital_transfers FOR SELECT USING (true);

CREATE POLICY "Admins and logistics can manage transfers" 
ON public.inter_hospital_transfers FOR ALL 
USING (is_admin() OR has_role(auth.uid(), 'karspau'::app_role) OR has_role(auth.uid(), 'kalakespra'::app_role));

-- Vendors policies
CREATE POLICY "All authenticated users can view vendors" 
ON public.vendors FOR SELECT USING (true);

CREATE POLICY "Admins can manage vendors" 
ON public.vendors FOR ALL USING (is_admin());

-- Vendor Contracts policies
CREATE POLICY "All authenticated users can view vendor contracts" 
ON public.vendor_contracts FOR SELECT USING (true);

CREATE POLICY "Admins can manage vendor contracts" 
ON public.vendor_contracts FOR ALL USING (is_admin());

-- Quality Audits policies
CREATE POLICY "All authenticated users can view quality audits" 
ON public.quality_audits FOR SELECT USING (true);

CREATE POLICY "Admins can manage quality audits" 
ON public.quality_audits FOR ALL USING (is_admin());

-- Audit Findings policies
CREATE POLICY "All authenticated users can view audit findings" 
ON public.audit_findings FOR SELECT USING (true);

CREATE POLICY "Admins can manage audit findings" 
ON public.audit_findings FOR ALL USING (is_admin());

-- Incident Reports policies
CREATE POLICY "All authenticated users can view incident reports" 
ON public.incident_reports FOR SELECT USING (true);

CREATE POLICY "All authenticated users can create incident reports" 
ON public.incident_reports FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can update incident reports" 
ON public.incident_reports FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete incident reports" 
ON public.incident_reports FOR DELETE USING (is_admin());

-- Adverse Events policies
CREATE POLICY "All authenticated users can view adverse events" 
ON public.adverse_events FOR SELECT USING (true);

CREATE POLICY "Medical staff can manage adverse events" 
ON public.adverse_events FOR ALL 
USING (is_admin() OR has_role(auth.uid(), 'kasubdis'::app_role));

-- Budget Categories policies
CREATE POLICY "All authenticated users can view budget categories" 
ON public.budget_categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage budget categories" 
ON public.budget_categories FOR ALL USING (is_admin());

-- Budgets policies
CREATE POLICY "All authenticated users can view budgets" 
ON public.budgets FOR SELECT USING (true);

CREATE POLICY "Admins can manage budgets" 
ON public.budgets FOR ALL USING (is_admin());

-- Expenses policies
CREATE POLICY "All authenticated users can view expenses" 
ON public.expenses FOR SELECT USING (true);

CREATE POLICY "Admins can manage expenses" 
ON public.expenses FOR ALL USING (is_admin());

-- External Systems policies
CREATE POLICY "All authenticated users can view external systems" 
ON public.external_systems FOR SELECT USING (true);

CREATE POLICY "Admins can manage external systems" 
ON public.external_systems FOR ALL USING (is_admin());

-- Integration Logs policies
CREATE POLICY "All authenticated users can view integration logs" 
ON public.integration_logs FOR SELECT USING (true);

CREATE POLICY "Admins can manage integration logs" 
ON public.integration_logs FOR ALL USING (is_admin());

-- Create triggers for updated_at columns
CREATE TRIGGER update_inventory_forecasting_updated_at
BEFORE UPDATE ON public.inventory_forecasting
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cold_chain_sensors_updated_at
BEFORE UPDATE ON public.cold_chain_sensors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_inter_hospital_transfers_updated_at
BEFORE UPDATE ON public.inter_hospital_transfers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at
BEFORE UPDATE ON public.vendors
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendor_contracts_updated_at
BEFORE UPDATE ON public.vendor_contracts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quality_audits_updated_at
BEFORE UPDATE ON public.quality_audits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audit_findings_updated_at
BEFORE UPDATE ON public.audit_findings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_incident_reports_updated_at
BEFORE UPDATE ON public.incident_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_adverse_events_updated_at
BEFORE UPDATE ON public.adverse_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_budget_categories_updated_at
BEFORE UPDATE ON public.budget_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_budgets_updated_at
BEFORE UPDATE ON public.budgets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
BEFORE UPDATE ON public.expenses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_external_systems_updated_at
BEFORE UPDATE ON public.external_systems
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();