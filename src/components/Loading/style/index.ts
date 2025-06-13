import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Icon from '../../Icon';
import { fadeIn, fadeOut } from '../../../style/animation';
import styleWrap from '../../../style/styleWrap';

export const animationDuration = 200;
export const animationName = 'uc-fe-animation-fade';

export const LoadingWrap = styled('div')`
  position: relative;

  .${animationName}-enter,
    .${animationName}-appear,
    .${animationName}-leave,
    .${animationName}-exit {
    animation-duration: ${animationDuration}ms;
    animation-fill-mode: both;
  }
  .${animationName}-enter, .${animationName}-appear {
    animation-name: ${fadeIn};
  }
  .${animationName}-leave, .${animationName}-exit {
    animation-name: ${fadeOut};
  }
`;

export const Mask = styleWrap()(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background: ${DT.T_LOADING_COLOR_LAYER_DEFAULT};
    `;
  }),
);

export const IndicatorWrap = styled('div')`
  display: table;
  width: 100%;
  height: 100%;

  & > div {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
`;

export const LoadingIcon = styleWrap()(
  styled(Icon)((props) => {
    const {
      theme: { designTokens: DT },
    } = props as any;

    return css`
      font-size: 20px;
      color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
    `;
  }),
);

export const ContentWrap = styled('div')`
  position: relative;
`;

export const TipWrap = styleWrap()(
  styled('p')((props) => {
    const {
      theme: { fontSize, designTokens: DT },
    } = props as any;

    return css`
      text-align: center;
      font-size: ${fontSize};
      color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
      margin-top: 5px;
    `;
  }),
);
