import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

import Icon from '../Icon';
import NumberInput from '../NumberInput';
import localeConsumerDecorator from '../LocaleProvider/localeConsumerDecorator';

import Pager from './Pager';
import Options from './Options';
import LOCALE from './locale/zh_CN';
import { PaginationWrap, prefixCls } from './style';

function noop() {}
function isInteger(value: any) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
function defaultItemRender(page: number, type: string, element: ReactNode) {
  if (type === 'prev') {
    return <Icon type="angle_left" className={`${prefixCls}-prev-icon`} />;
  }
  if (type === 'next') {
    return <Icon type="angle_right" className={`${prefixCls}-next-icon`} />;
  }
  if (type === 'jump-prev' || type === 'jump-next') {
    return <Icon type="ellipsis" className={`${prefixCls}-jump-icon`} />;
  }
  return element;
}
const Size = ['sm', 'md', 'lg'];

// @ts-ignore
@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Pagination' })
// @ts-ignore
class Pagination extends Component {
  static propTypes = {
    /** 当前页，受控 */
    current: PropTypes.number,
    /** 默认当前页，非受控 */
    defaultCurrent: PropTypes.number,
    /** 总数 */
    total: PropTypes.number,
    /** 自定义展示 total 值 */
    showTotal: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    /** 每页数量，受控 */
    pageSize: PropTypes.number,
    /** 默认每页数量，非受控 */
    defaultPageSize: PropTypes.number,
    /** 修改回调 */
    onChange: PropTypes.func,
    /** 修改建议回调，如传入的total为10，当前pageSize为10，当前current却为2时会触发 */
    onAdvise: PropTypes.func,
    /** @ignore */
    hideOnSinglePage: PropTypes.bool,
    /** 显示分页数量调节 */
    showSizeChanger: PropTypes.bool,
    /** 是否显示3个 */
    showLessItems: PropTypes.bool,
    /** 分页数量变化回调 */
    onPageSizeChange: PropTypes.func,
    /** 显示更多页面跳转按钮 */
    showPrevNextJumpers: PropTypes.bool,
    /** 显示快速跳转，传入goButton显示跳转按钮 */
    showQuickJumper: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    /** 显示按钮的title */
    showTitle: PropTypes.bool,
    /** 分页配置 */
    pageSizeOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    /** 简易分页 */
    simple: PropTypes.bool,
    /** @ignore */
    locale: PropTypes.object,
    /** @ignore */
    className: PropTypes.string,
    /** @ignore */
    itemRender: PropTypes.func,
    /** 尺寸 */
    size: PropTypes.oneOf(Size),
    /** @ignore */
    optionsProps: PropTypes.object,
  };

  static defaultProps = {
    defaultCurrent: 1,
    total: 0,
    defaultPageSize: 10,
    onChange: noop,
    hideOnSinglePage: false,
    showPrevNextJumpers: true,
    showQuickJumper: false,
    showSizeChanger: false,
    showLessItems: false,
    showTitle: true,
    onPageSizeChange: noop,
    itemRender: defaultItemRender,
    size: 'md',
  };

