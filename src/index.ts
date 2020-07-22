#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import { writeFile } from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { logInit, getDirPath, getDirName, handler } from './utils';
import { optionDefs, mainPrompts, confirmPrompt } from './constants';
import { PromptAnswers } from './types';

// Get utils
const options = commandLineArgs(optionDefs);
const dirPath = getDirPath();
const dirName = getDirName();

// Log initial output
logInit();

// Inquirer for main prompts
inquirer
  .prompt(mainPrompts)
  .then((answers: PromptAnswers) => {
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

    const pkgJSON = JSON.stringify(pkgJS, null, 2);

    console.log(`
About to write to ${dirPath}/package.json:

${pkgJSON}
`);

  // Inquirer for confirmation of output
  inquirer
    .prompt(confirmPrompt)
    .then(({ okay }: PromptAnswers) => {
      console.log(okay);
      if (okay) {
        writeFile(
          `${dirPath}/package.json`,
          pkgJSON,
          (err) => {
            if (err) {
              console.log(chalk.red.bold(err));
              process.exit();
            };
          }
        );
      }
    })
    .catch(handler);

  })
  .catch(handler)