export function showUserName(username) {
  if (username) {
    console.log(`Welcome to the File Manager, ${ username }!`)
  } else {
    console.log('You didn\'t enter the user name. Please use "npm run start -- --username=your_username", goodbye!');
    process.exit();
  }
}
