require('dotenv').config();
const express = require('express');
const router = express.Router();

// data: M/D/A
const date = new Date()
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = date.getFullYear();

const current_date = `${day}/${month}/${year}`


router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: process.env.TITLE || 'SERVICE: AGENDAME',
    version: process.env.VERSION || 'VERSION: 1.0.1',
    date: current_date || new Date().getFullYear(),
    hors: `${new Date().getHours()}:${new Date().getMinutes()}`
  });
});

module.exports = router;
