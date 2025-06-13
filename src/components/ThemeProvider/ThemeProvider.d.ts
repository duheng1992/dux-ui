import { Component } from 'react';
import PropTypes from 'prop-types';
declare class ThemeProvider extends Component {
  cache: string;
  state: any;
  static useDesignTokens: () => any;
  constructor(props: any);
  static propTypes: {
    /**
     * 自定义主题
     */
    theme: PropTypes.Validator<object>;
  };
  getMergedTheme: (theme: string) => any;
  componentWillReceiveProps(nextProps: any): void;
  render(): JSX.Element;
}
export default ThemeProvider;
