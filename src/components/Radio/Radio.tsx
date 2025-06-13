import React, { PureComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';
// import createReactContext from 'create-react-context';
import classnames from 'classnames';

// import itemDecorator from 'src/decorators/selectableWithStore/item';
// import uncontrolledDecorator from 'src/decorators/uncontrolled';

import {
  RadioWrap,
  RadioListWrap,
  RadioButtonWrap,
  RadioTagWrap,
  RadioTextWrap,
  contentCls,
  extraCls,
  sharedClassName,
} from './style';
import Card from './Card';
import RadioIcon from './RadioIcon';

// export const StoreContext = createReactContext();
// export const RadioContext = createReactContext();

const Size = ['sm', 'md', 'lg'];
const StyleType = ['default', 'button', 'tag', 'card', 'text', 'list'];

export interface RadioProps {
  /** 是否选中 */
  checked?: boolean;
  /** 默认是否选中 */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 点选时的回调 */
  onChange?: Function;
  /** radio的值 */
  value?: any;
  /** 样式风格, 可选 'default', 'button', 'tag', 'card', 'text', 'list' */
  styleType?: string;
  /** 尺寸，可选'sm', 'md', 'lg'，styleType 为 card、list 时无效 */
  size?: string;
  /** 标题，styleType 为 card 时使用 */
  title?: ReactNode;
  /** 附加内容，styleType 为 list 时使用 */
  extra?: ReactNode;
}

// @uncontrolledDecorator({ valueName: 'checked' })
// @itemDecorator({ StoreContext })
class Radio extends PureComponent<RadioProps> {
  static Size: string[];
  static StyleType: string[];
  static propTypes = {
    /** @ignore */
    children: PropTypes.node,
    /** 是否选中 */
    checked: PropTypes.bool,
    /** 默认是否选中 */
    defaultChecked: PropTypes.bool,
    /** 是否禁用 */
    disabled: PropTypes.bool,
    /** 点选时的回调 */
    onChange: PropTypes.func,
    /** @ignore */
    onClick: PropTypes.func,
    /** radio的值 */
    value: PropTypes.any,
    /** 样式风格 */
    styleType: PropTypes.oneOf(StyleType),
    /** 尺寸，styleType 为 card、list 时无效 */
    size: PropTypes.oneOf(Size),
    /** 标题，styleType 为 card 时使用 */
    title: PropTypes.node,
    /** 附加内容，styleType 为 list 时使用 */
    extra: PropTypes.node,
    /**
     * @ignore
     * @deprecated 弃用
     */
    disabledLabel: PropTypes.node,
    /** @ignore */
    multiple: PropTypes.bool,
  };
  static defaultProps = {
    onChange: () => {},
    onClick: () => {},
  };
  onClick = (props: any, e: any) => {
    const { onChange, onClick, disabled, checked } = props;
    if (disabled) return;

    onClick(e);
    if (!checked) onChange(true);
  };
  renderRadio(props: any) {
    /* eslint-disable no-unused-vars */
    const {
      children,
      checked,
      defaultChecked,
      value,
      onChange,
      onClick,
      multiple,
      disabled,
      title,
      ...rest
    } = props;
    /* eslint-enable no-unused-vars */

    return (
      <RadioWrap
        checked={checked}
        disabled={disabled}
        {...rest}
        onClick={(...args: any) => this.onClick(props, { ...args })}
      >
        <RadioIcon checked={checked} disabled={disabled} />
        {children != null && <span className={contentCls}>{children}</span>}
      </RadioWrap>
    );
  }
  renderRadioList(props: any) {
    /* eslint-disable no-unused-vars */
    const {
      children,
      checked,
      defaultChecked,
      value,
      onChange,
      onClick,
      multiple,
      disabled,
      title,
      extra,
      ...rest
    } = props;
    /* eslint-enable no-unused-vars */

    return (
      <RadioListWrap
        checked={checked}
        disabled={disabled}
        {...rest}
        onClick={(...args: any) => this.onClick(props, { ...args })}
      >
        <RadioIcon checked={checked} disabled={disabled} />
        {children != null && <span className={contentCls}>{children}</span>}
        {extra && <span className={extraCls}>{extra}</span>}
      </RadioListWrap>
    );
  }
  renderRadioButton(props: any) {
    /* eslint-disable no-unused-vars */
    const { title, disabledLabel, onChange, ...rest } = props;
    /* eslint-enable no-unused-vars */

    return (
      <RadioButtonWrap {...rest} onClick={(...args: any) => this.onClick(props, { ...args })} />
    );
  }
  renderRadioTag(props: any) {
    /* eslint-disable no-unused-vars */
    const { title, disabledLabel, onChange, ...rest } = props;
    /* eslint-enable no-unused-vars */

    return <RadioTagWrap {...rest} onClick={(...args: any) => this.onClick(props, { ...args })} />;
  }
  renderRadioCard(props: any) {
    /* eslint-disable no-unused-vars */
    const { onChange, className, ...rest } = props;
    /* eslint-enable no-unused-vars */
    return (
      <Card
        {...rest}
        className={classnames(sharedClassName(rest), className)}
        onClick={(...args: any) => this.onClick(props, { ...args })}
      />
    );
  }
  renderRadioText(props: any) {
    /* eslint-disable no-unused-vars */
    const { title, disabledLabel, children, onChange, ...rest } = props;
    /* eslint-enable no-unused-vars */
    return (
      <RadioTextWrap {...rest} onClick={(...args: any) => this.onClick(props, { ...args })}>
        <span>
          <span>{children}</span>
        </span>
      </RadioTextWrap>
    );
  }
  render() {
    /* eslint-disable no-unused-vars */
    const { defaultChecked, value, multiple, ...restProps } = this.props as any;
    /* eslint-enable no-unused-vars */
    const props = {
      size: 'md',
      styleType: 'default',
      ...restProps,
    };

    const { styleType } = props;
    return (
      <>
        {(() => {
          switch (styleType) {
            case 'button':
              return this.renderRadioButton(props);
            case 'tag':
              return this.renderRadioTag(props);
            case 'card':
              return this.renderRadioCard(props);
            case 'text':
              return this.renderRadioText(props);
            case 'list':
              return this.renderRadioList(props);
            default:
              return this.renderRadio(props);
          }
        })()}
      </>
    );
  }
}

Radio.Size = Size;
Radio.StyleType = StyleType;

export default Radio;
