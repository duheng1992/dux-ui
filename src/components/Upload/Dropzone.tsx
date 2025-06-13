import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '../Icon';
import List from './List';
import {
  DropZoneWrap,
  dropzoneTipCls,
  dropzoneMaskTipCls,
  dropzoneTipMainCls,
  dropzoneTipSubCls,
  iconCls,
  dragingCls,
} from './style';

export default class DropZone extends PureComponent {
  static propTypes = {
    fileList: PropTypes.array,
    locale: PropTypes.object,
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
  };

  state = {
    draging: false,
  };
  renderList = () => {
    return (
      <>
        <List {...this.props} />
        <div className={dropzoneMaskTipCls}>{this.renderTip()}</div>
      </>
    );
  };
  renderTip = () => {
    const { locale } = this.props as any;
    const { draging } = this.state;
    return (
      <div className={dropzoneTipCls}>
        {draging ? (
          <Icon type="upload" className={iconCls} />
        ) : (
          <Icon type="upload" className={iconCls} />
        )}
        <div className={dropzoneTipMainCls}>{locale.dropzoneMainTip}</div>
        <div className={dropzoneTipSubCls}>{locale.dropzoneSubTip}</div>
      </div>
    );
  };
  dragPath: any[] = [];
  onDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { onSelect, disabled } = this.props as any;
    if (disabled) return;
    onSelect(e.dataTransfer.files);
    this.dragPath = [];
    this.setState({
      draging: false,
    });
  };
  onDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  onDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { disabled } = this.props as any;
    if (disabled) return;
    this.dragPath.push(e.target);
    if (!this.state.draging) {
      this.setState({
        draging: true,
      });
    }
  };
  onDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragPath = this.dragPath.filter((p) => p !== e.target);
    if (this.state.draging && !this.dragPath.length) {
      this.setState({
        draging: false,
      });
    }
  };
  onDragEnd = () => {
    this.dragPath = [];
    this.setState({
      draging: false,
    });
  };
  render() {
    const { fileList } = this.props as any;
    const { draging } = this.state;

    return (
      <DropZoneWrap
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragEnd={this.onDragEnd}
        className={classnames(draging && dragingCls)}
      >
        {fileList.length > 0 ? this.renderList() : this.renderTip()}
      </DropZoneWrap>
    );
  }
}
