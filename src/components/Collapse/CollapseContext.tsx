import React from 'react';

import { defaultContext, GroupContext } from '../hooks/group';

const CollapseContext = React.createContext<GroupContext>(defaultContext);
export default CollapseContext;
