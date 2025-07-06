const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = [];
let testToken = 'mocked-jwt-token';

// Auth Login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        return res.json({ token: testToken });
    }
    res.status(401).json({ error: 'Unauthorized' });
});

// Reset DB
app.post('/api/test/reset', (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${testToken}`) return res.status(403).json({ error: 'Forbidden' });
    users = [];
    res.json({ message: 'Database reset' });
});

// Create User
app.post('/api/users', (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${testToken}`) return res.status(403).json({ error: 'Forbidden' });

    const { email, username, password } = req.body;
    if (!email || !username || !password) return res.status(400).json({ error: 'Missing fields' });

    const newUser = {
        id: uuidv4(),
        email,
        username
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Get User
app.get('/api/users/:id', (req, res) => {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${testToken}`) return res.status(403).json({ error: 'Forbidden' });

    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
});

app.listen(port, () => {
    console.log(`Mock API server running at http://localhost:${port}`);
});
