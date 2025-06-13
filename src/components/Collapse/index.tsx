import { ExportComponent } from '../../type';

import Collapse from './Collapse';
import Panel from './Panel';

const ExportCollapse = ExportComponent(Collapse, {
  Panel,
});

export default ExportCollapse;
export { Panel };
