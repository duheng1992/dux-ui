import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from '../Icon';
import deprecatedLog from '../../utils/deprecatedLog';

import {
  NoticeWrap,
  NoticeIconWrap,
  ContentWrap,
  ActionWrap,
  CloseWrap,
  CloseIcon,
  iconCls,
  actionWrapCls,
} from './style';

const deprecatedLogForStyleTypeInfo = _.once(() =>
  deprecatedLog('Notice styleType "info"', '"success"'),
);

const StyleType = ['default', 'success', 'warning', 'error', 'disabled'];

export interface NoticeProps {
  /** @ignore */
  className?: string;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 自定义左侧前置icon，可传入Icon type或者自定义Icon，传入null、false隐藏，默认显示感叹号icon */
  icon?: any;
  /** @ignore */
  children?: ReactNode;
  /** 关闭的回调 */
  onClose?: Function;
  /** 样式类型 */
  styleType?: 'default' | 'success' | 'warning' | 'error' | 'disabled';
  /** 自定义右侧操作 */
  action?: ReactNode;
}

class Notice extends Component {
  state = {
    closed: false,
  };
  static propTypes = {
    /** @ignore */
    className: PropTypes.string,
    /** 是否显示关闭按钮 */
    closable: PropTypes.bool,
    /** 自定义前置icon，可传入Icon type或者自定义Icon，传入null、false隐藏，默认显示感叹号icon */
    icon: PropTypes.oneOfType([PropTypes.oneOf([null, false]), PropTypes.string, PropTypes.node]),
    /** @ignore */
    children: PropTypes.node,
    /** 关闭的回调 */
    onClose: PropTypes.func,
    /** 样式类型 */
    styleType: PropTypes.oneOf(StyleType),
    /** 自定义操作 */
    action: PropTypes.node,
  };
  static defaultProps = {
    closable: true,
    styleType: StyleType[0],
    onClose: () => {},
  };
  onClose = (e: any) => {
    const { onClose } = this.props as any;
    this.setState({
      closed: true,
    });
    onClose(e);
  };
  componentWillMount() {
    const { styleType } = this.props as any;
    if (styleType === 'info') {
      deprecatedLogForStyleTypeInfo();
    }
  }
  render() {
    // eslint-disable-next-line no-unused-vars
    const {
      closable,
      icon: _icon,
      children,
      onClose,
      styleType,
      action,
      ...rest
    } = this.props as any;
    const { closed } = this.state;
    let icon;
    if (_icon === null || _icon === false) {
      icon = null;
    } else if (_.isString(_icon)) {
      icon = <Icon className={iconCls} type={_icon} />;
    } else if (React.isValidElement(_icon)) {
      icon = _icon;
    } else {
      icon = <Icon className={iconCls} type="notice" />;
    }
    return closed ? null : (
      <NoticeWrap {...rest} styleType={styleType}>
        {icon && <NoticeIconWrap>{icon}</NoticeIconWrap>}
        <ContentWrap>{children}</ContentWrap>
        {action && <ActionWrap className={actionWrapCls}>{action}</ActionWrap>}
        {closable && (
          <CloseWrap>
            <CloseIcon type="cross" onClick={this.onClose} />
          </CloseWrap>
        )}
      </NoticeWrap>
    );
  }
}

(Notice as any).StyleType = StyleType;
export default Notice;
