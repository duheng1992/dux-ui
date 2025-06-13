import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Input from '../../Input';
import Icon from '../../Icon';
import Menu from '../../Menu';
import Button from '../../Button';
import { inlineBlockWithVerticalMixin, styleWrap } from '../../../style';
import config from '../../../config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-select';
export const selectorContentCls = prefixCls + '-content';

export const SelectSearchInput = styled(Input.Search)`
  min-width: 100px;
  display: block;
  margin: 0 8px;
  margin-top: 10px;
`;

export const SSelector = styled(Button as any)`
  padding-right: 28px;
  width: 100%;
  min-width: 78px;
  text-align: left;
  overflow: hidden;
  .${selectorContentCls} {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const Arrow = styled(Icon)`
  position: absolute;
  right: 8px;
  top: 50%;
  margin-top: -6px;
`;
export const OptionWrap = styled(Menu.Item)((props) => {
  const { hidden } = props;

  return css`
    ${hidden &&
    css`
      display: none;
    `};
  `;
});
export const FooterWrap = styleWrap({})(
  styled.div((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      padding: 8px 0;
      box-shadow: ${DT.T_SHADOW_BLOCK_TOP_SM};
    `;
  }),
);
export const ExtraWrap = styled('div')`
  margin: 0 8px;
`;
export const MenuWrap = styleWrap({})(
  styled.div((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
      background: ${DT.T_COLOR_BG_MENU};
      border-radius: ${DT.T_CORNER_SM};
      display: inline-block;
      width: 100%;
      min-width: 78px;
    `;
  }),
);

// eslint-disable-next-line react/prop-types,no-unused-vars
const CustomMenu = ({ customStyle, menuCustomStyle, ...rest }: any) => (
  <Menu customStyle={menuCustomStyle} {...rest} />
);

export const BlockMenu = styled(CustomMenu)((props) => {
  const { customStyle = {} } = props;
  const maxHeight = customStyle.optionListMaxHeight
    ? typeof customStyle.optionListMaxHeight === 'string'
      ? customStyle.optionListMaxHeight
      : customStyle.optionListMaxHeight + 'px'
    : '380px';

  return css`
    display: block;
    border: none;
    box-shadow: none;
    max-height: ${maxHeight};
    background: unset;
    ${customStyle.popupWidth
      ? css`
          width: ${customStyle.popupWidth};
        `
      : null}
  `;
});

export const SelectWrap = styleWrap<{ disabled?: boolean }>({})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
      disabled,
    } = props;

    return css`
      box-sizing: border-box;
      position: relative;
      max-width: 100%;

      ${inlineBlockWithVerticalMixin};
      font-size: ${DT.T_TYPO_FONT_SIZE_1};
      color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
      ${disabled &&
      css`
        color: ${DT.T_COLOR_TEXT_DISABLED};
        pointer-events: none;
      `};
    `;
  }),
);

export const EmptyContentWrapper = styleWrap({})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      text-align: center;
      color: ${DT.T_COLOR_TEXT_REMARK_DARK};
    `;
  }),
);
