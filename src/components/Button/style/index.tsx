import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import config from '../../../config';
import {
  inlineBlockWithVerticalMixin,
  styleWrap,
  Theme,
  getHeightBySize,
  getPaddingBySize,
  offsetPaddingBySize,
  transitionFlat,
  offsetHeightBySize,
} from '../../../style';

import { StyleTypes, Sizes, Shapes } from '../shared';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-button';
export const iconCls = prefixCls + '-icon';

interface StyleButtonProps {
  styleType: typeof StyleTypes[number];
  size: typeof Sizes[number];
  shape?: typeof Shapes[number];
  shadowed?: boolean;
  loading?: boolean;
  disabled?: boolean;
  checked?: boolean;
  block?: boolean;
  // theme?: string;
}
type StyleButtonPropsWithTag = StyleButtonProps & HTMLAttributes<HTMLButtonElement>;
type StyleButtonPropsFinal = StyleButtonPropsWithTag & { theme: Theme };

const sizeMixin = (props: StyleButtonPropsFinal) => {
  const {
    size,
    theme: { designTokens: DT },
  } = props;

  return css`
    height: ${getHeightBySize(DT, size)};
    line-height: ${getHeightBySize(DT, size)};
    padding: 0 ${getPaddingBySize(DT, size)};
  `;
};

const transitionProperty = 'width,height,border,background,color,fill,box-shadow';

const styleTypeMixin = (props: StyleButtonPropsFinal) => {
    
  const {
    theme: { designTokens: DT },
    styleType,
    disabled,
    size,
    shadowed,
  } = props;

  const baseStyleTypeTheme = {
    color: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT,
    fill: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT,
    border: 'none',
    boxShadow: shadowed ? DT.T_SHADOW_BUTTON_PRIMARY : 'none',
    transition: `${transitionProperty} ${transitionFlat}`,
    ':link,:visited': {
      color: DT.T_BUTTON_PRIMARY_COLOR_TEXT_DEFAULT,
    },
  };

  const styleTypeTheme: { [key: string]: any } = {
    primary: {
      background: DT.T_BUTTON_PRIMARY_COLOR_BG_DEFAULT,
      ':hover,:active': {
        background: DT.T_BUTTON_PRIMARY_COLOR_BG_HOVER,
        boxShadow: shadowed ? DT.T_SHADOW_BUTTON_PRIMARY_HOVER : 'none',
      },
      ...baseStyleTypeTheme,
    },
    warning: {
      background: DT.T_BUTTON_WARNING_COLOR_BG_DEFAULT,
      ':hover,:active': {
        background: DT.T_BUTTON_WARNING_COLOR_BG_HOVER,
        boxShadow: shadowed ? DT.T_SHADOW_BUTTON_PRIMARY_HOVER : 'none',
      },
      ...baseStyleTypeTheme,
    },
    success: {
        background: DT.T_BUTTON_SUCCESS_COLOR_BG_DEFAULT,
        ':hover,:active': {
          background: DT.T_BUTTON_SUCCESS_COLOR_BG_HOVER,
          boxShadow: shadowed ? DT.T_SHADOW_BUTTON_PRIMARY_HOVER : 'none',
        },        
        ...baseStyleTypeTheme,
    },
    error: {
        background: DT.T_BUTTON_ERROR_COLOR_BG_DEFAULT,
        ':hover,:active': {
          background: DT.T_BUTTON_ERROR_COLOR_BG_HOVER,
          boxShadow: shadowed ? DT.T_SHADOW_BUTTON_PRIMARY_HOVER : 'none',
        },        
        ...baseStyleTypeTheme,
    },
    border: {
      color: DT.T_COLOR_TEXT_DEFAULT_DARK,
      fill: DT.T_COLOR_TEXT_DEFAULT_DARK,
      background: DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT,
      border: `1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK}`,
      boxShadow: shadowed ? DT.T_SHADOW_BUTTON_DEFAULT : 'none',
      transition: `${transitionProperty} ${transitionFlat}`,
      ':link,:visited': {
        color: DT.T_COLOR_TEXT_DEFAULT_DARK,
      },
      ':hover,:active': {
        color: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
        fill: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
        border: `1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT}`,
        background: DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT,
        boxShadow: shadowed ? DT.T_SHADOW_BUTTON_HOVER : 'none',
      },
    },
    'border-gray': {
      color: DT.T_COLOR_TEXT_DEFAULT_LIGHT,
      fill: DT.T_COLOR_TEXT_DEFAULT_LIGHT,
      borderColor: DT.T_COLOR_LINE_DEFAULT_LIGHT,
      background: DT.T_COLOR_BG_DEFAULT_LIGHT,
      transition: `${transitionProperty} ${transitionFlat}`,
      ':link,:visited': {
        color: DT.T_COLOR_TEXT_DEFAULT_LIGHT,
      },
      ':hover,:active': {
        color: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
        fill: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
        borderColor: DT.T_COLOR_LINE_PRIMARY_HOVER,
        background: DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT,
      },
    },
  };
  const disabledTheme = {
    background: DT.T_COLOR_BG_DISABLED_LIGHT,
    color: DT.T_COLOR_TEXT_DISABLED,
    fill: DT.T_COLOR_TEXT_DISABLED,
    cursor: 'default',
    borderColor: DT.T_COLOR_LINE_DISABLED_LIGHT,
    boxShadow: 'none',
    transition: `${transitionProperty} ${transitionFlat}`,
  };
  return css`
    ${disabled ? disabledTheme : styleTypeTheme[styleType]};
    ${(disabled || styleType === 'border' || styleType === 'border-gray') &&
    css`
      border-width: ${DT.T_LINE_WIDTH_BASE};
      border-style: solid;
      padding: 0 ${offsetPaddingBySize(DT, size, -1)};
      line-height: ${offsetHeightBySize(DT, size, -2)};
    `};
  `;
};

