const deprecatedLog = (name: string, insteadName: string) => {
  console.error(`Deprecated: ${name} will be deprecated, please use ${insteadName} to replace`);
};

export default deprecatedLog;
