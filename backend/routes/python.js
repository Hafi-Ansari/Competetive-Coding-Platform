const express = require("express");
const router = express.Router();
const runPythonScript = require("../pythonrunner");

// Python runner route
router.post("/", async (req, res) => {
  const { code, methodName, testCase } = req.body;
  try {
    // Run each test case and store results
    const result = await runPythonScript(code, methodName, testCase);
    console.log("result:" + result)

    // Parse the result as JSON
    const parsedResult = JSON.parse(result.trim());
    res.json({ result: parsedResult });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
