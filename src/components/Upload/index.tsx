import Upload from './Upload';
export default Upload;

import { readFile } from './utils';
(Upload as any).readFile = readFile;
