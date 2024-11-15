INSERT INTO department (name) VALUES
('Sales'),
('Scientist'),
('Human Resources'),
('Marketing');


INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 75000, 1),
('Sales Representative', 60000, 1),
('Field Application Scientist', 95000, 2),
('Principle Scientist', 150000, 2),
('HR Manager', 75000, 3),
('Recruiter', 50000, 3),
('Marketing Manager', 75000, 4),
('Marketing Representative', 60000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Matthew', 'Howard', 1, NULL),  -- Matthew is the Sales Manager
('Jordi', 'Fernandez', 2, 1),   -- Jordi is a Sales Associate under Matthew
('Bao', 'Tran', 3, 4),  -- Bao is a Field Application Scientist under Ezra
('Ezra', 'Pohan', 4, NULL),  -- Ezra is a Principle Scientist with no Manager
('Paul', 'Christy', 5, NULL),  -- Paul is an HR Manager with no Manager
('Abel', 'Christian', 6, 5),  -- Abel is a Recruiter under Paul
('Dyon', 'Siregar', 7, NULL),  -- Dyon is a Marketing Manager with no Manager
('Glen', 'Hannigan', 8, 7);  -- Glen is a Marketing Representative under Dyon