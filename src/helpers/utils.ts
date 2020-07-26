/**
 * Get Director Path of Execution
 */
export const getDirPath = (): string => `${process.env.INIT_CWD || process.env.PWD}`;

/**
 * Get Directory Name of Execution
 */
export const getDirName = (): string | undefined => {
  const dirPath = getDirPath();
  return dirPath?.split('/')?.pop();
};