const shapeMixin = (props: StyleButtonPropsFinal) => {
  const {
    size,
    shape,
    theme: { designTokens: DT },
  } = props;
  switch (shape) {
    case 'circle':
      return css`
        border-radius: 50% !important;
        padding: 0;
        overflow: hidden;
        width: ${getHeightBySize(DT, size)};
      `;
    case 'square':
      return css`
        padding: 0;
        overflow: hidden;
        width: ${getHeightBySize(DT, size)};
      `;
    default:
      return css``;
  }
};

const loadingMixin = (props: StyleButtonPropsFinal) => {
  const {
    theme: { designTokens: DT },
    styleType,
  } = props;

  return css`
    position: relative;
    pointer-events: none;

    &:before {
      position: absolute;
      top: -1px;
      right: -1px;
      bottom: -1px;
      left: -1px;
      z-index: 1;
      background: ${DT.T_BUTTON_COMMON_COLOR_MASK};
      border-radius: inherit;
      opacity: 0.6;
      transition: opacity 0.2s;
      content: '';
      ${!(styleType === 'border' || styleType === 'border-gray') &&
      css`
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
      `}
    }
  `;
};

const classNameMixin = ({
  size,
  styleType,
  shape,
  loading,
  disabled,
  checked,
}: StyleButtonProps) =>
  classnames(
    prefixCls,
    `${prefixCls}-size-${size}`,
    `${prefixCls}-styletype-${styleType}`,
    shape && `${prefixCls}-${shape}`,
    loading && `${prefixCls}-loading`,
    disabled && `${prefixCls}-disabled`,
    checked && `${prefixCls}-checked`,
  );

const buttonStyleMixin = <T extends StyleButtonProps & { theme: Theme }>(props: T) => {
  const { theme, loading, shape, checked, block } = props;
  const { designTokens: DT } = theme;
  return css`
    margin: 0;
    box-sizing: border-box;
    border-radius: ${DT.T_CORNER_LG};
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    font-size: ${DT.T_TYPO_FONT_SIZE_1};
    white-space: nowrap;
    ${inlineBlockWithVerticalMixin};

    ${sizeMixin(props)};
    ${styleTypeMixin(props)};
    ${shape && shapeMixin(props)};
    ${loading && loadingMixin(props)};
    ${block &&
    css`
      width: 100%;
    `};
  `;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const Button = ({
  loading,
  styleType,
  disabled,
  onClick,
  block,
  shadowed,
  ...rest
}: StyleButtonPropsWithTag) => (
  <button
    disabled={disabled}
    onClick={!disabled ? onClick : undefined}
    {...rest}
  />
);
/* eslint-enable @typescript-eslint/no-unused-vars */
export const StyleButton = styleWrap<StyleButtonProps, HTMLButtonElement>({
  className: classNameMixin,
})(styled(Button)(buttonStyleMixin));
