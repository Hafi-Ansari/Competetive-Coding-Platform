const express = require('express');
const router = express.Router();
const runPythonScript = require("../pythonrunner");

// Python runner route
router.post("/", async (req, res) => { // Change from app.post("/python", ...) to router.post("/", ...)
    try {
        const result = await runPythonScript(req.body.code);
        res.json({ passOrFail: result });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
