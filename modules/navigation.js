import { chdir, cwd } from "node:process";
import { onInputError, showCurrentDirectory, sort } from '../services/file-manager-service.js';
import { readdir, stat } from "node:fs";
import { resolve } from "node:path";

function up() {
  chdir('../');
  showCurrentDirectory();
}

function cd(path) {
  if (!path || path.includes(' ')) {
    onInputError();
  } else {
    try {
      chdir(path);
    } catch {
      onInputError();
    }
    showCurrentDirectory();
  }
}

function ls() {
  readdir(cwd(), (err, filesArray) => {
    const directories = [];
    const files = [];
    filesArray.forEach((file, i) => {
      stat(resolve(cwd(), file), (err, stats) => {
        stats?.isFile() ? files.push(file) : directories.push(file)
        if (i === filesArray.length - 1) {
          files.sort(sort);
          directories.sort(sort);
          const table = directories.map((dir) => ({ name: dir, type: 'directory' })).concat(
            files.map((file) => ({ name: file, type: 'file' }))
          )
          console.table(table);
          showCurrentDirectory();
        }
      })
    })
  })
}

export const nav = { up, cd, ls }
