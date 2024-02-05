import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { onInputError, onOperationFailed, showCurrentDirectory } from '../services/file-manager-service.js';

export function hash(path) {
  if (!path || path.includes(' ')) {
    onInputError();
  } else {
    const hash = createHash('sha256');
    const readStream = createReadStream(path);
    const result = readStream.pipe(hash);
    readStream
      .on('end', () => {
        console.log(result.digest('hex'));
        showCurrentDirectory();
      })
      .on('error', () => onOperationFailed());
  }
}
