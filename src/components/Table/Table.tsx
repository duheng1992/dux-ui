import React, { Component, ReactNode } from 'react';
import PropTypes, { number } from 'prop-types';
import _ from 'lodash';
import createReactContext from 'create-react-context';

import RcTable from '../../libs/rc-table';
import deprecatedLog from '../../utils/deprecatedLog';
import Pagination from '../Pagination';
import Notice from '../Notice';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import Select from '../Select';
import Tooltip from '../Tooltip';
import localeConsumerDecorator from '../LocaleProvider/localeConsumerDecorator';
import { InheritProvider } from '../Popover/ContainerContext';

import {
  prefixCls,
  TableWrap,
  PopupContainer,
  SortIcon,
  FilterIcon,
  CancelSelect,
  selectIconCellCls,
  selectIconHeaderCls,
  placeholderCellCls,
  placeholderHeaderCls,
} from './style';
import LOCALE from './locale/zh_CN';
import TableRow from './TableRow';

const noop = () => {};
export const deprecatedLogForOnRowSelect = _.once(() =>
  deprecatedLog('Table onRowSelect', 'rowSelection.onChange'),
);

export const placeholderKey = 'table_column_width_placeholder';

export const TableContext = createReactContext({});

const missingColumnKeyWarn = () => console.error('Warning: Table column need a unique key');

export interface TableProps {
  /** 分页组件的配置，传入null为隐藏分页 */
  pagination?: object;
  /** 数据源 */
  dataSource?: any[];
  /** 表列信息，具体属性参考 columns 事例 */
  columns: any[];
  /**
   * 启用后会创建一个无宽度的空列，用作宽度占位，占位后宽度溢出便不会导致表格列被压缩，多出的宽度会被空列占用。
   * 占位列 column.key 为 table\_column\_width\_placeholder，使用中需注意避免重复 key
   */
  columnPlaceholder?: boolean;
  /** 表列配置项，非受控 */
  defaultColumnConfig?: object;
  /** 表列配置修改回调 */
  onColumnConfigChange?: Function;
  /** 额外表信息渲染 */
  expandedRowRender?: Function;
  /** 额外表展开按钮是否独立占据一格，data有children时有效 */
  expandIconAsCell?: boolean;
  /** 展开按钮的塞入的column index，expandIconAsCell为false时生效 */
  expandIconColumnIndex?: number;
  /** 隐藏扩展列按钮 */
  hideExpandIcon?: boolean;
  /** 默认展开项，非受控 */
  defaultExpandedRowKeys?: any[];
  /** 展开项，受控 */
  expandedRowKeys?: any[];
  /** 是否默认展开所有列 */
  defaultExpandAllRows?: boolean;
  /** 展开事件 */
  onExpandedRowsChange?: Function;
  /** 展开按钮点击事件 */
  onExpand?: Function;
  /**
   * 设置行props
   * @argument record - 行数据
   * @argument index - 行当前翻页中的index 不可作为key使用 不建议使用
   */
  onRow?: Function;
  /** 设置表头props
   * @argument record - 行数据
   * @argument index - 表头行的index 表示存在分组时(column.children)的表头层级
   */
  onHeaderRow?: Function;
  /**
   * 列表可选选项配置.
   * column.key 为 table_row_selection，使用中需注意避免重复 key
   */
  rowSelection?: any;
  /**
   * 列表选项变化回调
   * @deprecated - 请使用rowSelection.onChange来替换
   */
  onRowSelect?: Function;
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 头部内容 */
  title?: Function;
  /** 底部内容 */
  footer?: Function;
  /** 无数据时的展示内容 */
  emptyContent?: ReactNode;
  /** 报错信息 */
  errorContent?: ReactNode;
  /** 如何搜索 */
  handleSearch?: Function;
  /** 自定义样式 */
  customStyle?: object;
  /** 滚动配置 */
  scroll?: object;
  /** 表格布局，当 scroll.x 有值时为 fixed，其它时候默认为 auto，可自行覆盖 */
  tableLayout?: 'auto' | 'fixed';
  /** 定义如何获取每行的键值 */
  rowKey?: any;
  /** 是否有斑马线，存在子表格时，斑马线样式可能会错乱 */
  zebraCrossing?: boolean;
  /** 自定义表格组件，慎用 */
  components?: any;
  /** 默认排序设置，key 为 column key，state 为升序(asc)或降序(desc) */
  defaultOrder?: any;
  /** 受控排序设置，key 为 column key，state 为升序(asc)或降序(desc) */
  order?: any;
  /**
   * 表格的筛选等条件变更时的回调
   * @param condition - 变更的数据
   * @param condition.order - 排序
   * @param condition.filter - 筛选
   * @param condition.searchValue - 搜索
   */
  onConditionChange?: Function;
  /**
   * order、filter、searchValue、pagination变化时表格内部不处理
   */
  doNotHandleCondition?: boolean;
  /**
   * 右键菜单
   * @param record - 该行的记录值
   */
  contextMenu?: Function;
  /** @ignore */
  className?: string;
  /** @ignore */
  style?: object;
  /** @ignore */
  locale?: object;
}

