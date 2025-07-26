// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the project root
app.use(express.static(path.join(__dirname)));

// API Routes
// Mock database for users
const users = [
  { id: 1, username: 'operator1', password: 'password123', name: 'Operator One' },
  { id: 2, username: 'operator2', password: 'password123', name: 'Operator Two' }
];

// Mock database for errors
let errors = [
  { id: 1, model: 'ZX-5000', code: 'E003', description: 'Hydraulic pressure low', severity: 'high', resolved: false },
  { id: 2, model: 'ZX-3000', code: 'E101', description: 'Overload warning', severity: 'critical', resolved: false }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({ 
      success: true, 
      user: { id: user.id, name: user.name, role: 'operator' } 
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Error endpoints
app.get('/api/errors', (req, res) => {
  res.json(errors);
});

app.post('/api/errors', (req, res) => {
  const newError = {
    id: errors.length + 1,
    ...req.body,
    resolved: false,
    timestamp: new Date().toISOString()
  };
  errors.push(newError);
  res.status(201).json(newError);
});

app.put('/api/errors/:id/resolve', (req, res) => {
  const error = errors.find(e => e.id === parseInt(req.params.id));
  if (error) {
    error.resolved = true;
    res.json(error);
  } else {
    res.status(404).json({ message: 'Error not found' });
  }
});

// Maintenance checklist endpoints
const checklists = {
  daily: [
    { id: 1, task: 'Check hydraulic fluid levels', completed: false },
    { id: 2, task: 'Inspect wire ropes for wear', completed: false }
  ],
  weekly: [
    { id: 1, task: 'Lubricate all moving parts', completed: false },
    { id: 2, task: 'Test emergency stop function', completed: false }
  ],
  monthly: [
    { id: 1, task: 'Inspect structural components', completed: false },
    { id: 2, task: 'Verify load capacity indicators', completed: false }
  ]
};

app.get('/api/checklists/:type', (req, res) => {
  const type = req.params.type;
  if (checklists[type]) {
    res.json(checklists[type]);
  } else {
    res.status(404).json({ message: 'Checklist type not found' });
  }
});

app.put('/api/checklists/:type/:id', (req, res) => {
  const type = req.params.type;
  const id = parseInt(req.params.id);
  const checklist = checklists[type];
  
  if (checklist) {
    const item = checklist.find(i => i.id === id);
    if (item) {
      item.completed = req.body.completed;
      res.json(item);
    } else {
      res.status(404).json({ message: 'Checklist item not found' });
    }
  } else {
    res.status(404).json({ message: 'Checklist type not found' });
  }
});

// Serve index.html for all other routes (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
