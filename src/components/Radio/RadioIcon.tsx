import React, { memo } from 'react';

import Icon from '../../components/Icon';

import { iconCls, SIconWrap } from './style';

const RadioIcon = (props: { checked?: boolean; disabled?: boolean }) => {
  return (
    <SIconWrap {...props}>
      <Icon className={iconCls} type="whitecircle" />
    </SIconWrap>
  );
};

export default memo(RadioIcon);
