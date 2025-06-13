import React, { HTMLAttributes, useContext, useMemo } from 'react';
import classnames from 'classnames';

import { Override } from '../../type';
import ConfigContext from '../ConfigProvider/ConfigContext';

import { IconWrap, prefixCls } from './style';
import '../../style';

type SpinProps =
  | {
      pulse: boolean;
    }
  | boolean;

export interface IconProps {
  /** 图标类型 */
  type: string;
  /** 是否旋转 */
  spin?: SpinProps;
  /** 自定义 icon 类名前缀，使用自定义图标库时使用，默认为 icon\_\_ */
  prefix?: string;
  /** 自定义 className */
  className?: any;
  onClick?: any;
}

/** 图标控件 */
const Icon = ({ type, spin, prefix, className, ...rest }: IconProps) => {
  const configContext = useContext(ConfigContext);
  const finalPrefix = useMemo(
    () => prefix || configContext.iconDefaultPrefix || 'icon__',
    [configContext.iconDefaultPrefix, prefix],
  );
  return (
    <IconWrap
      className={classnames(
        prefixCls,
        `${finalPrefix}${type}`,
        spin && `${prefixCls}-spin`,
        className,
      )}
      spin={spin}
      {...rest}
    />
  );
};

export default React.memo(Icon);
