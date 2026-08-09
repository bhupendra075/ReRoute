-- Seed data for reroute emergency triage application

-- Insert a demo hospital
insert into public.hospitals (id, name, latitude, longitude, address, phone, specializations, capacity, is_active, accepts_insurance)
values
  ('demo-hospital-1', 'Central General Hospital', 40.7128, -74.0060, '100 Main St, New York, NY', '(555) 123-4567', '{ICU,CARDIAC,STROKE,TRAUMA}', '{"ICU":5,"CARDIAC":3,"STROKE":2,"BURN":1,"TRAUMA":8,"PEDIATRIC":4,"OBSTETRIC":3,"GENERAL":12}', true, '{TPA-001,TPA-002}');

-- Insert a second demo hospital
insert into public.hospitals (id, name, latitude, longitude, address, phone, specializations, capacity, is_active, accepts_insurance)
values
  ('demo-hospital-2', 'Metro Medical Center', 40.7580, -73.9855, '200 Park Ave, New York, NY', '(555) 987-6543', '{BURN,PEDIATRIC,OBSTETRIC}', '{"ICU":3,"CARDIAC":2,"STROKE":1,"BURN":4,"TRAUMA":5,"PEDIATRIC":6,"OBSTETRIC":5,"GENERAL":8}', true, '{TPA-001}');

-- Insert a demo TPA
insert into public.insurance_tpas (id, name, code, network_hospitals, cashless_tiers, is_active)
values
  ('demo-tpa-1', 'HealthFirst Insurance', 'TPA-001', '{demo-hospital-1,demo-hospital-2}', '{"TIER_1":["demo-hospital-1"],"TIER_2":["demo-hospital-2"]}', true);

-- Insert a demo public key
insert into public.public_keys (id, kid, public_key_pem, algorithm, is_active, created_at, expires_at)
values
  ('demo-key-1', 'v1', '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2Z3q5+8xJ1F2kL3m\nN5oP7rQ1sT4vW6yB8cE0dG2hI4jK6lM8nO0pQ2rS4tU6vW8xY0zA2bC4d\nE6fG8hI0jK2lM4nO6pQ8rS0tU2vW4xY6zA8bC0dE2fG4hI6jK8lM0nO2p\nQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4lM6nO8pQ0rS2tU4vW6xY8zA0b\nC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW2xY4zA6bC8dE0fG2hI4jK6lM8n\nO0pQ2rS4tU6vW8xY0zA2bC4dE6fG8hI0jK2lM4nO6pQ8rS0tU2vW4xY6z\nA8bC0dE2fG4hI6jK8lM0nO2pQ4rS6tU8vW0xY2zA4bC6dE8fG0hI2jK4l\nM6nO8pQ0rS2tU4vW6xY8zA0bC2dE4fG6hI8jK0lM2nO4pQ6rS8tU0vW2x\nY4zA6bC8dE0fG2hI4jK6lM8nO0pQIDAQAB\n-----END PUBLIC KEY-----', 'ECDSA_P256', true, now(), now() + interval '1 year');
