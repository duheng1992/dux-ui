import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { spinMixin, spinPulseMixin, styleWrap } from '../../../style';
import config from '../../../config';

// import './icon.css';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-icon';

const iconSpinMixin = css`
  ${spinMixin};
  line-height: normal;
`;

const iconSpinPulseMixin = css`
  ${spinPulseMixin};
  line-height: normal;
`;

type SpinProps = {
  pulse: boolean;
};

export const IconWrap = styleWrap<{ spin?: SpinProps | boolean }>({})(
  styled('i')((props) => {
    const { spin } = props;

    return css`
      vertical-align: baseline;
      &&& {
        ${spin
          ? (typeof spin === 'object' ? spin.pulse : spin)
            ? iconSpinPulseMixin
            : iconSpinMixin
          : null};
      }
    `;
  }),
);
