import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { ThemeProvider as EThemeProvider } from 'emotion-theming';

import { generateTheme } from './theme';

class ThemeProvider extends Component {
    cache: string;
    state: any;
    static useDesignTokens: () => any;
    constructor(props: any) {
        super(props);
        const theme = this.getMergedTheme(props.theme);
        this.cache = JSON.stringify(theme);
        this.state = {
            theme
        };
    }
    static propTypes = {
        /**
         * 自定义主题
         */
        theme: PropTypes.object.isRequired
    };
    getMergedTheme = (theme: string) => {
        return generateTheme(theme);
    };
    componentWillReceiveProps(nextProps: any) {
        const { theme } = nextProps;
        if (JSON.stringify(theme) !== this.cache) {
            const mergedTheme = this.getMergedTheme(theme);
            this.cache = JSON.stringify(theme);
            this.setState(
                {
                    theme: mergedTheme
                },
            );
        }
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const { theme: _theme, ...rest } = this.props as any;
        const { theme } = this.state;
        return <EThemeProvider theme={theme} {...rest} />;
    }
}

export default ThemeProvider;
