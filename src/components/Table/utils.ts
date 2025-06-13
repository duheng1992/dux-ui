import _ from 'lodash';

export const getColumnConfigFromLocalStorage = (columnConfigKey: string, defaultConfig: any) => {
  if (typeof localStorage === 'undefined') {
    return defaultConfig;
  }
  const localConfig = (JSON.parse as any)(localStorage.getItem(columnConfigKey));
  if (localConfig) {
    return _.merge({}, defaultConfig, localConfig);
  } else {
    return defaultConfig;
  }
};

export const setColumnConfigToLocalStorage = (columnConfigKey: string, config: any) => {
  if (typeof localStorage === 'undefined') {
    return;
  }
  localStorage.setItem(
    columnConfigKey,
    JSON.stringify(
      _.mapValues(config, (v) => ({
        hidden: v.hidden,
      })),
    ),
  );
};
