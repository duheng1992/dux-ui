import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '../Icon';
import Button from '../Button';

import {
  itemCls,
  itemErrorCls,
  nameCls,
  removeCls,
  detailCls,
  actionCls,
  errorCls,
  errorIconCls,
  uploadingTipCLs,
  uploadingIconCLs,
  previewAbleCls,
} from './style';
import Thumbnail from './Thumbnail';
import Progress from './Progress';

export class Item extends Component {
  static propTypes = {
    onRemove: PropTypes.func,
    onPreview: PropTypes.func,
    onReupload: PropTypes.func,
    locale: PropTypes.object.isRequired,
    thumbnail: PropTypes.bool,
    disabled: PropTypes.bool,
    file: PropTypes.object,
    index: PropTypes.number,
  };
  static defaultProps = {
    removable: true,
  };
  onPreview = () => {
    const { file, index, onPreview } = this.props as any;
    onPreview?.(file, index);
  };
  onReupload = () => {
    const { file, onReupload } = this.props as any;
    onReupload(file);
  };
  onRemove = () => {
    const { file, index, onRemove } = this.props as any;
    onRemove(file, index);
  };
  renderThumbnail = () => {
    const { file, thumbnail } = this.props as any;
    return thumbnail ? <Thumbnail file={file} /> : null;
  };
  renderName = () => {
    const { file } = this.props as any;
    return (
      <span className={nameCls} title={file.name}>
        {file.name}
      </span>
    );
  };
  render() {
    const { onRemove, onPreview, locale, thumbnail, disabled, file } = this.props as any;
    const { status } = file;
    const removeBtn =
      !disabled && onRemove ? (
        <Icon className={removeCls} type="remove_sign" onClick={this.onRemove} />
      ) : null;
    const retryBtn = !disabled ? (
      <Button key="reload" size="sm" onClick={this.onReupload}>
        <Icon type="refresh" /> {locale.retry}
      </Button>
    ) : null;
    switch (status) {
      case 'uploading': {
        return (
          <div className={itemCls}>
            {this.renderThumbnail()}
            <div className={detailCls}>
              {thumbnail ? (
                <div>
                  {this.renderName()}
                  <Progress {...('progress' in file ? { percent: file.progress } : {})} />
                </div>
              ) : (
                <div className={uploadingTipCLs}>
                  <Icon className={uploadingIconCLs} type="loading" spin={{ pulse: true }} />
                  {locale.uploading}
                </div>
              )}
            </div>
            <div className={actionCls}>{removeBtn}</div>
          </div>
        );
      }
      case 'error': {
        return (
          <div className={classnames(itemCls, itemErrorCls)}>
            {this.renderThumbnail()}
            <div className={detailCls}>
              {this.renderName()}
              <div className={errorCls} title={file.error + '' || locale.defaultUploadErrorTip}>
                <Icon className={errorIconCls} type="circle" />
                {file.error + '' || locale.defaultUploadErrorTip}
              </div>
            </div>
            <div className={actionCls}>
              {retryBtn}
              {removeBtn}
            </div>
          </div>
        );
      }
      default: {
        return (
          <div className={classnames(itemCls, onPreview && previewAbleCls)}>
            {this.renderThumbnail()}
            <div className={detailCls} onClick={this.onPreview}>
              {this.renderName()}
            </div>
            <div className={actionCls}>{removeBtn}</div>
          </div>
        );
      }
    }
  }
}

export default Item;
