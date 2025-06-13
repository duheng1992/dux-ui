import styled from '@emotion/styled';
import { css } from '@emotion/core';

import styleWrap from '../../../style/styleWrap';

const themeMixin = (props: any) => {
  const {
    theme: { designTokens: DT, fontSize },
  } = props;

  return css`
    font-size: ${fontSize};
    color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
    border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
    background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
    box-shadow: ${DT.T_SHADOW_INSET_DEFAULT};
    &:hover,
    &:focus {
      background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
      border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
    }
    &:focus {
      border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
    }
    &::placeholder {
      color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
      opacity: 1;
    }
    &[disabled] {
      color: ${DT.T_COLOR_TEXT_DISABLED};
      background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
      border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
      box-shadow: 0 0 0 0 ${DT.T_COLOR_BG_TRANSPARENT};
    }
  `;
};

export const TextareaWrap = styleWrap()(styled('textarea')`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 4px 8px;
  border-radius: 2px;
  line-height: 1.5;
  min-height: ${12 * 1.5 + (4 + 1) * 2}px;
  resize: vertical;
  outline: none;
  ${themeMixin};
`);
