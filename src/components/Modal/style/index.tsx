import React, { Component } from 'react';
import PropTypes, { any } from 'prop-types';
import classnames from 'classnames';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { injectGlobal } from 'emotion';
import RcDialog from 'rc-dialog';

import config from '../../../config';
import '../../../style/globalAnimation';
import styleWrap from '../../../style/styleWrap';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-modal';
export const contentCls = prefixCls + '-body-content';
export const noticeCls = prefixCls + '-notice';

injectGlobal`
    .${prefixCls} {
        &-mask {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            height: 100%;
            z-index: 1010;
            &-hidden {
                display: none;
            }
        }
    }
`;

class RcDialogWrap extends Component {
  static propTypes = {
    className: PropTypes.string,
    wrapClassName: PropTypes.string,
    trueClassName: PropTypes.string,
  };
  render() {
    const { className, wrapClassName, trueClassName, ...rest } = this.props as any;
    return (
      <RcDialog
        className={trueClassName}
        wrapClassName={classnames(className, wrapClassName)}
        {...rest}
      />
    );
  }
}

export const SContent = styleWrap({ className: contentCls })(
  styled.div((props) => {
    const { maxHeight } = props as any;
    return css`
      padding: 16px 20px;
      overflow: auto;
      max-height: ${maxHeight};
    `;
  }),
);

export const ModalWrap = styleWrap()(
  styled(RcDialogWrap)((props) => {
    const {
      theme: { designTokens: DT, fontSize },
      mask,
      customStyle,
    } = props as any;

    return css`
      position: fixed;
      overflow: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1010;
      -webkit-overflow-scrolling: touch;
      outline: 0;
      background: ${mask && DT.T_MODAL_COLOR_LAYER_DEFAULT};

      .${prefixCls} {
        position: relative;
        top: 15%;
        width: 340px;
        margin: 0 auto 100px;
        padding: 0;
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        font-size: ${fontSize};
        line-height: 1;
        background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
        border-radius: 4px;
        box-shadow: ${DT.T_MODAL_SHADOW_DEFAULT};
        &-content {
          position: relative;
          background-clip: padding-box;
          border: none;
          border-radius: 6px 6px;
        }
        &-close {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
          width: 20px;
          height: 20px;
          margin: 0;
          padding: 16px;
          font-size: 20px;
          cursor: pointer;
          fill: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        }
        &-close-x {
          display: none;
        }

        &-title-content {
          position: relative;
          min-height: 20px;
          padding: 16px 52px 16px 16px;
          color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
          font-size: 16px;
          line-height: 20px;
          border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
          border-radius: 4px 4px 0 0;
        }
        &-footer {
          padding: 15px 16px;
          line-height: 1;
          text-align: right;
          border-top: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
          border-radius: 0 0 4px 4px;
        }
        &-body {
          ${customStyle?.contentPadding &&
          css`
            padding: 16px 20px;
          `}
        }
        .${noticeCls}.${noticeCls}.${noticeCls} {
          border-top: none;
          border-right: none;
          border-left: none;
          border-radius: 0;
        }
      }
    `;
  }),
);
