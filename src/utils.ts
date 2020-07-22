import { writeFileSync } from 'fs';
import chalk from 'chalk';
import { PromptAnswers, Defaults } from './types';

export const logInit = (): void => {
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

export const handler = (error: typeof Promise.reject): void => {
  console.log(chalk.red.bold(error));
  process.exit();
};

export const parseAnswers = (answers: PromptAnswers | Defaults): string => {
  const keywords = answers.keywords !== ''
    ? (answers.keywords as string)
      ?.split(',')
      ?.map((word: string) => word?.replace(/\s/g, ''))
    : [];

  const pkgJS = {
    name: answers.pkgName,
    version: answers.version,
    description: answers.description,
    main: answers.entryPoint,
    scripts: {
      test: answers.testCommand
    },
    keywords,
    author: answers.author,
    license: answers.license
  };

  return JSON.stringify(pkgJS, null, 2);
};

export const writePackageJson = (pkgJSON: string): void => {
  const dirPath = getDirPath();
  writeFileSync(`${dirPath}/package.json`, pkgJSON);
  process.exit();
};