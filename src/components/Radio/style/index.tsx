import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import config from '../../../config';

import Button from '../../Button';
import { inlineBlockWithVerticalMixin, styleWrap } from '../../../style';
import { iconMixin as checkboxIconMixin } from '../../Checkbox/style';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-radio';

export const iconWrapCls = prefixCls + '-icon-wrap';
export const iconCls = prefixCls + '-icon';
export const contentCls = prefixCls + '-content';
export const disabledCls = prefixCls + '-disabled';
export const checkedCls = prefixCls + '-checked';
export const extraCls = prefixCls + '-extra';

export const genStyleTypeCls = (styleType: string) => prefixCls + '-styletype-' + styleType;
export const cardHeaderCls = prefixCls + '-card-header';
export const cardContentCls = prefixCls + '-card-content';
export const cardTitleCls = prefixCls + '-card-title';

type StyleTypes = 'primary' | 'warning' | 'success' | 'error' | 'border' | 'border-gray';

const radioCommonStyleMixin = (props: any) => {
  const {
    theme: { designTokens: DT, fontSize },
  } = props;

  return css`
    color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
    font-size: ${fontSize};
    position: relative;
    cursor: pointer;
  `;
};

const sizeMixin = (props: any) => {
  const {
    theme: { Height },
    size,
  } = props;

  return css`
    min-height: ${Height[size]};
    line-height: ${Height[size]};
  `;
};

export const sharedClassName = ({ disabled, checked, size, styleType }: any): string =>
  classnames({
    [prefixCls]: true,
    [disabledCls]: disabled,
    [checkedCls]: checked,
    [`${prefixCls}-size-${size}`]: true,
    [genStyleTypeCls(styleType)]: true,
  });

/* stylelint-disable no-duplicate-selectors */
export const RadioWrap = styleWrap({
  className: sharedClassName,
})(
  styled('span')((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      ${radioCommonStyleMixin(props)};
      ${inlineBlockWithVerticalMixin};
      ${sizeMixin(props)};
      font-size: 0;
      color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
      > * {
        font-size: 12px;
      }

      .${contentCls} {
        display: inline-block;
        max-height: 100%;
        margin-left: 8px;
        vertical-align: middle;
      }

      &.${disabledCls} {
        color: ${DT.T_COLOR_TEXT_DISABLED};
        cursor: default;
      }
      ${iconMixin(props)};
    `;
  }),
);

export const RadioListWrap = styleWrap({
  className: sharedClassName,
})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      ${radioCommonStyleMixin(props)};
      display: flex;
      align-items: center;
      padding: 8px 8px 8px 0;
      border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
      color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

      .${iconWrapCls} {
        flex-shrink: 0;
        margin: 0 12px 0 8px;
      }
      .${contentCls} {
        flex: 1 1 auto;
        overflow-x: hidden;
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .${extraCls} {
        flex-shrink: 0;
        margin-left: 8px;
        color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
      }
      &.${checkedCls} {
        background: ${DT.T_COLOR_BG_PRIMARY_5};
        .${contentCls} {
          font-weight: bold;
        }
      }
      &.${disabledCls} {
        color: ${DT.T_COLOR_TEXT_DISABLED};
        cursor: default;
        .${extraCls} {
          color: ${DT.T_COLOR_TEXT_DISABLED};
        }
      }
      &.${checkedCls}.${disabledCls} {
        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
      }
      ${iconMixin(props)};
    `;
  }),
);

// eslint-disable-next-line no-unused-vars
const FilterStyleTypeButton = ({
  styleType,
  ...rest
}: {
  styleType: StyleTypes;
  rest: any;
}): any => {
  return <Button styleType={'border-gray'} {...rest} />;
};

FilterStyleTypeButton.propTypes = {
  styleType: PropTypes.string,
};

export const RadioButtonWrap = styleWrap({
  className: sharedClassName,
})(
  styled(FilterStyleTypeButton)((props) => {
    const {
      size,
      theme: { fontSize },
      disabled,
      checked,
    } = props;

    return css`
      && {
        position: relative;
        min-width: ${({ lg: 80, md: 68, sm: 56 } as any)[size]}px;
        text-align: center;
        border-radius: 0;
        ${css`
          font-size: ${fontSize};
        `};

        ${disabled &&
        css`
          z-index: 1;
        `};

        ${checked &&
        css`
          z-index: 2;
          margin: 0px;
          color: rgb(56, 96, 244);
          fill: rgb(56, 96, 244);
          background: rgb(244, 246, 255);
          border-color: rgb(56, 96, 244);
          box-shadow: rgb(0 0 0 / 12%) 0px 0px 1px 0px, rgb(0 0 0 / 12%) 0px 8px 12px -4px, rgb(0 0 0 / 5%) 0px 2px 1px -1px, rgb(227 233 255) 0px -2px 0px 0px inset; */
          `};

        ${checked &&
        disabled &&
        css`
          box-shadow: none;
        `}

        &:hover {
          z-index: 3;
        }
      }
    `;
  }),
);

