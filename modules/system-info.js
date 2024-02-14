import { arch, cpus, EOL, homedir, userInfo } from 'node:os';
import { onInputError, showCurrentDirectory } from '../services/file-manager-service.js';

function os(data) {
  switch (data) {
    case '--EOL':
      console.log(EOL);
      break;
    case '--cpus':
      console.log(cpus());
      break;
    case '--homedir':
      console.log(homedir());
      break;
    case '--username':
      console.log(userInfo().username);
      break;
    case '--architecture':
      console.log(arch());
      break;
    default:
      onInputError();
  }
  showCurrentDirectory();
}

export const sysInfo = { os };
