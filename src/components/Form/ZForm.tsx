import React, { Component } from 'react';
import { createForm, formShape } from 'rc-form';
import createReactContext from 'create-react-context';

import Form from './Form';

export const ZFormContext = createReactContext({});

class ZForm extends Component {
  static propTypes = {
    /** formDecorator生成的form实例 */
    form: formShape,
  };
  render() {
    // eslint-disable-next-line no-unused-vars
    const { form, ...formProps } = this.props as any;

    return (
      <ZFormContext.Provider value={{ form }}>
        <Form {...formProps} />
      </ZFormContext.Provider>
    );
  }
}

export default ZForm;

(ZForm as any).formDecorator = createForm;
(ZForm as any).Elements = Form;
(ZForm as any).formShape = formShape;
