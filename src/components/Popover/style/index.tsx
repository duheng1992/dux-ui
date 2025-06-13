import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from '@emotion/styled';
import RcTrigger from 'rc-trigger';

import config from '../../../config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-popover';
export const animationPrefixCls = prefixCls + '-animation';

import {
  fadeIn,
  fadeOut,
  bounceIn,
  bounceOut,
  zoomIn,
  zoomOut,
  slideUpIn,
  slideDownIn,
  slideUpOut,
  slideDownOut,
} from '../../../style/animation';

const animationDuration = '0.1s';

class RcTriggerWrap extends Component {
  static propTypes = {
    className: PropTypes.string,
    popupClassName: PropTypes.string,
    trueClassName: PropTypes.string,
    triggerRef: PropTypes.func,
  };
  render() {
    const { className, popupClassName, trueClassName, triggerRef, ...rest } = this.props as any;
    return (
      <RcTrigger
        ref={triggerRef}
        className={trueClassName}
        popupClassName={classnames(className, popupClassName)}
        {...rest}
      />
    );
  }
}

export const PopoverWrap = styled(RcTriggerWrap)`
  &.${prefixCls} {
    position: absolute;
    top: -9999px;
    left: -9999px;
    z-index: 1030;
    display: block;

    &-hidden {
      display: none;
    }
  }

  &.${prefixCls}-animation {
    &-fade {
      &-enter,
      &-appear,
      &-leave {
        animation-duration: ${animationDuration};
        animation-fill-mode: both;
      }
      &-enter,
      &-appear {
        animation-name: ${fadeIn};
      }
      &-leave {
        animation-name: ${fadeOut};
      }
    }

    &-bounce {
      &-enter,
      &-appear,
      &-leave {
        animation-duration: ${animationDuration};
        animation-fill-mode: both;
      }
      &-enter,
      &-appear {
        animation-name: ${bounceIn};
      }
      &-leave {
        animation-name: ${bounceOut};
      }
    }

    &-zoom {
      &-enter,
      &-appear,
      &-leave {
        animation-duration: ${animationDuration};
        animation-fill-mode: both;
      }
      &-enter,
      &-appear {
        animation-name: ${zoomIn};
      }
      &-leave {
        animation-name: ${zoomOut};
      }
    }

    &-slide-up {
      &-enter,
      &-appear {
        display: block !important;
        transform-origin: 0 0;
        opacity: 0;
        animation-duration: ${animationDuration};
        animation-play-state: paused;
        animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
        animation-fill-mode: both;
      }
      &-leave {
        display: block !important;
        transform-origin: 0 0;
        opacity: 1;
        animation-duration: ${animationDuration};
        animation-play-state: paused;
        animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.34);
        animation-fill-mode: both;
      }

      &-enter-active.${prefixCls}-placement-bottomLeft,
        &-appear-active.${prefixCls}-placement-bottomLeft,
        &-enter-active.${prefixCls}-placement-bottomCenter,
        &-appear-active.${prefixCls}-placement-bottomCenter,
        &-enter-active.${prefixCls}-placement-bottomRight,
        &-appear-active.${prefixCls}-placement-bottomRight {
        animation-name: ${slideUpIn};
        animation-play-state: running;
      }
      &-enter-active.${prefixCls}-placement-topLeft,
        &-appear-active.${prefixCls}-placement-topLeft,
        &-enter-active.${prefixCls}-placement-topCenter,
        &-appear-active.${prefixCls}-placement-topCenter,
        &-enter-active.${prefixCls}-placement-topRight,
        &-appear-active.${prefixCls}-placement-topRight {
        animation-name: ${slideDownIn};
        animation-play-state: running;
      }
      &-leave-active.${prefixCls}-placement-bottomLeft,
        &-leave-active.${prefixCls}-placement-bottomCenter,
        &-leave-active.${prefixCls}-placement-bottomRight {
        animation-name: ${slideUpOut};
        animation-play-state: running;
      }
      &-leave-active.${prefixCls}-placement-topLeft,
        &-leave-active.${prefixCls}-placement-topCenter,
        &-leave-active.${prefixCls}-placement-topRight {
        animation-name: ${slideDownOut};
        animation-play-state: running;
      }
    }
  }
`;
