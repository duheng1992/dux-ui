import React from 'react';
import PropTypes from 'prop-types';

import Select from '../Select';
import Button from '../Button';
import NumberInput from '../NumberInput';
import KEYCODE from '../../interfaces/KeyCode';

class Options extends React.Component {
  static propTypes = {
    changeSize: PropTypes.func,
    quickGo: PropTypes.func,
    current: PropTypes.number,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    pageSize: PropTypes.number,
    buildOptionText: PropTypes.func,
    locale: PropTypes.object,
    size: PropTypes.string,
    allPages: PropTypes.number,
    select: PropTypes.object,
    rootPrefixCls: PropTypes.string,
    goButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  };

  static defaultProps = {
    pageSizeOptions: ['10', '20', '30', '40'],
  };

  constructor(props: any) {
    super(props);

    this.state = {
      goInputText: '',
    };
  }

  buildOptionText = (value: any) => {
    return `${value} ${(this.props as any).locale.itemsPerPage}`;
  };

  changeSize = (value: any) => {
    (this.props as any).changeSize(Number(value));
  };

  handleChange = (v: any) => {
    this.setState({
      goInputText: v,
    });
  };

  go = (e: any) => {
    let val = (this.state as any).goInputText;
    if (val === '') {
      return;
    }
    val = isNaN(val) ? (this.props as any).current : Number(val);
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      this.setState({
        goInputText: '',
      });
      (this.props as any).quickGo(val);
    }
  };

  render() {
    const props = this.props as any;
    const state = this.state;
    const locale = props.locale;
    const { size, allPages, select } = props as any;
    const prefixCls = `${props.rootPrefixCls}-options`;
    const changeSize = props.changeSize;
    const quickGo = props.quickGo;
    const goButton = props.goButton;
    const buildOptionText = props.buildOptionText || this.buildOptionText;
    let changeSelect = null;
    let goInput = null;
    let gotoButton = null;

    if (!(changeSize || quickGo)) {
      return null;
    }

    if (changeSize && Select) {
      const Option = Select.Option;
      const pageSize = props.pageSize || props.pageSizeOptions[0];
      const options = props.pageSizeOptions.map((opt: any, i: number) => (
        <Option key={i} value={opt}>
          {buildOptionText(opt)}
        </Option>
      ));

      changeSelect = (
        <Select
          className={`${prefixCls}-size-changer`}
          value={pageSize.toString()}
          onChange={this.changeSize}
          size={size}
          {...select}
        >
          {options}
        </Select>
      );
    }

    if (quickGo) {
      if (goButton) {
        if (typeof goButton === 'boolean') {
          gotoButton = (
            <Button
              onClick={this.go}
              styleType="primary"
              // @ts-ignore
              className={`${prefixCls}-gobutton`}
              onKeyUp={this.go}
              size={size}
            >
              {locale.jumpToConfirm}
            </Button>
          );
        } else {
          gotoButton = (
            <span className={`${prefixCls}-gobutton`} onClick={this.go} onKeyUp={this.go}>
              {goButton}
            </span>
          );
        }
      }
      goInput = (
        <div className={`${prefixCls}-quick-jumper`}>
          <NumberInput
            size={size}
            min={1}
            max={allPages}
            value={(state as any).goInputText}
            onChange={this.handleChange}
            parser={(input) => input.replace(/[^\d]+/g, '')}
            onKeyUp={this.go}
            hideHandler
            styleType="pagination"
            suffix={<span className={`${prefixCls}-quick-jumper-text`}>{`/${allPages}`}</span>}
          />
          {gotoButton}
        </div>
      );
    }

    return (
      <li className={`${prefixCls}`}>
        {changeSelect}
        {goInput}
      </li>
    );
  }
}

export default Options;
