import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { clearFixMixin } from '../../../style';
import config from '../../../config';
import styleWrap from '../../../style/styleWrap';

const { prefixCls: _prefixCls } = config;
const colPrefixCls = _prefixCls + '-col';
const rowPrefixCls = _prefixCls + '-row';

const maxColumns = 12;

const percentage = (v: number) => {
  return +(v * 100).toFixed(8) + '%';
};

const flexMixin = css`
  display: flex;
  flex-flow: row wrap;
`;
const spanMixin = (props: { span: number }) => {
  const { span } = props;

  return css`
    float: left;
    flex: 0 0 auto;
    width: ${percentage(span / maxColumns)};
    ${span === 0 &&
    css`
      display: none;
    `};
  `;
};
const pushMixin = (props: { push: number }) => {
  const { push } = props;

  return css`
    left: ${percentage(push / maxColumns)};
  `;
};
const pullMixin = (props: { pull: number }) => {
  const { pull } = props;

  return css`
    right: ${percentage(pull / maxColumns)};
  `;
};
const offsetMixin = (props: { offset: number }) => {
  const { offset } = props;

  return css`
    margin-left: ${percentage(offset / maxColumns)};
  `;
};
const orderMixin = (props: { order: number }) => {
  const { order } = props;

  return css`
    order: ${order};
  `;
};

const justifyMixin = (props: { justify: string }) => {
  const { justify } = props;

  return css`
    justify-content: ${{
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      'space-around': 'space-around',
      'space-between': 'space-between',
    }[justify]};
  `;
};
const alignMixin = (props: { align: string }) => {
  const { align } = props;

  return css`
    align-items: ${{ top: 'flex-start', middle: 'center', bottom: 'flex-end' }[align]};
  `;
};

export const ColWrap = styleWrap({
  className: colPrefixCls,
})(
  styled('div')((props: any) => {
    return css`
      position: relative;
      display: block;
      box-sizing: border-box;
      min-height: 1px;

      ${props.span !== undefined && spanMixin(props)};
      ${props.push && pushMixin(props)};
      ${props.pull && pullMixin(props)};
      ${props.offset && offsetMixin(props)};
      ${props.order && orderMixin(props)};
    `;
  }),
);

const RowWrap = styleWrap({
  className: rowPrefixCls,
})(
  styled('div')((props: any) => {
    const { type, gutter } = props;
    let gutterHor = gutter;
    let gutterVer = null;
    if (Array.isArray(gutter)) {
      [gutterHor, gutterVer] = gutter;
    }
    gutterHor = gutterHor / 2 || 0;
    gutterVer = gutterVer / 2 || 0;

    return css`
      position: relative;
      display: block;
      height: auto;

      ${type === 'flex' ? flexMixin : clearFixMixin};
      ${gutterHor
        ? css`
            margin-left: ${-gutterHor + 'px'};
            margin-right: ${-gutterHor + 'px'};
          `
        : null}
      ${gutterVer
        ? css`
            margin-top: ${-gutterVer + 'px'};
            margin-bottom: ${-gutterVer + 'px'};
          `
        : null}
            ${justifyMixin(props)};
      ${alignMixin(props)};

      > .${colPrefixCls} {
        ${gutterHor
          ? css`
              padding-left: ${gutterHor + 'px'};
              padding-right: ${gutterHor + 'px'};
            `
          : null}
        ${gutterVer
          ? css`
              padding-top: ${gutterVer + 'px'};
              padding-bottom: ${gutterVer + 'px'};
            `
          : null}
      }
    `;
  }),
);

export { RowWrap };
