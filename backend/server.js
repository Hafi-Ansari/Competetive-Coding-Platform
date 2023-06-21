const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
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


// Use problems routes
const problemsRouter = require("./routes/problems");
app.use("/problems", problemsRouter);

// Use Python runner route
const pythonRouter = require("./routes/python");
app.use("/python", pythonRouter);
