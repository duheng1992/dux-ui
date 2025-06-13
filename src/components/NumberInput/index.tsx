import React, { Component, useDebugValue } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import Icon from '../Icon';
import Tooltip from '../Tooltip';
import KEYCODE from '../../interfaces/KeyCode';
import {
  NumberInputWrap,
  prefixCls,
  inputWrapCls,
  inputCls,
  suffixCls,
  handlerUpCls,
  handlerDownCls,
  handlerDisabledCls,
} from './style';

function noop() {}

function defaultParser(input: string) {
  return input.replace(/[^\w.-]+/g, '');
}

const SPEED = 200;
const DELAY = 600;

const StyleType = ['default', 'split', 'pagination'];
const Size = ['sm', 'md', 'lg'];
/**
 * Max Safe Integer -- on IE this is not available, so manually set the number in that case.
 * The reason this is used, instead of Infinity is because numbers above the MSI are unstable
 */
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

export interface NumberInputProps {
  /** 值，受控 */
  value?: number | string;
  /** 默认值，非受控 */
  defaultValue?: number | string;
  /** 修改回调 */
  onChange?: any;
  /**
   * 有效的修改回调，使用按钮改变值或者输入、回车后失焦时触发，可防止监听到无效的回调
   * @param value - 当前的值，必为有效数字
   */
  onNumberChange?: any;
  /** 禁用 */
  disabled?: boolean;
  /** 只读 */
  readOnly?: boolean;
  /** 最大值 */
  max?: number;
  /** 最小值 */
  min?: number;
  /** 按钮每次变动大小 */
  step?: number | string;
  /** 增加按钮点击增加的大小，会覆盖 step */
  upStep?: number | string;
  /** 减少按钮点击减少的大小，会覆盖 step */
  downStep?: number | string;
  /** 自定义'+'按钮 */
  upHandler?: any;
  /** 自定义'-'按钮 */
  downHandler?: any;
  /** 定义数值展示格式化 */
  formatter?: any;
  /** 定义输入内容过滤 */
  parser?: any;
  /** 精度，小数点位数 */
  precision?: number;
  /** 样式风格 */
  styleType: 'default' | 'split' | 'pagination';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 自定义后缀 */
  suffix?: any;
  /** input框自定义样式 */
  inputStyle?: object;
  /** 计算合法值 */
  computeValidNumber?: any;
  /** 是否隐藏操作按钮 */
  hideHandler?: boolean;
  /** 是否能按钮阴影 */
  shadowed?: boolean;
  /**
   * 输入提示，hover 和输入焦点时显示，可直接传入 tooltip 内容，或传入 tooltip 的 props，props 参考 tooltip 组件文档
   * 注意，如果使用自定义 props 中的 visible 和 onVisibleChange 则需要自己去控制 tooltip 的显示隐藏
   */
  tooltip?: any;
  focusOnUpDown?: boolean;
  autoFocus?: boolean;
  onKeyDown?: any;
  onKeyUp?: any;
  onEnter?: any;
  onFocus?: any;
  onBlur?: any;
  className?: any;
  style?: object;
}

class NumberInput extends Component<NumberInputProps> {
  static propTypes = {
    /** 值，受控 */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** 默认值，非受控 */
    defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** @ignore */
    focusOnUpDown: PropTypes.bool,
    /** @ignore */
    autoFocus: PropTypes.bool,
    /** 修改回调 */
    onChange: PropTypes.func,
    /**
     * 有效的修改回调，使用按钮改变值或者输入、回车后失焦时触发，可防止监听到无效的回调
     * @param value - 当前的值，必为有效数字
     */
    onNumberChange: PropTypes.func,
    /** @ignore */
    onKeyDown: PropTypes.func,
    /** @ignore */
    onKeyUp: PropTypes.func,
    /** @ignore */
    onEnter: PropTypes.func,
    /** 禁用 */
    disabled: PropTypes.bool,
    /** @ignore */
    onFocus: PropTypes.func,
    /** @ignore */
    onBlur: PropTypes.func,
    /** 只读 */
    readOnly: PropTypes.bool,
    /** 最大值 */
    max: PropTypes.number,
    /** 最小值 */
    min: PropTypes.number,
    /** 按钮每次变动大小 */
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** 增加按钮点击增加的大小，会覆盖 step */
    upStep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** 减少按钮点击减少的大小，会覆盖 step */
    downStep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** 自定义'+'按钮 */
    upHandler: PropTypes.node,
    /** 自定义'-'按钮 */
    downHandler: PropTypes.node,
    /** 定义数值展示格式化 */
    formatter: PropTypes.func,
    /** 定义输入内容过滤 */
    parser: PropTypes.func,
    /** 精度，小数点位数 */
    precision: PropTypes.number,
    /** @ignore */
    className: PropTypes.string,
    /** @ignore */
    style: PropTypes.object,
    /** 样式风格 */
    styleType: PropTypes.oneOf(StyleType),
    /** 尺寸 */
    size: PropTypes.oneOf(Size),
    /** 自定义后缀 */
    suffix: PropTypes.node,
    /** input框自定义样式 */
    inputStyle: PropTypes.object,
    /** 计算合法值 */
    computeValidNumber: PropTypes.func,
    /** 是否隐藏操作按钮 */
    hideHandler: PropTypes.bool,
    /** 是否能按钮阴影 */
    shadowed: PropTypes.bool,
    /**
     * 输入提示，hover 和输入焦点时显示，可直接传入 tooltip 内容，或传入 tooltip 的 props，props 参考 tooltip 组件文档
     * 注意，如果使用自定义 props 中的 visible 和 onVisibleChange 则需要自己去控制 tooltip 的显示隐藏
     */
    tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  };

