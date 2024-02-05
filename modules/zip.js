import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { pipeline } from 'node:stream';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { onInputError, onOperationFailed, showCurrentDirectory } from '../services/file-manager-service.js';

function compress(data) {
  const paths = data?.split(' ');
  if (paths?.length !== 2) {
    onInputError();
  } else {
    const src = createReadStream(resolve(paths[0]));
    const dst = createWriteStream(resolve(paths[1]));
    const brotliCompress = createBrotliCompress();
    pipeline(src, brotliCompress, dst, (err) => {
      if (err) onOperationFailed();
    });
  }
  showCurrentDirectory();
}

function decompress(data) {
  const paths = data?.split(' ');
  if (paths?.length !== 2) {
    onInputError();
  } else {
    const src = createReadStream(resolve(paths[0]));
    const dst = createWriteStream(resolve(paths[1]));
    const brotliDecompress = createBrotliDecompress();
    pipeline(src, brotliDecompress, dst, (err) => {
      if (err) onOperationFailed();
    });
  }
  showCurrentDirectory();
}

export const zip = { compress, decompress };