  constructor(props: any) {
    super(props);

    const hasOnChange = props.onChange !== noop;
    const hasCurrent = 'current' in props;
    if (hasCurrent && !hasOnChange) {
      console.warn(
        'Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.',
      );
    }

    let current = props.defaultCurrent;
    if ('current' in props) {
      current = props.current;
    }

    let pageSize = props.defaultPageSize;
    if ('pageSize' in props) {
      pageSize = props.pageSize;
    }

    this.state = {
      current,
      currentInputValue: current,
      pageSize,
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if ('pageSize' in nextProps) {
      this.setState({
        pageSize: nextProps.pageSize,
      });
    }

    const pageSize = 'pageSize' in nextProps ? nextProps.pageSize : (this.state as any).pageSize;
    const current = 'current' in nextProps ? nextProps.current : (this.state as any).current;

    const newCurrent = this.calculatePage(pageSize, nextProps.total);

    if ('current' in nextProps) {
      this.setState({
        current: nextProps.current,
        currentInputValue: nextProps.current,
      });
    }
    if (current > newCurrent) {
      if (!('current' in nextProps)) {
        this.setState({
          current: newCurrent,
          currentInputValue: newCurrent,
        });
      }
      const { onAdvise } = nextProps;
      if (
        onAdvise &&
        (nextProps.current != (this.props as any).current ||
          nextProps.total != (this.props as any).total)
      ) {
        onAdvise(newCurrent, pageSize);
      }
    }
  }

  paginationNode: any;

  componentDidUpdate(prevProps: any, prevState: any) {
    // When current page change, fix focused style of prev item
    // A hacky solution of https://github.com/ant-design/ant-design/issues/8948
    if (prevState.current !== (this.state as any).current && this.paginationNode) {
      const lastCurrentNode = this.paginationNode.querySelector(
        `.${prefixCls}-item-${prevState.current}`,
      );
      if (lastCurrentNode && document.activeElement === lastCurrentNode) {
        lastCurrentNode.blur();
      }
    }
  }

  savePaginationNode = (node: any) => {
    this.paginationNode = node;
  };

  calculatePage = (p?: number, total?: number) => {
    total = total === undefined ? (this.props as any).total : total;
    let pageSize = p || (this.props as any).defaultPageSize;
    if (typeof pageSize === 'undefined') {
      pageSize = (this.state as any).pageSize;
    }
    return Math.max(1, Math.floor((total || 0 - 1) / pageSize) + 1);
  };

  isValid = (page: number) => {
    return isInteger(page) && page >= 1 && page !== (this.state as any).current;
  };

  changePageSize = (size: number) => {
    let current = (this.state as any).current;
    const newCurrent = this.calculatePage(size);
    current = current > newCurrent ? newCurrent : current;
    if (typeof size === 'number') {
      if (!('pageSize' in this.props)) {
        this.setState({
          pageSize: size,
        });
      }
      if (!('current' in this.props)) {
        this.setState({
          current,
          currentInputValue: current,
        });
      }
    }
    (this.props as any).onPageSizeChange(current, size);
  };

  handleChange = (p: number) => {
    let page = p;
    if (this.isValid(page)) {
      if (page > this.calculatePage()) {
        page = this.calculatePage();
      }

      if (!('current' in this.props)) {
        this.setState({
          current: page,
          currentInputValue: page,
        });
      }

      const pageSize = (this.state as any).pageSize;
      (this.props as any).onChange(page, pageSize);

      return page;
    }

    return (this.state as any).current;
  };

  prev = () => {
    if (this.hasPrev()) {
      this.handleChange((this.state as any).current - 1);
    }
  };

  next = () => {
    if (this.hasNext()) {
      this.handleChange((this.state as any).current + 1);
    }
  };

  getJumpPrevPage() {
    return Math.max(1, (this.state as any).current - ((this.props as any).showLessItems ? 3 : 5));
  }

  getJumpNextPage() {
    return Math.min(
      this.calculatePage(),
      (this.state as any).current + ((this.props as any).showLessItems ? 3 : 5),
    );
  }

  jumpPrev = () => {
    this.handleChange(this.getJumpPrevPage());
  };

  jumpNext = () => {
    this.handleChange(this.getJumpNextPage());
  };

  hasPrev = () => {
    return (this.state as any).current > 1;
  };

  hasNext = () => {
    return (this.state as any).current < this.calculatePage();
  };

  runIfEnter = (event: any, callback: Function, ...restParams: any) => {
    if (event.key === 'Enter' || event.charCode === 13) {
      callback(...restParams);
    }
  };

  runIfEnterPrev = (e: any) => {
    this.runIfEnter(e, this.prev);
  };

  runIfEnterNext = (e: any) => {
    this.runIfEnter(e, this.next);
  };

  runIfEnterJumpPrev = (e: any) => {
    this.runIfEnter(e, this.jumpPrev);
  };

  runIfEnterJumpNext = (e: any) => {
    this.runIfEnter(e, this.jumpNext);
  };

  render() {
    /* eslint-disable no-unused-vars */
    const {
      current: _current,
      defaultCurrent,
      total,
      showTotal,
      pageSize: _pageSize,
      defaultPageSize,
      onChange,
      onAdvise,
      hideOnSinglePage,
      showSizeChanger,
      showLessItems,
      onPageSizeChange,
      showPrevNextJumpers,
      showQuickJumper,
      showTitle,
      pageSizeOptions,
      simple,
      locale,
      className,
      itemRender,
      size,
      optionsProps,
      ...rest
    } = this.props as any;
    /* eslint-enable no-unused-vars */
    const { pageSize, current } = this.state as any;

    // When hideOnSinglePage is true and there is only 1 page, hide the pager
    if (hideOnSinglePage === true && total <= pageSize) {
      return null;
    }

    const allPages = this.calculatePage();
    const pagerList = [];
    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;

    const goButton = showQuickJumper && showQuickJumper.goButton;
    const pageBufferSize = showLessItems ? 1 : 2;

    const prevPage = current - 1 > 0 ? current - 1 : 0;
    const nextPage = current + 1 < allPages ? current + 1 : allPages;

    const wrapClassName = classnames(prefixCls, className, { [`${prefixCls}-${size}`]: size });
    // 简易
    if (simple) {
      return (
        <ul
          className={classnames(wrapClassName, `${prefixCls}-simple`)}
          unselectable="unselectable"
          {...rest}
        >
          <NumberInput
            size={size}
            min={1}
            max={allPages}
            styleType="pagination"
            parser={(input) => input.replace(/[^\d]+/g, '')}
            value={current}
            onNumberChange={(number) => this.handleChange(number)}
            suffix={<span className={`${prefixCls}-quick-jumper-text`}>{`/${allPages}`}</span>}
          />
        </ul>
      );
    }

    if (allPages <= 5 + pageBufferSize * 2) {
      for (let i = 1; i <= allPages; i++) {
        const active = (this.state as any).current === i;
        pagerList.push(
          <Pager
            locale={locale}
            rootPrefixCls={prefixCls}
            onClick={this.handleChange}
            onKeyPress={this.runIfEnter}
            key={i}
            page={i}
            active={active}
            showTitle={showTitle}
            itemRender={itemRender}
          />,
        );
      }
    } else {
      const prevItemTitle = showLessItems ? locale.prev3 : locale.prev5;
      const nextItemTitle = showLessItems ? locale.next3 : locale.next5;
      if (showPrevNextJumpers) {
        jumpPrev = (
          <li
            title={showTitle ? prevItemTitle : null}
            key="prev"
            onClick={this.jumpPrev}
            tabIndex={0}
            onKeyPress={this.runIfEnterJumpPrev}
            className={`${prefixCls}-jump-prev`}
          >
            {itemRender(
              this.getJumpPrevPage(),
              'jump-prev',
              <a className={`${prefixCls}-item-link`} />,
            )}
          </li>
        );
        jumpNext = (
          <li
            title={showTitle ? nextItemTitle : null}
            key="next"
            tabIndex={0}
            onClick={this.jumpNext}
            onKeyPress={this.runIfEnterJumpNext}
            className={`${prefixCls}-jump-next`}
          >
            {itemRender(
              this.getJumpNextPage(),
              'jump-next',
              <a className={`${prefixCls}-item-link`} />,
            )}
          </li>
        );
      }
      lastPager = (
        <Pager
          locale={locale}
          last
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={allPages}
          page={allPages}
          active={false}
          showTitle={showTitle}
          itemRender={itemRender}
        />
      );
      firstPager = (
        <Pager
          locale={locale}
          rootPrefixCls={prefixCls}
          onClick={this.handleChange}
          onKeyPress={this.runIfEnter}
          key={1}
          page={1}
          active={false}
          showTitle={showTitle}
          itemRender={itemRender}
        />
      );

      let left = Math.max(1, current - pageBufferSize);
      let right = Math.min(current + pageBufferSize, allPages);

      if (current - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }

      if (allPages - current <= pageBufferSize) {
        left = allPages - pageBufferSize * 2;
      }

      for (let i = left; i <= right; i++) {
        const active = current === i;
        pagerList.push(
          <Pager
            locale={locale}
            rootPrefixCls={prefixCls}
            onClick={this.handleChange}
            onKeyPress={this.runIfEnter}
            key={i}
            page={i}
            active={active}
            showTitle={showTitle}
            itemRender={itemRender}
          />,
        );
      }

      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pagerList[0] = React.cloneElement(pagerList[0], {
          className: `${prefixCls}-item-after-jump-prev`,
        });
        pagerList.unshift(jumpPrev);
      }
      if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
        pagerList[pagerList.length - 1] = React.cloneElement(
          pagerList[pagerList.length - 1] as any,
          {
            className: `${prefixCls}-item-before-jump-next`,
          },
        );
        pagerList.push(jumpNext);
      }

      if (left !== 1 && showPrevNextJumpers) {
        pagerList.unshift(firstPager);
      }
      if (right !== allPages && showPrevNextJumpers) {
        pagerList.push(lastPager);
      }
    }

