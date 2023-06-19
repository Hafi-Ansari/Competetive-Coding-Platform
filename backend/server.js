// server.js
const express = require("express");
const cors = require("cors");
const runPythonScript = require("./pythonrunner");
const app = express();
const port = 80;

app.use(cors());
app.use(express.json());

app.post("/python", async (req, res) => {
    try {
        const result = await runPythonScript(req.body.code);
        res.json({ passOrFail: result });
    } catch(error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.listen(port, () => {
    console.log(`Server is live on ${port}`);
});
