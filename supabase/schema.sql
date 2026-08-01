-- Simplified Schema for Vasu's Verse

-- 1. Profiles
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  bio text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Quotes (Marginalia Gallery)
-- We will store images here for the gallery
create table public.quotes (
  id uuid default uuid_generate_v4() primary key,
  image_url text not null,
  caption text,
  status text default 'published' check (status in ('draft', 'published', 'trash')),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  user_id uuid references auth.users not null
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.quotes enable row level security;

-- Public read for quotes
create policy "Public quotes are viewable by everyone." on public.quotes for select using (status = 'published');
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);

-- Admin write
create policy "Users can do anything to their quotes" on public.quotes for all 
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can update their own profile" on public.profiles for all 
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- STORAGE BUCKET POLICIES (Assuming bucket name is 'quotes')
-- Note: The bucket 'quotes' must be created manually in the Supabase UI and set to Public.
-- The policies below ensure only the admin can upload, but anyone can view.

-- create policy "Public Access"
-- on storage.objects for select
-- using ( bucket_id = 'quotes' );

-- create policy "Admin Upload Access"
-- on storage.objects for insert
-- with check ( bucket_id = 'quotes' and auth.jwt() ->> 'email' = 'vasuneninthe@gmail.com' );

-- create policy "Admin Delete Access"
-- on storage.objects for delete
-- using ( bucket_id = 'quotes' and auth.jwt() ->> 'email' = 'vasuneninthe@gmail.com' );
