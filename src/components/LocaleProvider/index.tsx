import { ExportComponent } from '../../type';

import LocaleProvider from './LocaleProvider';
import useLocale from './useLocale';

const ExportLocaleProvider = ExportComponent(LocaleProvider, {
  useLocale,
});

export default ExportLocaleProvider;