    const defaultShowTotal = (total: number) => `${locale.total} ${total} ${locale.items}`;

    const prevDisabled = !this.hasPrev();
    const nextDisabled = !this.hasNext();
    return (
      <PaginationWrap
        size={size}
        className={wrapClassName}
        unselectable="unselectable"
        _innerRef={this.savePaginationNode}
        {...rest}
      >
        {showTotal && (
          <li className={`${prefixCls}-total`}>
            {_.isFunction(showTotal) ? showTotal(total) : defaultShowTotal(total)}
          </li>
        )}
        <li
          title={showTitle ? locale.prevPage : null}
          onClick={this.prev}
          // @ts-ignore
          tabIndex={prevDisabled ? null : 0}
          onKeyPress={this.runIfEnterPrev}
          className={`${!prevDisabled ? '' : `${prefixCls}-disabled`} ${prefixCls}-prev`}
          aria-disabled={prevDisabled}
        >
          {itemRender(prevPage, 'prev', <a className={`${prefixCls}-item-link`} />)}
        </li>
        {pagerList}
        <li
          title={showTitle ? locale.nextPage : null}
          onClick={this.next}
          // @ts-ignore
          tabIndex={nextDisabled ? null : 0}
          onKeyPress={this.runIfEnterNext}
          className={`${!nextDisabled ? '' : `${prefixCls}-disabled`} ${prefixCls}-next`}
          aria-disabled={nextDisabled}
        >
          {itemRender(nextPage, 'next', <a className={`${prefixCls}-item-link`} />)}
        </li>
        <Options
          locale={locale}
          rootPrefixCls={prefixCls}
          changeSize={showSizeChanger ? this.changePageSize : null}
          current={current}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          quickGo={showQuickJumper ? this.handleChange : null}
          goButton={goButton}
          size={size}
          allPages={allPages}
          {...optionsProps}
        />
      </PaginationWrap>
    );
  }
}
(Pagination as any).Size = Size;
export default Pagination;
