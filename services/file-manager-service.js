import { commands } from '../modules/commands.js';
import { stdin } from 'node:process';

export function checkInputData(data) {
  [...commands.entries()].every(([func, regex], i) => {
    if (regex.test(data)) {
      const spacePosition = data.indexOf(' ');
      const argument = spacePosition > 0 ? data.slice(spacePosition + 1).toString() : null;
      func(argument);
      return false;
    }
    if (i === commands.size - 1) {
      onInputError();
      showCurrentDirectory();
    }
    return true;
  });
}

export function checkInput(username) {
  stdin.on('data', data => {
    if (/\.exit[\n\r]/.test(data.toString().toLowerCase())) {
      process.exit();
    }
    checkInputData(data.slice(0, -os.EOL.length));
  });
  process.on('exit', () => console.log(`Thank you for using File Manager, ${ username }, goodbye!`));
  process.on('SIGINT', () => {
    console.log(' ');
    process.exit();
  });
}

export function showCurrentDirectory() {
  console.log(`You are currently in ${ process.cwd() }`);
}

export const sort = (a, b) => {
  const first = a.toUpperCase();
  const second = b.toUpperCase();
  if (first < second) return -1;
  if (first > second) return 1;
  return 0;
};

export function onInputError() {
  console.log('Invalid input');
}

export function onOperationFailed() {
  console.log('Operation failed');
}
