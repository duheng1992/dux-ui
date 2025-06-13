import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { styleWrap } from '../../../style';

export const PanelWrap = styleWrap<{ open?: boolean }>({})(
  styled('div')((props) => {
    return css`
      ${!props.open &&
      css`
        display: none;
      `};
    `;
  }),
);
