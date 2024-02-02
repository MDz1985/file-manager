import { chdir } from 'node:process';
import { homedir } from 'node:os'
import { showUserName } from "./modules/user.js";
import { checkInput, showCurrentDirectory } from "./services/file-manager-service.js";

const usernameRegex = /--username=.*/
const username = process.argv.find((el) => usernameRegex.test(el))?.split('=')[1];
chdir(homedir());

showUserName(username);
checkInput(username);
showCurrentDirectory();