  static defaultProps = {
    focusOnUpDown: true,
    min: -MAX_SAFE_INTEGER,
    step: 1,
    onChange: noop,
    onNumberChange: noop,
    onKeyDown: noop,
    onEnter: noop,
    onFocus: noop,
    onBlur: noop,
    parser: defaultParser,
    styleType: StyleType[0],
    size: 'md',
    computeValidNumber: (v: number) => v,
    shadowed: false,
  };

  constructor(props: any) {
    super(props);

    let value;
    if ('value' in props) {
      value = props.value;
    } else {
      value = props.defaultValue;
    }
    value = this.toNumber(value);

    this.state = {
      inputValue: this.toPrecisionAsStep(value),
      value,
      focused: props.autoFocus,
      tooltipVisible: false,
    };
    this.input = React.createRef();
  }

  input: React.RefObject<any>;
  inputting = false;
  start: any;
  end: any;
  pressingUpOrDown = false;
  autoStepTimer: any;

  state: {
    focused: boolean;
    inputValue: string | number | null | undefined;
    value: string | number | null;
    tooltipVisible: boolean;
  } = {
    focused: false,
    inputValue: 0,
    value: null,
    tooltipVisible: false,
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps: any) {
    if ('value' in nextProps) {
      const value = this.state.focused
        ? nextProps.value
        : this.getValidValue(nextProps.value, nextProps.min, nextProps.max);
      this.setState({
        value,
        inputValue: this.inputting ? value : this.toPrecisionAsStep(value),
      });
    }
  }

  componentWillUpdate() {
    try {
      this.start = this.input.current.selectionStart;
      this.end = this.input.current.selectionEnd;
    } catch (e) {
      // Fix error in Chrome:
      // Failed to read the 'selectionStart' property from 'HTMLInputElement'
      // http://stackoverflow.com/q/21177489/3040605
    }
  }

