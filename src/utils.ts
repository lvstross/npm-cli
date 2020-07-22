import chalk from 'chalk';

export const logInit = () => {
  console.log(`
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See 'npm help json' for definitive documentation on these fields
and exactly what they do.

Use 'npm install <pkg>' afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
`);
};

export const getDirPath = (): string => `${process.env.INIT_CWD || process.env.PWD}`;

export const getDirName = (): string | undefined => {
  const dirPath = getDirPath();
  return dirPath?.split('/')?.pop();
};

export const handler = (error: typeof Promise.reject) => {
  console.log(chalk.red.bold(error));
  process.exit();
};