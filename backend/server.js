const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const runPythonScript = require("./pythonrunner");
const app = express();
const port = 80;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the server
    app.listen(port, () => {
      console.log(`Server is live on ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Python runner route
app.post("/python", async (req, res) => {
  try {
    const result = await runPythonScript(req.body.code);
    res.json({ passOrFail: result });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Use problems routes
const problemsRouter = require("./routes/problems");
app.use("/problems", problemsRouter);
