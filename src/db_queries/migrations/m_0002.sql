-- Migration m_0002
--
-- Add logs table 

CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
  table_name VARCHAR(50) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  record_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);