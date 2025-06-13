import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { clearFixMixin, inlineBlockWithVerticalMixin } from '../../../style';
import Button from '../../Button';
// import Notice from '../../Notice';
import Checkbox from '../../Checkbox';
import Icon from '../../Icon';
import config from '../../../config';

import styleWrap from '../../../style/styleWrap';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-table';
export const wrapperCls = prefixCls + '-wrapper';

export const SortIcon = styleWrap<any>()(
  styled(Icon)((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      vertical-align: middle;
      cursor: pointer;
      fill: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
    `;
  }),
);
export const FilterIcon = styleWrap<any>()(
  styled(Icon)((props) => {
    const {
      active,
      theme: { designTokens: DT },
    } = props;

    return css`
      fill: ${active ? DT.T_COLOR_TEXT_PRIMARY_DEFAULT : DT.T_COLOR_TEXT_DEFAULT_DARK};
    `;
  }),
);

export const selectIconCellCls = prefixCls + '-row-select-icon-cell';
export const selectIconHeaderCls = prefixCls + '-select-icon-th';
export const placeholderCellCls = prefixCls + '-placeholder-cell';
export const placeholderHeaderCls = prefixCls + '-placeholder-th';
const expandedRowContentCls = prefixCls + '-expanded-row-content';
export const hoverDisplayAreaCls = prefixCls + '-hover-display-area';

export const ExpandedRowContent = styleWrap({
  className: expandedRowContentCls,
})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
      border-bottom: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
      background: ${DT.T_TABLE_ROW_COLOR_BG_DEFAULT};
      padding: 12px;
      line-height: 20px;
    `;
  }),
);

