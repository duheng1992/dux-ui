import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { clearFixMixin } from '../../../style';
import config from '../../../config';

import styleWrap from '../../../style/styleWrap';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-card';
export const headerCls = prefixCls + '-header';
export const titleCls = prefixCls + '-title';
export const commentCls = prefixCls + '-comment';
export const actionCls = prefixCls + '-action';
export const contentCls = prefixCls + '-content';
export const footerCls = prefixCls + '-footer';
export const subAreaCls = prefixCls + '-sub-area';
export const subAreaContentCls = prefixCls + '-sub-area-content';

const sharedGutter = css`
  padding: 0 24px;
  margin-top: 16px;
`;

export const HeaderWrap = styleWrap({
  className: headerCls,
})(styled('div')`
  ${sharedGutter};
  ${clearFixMixin};
`);

export const TitleWrap = styleWrap({
  className: titleCls,
})(styled('div')`
  line-height: 28px;
  font-weight: bold;
`);

export const CommentWrap = styleWrap({
  className: commentCls,
})(styled('div')`
  line-height: 20px;
  font-weight: normal;
`);

export const ActionWrap = styleWrap({
  className: actionCls,
})(styled('div')`
  line-height: 28px;
  ${sharedGutter};
  ${clearFixMixin};
`);

export const ContentWrap = styleWrap({
  className: contentCls,
})(styled('div')`
  ${sharedGutter};
`);

export const FooterWrap = styleWrap({
  className: footerCls,
})(styled('div')`
  line-height: 1;
  ${sharedGutter};
  padding-top: 12px;
  ${clearFixMixin};
`);

export const SubAreaWrap = styleWrap({
  className: subAreaCls,
})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
    } = props;
    return css`
      .${titleCls} {
        margin-bottom: 16px;
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        font-weight: bold;
        font-size: 14px;
        line-height: 22px;
      }
      .${subAreaContentCls} {
        /* empty */
      }
      & + & {
        &::before {
          display: block;
          height: 1px;
          margin: 16px 0;
          background: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
          content: ' ';
        }
      }
    `;
  }),
);

export const CardWrap = styleWrap()(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      box-sizing: border-box;
      text-align: left;
      overflow: auto;

      .${headerCls}:last-of-type, .${actionCls}:last-of-type, .${contentCls}:last-of-type {
        margin-bottom: 24px;
      }
      .${headerCls}:nth-of-type(2),
      .${actionCls}:nth-of-type(2),
      .${contentCls}:nth-of-type(2) {
        margin-top: 24px;
      }

      background: ${DT.T_CARD_COLOR_BG_DEFAULT};
      font-size: ${DT.T_TYPO_FONT_SIZE_1};
      box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_MD};
      border-radius: ${DT.T_CORNER_LG};
      .${titleCls} {
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        font-size: ${DT.T_TYPO_FONT_SIZE_3};
      }
      .${commentCls} {
        color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        font-size: ${DT.T_TYPO_FONT_SIZE_1};
      }
      .${footerCls} {
        margin-top: 24px;
        padding: 16px 24px;
        border-top: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
      }
    `;
  }),
);
