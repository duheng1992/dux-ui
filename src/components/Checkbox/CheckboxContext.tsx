import React from 'react';

import { SelectableContext } from '../hooks/selectable';
import noop from '../../utils/noop';

import { Size, StyleType } from './interface';

const CheckboxContext = React.createContext<
  {
    disabled?: boolean;
    styleType?: StyleType;
    size?: Size;
  } & SelectableContext
>({
  toggleSelect: noop,
  addItem: noop,
  removeItem: noop,
});
export default CheckboxContext;
