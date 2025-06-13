import React from 'react';

import Radio from './Radio';

/** @deprecated */
const Button = (props: any) => {
  console.warn(
    'This will be deprecated, please use <Radio styleType="button"></Radio> to instead!',
  );
  return <Radio {...props} styleType="button" />;
};

export default Button;
