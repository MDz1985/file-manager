import { createReadStream, createWriteStream, rename, stat, writeFile, rm as rem } from 'node:fs';
import { onInputError, onOperationFailed, showCurrentDirectory } from '../services/file-manager-service.js';
import { basename, dirname, resolve } from 'node:path';
import { cwd } from 'node:process';

function cat(path) {
  if (!path || path.includes(' ')) {
    onInputError();
  } else {
    const readStream = createReadStream(path, 'utf-8');
    let data = '';
    readStream.on('data', chunk => data += chunk);
    readStream.on('end', () => {
      console.log(data);
      showCurrentDirectory();
    });
    readStream.on('error', () => {
      onInputError();
      showCurrentDirectory();
    });
  }
}

function add(fileName) {
  if (!fileName || fileName.includes(' ')) {
    onInputError();
  } else {
    const filePath = resolve(cwd(), fileName);
    stat(filePath, (err) => {
      if (!err) {
        onInputError();
      } else {
        writeFile(filePath, '', 'utf8', () => {
        });
      }
    });
    showCurrentDirectory();
  }
}

function rn(data) {
  const paths = data?.split(' ');
  if (paths?.length !== 2) {
    onInputError();
  } else {
    const [path, newFileName] = paths;
    const dirName = dirname(path);
    const newPath = resolve(dirName, newFileName);
    stat(path, (err) => {
      // todo: change console logs
      if (err) console.log('Wrong input Wrong path');
      stat(newPath, (err) => {
        if (!err) console.log('Wrong input New path exists');
        rename(path, newPath, (err) => {
          if (err) console.log('Wrong input Rename problem');
          showCurrentDirectory();
        });
      });
    });
  }
}

function cp(data) {
  const paths = data?.split(' ');
  if (paths?.length !== 2) {
    onInputError();
  } else {
    copyFile({ paths });
  }
}

function mv(data) {
  const paths = data?.split(' ');
  if (paths?.length !== 2) {
    onInputError();
  } else {
    copyFile({ paths, remove: true });
  }
}


function copyFile({ paths, remove }) {
  const [path, destPath] = paths;
  const fileName = basename(path);
  const newPath = resolve(destPath, fileName);
  const readStream = createReadStream(path, 'utf-8');
  const writeStream = createWriteStream(newPath);
  let data = '';
  readStream.on('data', chunk => data += chunk);
  readStream.on('end', () => {
    writeStream.write(data);
    writeStream.end();
  });
  readStream.on('error', () => {
    onOperationFailed();
    showCurrentDirectory();
  });
  writeStream.on('error', () => {
    onOperationFailed()
    showCurrentDirectory();
  });

  writeStream.on('finish', () => {
    if (remove) {
      rem(path, (err) => {
        if (err) onOperationFailed();
        showCurrentDirectory();
      });
    } else {
      showCurrentDirectory();
    }
  });
}

function rm(path) {
  if (!path || path.includes(' ')) {
    onInputError();
  } else {
    stat(path, (err) => {
      if (err) {
        onOperationFailed()
        showCurrentDirectory();
      } else {
        rem(path, (err) => {
          if (err) onOperationFailed();
          showCurrentDirectory();
        });
      }
    });
  }
}

export const fileOperations = { cat, add, rn, rm, mv, cp };
