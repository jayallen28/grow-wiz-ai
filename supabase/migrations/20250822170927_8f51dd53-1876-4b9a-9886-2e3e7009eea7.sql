-- Add jay@jayallen.com as admin directly
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, 'admin'::app_role
FROM public.profiles 
WHERE email = 'jay@jayallen.com'
ON CONFLICT (user_id, role) DO NOTHING;