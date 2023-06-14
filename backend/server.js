const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 80;
const PythonShell = require("python-shell").PythonShell;

app.use(cors());
app.use(express.json());

app.post("/python", (req, res) => {
  fs.writeFileSync("test.py", req.body.code);
  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    args: [1, 2, 3]
  };

  PythonShell.run("test.py", options).then((messages) => {
    // messages is an array consisting of messages collected during execution
    console.log("results: %j", messages);
    res.json({ passOrFail: messages[0] });
  });
});

app.listen(port, () => {
  console.log(`Server is live on ${port}`);
});
