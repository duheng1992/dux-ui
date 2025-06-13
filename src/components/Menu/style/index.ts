import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Icon from '../../Icon';
import config from '../../../config';
import isFirefox from '../../../utils/isFirefox';
import { styleWrap, Theme } from '../../../style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-menu';
export const blockCls = _prefixCls + '-block';
export const singleCls = prefixCls + '-single';
export const multipleCls = prefixCls + '-multiple';
export const itemCls = prefixCls + '-item';
export const disabledCls = itemCls + '-disabled';
export const firstCls = prefixCls + '-first';
export const lastCls = prefixCls + '-last';
export const selectedCls = prefixCls + '-selected';
export const selectallWrapCls = prefixCls + '-selectall-wrap';
export const collapseTitleCls = prefixCls + '-collapse-title';
export const collapseWrapCls = prefixCls + '-collapse-wrap';
export const popupTitleCls = prefixCls + '-popup-title';
export const popupWrapCls = prefixCls + '-popup-wrap';
export const popupContentCls = prefixCls + '-popup-content';
export const checkboxCls = prefixCls + '-checkbox';

export const SubMenuIcon = styled(Icon)`
  position: absolute;
  right: 8px;
  top: 50%;
  margin-top: -0.5em;
`;

interface MenuProps {
  customStyle?: {
    maxHeight?: string;
    maxWidth?: string;
  };
}

const menuStyle = ({
  customStyle = {},
  theme: { designTokens: DT },
}: MenuProps & {
  theme: Theme;
}) => {
  const { maxWidth } = customStyle;
  return css`
    display: inline-block;
    box-sizing: border-box;
    overflow: auto;
    line-height: 32px;
    font-size: 12px;
    max-width: ${maxWidth || '360px'};
    min-width: 64px;
    padding: 4px 0px;
    border-radius: 2px;
    text-align: left;
    border-style: none !important;
    border: none;
    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
    box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
    background: ${DT.T_COLOR_BG_MENU};

    ${isFirefox &&
    css`
      & {
        overflow-y: scroll;
      }
    `}

    .${itemCls}, .${selectallWrapCls}, .${popupTitleCls},.${collapseTitleCls} {
      overflow: hidden;
      white-space: nowrap;
      text-decoration: none;
      text-overflow: ellipsis;
      cursor: pointer;
      :hover {
        background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
      }
    }
    .${itemCls}, .${selectallWrapCls}, .${popupTitleCls}, .${collapseTitleCls} {
      margin: 0 8px;
      padding: 0 8px;
    }
    .${itemCls}.${disabledCls}, .${selectallWrapCls}.${disabledCls} {
      color: ${DT.T_COLOR_TEXT_DISABLED};
      cursor: default;
      :hover {
        background: none;
      }
    }
    .${popupTitleCls}, .${collapseTitleCls} {
      position: relative;
      padding: 0px 40px 0px 8px;
      &.${selectedCls} {
        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
      }
    }
    &.${singleCls} .${itemCls}.${selectedCls} {
      color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
    }
    .${collapseWrapCls} {
      ::after,
      ::before {
        display: block;
        height: 1px;
        margin: 4px 8px;
        background: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        content: '';
      }
    }
    .${firstCls}.${collapseWrapCls} {
      ::before {
        display: none;
      }
    }
    .${collapseWrapCls}+.${collapseWrapCls} {
      ::before {
        display: none;
      }
    }
    .${lastCls}.${collapseWrapCls} {
      ::after {
        display: none;
      }
    }
    .${checkboxCls} {
      width: 100%;
    }
  `;
};

export const MenuWrap = styleWrap<MenuProps>({})(
  styled.div((props) => {
    const { customStyle = {} } = props;
    return css`
      ${menuStyle(props)};
      max-height: ${customStyle.maxHeight};
      &.${blockCls} {
        width: 100%;
        min-width: 0;
        max-width: none;
        height: 100%;
        box-shadow: none;
      }
    `;
  }),
);

export const PopupMenuWrap = styleWrap<MenuProps>({})(
  styled('div')((props) => {
    return css`
      display: inline-block;
      padding: 0px 8px;
      .${popupContentCls} {
        ${menuStyle(props)};
        max-height: 380px;
      }
    `;
  }),
);