export const TableWrap = styleWrap<any>({
  className: wrapperCls,
})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
      zebraCrossing,
      customStyle = {},
      hideExpandIcon,
      scroll,
    } = props as any;

    const isScrollX = !!scroll?.x;

    return css`
      ${clearFixMixin};
      padding: ${customStyle.outerPadding || '0px'};
      color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
      border-radius: ${DT.T_CORNER_SM};
      background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
      font-size: ${DT.T_TYPO_FONT_SIZE_1};

      .${prefixCls} {
        &-pagination {
          float: right;
          margin-top: 8px;
        }
        &-filter {
          margin-right: 4px;
          padding: 0;
          line-height: 0;
          border: none;
          cursor: pointer;
        }
        table {
          width: 100%;
          min-width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        &-filter-notice,
        &-empty-content-wrap,
        &-error-content-wrap {
          max-width: 400px;
          margin: 12px auto;
          text-align: center;
        }
        &-empty-content-wrap,
        &-error-content-wrap {
          margin: 40px auto;
        }
        &-reset-link {
          color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
          cursor: pointer;
        }
        &-fixed,
        &-body {
          background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
        }

        &-row-expand-icon {
          width: 18px;
          height: 18px;
          color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
          line-height: 18px;
          text-align: center;
          border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
          cursor: pointer;
          ${inlineBlockWithVerticalMixin};
          &-cell {
            width: 20px;
          }
          :hover {
            color: ${DT.T_COLOR_TEXT_PRIMARY_HOVER};
            border-color: ${DT.T_COLOR_LINE_PRIMARY_HOVER};
          }
        }
        &-expand-icon-th {
          width: 20px;
        }
        &-row-expand-icon.${prefixCls}-row-collapsed:before {
          content: '+';
        }
        &-row-expand-icon.${prefixCls}-row-expanded:before {
          content: '-';
        }
        &-row-spaced {
          visibility: hidden;
        }
        &-row-expanded,
        &-row-collapsed {
          margin-right: 8px;
        }
        &-row-expand-icon-cell .${prefixCls}-row-expand-icon {
          margin: 0;
        }

        ${hideExpandIcon &&
        css`
          &-row-expand-icon-cell,
          &-expand-icon-th,
          &-expand-icon-col,
          &-expanded-row > td:first-of-type {
            display: none;
          }
        `}

        &-fixed-header .${prefixCls}-header {
          min-width: 100%;
          margin-bottom: -20px;
          padding-bottom: 20px;
          overflow: scroll;
        }

        ${isScrollX &&
        css`
          .${prefixCls}-header, .${prefixCls}-body {
            overflow: initial !important;
          }

          .${prefixCls}-content {
            overflow: auto;
          }
        `}

        &-content {
          position: relative;
          clear: both;
          width: 100%;
        }
        &-thead > tr > th {
          position: relative;
          padding: 12px;
          color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
          font-weight: 400;
          line-height: 22px;
          text-align: left;
          vertical-align: middle;
          border-bottom: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
          &.${prefixCls}-expand-icon-th, &.${selectIconHeaderCls} {
            padding-left: 0;
            border-color: transparent;
          }
          &.${placeholderHeaderCls} {
            padding: 0px;
            font-size: 0px;
          }
        }
        &-scroll-position-right,
        &-scroll-position-middle,
        &-scroll-position-left {
          .${prefixCls}-th-fixed-left-latest,
            .${prefixCls}-row-cell-fixed-left-latest,
            .${prefixCls}-th-fixed-right-first,
            .${prefixCls}-row-cell-fixed-right-first {
            ::after {
              position: absolute;
              top: 0;
              width: 30px;
              height: 100%;
              transition: box-shadow 0.3s;
              content: '';
              pointer-events: none;
            }
          }
          .${prefixCls}-th-fixed-left-latest, .${prefixCls}-row-cell-fixed-left-latest {
            ::after {
              right: -30px;
            }
          }
          .${prefixCls}-th-fixed-right-first, .${prefixCls}-row-cell-fixed-right-first {
            ::after {
              left: -30px;
            }
          }
        }
        &-scroll-position-right,
        &-scroll-position-middle {
          .${prefixCls}-th-fixed-left-latest, .${prefixCls}-row-cell-fixed-left-latest {
            ::after {
              box-shadow: ${DT.T_SHADOW_INSET_LEFT};
            }
          }
        }
        &-scroll-position-left,
        &-scroll-position-middle {
          .${prefixCls}-th-fixed-right-first, .${prefixCls}-row-cell-fixed-right-first {
            ::after {
              box-shadow: ${DT.T_SHADOW_INSET_RIGHT};
            }
          }
        }
        &-row,
        &-row > td,
        &-thead,
        &-thead > tr,
        &-thead > tr > th {
          background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
        }
        &-row > td {
          position: relative;
          padding: 12px;
          line-height: 22px;
          text-align: left;
          vertical-align: middle;
          overflow-wrap: break-word;
          border-bottom: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
          &.${prefixCls}-row-expand-icon-cell, &.${selectIconCellCls} {
            padding-left: 0;
            border-color: transparent;
          }
          &.${placeholderCellCls} {
            padding: 0;
            font-size: 0;
          }
        }
        &-row-level-1 > td,
        &-row-level-2 > td,
        &-row-level-3 > td,
        &-row-level-4 > td,
        &-row-level-5 > td {
          background: ${DT.T_TABLE_ROW_COLOR_BG_DEFAULT};
          &.${prefixCls}-row-expand-icon-cell, &.${prefixCls}-row-select-icon-cell {
            background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
          }
          &.${prefixCls}-row-expand-icon-cell .${prefixCls}-row-spaced {
            position: absolute;
            top: 0;
            left: 10px;
            display: block;
            width: 1px;
            height: 100%;
            padding: 0;
            background: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            border: none;
            border-bottom: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
            visibility: visible;
            cursor: default;
          }
        }
        &-custom-title {
          margin-bottom: 16px;
        }
        &-tip-wrap {
          border-bottom: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        }

        table > tbody > .${prefixCls}-row:hover > td {
          background: ${DT.T_TABLE_ROW_COLOR_BG_HOVER};
          &.${prefixCls}-row-expand-icon-cell, &.${selectIconCellCls} {
            background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
          }
        }
        .${hoverDisplayAreaCls} {
          display: inline;
          visibility: hidden;
        }
        table > tbody > .${prefixCls}-row:hover {
          .${hoverDisplayAreaCls} {
            visibility: visible;
          }
        }

        &-row-indent.indent-level-0 {
          display: none;
        }

        ${zebraCrossing &&
        css`
          &-row:nth-child(odd) > td {
            background: ${DT.T_TABLE_ROW_COLOR_BG_DEFAULT};
            &.${prefixCls}-row-expand-icon-cell, &.${selectIconCellCls} {
              background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
            }
          }
        `};
      }
    `;
  }),
);

export const PopupContainer = styled('div')`
  position: relative;
  z-index: 10;
`;

export const ColumnConfigWrap = styled('span')`
  ${inlineBlockWithVerticalMixin};
`;

export const ColumnConfigButtonWrap = styled(Button)`
  /* empty */
`;

export const ColumnConfigModalNotice = styled('div')`
  border-width: 0 0 1px 0;
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  margin: 0px;
  border-radius: 1px;
  line-height: 18px;
  overflow: hidden;
  color: rgb(10, 22, 51);
  border-style: solid;
  border-color: rgb(210, 214, 234);
  border-image: initial;
  background: rgb(250, 250, 252);
  border-width: 0px 0px 1px;
`;

export const ColumnConfigModalCheckboxGroup = styled(Checkbox.Group)`
  padding: 20px;
`;

export const ColumnConfigModalCheckbox = styled(Checkbox)`
  padding: 12px 0;
`;

export const CancelSelect = styleWrap()(
  styled('span')((props) => {
    const {
      theme: { designTokens: DT },
    } = props;

    return css`
      cursor: pointer;
      color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
    `;
  }),
);
