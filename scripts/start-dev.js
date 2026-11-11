const { spawn } = require('child_process');
const path = require('path');

console.log('Starting UK Fashion Fullstack Dev Servers (Node + Vite React)...');

const rootDir = path.join(__dirname, '..');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

// 1. Start Node Backend
const backend = spawn(process.execPath, ['server.js'], {
  cwd: path.join(rootDir, 'backend'),
  stdio: 'inherit'
});

// 2. Start Vite Frontend
const frontend = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(rootDir, 'frontend'),
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

let shuttingDown = false;
function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  if (!backend.killed) backend.kill();
  if (!frontend.killed) frontend.kill();
  process.exit(code);
}

backend.on('exit', (code) => {
  if (!shuttingDown) shutdown(code || 0);
});

frontend.on('exit', (code) => {
  if (!shuttingDown) shutdown(code || 0);
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
