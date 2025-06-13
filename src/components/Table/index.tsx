import Table from './Table';
export default Table;

import ColumnConfigButton from './ColumnConfigButton';
(Table as any).ColumnConfigButton = ColumnConfigButton;

import SearchInput from './SearchInput';
(Table as any).SearchInput = SearchInput;

import ActionList from './ActionList';
(Table as any).ActionList = ActionList;

import ExpandedRowContent from './ExpandedRowContent';
(Table as any).ExpandedRowContent = ExpandedRowContent;

import HoverDisplayArea from './HoverDisplayArea';
(Table as any).HoverDisplayArea = HoverDisplayArea;

import * as utils from './utils';
Object.assign(Table, utils);
