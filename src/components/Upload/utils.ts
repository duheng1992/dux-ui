import fbf from 'file-bytes-formatter';

import generateError from '../../utils/generateError';

export const readFile = (file: File) => {
  const _reader = new FileReader();
  return new Promise((resolve, reject) => {
    _reader.onload = (e: Event) => {
      if (e && e.target) {
        resolve((e.target as any).result);
      }
    };
    _reader.onerror = (e) => {
      reject(e);
    };
    _reader.readAsDataURL(file);
  });
};

const getApplicationIcon = (t2: string) => {
  switch (t2) {
    case 'pdf':
    case 'msword':
    case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'docs';
    case 'zip':
    case 'x-rar':
    case 'x-bzip':
    case 'x-bzip2':
    case 'gzip':
      return 'archive';
    default:
      return 'unknown';
  }
};

export const getFileType = (file: any) => {
  const { type } = file;
  const [t1, t2] = type?.split('/') || [];

  switch (t1) {
    case 'image':
      return 'image';
    case 'text':
      return 'docs';
    case 'application':
      return getApplicationIcon(t2);
    default:
      return 'unknown';
  }
};

export const openLink = (link: string): Window => {
  return window.open(link, '_blank') || window;
};

/** 检查文件类型和大小 */
export const checkFile = (file: File, accept = '*', maxSize: number, locale: any) => {
  const types = accept.split(/\s*,\s*/);
  let typeCheckPass = false;
  for (const index in types) {
    const type = types[index];
    let regexp, pass;
    if (/^\./.test(type)) {
      regexp = new RegExp(type.replace('.', '\\.') + '$');
      pass = regexp.test(file.name);
    } else {
      regexp = new RegExp(type.replace('*', '.*').replace('.', '\\.'));
      pass = regexp.test(file.type);
    }
    if (pass) {
      typeCheckPass = true;
      break;
    }
  }
  const sizeCheckPass = maxSize === undefined || file.size <= maxSize;
  if (!typeCheckPass) {
    return generateError(locale.typeErrorTip.replace('{accept}', accept), 'FileTypeError');
  }
  if (!sizeCheckPass) {
    return generateError(locale.maxSizeErrorTip.replace('{size}', fbf(maxSize)), 'FileSizeError');
  }
  return true;
};
