-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create strains table
CREATE TABLE public.strains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('indica', 'sativa', 'hybrid')),
  flowering_time INTEGER, -- weeks
  expected_yield TEXT,
  thc_content TEXT,
  cbd_content TEXT,
  growth_pattern TEXT CHECK (growth_pattern IN ('compact', 'stretchy', 'medium')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create grow cycles table
CREATE TABLE public.grow_cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  strain_id UUID REFERENCES public.strains(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  current_stage TEXT NOT NULL CHECK (current_stage IN ('seedling', 'vegetative', 'flowering', 'harvest', 'drying', 'curing')),
  stage_start_date DATE NOT NULL,
  expected_stage_duration INTEGER NOT NULL, -- days
  current_day INTEGER DEFAULT 1,
  plant_count INTEGER NOT NULL DEFAULT 1,
  medium TEXT NOT NULL CHECK (medium IN ('dwc', 'soil', 'coco', 'rockwool', 'perlite', 'other')),
  total_yield DECIMAL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'failed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create grow logs table
CREATE TABLE public.grow_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  grow_cycle_id UUID REFERENCES public.grow_cycles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  grow_stage TEXT NOT NULL CHECK (grow_stage IN ('seedling', 'vegetative', 'flowering', 'harvest', 'drying', 'curing')),
  day_in_stage INTEGER NOT NULL,
  height DECIMAL, -- inches
  notes TEXT NOT NULL,
  actions TEXT[], -- array of actions taken
  issues TEXT[], -- array of issues noted
  photos TEXT[], -- array of photo URLs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create environment data table
CREATE TABLE public.environment_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  grow_cycle_id UUID REFERENCES public.grow_cycles(id) ON DELETE CASCADE,
  grow_log_id UUID REFERENCES public.grow_logs(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  temperature DECIMAL NOT NULL, -- °F
  humidity DECIMAL NOT NULL, -- %
  ph DECIMAL,
  tds INTEGER, -- ppm
  water_temp DECIMAL, -- °F
  co2 INTEGER, -- ppm
  light_intensity INTEGER, -- PPFD
  is_manual_entry BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create nutrient logs table
CREATE TABLE public.nutrient_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  grow_cycle_id UUID REFERENCES public.grow_cycles(id) ON DELETE CASCADE,
  grow_log_id UUID REFERENCES public.grow_logs(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  nutrient_type TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  unit TEXT NOT NULL CHECK (unit IN ('ml', 'grams', 'tsp', 'tbsp')),
  target_ppm INTEGER NOT NULL,
  actual_ppm INTEGER,
  ph_before DECIMAL NOT NULL,
  ph_after DECIMAL NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create build components table
CREATE TABLE public.build_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL NOT NULL,
  power_consumption INTEGER, -- watts
  description TEXT NOT NULL,
  image_url TEXT,
  affiliate_url TEXT,
  specifications JSONB DEFAULT '{}',
  compatibility TEXT[],
  dimensions JSONB NOT NULL, -- {length, width, height}
  weight DECIMAL, -- kg
  rating DECIMAL CHECK (rating >= 1 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  is_custom BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create build configurations table
CREATE TABLE public.build_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  total_cost DECIMAL DEFAULT 0,
  total_power_consumption INTEGER DEFAULT 0,
  estimated_monthly_cost DECIMAL DEFAULT 0,
  space_requirements JSONB NOT NULL, -- {length, width, height}
  is_public BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create build configuration components junction table
CREATE TABLE public.build_configuration_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  build_configuration_id UUID REFERENCES public.build_configurations(id) ON DELETE CASCADE NOT NULL,
  build_component_id UUID REFERENCES public.build_components(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create articles table
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  featured_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  reading_time INTEGER, -- minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('warning', 'error', 'info')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  is_read BOOLEAN DEFAULT false,
  action TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grow_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grow_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.environment_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrient_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.build_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.build_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.build_configuration_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for strains
CREATE POLICY "Users can view their own strains" ON public.strains
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own strains" ON public.strains
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own strains" ON public.strains
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own strains" ON public.strains
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for grow cycles
CREATE POLICY "Users can view their own grow cycles" ON public.grow_cycles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own grow cycles" ON public.grow_cycles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own grow cycles" ON public.grow_cycles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own grow cycles" ON public.grow_cycles
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for grow logs
CREATE POLICY "Users can view their own grow logs" ON public.grow_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own grow logs" ON public.grow_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own grow logs" ON public.grow_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own grow logs" ON public.grow_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for environment data
CREATE POLICY "Users can view their own environment data" ON public.environment_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own environment data" ON public.environment_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own environment data" ON public.environment_data
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own environment data" ON public.environment_data
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for nutrient logs
CREATE POLICY "Users can view their own nutrient logs" ON public.nutrient_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own nutrient logs" ON public.nutrient_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nutrient logs" ON public.nutrient_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own nutrient logs" ON public.nutrient_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for build components
CREATE POLICY "Users can view all build components" ON public.build_components
  FOR SELECT USING (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "Users can create their own custom build components" ON public.build_components
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own custom build components" ON public.build_components
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own custom build components" ON public.build_components
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for build configurations
CREATE POLICY "Users can view public build configurations and their own" ON public.build_configurations
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create their own build configurations" ON public.build_configurations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own build configurations" ON public.build_configurations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own build configurations" ON public.build_configurations
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for build configuration components
CREATE POLICY "Users can view components of accessible build configurations" ON public.build_configuration_components
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.build_configurations bc 
      WHERE bc.id = build_configuration_id 
      AND (bc.is_public = true OR bc.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage components of their own build configurations" ON public.build_configuration_components
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.build_configurations bc 
      WHERE bc.id = build_configuration_id 
      AND bc.user_id = auth.uid()
    )
  );

-- Create RLS policies for articles (public read, admin write)
CREATE POLICY "Anyone can view published articles" ON public.articles
  FOR SELECT USING (is_published = true);

-- Create RLS policies for alerts
CREATE POLICY "Users can view their own alerts" ON public.alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own alerts" ON public.alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts" ON public.alerts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts" ON public.alerts
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_strains_updated_at
  BEFORE UPDATE ON public.strains
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_grow_cycles_updated_at
  BEFORE UPDATE ON public.grow_cycles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_grow_logs_updated_at
  BEFORE UPDATE ON public.grow_logs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_build_components_updated_at
  BEFORE UPDATE ON public.build_components
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_build_configurations_updated_at
  BEFORE UPDATE ON public.build_configurations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_strains_user_id ON public.strains(user_id);
CREATE INDEX idx_grow_cycles_user_id ON public.grow_cycles(user_id);
CREATE INDEX idx_grow_cycles_strain_id ON public.grow_cycles(strain_id);
CREATE INDEX idx_grow_logs_grow_cycle_id ON public.grow_logs(grow_cycle_id);
CREATE INDEX idx_grow_logs_user_id ON public.grow_logs(user_id);
CREATE INDEX idx_environment_data_grow_cycle_id ON public.environment_data(grow_cycle_id);
CREATE INDEX idx_nutrient_logs_grow_cycle_id ON public.nutrient_logs(grow_cycle_id);
CREATE INDEX idx_build_configurations_user_id ON public.build_configurations(user_id);
CREATE INDEX idx_build_configurations_is_public ON public.build_configurations(is_public);
CREATE INDEX idx_articles_is_published ON public.articles(is_published);
CREATE INDEX idx_alerts_user_id ON public.alerts(user_id);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();