// server.js
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup MySQL connection
const db = require('./db.js');

// Routes
const uploadRoutes = require('./api/upload');
const displayRoutes = require('./api/display');

app.use(uploadRoutes);
app.use(displayRoutes);

app.use('/api', uploadRoutes);
app.use('/api', displayRoutes);

// const uploadRouter = require('./backend/api/upload');
// app.use('/backend/api', uploadRouter);

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