  componentDidUpdate() {
    // pressingUpOrDown is true means that someone just click up or down button
    // https://github.com/ant-design/ant-design/issues/9204
    if (!this.pressingUpOrDown) {
      return;
    }
    if (this.props.focusOnUpDown && this.state.focused) {
      const selectionRange = this.input.current.setSelectionRange;
      if (
        selectionRange &&
        typeof selectionRange === 'function' &&
        this.start !== undefined &&
        this.end !== undefined
      ) {
        this.input.current.setSelectionRange(this.start, this.end);
      } else {
        this.focus();
      }
      this.pressingUpOrDown = false;
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  onKeyDown = (e: { keyCode: number }, ...args: any[]) => {
    if (e.keyCode === KEYCODE['ARROW_UP']) {
      const ratio = this.getRatio(e);
      this.up(e, ratio);
      this.stop();
    } else if (e.keyCode === KEYCODE['ARROW_DOWN']) {
      const ratio = this.getRatio(e);
      this.down(e, ratio);
      this.stop();
    } else if (e.keyCode === KEYCODE['ENTER']) {
      this.onEnter(e, ...args);
    }
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(e, ...args);
    }
  };

  onKeyUp = (e: any, ...args: any[]) => {
    this.stop();
    const { onKeyUp } = this.props;
    if (onKeyUp) {
      onKeyUp(e, ...args);
    }
  };

  onChange = (e: any) => {
    if (this.state.focused) {
      this.inputting = true;
    }
    const input = this.props.parser(this.getValueFromEvent(e));
    this.setState({ inputValue: input });
    this.props.onChange(this.toNumberWhenUserInput(input)); // valid number or invalid string
  };

  onFocus = (...args: any[]) => {
    this.setState({
      focused: true,
    });
    this.props.onFocus(...args);
  };

  onBlur = (e: { persist: () => void }, ...args: any[]) => {
    this.inputting = false;
    this.setState({
      focused: false,
    });
    const value = this.getCurrentValidValue(this.state.inputValue);
    e.persist(); // fix https://github.com/react-component/input-number/issues/51
    this.setValue(value, () => {
      this.props.onBlur(e, ...args);
      this.props.onNumberChange(value);
    });
  };

  onEnter = (e: { keyCode?: number; persist?: any; preventDefault?: any }, ...args: any[]) => {
    const value = this.getCurrentValidValue(this.state.inputValue);
    if (e) {
      e.persist();
      e.preventDefault();
    }
    this.setValue(value, () => {
      this.props.onEnter(e, ...args);
      this.props.onNumberChange(value);
    });
  };

  getCurrentValidValue(value: number | string | null | undefined) {
    let val = value;
    if (val === '') {
      val = '';
    } else if (!this.isNotCompleteNumber(val)) {
      val = this.getValidValue(val);
    } else {
      val = this.state.value;
    }

    val = val + '';

    return this.props.computeValidNumber(val ? this.toNumber(val) : null);
  }

  getRatio(e: any) {
    let ratio = 1;
    if (e.metaKey || e.ctrlKey) {
      ratio = 0.1;
    } else if (e.shiftKey) {
      ratio = 10;
    }
    return ratio;
  }

  getValueFromEvent(e: { target: { value: string } }) {
    return e.target.value.trim().replace(/。/g, '.');
  }

  getValidValue(
    value: string | number | null | undefined,
    min = this.props.min || -MAX_SAFE_INTEGER,
    max = this.props.max || Infinity,
  ) {
    let val = parseFloat(value as any);
    if (isNaN(val)) {
      return value;
    }
    if (val < min) {
      val = min;
    }
    if (val > max) {
      val = max;
    }
    return val;
  }

  setValue(v: string, callback: (() => void) | undefined) {
    console.log(v);
    // trigger onChange
    const newValue = this.isNotCompleteNumber(parseFloat(v)) ? undefined : parseFloat(v);
    const changed = newValue !== this.state.value || `${newValue}` !== `${this.state.inputValue}`; // https://github.com/ant-design/ant-design/issues/7363
    if (!('value' in this.props)) {
      this.setState(
        {
          value: newValue,
          inputValue: this.toPrecisionAsStep(v),
        },
        callback,
      );
    } else {
      // always set input value same as value
      this.setState(
        {
          inputValue: this.toPrecisionAsStep(this.state.value),
        },
        callback,
      );
    }
    if (changed) {
      this.props.onChange(newValue);
    }
  }

  getPrecision(value: string | number | undefined): number {
    if ('precision' in this.props) {
      // precision传错，自动清0
      return this.props.precision || 0;
    }
    let precision = 0;
    if (value) {
      const valueString = value.toString();
      if (valueString.indexOf('e-') >= 0) {
        return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
      }
      if (valueString.indexOf('.') >= 0) {
        precision = valueString.length - valueString.indexOf('.') - 1;
      }
    }
    return precision;
  }

  // step={1.0} value={1.51}
  // press +
  // then value should be 2.51, rather than 2.5
  // if this.props.precision is undefined
  // https://github.com/react-component/input-number/issues/39
  getMaxPrecision(currentValue: string | number | undefined, ratio = 1): number {
    if ('precision' in this.props) {
      return this.props.precision || 0;
    }
    const { step } = this.props;
    const ratioPrecision = this.getPrecision(ratio);
    const stepPrecision = this.getPrecision(step);
    const currentValuePrecision = this.getPrecision(currentValue);
    if (!currentValue) {
      return ratioPrecision + stepPrecision;
    }
    return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
  }

  getPrecisionFactor(currentValue: string | number, ratio = 1) {
    const precision = this.getMaxPrecision(currentValue, ratio);
    return Math.pow(10, precision);
  }

  focus() {
    this.input.current.focus();
  }

  blur() {
    this.input.current.blur();
  }

  formatWrapper(num: any) {
    if (this.props.formatter) {
      return this.props.formatter(num);
    }
    return num;
  }

  toPrecisionAsStep(num: string | number | null) {
    if (this.isNotCompleteNumber(num) || num === '') {
      return num;
    }
    const precision = Math.abs(this.getMaxPrecision(num ? num : undefined));
    if (precision === 0) {
      return num?.toString();
    }
    if (!isNaN(precision)) {
      return Number(num).toFixed(precision);
    }
    return num?.toString();
  }

  // '1.' '1x' 'xx' '' => are not complete numbers
  isNotCompleteNumber(num: string | number | null | undefined) {
    return (
      num === null ||
      num === undefined ||
      num === '' ||
      isNaN(+num) ||
      (num && num.toString().indexOf('.') === num.toString().length - 1)
    );
  }

  toNumber(num: string | number) {
    if (this.isNotCompleteNumber(num)) {
      return num;
    }
    if ('precision' in this.props) {
      return Number(Number(num).toFixed(this.props.precision));
    }
    return Number(num);
  }

  // '1.0' '1.00'  => may be a inputing number
  toNumberWhenUserInput(num: string) {
    // num.length > 16 => prevent input large number will became Infinity
    if ((/\.\d*0$/.test(num) || num.length > 16) && this.state.focused) {
      return num;
    }
    return this.toNumber(num);
  }

  upStep(val: string | number, rat: number) {
    let { step, upStep, min } = this.props;
    const precisionFactor = this.getPrecisionFactor(val, rat);
    const precision = Math.abs(this.getMaxPrecision(val, rat));
    if (upStep != null) {
      step = upStep;
    }
    let result: number | string;
    if (typeof val === 'number' && step) {
      result = ((precisionFactor * val + precisionFactor * +step * rat) / precisionFactor).toFixed(
        precision,
      );
    } else {
      result = min === -Infinity && step ? step : min || 1;
    }
    return this.toNumber(result);
  }

  downStep(val: string | number, rat: number) {
    let { step, downStep, min } = this.props;
    const precisionFactor = this.getPrecisionFactor(val, rat);
    const precision = Math.abs(this.getMaxPrecision(val, rat));
    if (downStep != null) {
      step = downStep;
    }
    let result;
    if (typeof val === 'number' && step) {
      result = ((precisionFactor * val - precisionFactor * +step * rat) / precisionFactor).toFixed(
        precision,
      );
    } else {
      result = min === -Infinity && step ? -step : min || -1;
    }
    return this.toNumber(result);
  }

  step(
    type: string,
    e: { persist: () => void; preventDefault: () => void },
    ratio = 1,
    recursive: any,
  ) {
    this.stop();
    if (e) {
      e.persist();
      e.preventDefault();
    }
    const props = this.props;
    if (props.disabled) {
      return;
    }
    const value = this.toNumber(this.state.inputValue || 0);
    if (this.isNotCompleteNumber(value)) {
      return;
    }
    let val = ((this as any)[`${type}Step`] as any)(value, ratio);

    if (props.max) {
      const outOfRange = val > +props.max;
      if (outOfRange) {
        return;
      }
      if (val > props.max) {
        val = props.max;
      }
    }

    if (props.min) {
      const outOfRange = val < +props.min;
      if (outOfRange) {
        return;
      }
      if (val < props.min) {
        val = props.min;
      }
    }

    this.setValue(this.getCurrentValidValue(val), () => this.props.onNumberChange(val));
    this.autoStepTimer = setTimeout(
      () => {
        (this as any)[type](e, ratio, true);
      },
      recursive ? SPEED : DELAY,
    );
  }

  stop = () => {
    if (this.autoStepTimer) {
      clearTimeout(this.autoStepTimer);
    }
  };

  down = (e: any, ratio?: number, recursive?: any) => {
    this.pressingUpOrDown = true;
    this.step('down', e, ratio, recursive);
  };

  up = (e: any, ratio?: number, recursive?: any) => {
    this.pressingUpOrDown = true;
    this.step('up', e, ratio, recursive);
  };

  renderHandler = () => {
    const { upHandler, downHandler, readOnly, max, min, disabled, styleType, hideHandler } =
      this.props;
    if (hideHandler) return null;

    const { value } = this.state;
    const editable = !readOnly && !disabled;
    let upDisabled: any;
    let downDisabled: any;
    if (value || value === 0) {
      if (!isNaN(value as number)) {
        const val = Number(value);
        if (val >= (max as number)) {
          upDisabled = true;
        }
        if (val <= (min as number)) {
          downDisabled = true;
        }
      } else {
        upDisabled = true;
        downDisabled = true;
      }
    }

    const upEvents = {
      onMouseDown: (e: any) => (editable && !upDisabled ? this.up(e) : noop()),
      onMouseUp: (e: any) => this.stop(),
      onMouseLeave: (e: any) => this.stop(),
    };
    const downEvents = {
      onMouseDown: (e: any) => (editable && !downDisabled ? this.down(e) : noop()),
      onMouseUp: () => this.stop(),
      onMouseLeave: () => this.stop(),
    };

    return (
      <div>
        <span
          className={classnames(handlerUpCls, (disabled || upDisabled) && handlerDisabledCls)}
          // unselectable="unselectable"
          // disabled={disabled || upDisabled}
          {...upEvents}
        >
          {upHandler || (
            <Icon
              type={
                {
                  default: 'angle_up',
                  split: 'plus',
                  pagination: 'angle_right',
                }[styleType]
              }
            />
          )}
        </span>
        <span
          className={classnames(handlerDownCls, (disabled || downDisabled) && handlerDisabledCls)}
          // unselectable="unselectable"
          // disabled={disabled || downDisabled}
          {...downEvents}
        >
          {downHandler || (
            <Icon
              type={
                {
                  default: 'angle_down',
                  split: 'minus',
                  pagination: 'angle_left',
                }[styleType]
              }
            />
          )}
        </span>
      </div>
    );
  };
  onTooltipVisibleChange = (visible: boolean) => {
    this.setState({
      tooltipVisible: visible,
    });
  };
  renderInput = () => {
    /* eslint-disable no-unused-vars */
    const {
      disabled,
      className,
      readOnly,
      style,
      defaultValue,
      focusOnUpDown,
      onChange,
      onFocus,
      onBlur,
      onEnter,
      upHandler,
      downHandler,
      formatter,
      parser,
      precision,
      styleType,
      suffix,
      inputStyle,
      onNumberChange,
      computeValidNumber,
      hideHandler,
      shadowed,
      size,
      tooltip,
      downStep,
      upStep,
      ...rest
    } = this.props;
    /* eslint-enable no-unused-vars */

    const { focused, inputValue, value, tooltipVisible } = this.state;

    // focus state, show input value
    // unfocus state, show valid value
    let inputDisplayValue;
    if (focused) {
      inputDisplayValue = inputValue;
    } else {
      inputDisplayValue = this.toPrecisionAsStep(value);
    }

    if (inputDisplayValue === undefined || inputDisplayValue === null) {
      inputDisplayValue = '';
    }

    const inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
    const editable = !readOnly && !disabled;
    const input = (
      <div className={inputWrapCls}>
        <input
          {...rest}
          className={inputCls}
          // size={size}
          autoComplete="off"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={editable ? this.onKeyDown : noop}
          onKeyUp={editable ? this.onKeyUp : noop}
          onChange={this.onChange}
          disabled={disabled}
          readOnly={readOnly}
          ref={this.input}
          value={inputDisplayValueFormat}
          style={inputStyle}
        />
        {suffix && <span className={suffixCls}>{suffix}</span>}
      </div>
    );

    if (!tooltip) {
      return input;
    } else if (typeof tooltip === 'string' || React.isValidElement(tooltip)) {
      return (
        <Tooltip
          popup={tooltip}
          // visible={focused || tooltipVisible}
          // onVisibleChange={this.onTooltipVisibleChange}
        >
          {input}
        </Tooltip>
      );
    } else if (_.isObject(tooltip)) {
      return (
        // @ts-ignore
        <Tooltip
          // visible={focused || tooltipVisible}
          // onVisibleChange={this.onTooltipVisibleChange}
          {...tooltip}
        >
          {input}
        </Tooltip>
      );
    } else {
      return input;
    }
  };
  render() {
    const { disabled, className, style, styleType, hideHandler, size, shadowed } = this
      .props as any;

    const { focused } = this.state;

    return (
      <NumberInputWrap
        focused={focused}
        disabled={disabled}
        shadowed={shadowed}
        hideHandler={hideHandler}
        size={size}
        styleType={styleType}
        style={style}
        className={classnames(
          prefixCls,
          `${prefixCls}-styletype-${styleType}`,
          focused && `${prefixCls}-focused`,
          disabled && `${prefixCls}-disabled`,
          className,
        )}
      >
        {this.renderHandler()}
        {this.renderInput()}
      </NumberInputWrap>
    );
  }
}

(NumberInput as any).StyleType = StyleType;
(NumberInput as any).Size = Size;
export default NumberInput;
