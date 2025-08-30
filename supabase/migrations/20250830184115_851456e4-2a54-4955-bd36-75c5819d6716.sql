-- Create plants table for individual plant tracking within grow cycles
CREATE TABLE public.plants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  grow_cycle_id UUID NOT NULL,
  name TEXT NOT NULL,
  strain_id UUID,
  plant_number INTEGER NOT NULL,
  photos TEXT[] DEFAULT '{}',
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(grow_cycle_id, plant_number)
);

-- Enable RLS
ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for plants
CREATE POLICY "Users can view their own plants" 
ON public.plants 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own plants" 
ON public.plants 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own plants" 
ON public.plants 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own plants" 
ON public.plants 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_plants_updated_at
BEFORE UPDATE ON public.plants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update grow_logs table to support plant-specific entries
ALTER TABLE public.grow_logs 
ADD COLUMN plant_id UUID,
ADD COLUMN applies_to_all BOOLEAN DEFAULT true;

-- Create index for better performance
CREATE INDEX idx_plants_grow_cycle_id ON public.plants(grow_cycle_id);
CREATE INDEX idx_plants_user_id ON public.plants(user_id);
CREATE INDEX idx_grow_logs_plant_id ON public.grow_logs(plant_id);