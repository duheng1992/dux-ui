import { createContext } from 'react';

import { Key } from '../hooks/group';
import noop from '../../utils/noop';

const SelectContext = createContext<{
  hidePopup: () => void;
  handleSearch: (value: Key, props: any) => boolean;
  searchValue: string;
}>({
  hidePopup: noop,
  handleSearch: () => true,
  searchValue: '',
});
export default SelectContext;
