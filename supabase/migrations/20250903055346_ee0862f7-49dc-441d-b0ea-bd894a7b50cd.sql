-- Fix update_updated_at_column function search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create more secure RLS policies for sensitive data
-- Fix profiles table - only allow users to see their own profile
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Users can view own profile and admins can view all" ON public.profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    is_admin()
  );

-- Fix personnel table - restrict contact_info access
DROP POLICY IF EXISTS "All authenticated users can view personnel" ON public.personnel;
CREATE POLICY "Personnel data restricted by role" ON public.personnel
  FOR SELECT USING (
    is_admin() OR 
    has_role(auth.uid(), 'karspau'::app_role) OR 
    has_role(auth.uid(), 'kalakespra'::app_role)
  );

-- Fix adverse_events table - medical data should be restricted
DROP POLICY IF EXISTS "All authenticated users can view adverse events" ON public.adverse_events;
CREATE POLICY "Medical staff only can view adverse events" ON public.adverse_events
  FOR SELECT USING (
    is_admin() OR 
    has_role(auth.uid(), 'kasubdis'::app_role)
  );

-- Fix budgets and expenses tables - financial data should be restricted
DROP POLICY IF EXISTS "All authenticated users can view budgets" ON public.budgets;
CREATE POLICY "Financial data restricted to authorized personnel" ON public.budgets
  FOR SELECT USING (
    is_admin() OR
    has_role(auth.uid(), 'kapuskesau'::app_role) OR
    has_role(auth.uid(), 'wakapuskesau'::app_role)
  );

DROP POLICY IF EXISTS "All authenticated users can view expenses" ON public.expenses;
CREATE POLICY "Expense data restricted to authorized personnel" ON public.expenses
  FOR SELECT USING (
    is_admin() OR
    has_role(auth.uid(), 'kapuskesau'::app_role) OR
    has_role(auth.uid(), 'wakapuskesau'::app_role)
  );