-- Create funding_rules table
CREATE TABLE IF NOT EXISTS funding_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES company(id) ON DELETE CASCADE,
  supplier_name VARCHAR(255) NOT NULL,
  value_range_min DECIMAL(15,2) NOT NULL DEFAULT 0,
  value_range_max DECIMAL(15,2) NOT NULL DEFAULT 0,
  due_date_range_min INTEGER NOT NULL DEFAULT 0, -- days
  due_date_range_max INTEGER NOT NULL DEFAULT 0, -- days
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_funding_rules_company_id ON funding_rules(company_id);
CREATE INDEX IF NOT EXISTS idx_funding_rules_supplier ON funding_rules(supplier_name);
CREATE INDEX IF NOT EXISTS idx_funding_rules_active ON funding_rules(is_active);

-- Enable RLS
ALTER TABLE funding_rules ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view funding rules for their company"
  ON funding_rules
  FOR SELECT
  USING (
    company_id IN (
      SELECT company_id FROM user_company 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert funding rules for their company"
  ON funding_rules
  FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM user_company 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update funding rules for their company"
  ON funding_rules
  FOR UPDATE
  USING (
    company_id IN (
      SELECT company_id FROM user_company 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete funding rules for their company"
  ON funding_rules
  FOR DELETE
  USING (
    company_id IN (
      SELECT company_id FROM user_company 
      WHERE user_id = auth.uid()
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_funding_rules_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER trigger_funding_rules_updated_at
  BEFORE UPDATE ON funding_rules
  FOR EACH ROW
  EXECUTE FUNCTION update_funding_rules_updated_at(); 