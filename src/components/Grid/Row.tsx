import React, { ReactNode } from 'react';
import PropTypes, { number } from 'prop-types';

const Align = ['top', 'middle', 'bottom'];
const Justify = ['start', 'end', 'center', 'space-around', 'space-between'];
const Type = ['flex'];

import { RowWrap } from './style';

export interface RowProps {
  /** 是否为flex类型，flex类型时定位属性才能生效 */
  type?: 'flex';
  /** 垂直定位 */
  align?: 'top' | 'middle' | 'bottom';
  /** 水平定位 */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  /** 栅格间距，单个值为横行间隔，数组为[横向间距, 纵向间距] */
  gutter?: number | number[];
  /** @ignore */
  className?: string;
  /** @ignore */
  style?: object;
  /** @ignore */
  children?: ReactNode;
}

const Row = ({ gutter = 16, ...rest }: RowProps) => {
  return <RowWrap gutter={gutter} {...rest} />;
};

Row.propTypes = {
  /** 是否为flex类型，flex类型时定位属性才能生效 */
  type: PropTypes.oneOf(Type),
  /** 垂直定位 */
  align: PropTypes.oneOf(Align),
  /** 水平定位 */
  justify: PropTypes.oneOf(Justify),
  /** 栅格间距，单个值为横行间隔，数组为[横向间距, 纵向间距] */
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  /** @ignore */
  className: PropTypes.string,
  /** @ignore */
  style: PropTypes.object,
  /** @ignore */
  children: PropTypes.node,
};

Object.assign(Row, {
  Align,
  Justify,
  Type,
});

export default Row;
