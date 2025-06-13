/** 构建error */
const generateError = (message: any, name: string) => {
  const error = new Error(message);
  if (name) {
    error.name = name;
  }
  return error;
};

export default generateError;
