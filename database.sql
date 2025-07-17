-- Create the database
CREATE DATABASE IF NOT EXISTS police_vehicle_inventory;
USE police_vehicle_inventory;

-- Create the vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vehicle_model VARCHAR(100) NOT NULL,
    serial_number VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(50) NOT NULL,
    recovery_date DATE NOT NULL,
    recovery_location VARCHAR(255) NOT NULL,
    condition_status ENUM('Excellent', 'Good', 'Fair', 'Poor') NOT NULL,
    status ENUM('In Storage', 'Under Investigation', 'Claimed') NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the claims table to track vehicle claims
CREATE TABLE IF NOT EXISTS claims (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vehicle_id INT NOT NULL,
    claimant_name VARCHAR(100) NOT NULL,
    claim_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Approved', 'Rejected') NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

-- Create indexes for better performance
CREATE INDEX idx_serial_number ON vehicles(serial_number);
CREATE INDEX idx_recovery_date ON vehicles(recovery_date);
CREATE INDEX idx_status ON vehicles(status);

-- Create a view for unclaimed vehicles
CREATE VIEW unclaimed_vehicles AS
SELECT * FROM vehicles
WHERE status = 'In Storage';

-- Insert sample data
INSERT INTO vehicles (vehicle_model, serial_number, color, recovery_date, recovery_location, condition_status, status, image_url)
VALUES 
('Royal Enfield Hunter 350', 'REH350123', 'Black', '2024-01-15', 'Main Street', 'Good', 'In Storage', 'https://imgd.aeplcdn.com/640X480/n/bw/used/s553491/553491_1742626440420.jpeg?q=80'),
('Bajaj Pulsar 220F', 'BP220456', 'Red', '2024-01-20', 'Park Avenue', 'Excellent', 'Under Investigation', 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/bajaj-pulsar-220f-black-color-1675745215.jpg'),
('TVS Apache RTR 160', 'TAR160789', 'Blue', '2024-01-25', 'City Center', 'Fair', 'In Storage', 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/tvs-apache-rtr-160-4v-black-color-1675745215.jpg');

-- Insert new vehicles
INSERT INTO vehicles (vehicle_model, serial_number, color, recovery_date, recovery_location, condition_status, status, image_url)
VALUES 
('Honda CB Shine', 'HCBS123', 'Silver', '2024-02-01', 'Downtown', 'Good', 'In Storage', 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-cb-shine-black-color-1675745215.jpg'),
('Yamaha FZ', 'YFZ456', 'Black', '2024-02-05', 'West End', 'Excellent', 'Under Investigation', 'https://imgd.aeplcdn.com/664x374/n/bw/models/colors/yamaha-fz-black-color-1675745215.jpg'); 