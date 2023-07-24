-- drop any database with name 'smartHomey' --
DROP DATABASE IF EXISTS smartHomey;
-- create 'smartHomey' database --
CREATE DATABASE smartHomey;

USE smartHomey;

-- create device table --
CREATE TABLE devices(
  device_name VARCHAR(50) NOT NULL,
  device_type VARCHAR(30) NOT NULL,
  status VARCHAR(3) NOT NULL,
  temperature INT NULL,
  volume INT NULL,
  speed INT NULL,
  PRIMARY KEY(device_name)
);

-- insert data into device table --
INSERT INTO devices (device_name, device_type, status, temperature, volume, speed)
VALUES
  ('Living Room Light', 'Light', 'ON', 25, 100, 60),
  ('Bedroom Light', 'Light', 'OFF', 30, 120, 70),
  ('Kitchen Light', 'Light', 'ON', 28, 110, 65),
  ('Bedroom Fan', 'Fan', 'OFF', 32, 130, 75),
  ('Small Bedroom Fan', 'Fan', 'ON', 26, 105, 62),
  ('Living Room Fan', 'Fan', 'OFF', 24, 115, 80),
  ('Google Home Speaker', 'Speaker', 'ON', 22, 125, 85),
  ('Divoom Speaker', 'Speaker', 'OFF', 27, 130, 90),
  ('Bedroom AC', 'Air Conditioner', 'ON', 23, 135, 95),
  ('Living Room AC', 'Air Conditioner', 'OFF', 29, 140, 100),
  ('Dining room TV', 'Television', 'OFF', 32, 130, 75),
  ('LG Fridge', 'Refrigerator', 'ON', 26, 105, 62),
  ('Door CCTV', 'Camera', 'ON', 22, 125, 85),
  ('Pet Cam', 'Camera', 'OFF', 27, 130, 90);
