import { createReadStream, createWriteStream, rename, stat, writeFile, rm as rem } from "node:fs";
import { showCurrentDirectory } from "../services/file-manager-service.js";
import { basename, dirname, resolve } from "node:path";
import { cwd } from "node:process";

function cat(path) {
  if (!path || path.includes(' ')) {
    console.log('Wrong input')
  } else {
    const readStream = createReadStream(path, 'utf-8');
    let data = '';
    readStream.on('data', chunk => data += chunk);
    readStream.on('end', () => {
      console.log(data);
      showCurrentDirectory();
    });
    readStream.on('error', () => {
      console.log('Input error');
      showCurrentDirectory();
    });
  }
}

function add(fileName) {
  if (!fileName || fileName.includes(' ')) {
    console.log('Wrong input')
  } else {
    const filePath = resolve(cwd(), fileName);
    stat(filePath, (err) => {
      if (!err) console.log('Wrong input');
      writeFile(filePath, '', 'utf8', () => {
      })
    })
    showCurrentDirectory();
  }
}

function rn(data) {
  const paths = data?.split(' ');
  if (paths?.length !== 2) {
    console.log('Wrong input')
  } else {
    const [path, newFileName] = paths;
    const dirName = dirname(path);
    const newPath = resolve(dirName, newFileName);
    stat(path, (err) => {
      if (err) console.log('Wrong input Wrong path');
      stat(newPath, (err) => {
        if (!err) console.log('Wrong input New path exists');
        // console.log(path, newPath, data, paths);
        rename(path, newPath, (err) => {
          if (err) console.log('Wrong input Rename problem');
          showCurrentDirectory();
        })
      })
    })
  }
}

function cp(data) {
  const paths = data?.split(' ');
  if (paths?.length !== 2) {
    console.log('Wrong input')
  } else {
    copyFile({ paths });
  }
}

function mv(data) {
  const paths = data?.split(' ');
  if (paths?.length !== 2) {
    console.log('Wrong input')
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
    console.log('Wrong input read problem');
    showCurrentDirectory();
  });
  writeStream.on('error', (err) => {
    console.log('Wrong input write problem', err.message);
    showCurrentDirectory();
  })

  writeStream.on('finish', () => {
    if (remove) {
      rem(path, (err) => {
        if (err) console.log(err)
      })
    }
    showCurrentDirectory()
  })
}

function rm(path) {
  if (!path || path.includes(' ')) {
    console.log('Wrong input')
  } else {
    stat(path, (err) => {
      if (err) {
        console.log('Wrong input')
      } else {
        rem(path, (err) => {
          if (err) console.log('Wrong input')
        })
      }
      showCurrentDirectory()
    })
  }
}

export const fileOperations = { cat, add, rn, rm, mv, cp }
