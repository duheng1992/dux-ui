import _ from 'lodash';

import { designTokens } from './designTokens';

const defaultSizeTheme = {
    // default font-size
    fontSize: designTokens.T_TYPO_FONT_SIZE_1,
    // font-size of title
    titleFontSize: designTokens.T_TYPO_FONT_SIZE_2,
    // height of size (px)
    Height: {
        sm: designTokens.T_TYPO_FONT_SIZE_6,
        md: designTokens.T_TYPO_FONT_SIZE_7,
        lg: designTokens.T_TYPO_FONT_SIZE_8
    },
    // padding of size (px)
    Padding: {
        sm: designTokens.T_CONTROL_SPACING_SM,
        md: designTokens.T_CONTROL_SPACING_MD,
        lg: designTokens.T_CONTROL_SPACING_LG
    }
};

export const extend = (source: any, target: any) => {
    // deep clone
    const cloneSource = JSON.parse(JSON.stringify(source));
    const _extend = (source: any, target: any) => {
        _.each(target, (v, k) => {
            if (_.isObject(v) && _.isObject(source[k])) {
                source[k] = _extend(source[k], v);
            } else {
                source[k] = v;
            }
        });
        return source;
    };
    return _extend(cloneSource, target);
};

// 保留函数，用于扩展自定义的token
export const generateTheme = (originTheme: any = {}) => {
    const { designTokens: originDesignTokens } = originTheme;
    const sizeTheme = _.pick(originTheme, ['fontSize', 'titleFontSize', 'Height', 'Padding']);

    let theme: any = {
        ...defaultSizeTheme,
        ...sizeTheme,
        designTokens: {
            ...designTokens,
            ...originDesignTokens
        }
    };
    theme.HeightNumber = _.mapValues(theme.Height, v => +v.replace('px', ''));

    return theme
};

const defaultTheme = generateTheme();

export default defaultTheme;
export { defaultTheme };

export { designTokens as defaultDesignTokens };
