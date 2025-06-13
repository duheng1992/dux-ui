import styled from '@emotion/styled';
import { css } from '@emotion/core';

import styleWrap from '../../../style/styleWrap';
import config from '../../../config';
import { clearFixMixin } from '../../../style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-upload';

// selector
export const selectorCls = prefixCls + '-selector';

// list
export const listCls = prefixCls + '-list';
export const cardListCls = listCls + '-card-list';
export const listWrapCls = listCls + '-wrap';
export const errorCls = prefixCls + '-error';
export const itemCls = prefixCls + '-item';
export const itemErrorCls = itemCls + '-error';
export const previewAbleCls = itemCls + '-preview-able';
export const nameCls = prefixCls + '-name';
export const progressCls = prefixCls + '-progress';
export const progressWrapCls = progressCls + '-wrap';
export const detailCls = prefixCls + '-detail';
export const actionCls = prefixCls + '-action';
export const actionIconCls = actionCls + '-icon';
export const removeCls = prefixCls + '-remove';
export const thumbnailCls = prefixCls + '-thumbnail';
export const fullThumbnailCls = thumbnailCls + '-full';
export const errorIconCls = errorCls + '-icon';
export const uploadingTipCLs = prefixCls + '-uploading-tip';
export const uploadingIconCLs = uploadingTipCLs + '-icon';
export const imageCls = prefixCls + '-image';
export const menuCls = prefixCls + '-menu';
export const separatorCls = prefixCls + '-separator';

// icons
export const iconCls = prefixCls + '-icon';
export const archiveIconCls = iconCls + '-archive';
export const docsIconCls = iconCls + '-docs';
export const imageIconCls = iconCls + '-image';
export const textIconCls = iconCls + '-text';
export const pdfIconCls = iconCls + '-pdf';
export const unknownIconCls = iconCls + '-unknown';
export const iconWrapCls = iconCls + '-wrap';
export const tipCls = prefixCls + '-tip';

// dropzone
export const dropzoneCls = prefixCls + '-dropzone';
export const dragingCls = prefixCls + '-draging';
export const dropzoneTipCls = dropzoneCls + '-tip';
export const dropzoneMaskTipCls = dropzoneCls + '-tip-mask';
export const dropzoneTipMainCls = dropzoneTipCls + '-main';
export const dropzoneTipSubCls = dropzoneTipCls + '-sub';

export const UploadWrap = styleWrap({
  className: prefixCls,
})(
  styled('div')`
    .${selectorCls} + .${listWrapCls}, .${selectorCls} + .${dropzoneCls} {
      margin-top: 12px;
    }
  `,
);

export const SelectorWrap = styleWrap({
  className: selectorCls,
})(
  styled('div')((props) => {
    const {
      disabled,
      theme: { designTokens: DT },
    } = props as any;

    return css`
      display: inline-block;
      cursor: pointer;

      ${disabled &&
      css`
        pointer-events: none;
      `};

      .${tipCls} {
        margin-left: 5px;
        color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
      }
    `;
  }),
);

