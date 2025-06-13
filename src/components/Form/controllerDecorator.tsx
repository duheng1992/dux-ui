import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ZFormContext } from './ZForm';

const controllerDecorator = (options: any) => {
  return function decorator(Controller: any) {
    return class WrappedController extends Component {
      static propTypes = {
        zName: PropTypes.string.isRequired,
        zOptions: PropTypes.any,
      };

      render() {
        const { zName, zOptions, ...controllerProps } = this.props as any;
        return (
          <ZFormContext.Consumer>
            {({ form }: any) =>
              form.getFieldDecorator(zName, { ...options, ...zOptions })(
                <Controller {...controllerProps} />,
              )
            }
          </ZFormContext.Consumer>
        );
      }
    };
  };
};

export default controllerDecorator;
