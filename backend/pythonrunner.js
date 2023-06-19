// pythonRunner.js
const { spawn } = require("child_process");
const fs = require("fs");

function runPythonScript(code) {
    return new Promise((resolve, reject) => {
        fs.writeFileSync("test.py", code);

        const process = spawn("python", ["./test.py"]);
        let result = '';

        process.stdout.on('data', (data) => {
            result += data.toString();
        });

        process.stderr.on('data', (data) => {
            reject(data.toString());
        });

        process.on('close', (code) => {
            if(code !== 0) {
                reject(new Error(`process exit code ${code}`));
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = runPythonScript;
