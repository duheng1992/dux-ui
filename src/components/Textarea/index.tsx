import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextareaWrap } from './style';

class Textarea extends Component {
  static propTypes = {
    /** @ignore */
    className: PropTypes.string,
  };
  render() {
    const { ...rest } = this.props;
    return <TextareaWrap {...rest} />;
  }
}

export default Textarea;
