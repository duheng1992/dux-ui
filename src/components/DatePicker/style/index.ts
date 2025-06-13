import classnames from 'classnames';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Select from '../../Select';
import { tableCls } from '../../Calendar/style';
import { timePrefixCls } from '../../TimePicker/style';
import { prefixCls as inputPrefixCls } from '../../Input/style';
import {
  inlineBlockWithVerticalMixin,
  Theme,
  styleWrap,
  getHeightBySize,
  Size,
} from '../../../style';
import config from '../../../config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-datepicker';
export const pickerPrefixCls = prefixCls + '–picker';
export const monthPickerPrefixCls = prefixCls + '-month-picker';
export const dataWrapCls = prefixCls + '-data-wrap';
export const dateSeparatorCls = prefixCls + '-data-separator';
export const shortcutCls = prefixCls + '-shortcut';
export const footerCls = prefixCls + '-footer';
export const tipCls = prefixCls + '-tip';
export const readonlyInputCls = prefixCls + '-input-readonly';

export const PickerContainer = styleWrap<{ disabled: boolean; isMonth: boolean }, HTMLDivElement>({
  className: ({ disabled, isMonth }) =>
    classnames(prefixCls, isMonth && `${prefixCls}-month`, disabled && `${prefixCls}-disabled`),
})(styled('div')(inlineBlockWithVerticalMixin));

export const SPopup = styleWrap({})(
  styled('div')((props: { theme: Theme }) => {
    const {
      theme: { designTokens: DT },
    } = props;
    return css`
      box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
      background: ${DT.T_COLOR_BG_DEFAULT_DARK};
      border-radius: 2px;
      .${footerCls} {
        padding: 12px;
        .${shortcutCls} {
          color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
          cursor: pointer;
        }
        .${tipCls} {
          color: ${DT.T_COLOR_TEXT_REMARK_DARK};
        }
      }
      .${tableCls} {
        width: 296px;
        min-height: 236px;
      }
      .${timePrefixCls} {
        padding: 0 0 0 16px;
        background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
        border-left: 1px solid ${DT.T_COLOR_BG_DEFAULT_DARK};
      }
    `;
  }),
);

export const SRangeInputWrap = styleWrap<{
  size: Size;
  focused: boolean;
  disabled?: boolean;
  readonly?: boolean;
  status?: string;
}>({})(
  styled.span((props) => {
    const {
      theme: { designTokens: DT },
      focused,
      disabled,
      size,
      readonly,
      status,
    } = props;
    const height = getHeightBySize(DT, size);
    return css`
      display: inline-flex;
      height: ${height};
      align-items: center;
      box-sizing: border-box;
      ${!readonly &&
      css`
        border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
        border-radius: ${DT.T_CORNER_SM};
        box-shadow: ${DT.T_SHADOW_INSET_DEFAULT};
        background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
        :hover {
          background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
          border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
        }
        ${focused &&
        !disabled &&
        css`
          && {
            background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
            border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
          }
        `};
        ${disabled &&
        css`
          box-shadow: none;
          &,
          &:hover {
            background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
            border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
          }
        `};
        ${status === 'error' &&
        css`
          &&& {
            background: ${DT.T_COLOR_BG_ERROR_LIGHT};
            border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
            box-shadow: ${DT.T_SHADOW_INSET_ERROR};
          }
        `};
      `}
      .${inputPrefixCls} {
        flex-grow: 1;
        height: 100%;
      }
      .${readonlyInputCls} {
        min-width: 100px;
        padding: 0 8px;
      }
    `;
  }),
);

export const RangeContainer = styleWrap<{ disabled?: boolean }>({
  className: ({ disabled }) =>
    classnames(`${prefixCls}-range`, disabled && `${prefixCls}-range-disabled`),
})(
  styled('div')`
    display: inline-flex;
    align-items: center;
  `,
);

export const RangeSelect = styled(Select)`
  margin-right: 8px;
`;

export const RangeDateSeparator = styleWrap({
  className: dateSeparatorCls,
})(
  styled('span')((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      margin: 0 4px;
      width: 12px;
      height: 1px;
      background: ${DT.T_COLOR_LINE_DEFAULT_DARK};
      pointer-events: none;

      ${inlineBlockWithVerticalMixin};
    `;
  }),
);
