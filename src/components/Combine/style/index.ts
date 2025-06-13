import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from '../../../config';
import styledWrap from '../../../style/styleWrap';
import { inlineBlockWithVerticalMixin } from '../../../style';

const { prefixCls: _prefixCls } = config;
const prefixCls = _prefixCls + '-combine';

export const itemCls = prefixCls + '-item';
export const separatorCls = prefixCls + '-separator';

const spacingMap: { [key: string]: string } = {
  sm: 'T_SPACING_COMMON_XS',
  md: 'T_SPACING_COMMON_SM',
  lg: 'T_SPACING_COMMON_MD',
};

const isBuildInSpacing = (spacing: string): boolean => {
  return Object.prototype.hasOwnProperty.call(spacingMap, spacing);
};

export const CombineWrap = styledWrap<{ spacing: string }>({
  className: prefixCls,
})(
  styled('div')((props) => {
    const {
      spacing,
      theme: { designTokens: DT },
    } = props;
    let space: string;
    if (spacing === 'compact') {
      space = '-1px';
    } else if (isBuildInSpacing(spacing)) {
      space = (DT as any)[spacingMap[spacing]];
    } else {
      space = spacing;
    }

    return css`
      > .${itemCls}, > .${separatorCls} {
        ${inlineBlockWithVerticalMixin}
      }
      > .${itemCls} {
        &:focus {
          z-index: 2;
        }
        &:hover {
          z-index: 3;
        }
      }
      > .${itemCls}+.${itemCls}, > .${separatorCls}+.${itemCls}, > .${itemCls}+.${separatorCls} {
        margin-left: ${space};
      }
    `;
  }),
);