export const RadioTagWrap = styleWrap({
  className: sharedClassName,
})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
      checked,
      disabled,
    } = props;

    return css`
      padding: 0 8px;
      cursor: pointer;
      border-radius: 2px;

      ${radioCommonStyleMixin(props)};

      ${inlineBlockWithVerticalMixin};

      ${sizeMixin(props)};

      ${checked &&
      css`
        background: ${DT.T_COLOR_BG_PRIMARY_5};
        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
      `};

      ${disabled &&
      css`
        color: ${DT.T_COLOR_TEXT_DISABLED};
        cursor: default;
      `};

      ${disabled &&
      checked &&
      css`
        background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
      `};

      ${!checked &&
      !disabled &&
      css`
        :hover {
          color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
        }
      `};
    `;
  }),
);

export const RadioCardWrap = styleWrap({})(
  styled.div((props) => {
    const {
      theme: { designTokens: DT, titleFontSize },
      disabled,
      checked,
    } = props as any;

    return css`
      border-radius: 4px;
      overflow: hidden;
      display: inline-block;
      cursor: pointer;
      border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
      background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
      box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};

      .${cardHeaderCls} {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 22px;
        padding: 8px 16px;
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        font-weight: bold;
        font-size: ${titleFontSize};
        line-height: 22px;
        background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
        border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};

        .${cardTitleCls} {
          padding-right: 8px;
        }
        .${iconWrapCls} {
          margin-left: auto;
        }
      }
      .${cardContentCls} {
        padding: 16px;
      }
      ${checked &&
      css`
        border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
        background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
        box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
        .${cardHeaderCls} {
          background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
          border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
        }
      `};
      ${disabled &&
      css`
        cursor: default;
        box-shadow: none;
      `};
      ${disabled &&
      !checked &&
      css`
        border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
        .${cardHeaderCls} {
          color: ${DT.T_COLOR_TEXT_DISABLED};
          background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
          border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
        }
        .${cardContentCls} {
          color: ${DT.T_COLOR_TEXT_DISABLED};
          background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
        }
      `};

      ${!checked &&
      !disabled &&
      css`
        :hover {
          border: 1px solid ${DT.T_COLOR_LINE_PRIMARY_HOVER};
          box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};

          .${cardHeaderCls} {
            border-color: ${DT.T_COLOR_LINE_PRIMARY_HOVER};
          }
        }
      `};
      ${iconMixin(props)};
      ${checkboxIconMixin(props)}
    `;
  }),
);

export const RadioTextWrap = styleWrap({
  className: sharedClassName,
})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT, Height },
      checked,
      disabled,
      size,
    } = props;

    return css`
      padding: 2px 0;
      box-sizing: border-box;
      cursor: pointer;
      height: ${Height[size]};

      > span {
        display: table;
        height: 100%;
        > span {
          display: table-cell;
          height: 100%;
          padding: 0 12px;
          vertical-align: middle;
          border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
          border-style: solid;
          border-width: 0 1px;
        }
      }

      ${radioCommonStyleMixin(props)};

      ${inlineBlockWithVerticalMixin};

      ${sizeMixin(props)};
      line-height: normal;
      color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};

      ${!checked &&
      !disabled &&
      css`
        :hover {
          color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
        }
      `};

      ${checked &&
      css`
        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
      `};

      ${disabled &&
      css`
        && {
          color: ${DT.T_COLOR_TEXT_DISABLED};
          cursor: default;
        }
      `};
    `;
  }),
);

export const RadioGroupWrap = styled('div')`
  position: relative;
  margin-bottom: -8px;
  .${genStyleTypeCls('default')}, .${genStyleTypeCls('tag')} {
    margin-right: 8px;
    margin-bottom: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
  .${genStyleTypeCls('card')} {
    margin-right: 12px;
    margin-bottom: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
  .${genStyleTypeCls('text')}+.${genStyleTypeCls('text')} {
    margin-left: -1px;
  }

  .${genStyleTypeCls('button')} {
    margin-right: -1px;
    margin-bottom: 8px;
    &:first-of-type {
      border-radius: 2px 0 0 2px;
    }
    &:last-of-type {
      margin-right: 0;
      border-radius: 0 2px 2px 0;
    }
  }
  .${genStyleTypeCls('list')} {
    &:last-of-type {
      margin-bottom: 8px;
    }
  }
`;

export const SIconWrap = styleWrap({
  className: iconWrapCls,
})(
  styled.span((props) => {
    const {
      theme: { designTokens: DT },
      checked,
      disabled,
    } = props as any;
    return css`
      &.${iconWrapCls} {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 14px;
        height: 14px;
        overflow: hidden;
        vertical-align: middle;
        border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
        border-radius: 8px;
      }

      .${iconCls} {
        font-size: 14px;
        transform: scale(0.6, 0.6);
        visibility: hidden;
        opacity: 0;
      }

      ${checked &&
      css`
        &.${iconWrapCls} {
          color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
          border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
        }
        .${iconCls} {
          visibility: visible;
          opacity: 1;
          fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
        }
      `}

      ${disabled &&
      css`
        &.${iconWrapCls} {
          color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
          background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
          border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
        }
      `}

            ${disabled &&
      checked &&
      css`
        &.${iconWrapCls} {
          background: none;
        }
        .${iconCls} {
          fill: ${DT.T_COLOR_TEXT_DISABLED};
        }
      `}
    `;
  }),
);

export const iconMixin = (props: any) => {
  const {
    theme: { designTokens: DT },
    disabled,
    checked,
  } = props;
  return (
    !disabled &&
    !checked &&
    css`
      :hover {
        .${iconWrapCls} {
          border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
        }
      }
    `
  );
};