// @ts-ignore
@localeConsumerDecorator({ defaultLocale: LOCALE, localeName: 'Table' })
// @ts-ignore
class Table extends Component<TableProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      filters: this.calDefaultFilters(props),
      filtersFromProps: this.calFiltersFromProps(props),
      order: null,
      selectedRowKeyMap: {},
      columnConfig: props.defaultColumnConfig,
      searchValue: '',
    };
    // init pagination
    const { pagination } = props;
    if (_.isObject(pagination)) {
      (this.state as any).pagination = {
        current: 'defaultCurrent' in pagination ? (pagination as any).defaultCurrent : 1,
        pageSize: 'defaultPageSize' in pagination ? (pagination as any).defaultPageSize : 10,
      };
    } else {
      (this.state as any).pagination = {
        current: 1,
        pageSize: 10,
      };
    }
    // init selectedRowKeyMap from rowSelection
    const { rowSelection } = props;
    const { selectedRowKeyMap } = this.state as any;
    if (_.isObject(rowSelection)) {
      if ('selectedRowKeys' in rowSelection) {
        _.each((rowSelection as any).selectedRowKeys, (key) => (selectedRowKeyMap[key] = true));
      } else if ('defaultSelectedRowKeys' in rowSelection) {
        _.each(
          (rowSelection as any).defaultSelectedRowKeys,
          (key) => (selectedRowKeyMap[key] = true),
        );
      }
    }
    // init order
    if ('order' in props) {
      const order = this.getOrder(props.order, props.columns);
      (this.state as any).order = order;
    } else if ('defaultOrder' in props) {
      const order = this.getOrder(props.defaultOrder, props.columns);
      (this.state as any).order = order;
    }
    this.check(props);
  }
  static propTypes = {
    /** 分页组件的配置，传入null为隐藏分页 */
    pagination: PropTypes.object,
    /** 数据源 */
    dataSource: PropTypes.array,
    /** 表列信息，具体属性参考 columns 事例 */
    columns: PropTypes.array.isRequired,
    /**
     * 启用后会创建一个无宽度的空列，用作宽度占位，占位后宽度溢出便不会导致表格列被压缩，多出的宽度会被空列占用。
     * 占位列 column.key 为 table\_column\_width\_placeholder，使用中需注意避免重复 key
     */
    columnPlaceholder: PropTypes.bool,
    /** 表列配置项，非受控 */
    defaultColumnConfig: PropTypes.object,
    /** 表列配置修改回调 */
    onColumnConfigChange: PropTypes.func,
    /** 额外表信息渲染 */
    expandedRowRender: PropTypes.func,
    /** 额外表展开按钮是否独立占据一格，data有children时有效 */
    expandIconAsCell: PropTypes.bool,
    /** 展开按钮的塞入的column index，expandIconAsCell为false时生效 */
    expandIconColumnIndex: PropTypes.number,
    /** 隐藏扩展列按钮 */
    hideExpandIcon: PropTypes.bool,
    /** 默认展开项，非受控 */
    defaultExpandedRowKeys: PropTypes.array,
    /** 展开项，受控 */
    expandedRowKeys: PropTypes.array,
    /** 是否默认展开所有列 */
    defaultExpandAllRows: PropTypes.bool,
    /** 展开事件 */
    onExpandedRowsChange: PropTypes.func,
    /** 展开按钮点击事件 */
    onExpand: PropTypes.func,
    /**
     * 设置行props
     * @argument record - 行数据
     * @argument index - 行当前翻页中的index 不可作为key使用 不建议使用
     */
    onRow: PropTypes.func,
    /** 设置表头props
     * @argument record - 行数据
     * @argument index - 表头行的index 表示存在分组时(column.children)的表头层级
     */
    onHeaderRow: PropTypes.func,
    /**
     * 列表可选选项配置.
     * column.key 为 table\_row\_selection，使用中需注意避免重复 key
     */
    rowSelection: PropTypes.oneOfType([
      PropTypes.shape({
        /** 选框是否为 fixed */
        fixed: PropTypes.bool,
        /** 选中项变化回调 */
        onChange: PropTypes.func,
        /** 默认当前选中项，uncontrolled */
        defaultSelectedRowKeys: PropTypes.array,
        /** 当前选中项，controlled */
        selectedRowKeys: PropTypes.array,
        /** 获取当前行选中禁用状态 */
        getDisabledOfRow: PropTypes.func,
        /**
         * 是否多选
         * @default true
         */
        multiple: PropTypes.bool,
        /**
         * 多选选中时的提示，bottom 为显示在下方
         * @default true
         */
        selectedTip: PropTypes.oneOf([true, false, 'bottom']),
        /** 是否禁用 */
        disabled: PropTypes.bool,
      }),
      PropTypes.oneOf([true]),
    ]),
    /**
     * 列表选项变化回调
     * @deprecated - 请使用rowSelection.onChange来替换
     */
    onRowSelect: PropTypes.func,
    /** 是否显示表头 */
    showHeader: PropTypes.bool,
    /** 头部内容 */
    title: PropTypes.func,
    /** 底部内容 */
    footer: PropTypes.func,
    /** 无数据时的展示内容 */
    emptyContent: PropTypes.node,
    /** 报错信息 */
    errorContent: PropTypes.node,
    /** 如何搜索 */
    handleSearch: PropTypes.func,
    /** 自定义样式 */
    customStyle: PropTypes.shape({
      outerPadding: PropTypes.string,
    }),
    /** 滚动配置 */
    scroll: PropTypes.shape({
      /** x轴滚动配置，为true自动展开并滚动，为数字时设定表单的宽度 */
      x: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
      /** y轴滚动配置，为数字时设定表单的高度 */
      y: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
      /** table body 滚动时的回调 */
      onScroll: PropTypes.func,
    }),
    /** 表格布局，当 scroll.x 有值时为 fixed，其它时候默认为 auto，可自行覆盖 */
    tableLayout: PropTypes.oneOf(['auto', 'fixed']),
    /** 定义如何获取每行的键值 */
    rowKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    /** 是否有斑马线，存在子表格时，斑马线样式可能会错乱 */
    zebraCrossing: PropTypes.bool,
    /** 自定义表格组件，慎用 */
    components: PropTypes.shape({
      header: PropTypes.shape({
        cell: PropTypes.any,
      }),
    }),
    /** 默认排序设置，key 为 column key，state 为升序(asc)或降序(desc) */
    defaultOrder: PropTypes.shape({
      key: PropTypes.string,
      state: PropTypes.oneOf(['desc', 'asc']),
    }),
    /** 受控排序设置，key 为 column key，state 为升序(asc)或降序(desc) */
    order: PropTypes.shape({
      key: PropTypes.string,
      state: PropTypes.oneOf(['desc', 'asc']),
    }),
    /**
     * 表格的筛选等条件变更时的回调
     * @param condition - 变更的数据
     * @param condition.order - 排序
     * @param condition.filter - 筛选
     * @param condition.searchValue - 搜索
     */
    onConditionChange: PropTypes.func,
    /**
     * order、filter、searchValue、pagination变化时表格内部不处理
     */
    doNotHandleCondition: PropTypes.bool,
    /**
     * 右键菜单
     * @param record - 该行的记录值
     */
    contextMenu: PropTypes.func,
    /** @ignore */
    className: PropTypes.string,
    /** @ignore */
    style: PropTypes.object,
    /** @ignore */
    locale: PropTypes.object,
  };
  static defaultProps = {
    pagination: {},
    dataSource: [],
    columns: [],
    defaultColumnConfig: {},
    onColumnConfigChange: () => {},
    handleSearch: (record: any, searchValue: string) => {
      return _.map(record).join('').indexOf(searchValue) >= 0;
    },
    customStyle: {},
    rowKey: 'key',
  };
  check = (props: any) => {
    const { columns } = props;
    _.each(columns, (column) => {
      if (column.key === undefined) missingColumnKeyWarn();
    });
  };
  componentWillReceiveProps = (nextProps: any) => {
    const { rowSelection } = nextProps;
    if (_.isObject(rowSelection) && 'selectedRowKeys' in rowSelection) {
      const selectedRowKeyMap = {};
      _.each(
        (rowSelection as any).selectedRowKeys,
        (key) => ((selectedRowKeyMap as any)[key] = true),
      );
      this.setState({
        selectedRowKeyMap,
      });
    }
    // pick controlled filter value
    this.setState({
      filtersFromProps: this.calFiltersFromProps(nextProps),
    });
    if ('order' in nextProps) {
      const order = this.getOrder(nextProps.order, nextProps.columns);
      this.setState({
        order,
      });
    }
  };
  getOrder = (order: any, columns: any) => {
    if (!order || !columns) return null;
    const { key, state } = order;
    if (!key || !state) return null;
    const column = _.find(columns, (column) => column.key === key);
    if (!column) return null;
    const { order: columnOrder, dataIndex } = column;
    if (!columnOrder) return null;
    const { handleOrder } = columnOrder;
    return {
      key,
      state,
      dataIndex,
      handleOrder,
    };
  };
  calFiltersFromProps = ({ columns = [] }) => {
    const filters = {};
    // pick filter controlled value
    columns.forEach((column, i) => {
      const { filter } = column;
      const columnKey = this.getColumnKey(column, i);
      if (!filter) return;
      let filterValue;
      if ('value' in filter) {
        filterValue = (filter as any).value;
        (filters as any)[columnKey] = {
          value: filterValue,
        };
      }
    });
    return filters;
  };
  calDefaultFilters = ({ columns = [] }) => {
    const filters = {};
    // pick filter controlled value
    columns.forEach((column, i) => {
      const { filter } = column;
      if (!filter) return;
      const columnKey = this.getColumnKey(column, i);
      let filterValue;
      // pick default value
      if ('defaultValue' in filter) {
        filterValue = (filter as any).defaultValue;
        (filters as any)[columnKey] = {
          value: filterValue,
        };
      }
    });
    return filters;
  };
  mergeFilters = (stateFilters: any, propsFilters: any, columns: any) => {
    const filters = {
      ...stateFilters,
      ...propsFilters,
    };
    _.each(filters, (filter, key) => {
      const column = _.find(
        columns,
        (column: any, i: number) => this.getColumnKey(column, i) === key,
      );
      if (!column || filter.value == null || (column.filter.multiple && !filter.value.length)) {
        delete filters[key];
      } else {
        filter.column = column;
      }
    });
    return filters;
  };
  getExpandedRowKeys = (dataSource: any[], changedUnExpandedRowKeys: any) => {
    const flatDataSource = this.flatDataSource(dataSource);
    const expandedRowKeys: any[] = [];
    _.each(flatDataSource, (item) => {
      const { key } = item;
      if (!changedUnExpandedRowKeys[key]) {
        expandedRowKeys.push(key);
      }
    });
    return expandedRowKeys;
  };
  /**
   * @deprecated
   */
  deprecatedOnRowSelect = (selectedRowKeys: any) => {
    if ('onRowSelect' in this.props) {
      deprecatedLogForOnRowSelect();
      (this.props as any).onRowSelect(selectedRowKeys);
    }
  };
  onSelectedRowKeysChange = (selectedRowKeyMap: any) => {
    const { rowSelection } = this.props as any;
    if (!rowSelection) return;
    const selectedRowKeys: any[] = [];
    _.each(selectedRowKeyMap, (selected, key) => {
      selected && selectedRowKeys.push(key);
    });
    if (_.isObject(rowSelection)) {
      if ((rowSelection as any).onChange) {
        (rowSelection as any).onChange(selectedRowKeys);
      }
      if (!('selectedRowKeys' in rowSelection)) {
        this.setState({
          selectedRowKeyMap,
        });
      }
    } else {
      this.setState({
        selectedRowKeyMap,
      });
    }
    this.deprecatedOnRowSelect(selectedRowKeys);
  };
  onColumnConfigChange = (config: any) => {
    const { onColumnConfigChange } = this.props as any;
    this.setState({
      columnConfig: config,
    });
    onColumnConfigChange(config);
  };
  handleSearch = (v: any) => {
    if (v !== (this.state as any).searchValue) {
      this.setState({
        pagination: { ...(this.state as any).pagination, current: 1 },
      });
      this.handleConditionChange({ searchValue: v });
    }
  };
  handleConditionChange = (stateCondition: any, callbackCondition = {}) => {
    stateCondition = {
      ..._.pick(this.state, ['order', 'filters', 'searchValue']),
      ...stateCondition,
    };
    this.setState({
      ...stateCondition,
    });
    const { onConditionChange } = this.props as any;

    let { order, filters, searchValue } = callbackCondition as any;
    if (!('order' in callbackCondition)) {
      order = stateCondition.order;
    }
    if (!('filters' in callbackCondition)) {
      filters = stateCondition.filters;
    }
    if (!('searchValue' in callbackCondition)) {
      searchValue = stateCondition.searchValue;
    }

    onConditionChange &&
      onConditionChange({
        order: order ? _.pick(order, ['key', 'state']) : null,
        filters: _.map(filters, (filter, key) => ({ key, value: filter.value })),
        searchValue,
      });
  };
  renderFilter = (column: any, filterInfo = {}, index: number) => {
    const { filter } = column;
    if (!filter) {
      return null;
    }
    const columnKey = this.getColumnKey(column, index);
    const { options, multiple, onChange = () => {}, ...rest } = filter;
    const newOptions = _.map(options, (option) =>
      _.isObject(option) ? option : { value: option },
    );

    const { value } = filterInfo as any;
    const finalValue = value == null || (multiple && !value.length) ? null : value;

    return (
      <Select
        options={newOptions}
        value={finalValue}
        onChange={(value) => {
          this.handleFilter(
            columnKey,
            value == null || (multiple && !(value as any).length) ? null : value,
          );
          onChange(value);
        }}
        className={`${prefixCls}-filter`}
        renderSelector={(content, active) => {
          return <FilterIcon key="icon" type="filter" active={active} />;
        }}
        multiple={multiple}
        {...rest}
      />
    );
  };
  handleFilter = (key: any, value: any) => {
    const finalFilters = this.mergeFilters(
      (this.state as any).filters,
      {
        ...(this.state as any).filtersFromProps,
        [key]: {
          value,
        },
      },
      (this.props as any).columns,
    );
    this.setState({
      pagination: { ...(this.state as any).pagination, current: 1 },
    });
    this.handleConditionChange({ filters: finalFilters });
  };
  clearFilter = () => {
    this.handleConditionChange({ filters: {}, searchValue: '' }, { filters: {} });
  };
  renderOrder = (order: any, key: any, dataIndex: number, state = 'none') => {
    if (!order) {
      return null;
    }
    const { handleOrder } = order;

    return (
      <SortIcon
        type={
          {
            none: 'sort_init',
            desc: 'sort_alt',
            asc: 'sort',
          }[state]
        }
        onClick={() => {
          this.handleOrder(key, {
            dataIndex,
            handleOrder,
            state,
          });
        }}
      />
    );
  };
  handleOrder = (key: any, { dataIndex, handleOrder, state }: any) => {
    const order =
      state === 'asc'
        ? null
        : {
            key,
            dataIndex,
            handleOrder,
            state: (
              {
                none: 'desc',
                desc: 'asc',
              } as any
            )[state],
          };
    // controlled
    if ('order' in this.props) {
      this.handleConditionChange({}, { order });
    } else {
      this.handleConditionChange({
        order,
      });
    }
  };
  flatDataSource = (dataSource: any[] = [], childrenName = 'children') => {
    const result: any[] = [];
    const push = (record: any) => {
      const index = result.length;
      result.push({
        record,
        index,
        key: this.getRowKey(record, index),
      });
    };
    const loop = (array: any[]) => {
      array.forEach((record: any) => {
        if (record[childrenName]) {
          const newRecord = { ...record };
          delete newRecord[childrenName];
          push(newRecord);
          if (record[childrenName].length > 0) {
            loop(record[childrenName]);
          }
        } else {
          push(record);
        }
      });
    };
    loop(dataSource);
    return result;
  };
  getDataSource = (filters: any) => {
    const { dataSource, handleSearch, doNotHandleCondition } = this.props as any;
    const { order, searchValue } = this.state as any;
    let data = _.clone(dataSource);
    const doFilter = (dataSource: any, filter: any) => {
      const { value, column: columnInfo } = filter;
      const {
        dataIndex,
        filter: {
          multiple,
          handleFilter = (value: any, record: any, filterValue: any, multiple: boolean) => {
            if (value == null) {
              return false;
            }
            if (_.isNumber(value)) {
              value = '' + value;
            } else if (!_.isString(value)) {
              return false;
            }
            if (!multiple) {
              return value.indexOf(filterValue) >= 0;
            } else {
              for (let i = 0; i < filterValue.length; i++) {
                const v = filterValue[i];
                if (value.indexOf(v) >= 0) {
                  return true;
                }
              }
            }
          },
        },
      } = columnInfo;
      return _.filter(dataSource, (record) => {
        return handleFilter(record[dataIndex], record, value, multiple);
      });
    };
    if (!doNotHandleCondition && !_.isEmpty(filters)) {
      _.forEach(filters, (filter: any, key: any) => (data = doFilter(data, filter)));
    }
    const doSearch = (dataSource: any, searchValue: any) => {
      return dataSource.filter((record: any) => {
        return handleSearch(record, searchValue);
      });
    };
    if (!doNotHandleCondition && searchValue && searchValue.trim()) {
      data = doSearch(data, searchValue.trim());
    }
    const doOrder = (dataSource: any, order: any) => {
      const { dataIndex, handleOrder, state } = order;
      return dataSource.sort(
        handleOrder
          ? (...args: any) => handleOrder(state, ...args)
          : (
              {
                desc: (a: any, b: any) =>
                  a[dataIndex] > b[dataIndex] ? -1 : a[dataIndex] < b[dataIndex] ? 1 : 0,
                asc: (a: any, b: any) =>
                  a[dataIndex] < b[dataIndex] ? -1 : a[dataIndex] > b[dataIndex] ? 1 : 0,
              } as any
            )[state],
      );
    };
    if (!doNotHandleCondition && order) {
      data = doOrder(data, order);
    }

    const total = data.length;
    const pagination = this.getPagination();
    if (!doNotHandleCondition && pagination !== null) {
      const { current, pageSize } = pagination;
      const from = (current - 1) * pageSize;
      const to = from + pageSize;
      data = data.slice(from, to);
    }
    return {
      dataSource: data,
      total,
    };
  };
  handleToggleCurrentPage = (enableKeysOfCurrentPage: any, checked: any) => {
    const { selectedRowKeyMap } = this.state as any;
    const extendSelectedRowKeyMap = {};
    _.each(enableKeysOfCurrentPage, (key) => {
      (extendSelectedRowKeyMap as any)[key] = checked;
    });
    this.onSelectedRowKeysChange({
      ...selectedRowKeyMap,
      ...extendSelectedRowKeyMap,
    });
  };
  handleSelectRecord = (key: any, checked?: any) => {
    const { rowSelection } = this.props as any;
    const { selectedRowKeyMap } = this.state as any;
    if (rowSelection.multiple === false) {
      this.onSelectedRowKeysChange({
        [key]: true,
      });
    } else {
      this.onSelectedRowKeysChange({
        ...selectedRowKeyMap,
        [key]: checked,
      });
    }
  };
  getRowKey = (record: any, index?: number) => {
    const rowKey = (this.props as any).rowKey;
    const key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
    return key === undefined ? index : key;
  };
  getColumnKey = (column: any = {}, index: number) => {
    const { key } = column;
    return (key === undefined ? index : key) + '';
  };
  getColumns = (dataSourceOfCurrentPage: any, filters: any) => {
    const { columns, rowSelection, columnPlaceholder, locale, dataSource } = this.props as any;
    const { order: currentOrder = {}, selectedRowKeyMap, columnConfig } = this.state as any;
    const cloneColumns = columns.map((column: any, index: number) => ({
      ...column,
      index,
    }));
    let newColumns = cloneColumns.filter((column: any) => {
      const { key } = column;
      return !columnConfig[key] || !columnConfig[key].hidden;
    });

    const generateColumnTitle = (column: any) => {
      const { dataIndex, title, renderTitle, order, children, index } = column;
      const columnKey = this.getColumnKey(column, index);
      if (children) {
        return {
          ...column,
          children: children.map(generateColumnTitle),
        };
      } else {
        return {
          ...column,
          title: (
            <div>
              {renderTitle ? renderTitle(title) : title}
              {this.renderFilter(column, filters[columnKey], index)}
              {this.renderOrder(
                order,
                columnKey,
                dataIndex,
                currentOrder && currentOrder.key === columnKey ? currentOrder.state : 'none',
              )}
            </div>
          ),
        };
      }
    };
    newColumns = newColumns.map(generateColumnTitle);

    if (rowSelection) {
      const flatDataSourceOfCurrentPage = this.flatDataSource(dataSourceOfCurrentPage);
      let enableDataSourceOfCurrentPage = flatDataSourceOfCurrentPage;
      const flatDataSource = this.flatDataSource(dataSource);
      let enableDataSource = flatDataSource;

      const { disabled: selectionDisabled } = rowSelection;

      if (rowSelection.getDisabledOfRow) {
        enableDataSourceOfCurrentPage = _.filter(
          flatDataSourceOfCurrentPage,
          (item) => !rowSelection.getDisabledOfRow(item.record),
        );
        enableDataSource = _.filter(
          flatDataSource,
          (item) => !rowSelection.getDisabledOfRow(item.record),
        );
      }
      const selectedEnableDataSourceOfCurrentPage = _.filter(
        enableDataSourceOfCurrentPage,
        (item) => selectedRowKeyMap[item.key],
      );
      const selectedEnableDataSource = _.filter(
        enableDataSource,
        (item) => selectedRowKeyMap[item.key],
      );

      const selectedEnableDataSourceOfCurrentPageCount =
        selectedEnableDataSourceOfCurrentPage.length;
      const isAllSelected =
        selectedEnableDataSourceOfCurrentPageCount === enableDataSourceOfCurrentPage.length &&
        selectedEnableDataSourceOfCurrentPageCount > 0;

      const selectedCount = _.filter(selectedRowKeyMap, (v) => v).length;
      const renderSelectedAllCheckbox = () => (
        <Checkbox
          disabled={selectionDisabled}
          onChange={() => {
            const enableKeysOfCurrentPage = enableDataSourceOfCurrentPage.map((item) => item.key);
            this.handleToggleCurrentPage(enableKeysOfCurrentPage, !isAllSelected);
          }}
          checked={isAllSelected}
          indeterminate={!isAllSelected && selectedEnableDataSourceOfCurrentPageCount > 0}
        />
      );
      newColumns.unshift({
        title:
          rowSelection.multiple === false ? null : rowSelection.selectedTip === false ? (
            renderSelectedAllCheckbox()
          ) : (
            <Tooltip
              visible={selectedCount > 0}
              getPopupContainer={this.getPopupContainer}
              popup={
                <span>
                  {locale.selected} {selectedCount}{' '}
                  <CancelSelect
                    onClick={() => {
                      const enableKeys = selectedEnableDataSource.map((item) => item.key);
                      this.handleToggleCurrentPage(enableKeys, false);
                    }}
                  >
                    {locale.cancelSelect}
                  </CancelSelect>
                </span>
              }
              placement={rowSelection.selectedTip === 'bottom' ? 'bottomLeft' : 'topLeft'}
              align={{
                offset: [-8, 0],
              }}
            >
              {renderSelectedAllCheckbox()}
            </Tooltip>
          ),
        key: 'table_row_selection',
        width: 32,
        fixed: rowSelection.fixed,
        onHeaderCell: () => ({ className: selectIconHeaderCls }),
        onCell: () => ({ className: selectIconCellCls }),
        render: (value: any, record: any, index: number) => {
          const rowKey = this.getRowKey(record, index);
          let disabled = false;
          if (selectionDisabled) {
            disabled = true;
          } else if (rowSelection.getDisabledOfRow) {
            disabled = rowSelection.getDisabledOfRow(record);
          }
          return rowSelection.multiple === false ? (
            <Radio
              disabled={disabled}
              onChange={() => this.handleSelectRecord(rowKey)}
              checked={!!selectedRowKeyMap[rowKey]}
            />
          ) : (
            <Checkbox
              disabled={disabled}
              onChange={() => this.handleSelectRecord(rowKey, !selectedRowKeyMap[rowKey])}
              checked={!!selectedRowKeyMap[rowKey]}
            />
          );
        },
      });
    }

    if (columnPlaceholder) {
      const lastUnFixedIndex = _.findLastIndex(
        newColumns,
        (columnConfig) => !(columnConfig as any).fixed,
      );
      newColumns.splice(lastUnFixedIndex + 1, 0, {
        title: '',
        key: placeholderKey,
        onHeaderCell: () => ({ className: placeholderHeaderCls }),
        onCell: () => ({ className: placeholderCellCls }),
        render: () => null,
      });
    }
    return newColumns;
  };
  getPagination = () => {
    const { pagination: paginationS } = this.state as any,
      { pagination: paginationP } = this.props as any;
    return paginationP === null
      ? null
      : {
          ...paginationS,
          ...paginationP,
        };
  };
  renderSearchInfo = (option: any) => {
    const { filters, searchValue, total, locale } = option;

    let first = true;
    const renderLabel = ({
      value,
      column: {
        filter: { multiple, options },
      },
    }: any) => {
      options = options.map((option: any) =>
        !_.isObject(option) ? { value: option, label: option } : option,
      );
      if (multiple) {
        const label = _.map(value, (v) => {
          const option = _.find(options, (option) => {
            return v === option.value;
          });
          return option && option.label;
        });
        let first = true;
        return _.map(label, (_label) => (first ? [(first = false), _label] : [' | ', _label]));
      } else {
        const option = _.find(options, (option) => {
          return value === option.value;
        });
        return option && option.label;
      }
    };
    return !_.isEmpty(filters) || searchValue ? (
      <div key="search-info" className={`${prefixCls}-search-tip-wrap`}>
        <Notice icon={null} closable={false} className={`${prefixCls}-filter-notice`}>
          {searchValue && (
            <span>
              {locale.search}
              {locale.colon}
              {searchValue}
              {locale.semicolon}
            </span>
          )}
          {!_.isEmpty(filters) && (
            <span>
              {locale.filter}
              {locale.colon}
              {_.map(filters, (filterInfo) =>
                first
                  ? [(first = false), renderLabel(filterInfo)]
                  : [', ', renderLabel(filterInfo)],
              )}
              {locale.semicolon}
            </span>
          )}
          <span>
            {locale.searchResult}
            {locale.colon}
            {total}
            {locale.items}
            {locale.semicolon}
          </span>
          <span>
            <a className={`${prefixCls}-reset-link`} onClick={this.clearFilter}>
              {locale.reset}
            </a>
          </span>
        </Notice>
      </div>
    ) : null;
  };
  renderEmptyAndErrorInfo = (option: any) => {
    const { dataSource, emptyContent, errorContent } = option;
    if (errorContent) {
      return (
        <div key="tip-info" className={`${prefixCls}-tip-wrap`}>
          <div className={`${prefixCls}-error-content-wrap`}>{errorContent}</div>
        </div>
      );
    }
    if ((!dataSource || !dataSource.length) && emptyContent) {
      return (
        <div key="tip-info" className={`${prefixCls}-tip-wrap`}>
          <div className={`${prefixCls}-empty-content-wrap`}>{emptyContent}</div>
        </div>
      );
    }
  };
  renderTitle = (option: any) => {
    const { title } = this.props as any;
    return [
      title && (
        <div className={`${prefixCls}-custom-title`} key="custom">
          {title()}
        </div>
      ),
      this.renderSearchInfo(option),
    ];
  };
  renderFooter = (option: any) => {
    return <div>{this.renderEmptyAndErrorInfo(option)}</div>;
  };
  onExpandHandler = (expanded: any, record: any) => {
    const { changedUnExpandedRowKeys = {} } = this.state as any;
    const { onExpand } = this.props as any;
    const rowKey = this.getRowKey(record);
    if (expanded) {
      delete changedUnExpandedRowKeys[rowKey];
    } else {
      changedUnExpandedRowKeys[rowKey] = true;
    }
    this.setState({
      changedUnExpandedRowKeys,
    });
    if (onExpand) {
      onExpand(expanded, record);
    }
  };
  onRow = (record: any, index: number) => {
    const { onRow = noop, contextMenu } = this.props as any;
    return {
      ...onRow(record, index),
      record,
      contextMenu,
    };
  };

  popupContainer: any;
  savePopupContainer = (_ref: any) => {
    this.popupContainer = _ref;
  };
  getPopupContainer = () => this.popupContainer;
  render() {
    /* eslint-disable no-unused-vars */
    let {
      pagination: _p,
      dataSource: _d,
      columns: _c,
      rowSelection,
      onRowSelect,
      contextMenu,
      emptyContent,
      errorContent,
      className,
      style,
      expandedRowRender,
      expandIconAsCell,
      expandIconColumnIndex,
      defaultExpandAllRows,
      title = noop,
      footer = noop,
      locale,
      hideExpandIcon,
      onRow = noop,
      components,
      onExpand,
      zebraCrossing,
      columnPlaceholder,
      tableLayout,
      scroll,
      customStyle,
      ...rest
    } = this.props as any;
    if (emptyContent === undefined) {
      emptyContent = <Notice closable={false}>{locale.emptyTip}</Notice>;
    }
    /* eslint-enable no-unused-vars */
    const pagination = this.getPagination();
    const { filters, filtersFromProps, searchValue, columnConfig } = this.state as any;
    const finalFilters = this.mergeFilters(filters, filtersFromProps, _c);
    let { dataSource, total } = this.getDataSource(finalFilters);
    if (pagination && 'total' in pagination) {
      total = pagination.total;
    }
    const columns = this.getColumns(dataSource, finalFilters);

    const defaultExpandAllRowsProps = !defaultExpandAllRows
      ? null
      : (() => {
          const { changedUnExpandedRowKeys = {} } = this.state as any;
          const expandedRowKeys = this.getExpandedRowKeys(dataSource, changedUnExpandedRowKeys);

          return {
            expandedRowKeys,
          };
        })();

    return (
      <InheritProvider value={{ getPopupContainer: this.getPopupContainer }}>
        <TableContext.Provider
          value={{
            columns: _c,
            columnConfig: columnConfig,
            onColumnConfigChange: this.onColumnConfigChange,
            handleSearch: this.handleSearch,
            locale,
          }}
        >
          <TableWrap
            className={className}
            style={style}
            hideExpandIcon={hideExpandIcon}
            zebraCrossing={zebraCrossing}
            customStyle={customStyle}
            scroll={scroll}
          >
            <PopupContainer ref={this.savePopupContainer} />
            <RcTable
              {...defaultExpandAllRowsProps}
              onExpand={this.onExpandHandler}
              {...rest}
              scroll={scroll}
              tableLayout={tableLayout ? tableLayout : scroll && scroll.x ? 'fixed' : undefined}
              prefixCls={prefixCls}
              data={dataSource}
              columns={columns}
              onRow={this.onRow}
              components={_.extend({}, components, {
                body: {
                  row: TableRow,
                },
              })}
              emptyText={null}
              expandIconAsCell={!!expandedRowRender || expandIconAsCell}
              expandedRowRender={expandedRowRender}
              expandIconColumnIndex={
                expandIconColumnIndex === undefined
                  ? columns[0] && columns[0].key === 'table_row_selection'
                    ? 1
                    : 0
                  : expandIconColumnIndex
              }
              title={() => this.renderTitle({ filters: finalFilters, searchValue, total, locale })}
              footer={() => this.renderFooter({ dataSource: _d, emptyContent, errorContent })}
            />
            {footer()}
            {pagination === null ? null : (
              <Pagination
                size="sm"
                total={total}
                {...{
                  hideOnSinglePage: false,
                  showQuickJumper: true,
                  showSizeChanger: true,
                }}
                {...pagination}
                className={`${prefixCls}-pagination`}
                onChange={(current, pageSize) => {
                  this.setState({
                    pagination: { current, pageSize },
                  });
                  pagination.onChange && pagination.onChange(current, pageSize);
                }}
                onPageSizeChange={(current, pageSize) => {
                  this.setState({
                    pagination: { current, pageSize },
                  });
                  pagination.onPageSizeChange && pagination.onPageSizeChange(current, pageSize);
                }}
                onAdvise={(current, pageSize) => {
                  this.setState({
                    pagination: { current, pageSize },
                  });
                  pagination.onAdvise && pagination.onAdvise(current, pageSize);
                }}
              />
            )}
          </TableWrap>
        </TableContext.Provider>
      </InheritProvider>
    );
  }
}

// TODO 这里应该用ForwardRef包裹一下，外界需要调用内部方法
export default Table;
export { prefixCls };