export const ListWrap = styleWrap({
  className: listWrapCls,
})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
      customStyle = {},
    } = props as any;

    return css`
      max-height: ${customStyle.listMaxHeight || '240px'};
      overflow: auto;
      > div {
        overflow: hidden;
      }

      .${listCls} {
        box-sizing: border-box;
        padding: 4px 16px;
        background: ${DT.T_COLOR_BG_DEFAULT_DARK};

        .${itemCls} {
          display: table;
          width: 100%;
          padding: 8px 0;
          color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
          line-height: 20px;
          table-layout: fixed;
          border-bottom: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};

          &:last-of-type {
            border-bottom: none;
          }

          .${thumbnailCls} {
            display: table-cell;
            padding: 4px 16px 4px 0;
          }
          .${detailCls} {
            display: table-cell;
            vertical-align: middle;
          }
          .${actionCls} {
            display: table-cell;
            width: 100px;
            padding-left: 8px;
            white-space: nowrap;
            text-align: right;
            vertical-align: middle;
          }
          .${removeCls} {
            margin-left: 12px;
            cursor: pointer;
            fill: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
          }
          &.${previewAbleCls} {
            :hover {
              .${detailCls} {
                color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
                cursor: pointer;
              }
            }
          }
          &.${itemErrorCls}.${itemErrorCls}.${itemErrorCls} {
            .${detailCls} {
              color: ${DT.T_COLOR_TEXT_REMARK_DARK};
            }
            .${iconWrapCls} {
              background: ${DT.T_COLOR_BG_ERROR_DARK};
              border: none;
              .${iconCls} {
                fill: ${DT.T_COLOR_TEXT_DEFAULT_NORMAL};
              }
            }
          }
          .${errorCls} {
            margin-top: 4px;
          }
          .${errorIconCls} {
            margin-right: 4px;
            vertical-align: middle;
            fill: ${DT.T_COLOR_TEXT_ERROR};
          }
          .${uploadingTipCLs} {
            color: ${DT.T_COLOR_TEXT_REMARK_DARK};
          }
          .${uploadingIconCLs} {
            margin-right: 4px;
            vertical-align: middle;
            fill: ${DT.T_COLOR_TEXT_REMARK_DARK};
          }
        }
      }

      .${cardListCls} {
        margin-right: -16px;
        margin-bottom: -16px;
        overflow: hidden;
        ${clearFixMixin};

        .${itemCls} {
          position: relative;
          float: left;
          box-sizing: border-box;
          width: 140px;
          height: 140px;
          margin-right: 16px;
          margin-bottom: 16px;
          background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
          border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
          border-radius: 4px;

          .${thumbnailCls} {
            display: block;
            margin: 32px auto 24px auto;
          }
          .${nameCls} {
            padding: 0 12px;
            text-align: center;
          }
          .${progressWrapCls} {
            padding: 0 18px;
          }
          .${errorCls} {
            padding: 0 12px;
            text-align: center;
          }

          &.${itemErrorCls}.${itemErrorCls}.${itemErrorCls} {
            background: ${DT.T_COLOR_BG_ERROR_LIGHT};
            border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
          }

          .${menuCls} {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: none;
            background: ${DT.T_MODAL_COLOR_LAYER_DEFAULT};
            border-radius: 4px;
            .${nameCls} {
              color: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
            }
            .${actionCls} {
              margin: 40px auto 30px;
              line-height: 24px;
              text-align: center;
            }
            .${actionIconCls} {
              margin: 0 16px;
              cursor: pointer;
              fill: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
            }
            .${actionIconCls} + .${actionIconCls} {
              position: relative;
            }
            .${separatorCls} {
              display: inline-block;
              width: 1px;
              height: 24px;
              vertical-align: middle;
              background: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
            }
          }
          :hover {
            .${menuCls} {
              display: block;
            }
          }
          .${fullThumbnailCls} {
            width: 100%;
            height: 100%;
            margin: 0;
          }
        }
      }
      .${errorCls} {
        overflow: hidden;
        color: ${DT.T_COLOR_TEXT_ERROR};
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .${progressWrapCls} {
        line-height: 20px;
        .${progressCls} {
          display: inline-block;
          width: 100%;
          vertical-align: middle;
        }
      }

      .${nameCls} {
        display: block;
        overflow: hidden;
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .${thumbnailCls} {
        width: 38px;
        height: 38px;
        overflow: hidden;
        .${imageCls}, .${iconWrapCls} {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
        .${imageCls} {
          background: white center center no-repeat;
          background-size: cover;
        }
        .${iconWrapCls} {
          line-height: 36px;
          text-align: center;
          background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
          border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        }
      }

      .${imageIconCls} {
        fill: ${DT.T_COLOR_LEGEND_CYAN_5};
      }
      .${archiveIconCls} {
        fill: ${DT.T_COLOR_LEGEND_ORANGE_5};
      }
      .${docsIconCls} {
        fill: ${DT.T_COLOR_LEGEND_BLUE_5};
      }
      .${unknownIconCls} {
        fill: ${DT.T_COLOR_LEGEND_PURPLE_5};
      }
    `;
  }),
);

export const DropZoneWrap = styleWrap({
  className: dropzoneCls,
})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
      customStyle = {},
    } = props as any;

    return css`
      border: 1px dashed ${DT.T_COLOR_LINE_DEFAULT_DARK};
      border-radius: 4px;
      transition: 0.3s border-color;
      position: relative;
      background: ${DT.T_COLOR_BG_DEFAULT_DARK};

      .${listWrapCls} {
        min-height: 210px;
        max-height: ${customStyle.listMaxHeight || '300px'};
        overflow: auto;
      }
      .${cardListCls} {
        padding: 24px;
      }

      .${dropzoneTipCls} {
        box-sizing: border-box;
        height: 100%;
        padding: 40px 0;
        text-align: center;
        background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
        transition: 0.3s background-color;

        .${iconCls} {
          transition: 0.3s fill;
          fill: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
        }
        .${dropzoneTipMainCls} {
          margin-top: 24px;
          margin-bottom: 4px;
          color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
          font-weight: bold;
          font-size: 18px;
          line-height: 26px;
        }
        .${dropzoneTipSubCls} {
          color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
          font-size: 14px;
          line-height: 22px;
        }
      }
      .${dropzoneMaskTipCls} {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: none;

        .${dropzoneTipCls} {
          box-sizing: border-box;
          height: 100%;
          background: ${DT.T_MODAL_COLOR_LAYER_DEFAULT};
        }
      }

      &.${dragingCls} {
        border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};

        .${dropzoneTipCls} {
          background: ${DT.T_COLOR_BG_DEFAULT_DARK};
          .${iconCls} {
            fill: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
          }
        }
        .${dropzoneMaskTipCls} {
          display: block;

          .${dropzoneTipCls} {
            background: ${DT.T_MODAL_COLOR_LAYER_DEFAULT};
            .${iconCls} {
              fill: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
            }
            .${dropzoneTipMainCls} {
              color: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
            }
            .${dropzoneTipSubCls} {
              color: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
            }
          }
        }
      }
    `;
  }),
);

export const ErrorTipWrap = styled.div`
  padding: 16px;
`;
