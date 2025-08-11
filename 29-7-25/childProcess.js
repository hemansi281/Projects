// const { spawn } = require('child_process');
// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`Output: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//   console.error(`Error: ${data}`);
// });

// ls.on('close', (code) => {
//   console.log(`Child process exited with code ${code}`);
// });


// const { exec } = require('child_process');
// exec('ls -la', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout:\n${stdout}`);
// });


const { execFile } = require('child_process');
execFile('node', ['--version'], (error, stdout) => {
  if (error) throw error;
  console.log(`Node version: ${stdout}`);
});
