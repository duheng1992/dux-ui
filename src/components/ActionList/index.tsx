import { ExportComponent } from '../../type';
import Button from '../Button';

import ActionList from './ActionList';

const Sizes = Button.Sizes;
const ButtonStyleTypes = Button.StyleTypes;

const ExportActionList = ExportComponent(ActionList, {
  Sizes,
  ButtonStyleTypes,
});

export default ExportActionList;
