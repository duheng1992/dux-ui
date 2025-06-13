import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '../Icon';

import {
  thumbnailCls,
  archiveIconCls,
  docsIconCls,
  imageIconCls,
  unknownIconCls,
  imageCls,
  iconWrapCls,
  iconCls,
} from './style';
import { readFile, getFileType } from './utils';

const IconMap = {
  archive: 'file_alt',
  docs: 'doc',
  image: 'picture',
  unknown: 'question_sign',
};

const iconClassNameMap = {
  archive: archiveIconCls,
  docs: docsIconCls,
  image: imageIconCls,
  unknown: unknownIconCls,
};

const getFileIcon = (file = {}) => {
  const type = getFileType(file);
  const IconType = IconMap[type];
  const className = iconClassNameMap[type];
  return <Icon type={IconType} className={classnames(iconCls, className)} />;
};

function Thumbnail({ file, className }: any) {
  const [thumbnailUrl, setThumbnailUrl] = useState(file.thumbnailUrl);
  useEffect(() => {
    if (file.thumbnailUrl) {
      setThumbnailUrl(file.thumbnailUrl);
    } else if (file instanceof File && getFileType(file) === 'image') {
      readFile(file).then((dataUrl) => setThumbnailUrl(dataUrl));
    } else {
      setThumbnailUrl(null);
    }
    return () => {};
  }, [file]);
  return (
    <div className={classnames(thumbnailCls, className)}>
      {thumbnailUrl ? (
        <div className={imageCls} style={{ backgroundImage: `url(${thumbnailUrl})` }} />
      ) : (
        <div className={iconWrapCls}>{getFileIcon(file)}</div>
      )}
    </div>
  );
}

Thumbnail.propTypes = {
  file: PropTypes.object,
  className: PropTypes.string,
};

export default Thumbnail;
