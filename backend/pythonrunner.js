function runPythonScript(code, methodName, input) {
  const fs = require("fs");
  const { spawn } = require("child_process");

  // Convert the input object to an array of values
  let args = Object.values(input);
  
  // Convert arguments to string format for python
  let formattedArgs = JSON.stringify(args);
  
  // Include json in preImports
  let preImports = "from typing import List\nimport json\n";
  
  // Code to invoke the method in python
  let invokeCode = `\nprint(json.dumps(Solution().${methodName}(*${formattedArgs}), separators=(',', ':')))`;

  // Write pythonCode to the test.py file
  fs.writeFileSync("./test.py", preImports + code + invokeCode);

  // Spawn the Python process
  const pythonProcess = spawn("python", ["./test.py"]);

  return new Promise((resolve, reject) => {
    pythonProcess.stdout.on("data", (data) => {
      console.log(`Python script output: ${data}`);
      resolve(data.toString()); // resolve the output
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python script error: ${data}`);
      resolve(`Python script error: ${data}`); // resolve with the error message
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python script exited with code ${code}`);
      if (code !== 0) {
        resolve(`Python script exited with code ${code}`); // resolve with the error message
      }
    });
  });
}

module.exports = runPythonScript;
