const express = require('express');
const router = express.Router();
const Problem = require('../models/LeetcodeDocuments');

// Get random problems route
router.get('/random', async (req, res) => {
  try {
    const problems = await Problem.aggregate([{ $sample: { size: 4 } }]);
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
