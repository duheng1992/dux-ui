import React, { memo } from 'react';

import Icon from '../../components/Icon';

import { iconCls, SIconWrap } from './style';

const CheckboxIcon = (props: {
  /** 全选状态 */
  indeterminate?: boolean;
  checked?: boolean;
  disabled?: boolean;
}) => {
  const { indeterminate } = props;
  // TODO: 没找到字体库里好看的icon，😭
  return (
    <SIconWrap {...props}>
      {indeterminate ? (
        // {/* <Icon className={iconCls} type="check" /> */}
        <span className={iconCls}>√</span>
      ) : (
        <span className={iconCls}>√</span>
      )}
    </SIconWrap>
  );
};

export default memo(CheckboxIcon);
