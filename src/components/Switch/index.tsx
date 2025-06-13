import React, { HTMLAttributes, ReactNode, useCallback } from 'react';

import useUncontrolled from '../hooks/useUncontrolled';

import { SwitchWrap, buttonCls, onTipCls, offTipCls, innerCls, dotCls } from './style';

// type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export interface SwitchProps {
  /** 是否选中 */
  checked?: boolean;
  /** 默认选中状态 */
  defaultChecked?: boolean;
  /** 选中状态改变时的回调 */
  onChange?: (checked: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否iphone样式 */
  iStyle?: boolean;
  /** 自定义样式 */
  customStyle?: Object;
  /** 打开的文字 */
  onText?: ReactNode;
  /** 关闭的文字 */
  offText?: ReactNode;
}

// eslint-disable-next-line react/display-name
const Switch = ({
  checked: _checked,
  defaultChecked,
  onChange: _onChange,
  disabled,
  size = 'md',
  onText = 'ON',
  offText = 'OFF',
  iStyle = false,
  customStyle = {},
  ...rest
}: SwitchProps) => {
  const [checked, onChange] = useUncontrolled(_checked, defaultChecked || false, _onChange);
  const handleClick = useCallback(() => {
    if (disabled) return;
    onChange(!checked);
  }, [checked, disabled, onChange]);
  return (
    <SwitchWrap
      {...rest}
      checked={checked}
      disabled={disabled}
      size={size}
      iStyle={iStyle}
      onClick={handleClick}
    >
      <span className={innerCls} style={checked ? customStyle : {}}>
        <span className={onTipCls}>{onText}</span>
        <span className={offTipCls}>{offText}</span>
      </span>
      <button className={buttonCls}>
        <span>
          <span className={dotCls} />
        </span>
      </button>
    </SwitchWrap>
  );
};

const SwitchMemo = React.memo(Switch);
(SwitchMemo as any).Sizes = ['sm', 'md', 'lg'];

export default SwitchMemo;
