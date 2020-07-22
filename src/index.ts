#!/usr/bin/env node
import commandLineArgs from 'command-line-args';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { logInit, getDirPath, getDirName, handler, parseAnswers, writePackageJson } from './utils';
import { optionDefs, mainPrompts, confirmPrompt, defaults } from './constants';
import { PromptAnswers } from './types';

/**
 * NPM Init Example Script
 * 
 * 1. Shows how to get command line arguments
 * 2. Shows how to get user input
 * 3. shows how to write to a file
 */

// Get utils
const options = commandLineArgs(optionDefs);
const dirPath = getDirPath();
const dirName = getDirName();

if (options.yes) {
  const pkgJSON = parseAnswers(defaults);
  writePackageJson(pkgJSON);
}

// Log initial output
logInit();

// Inquirer for main prompts
inquirer
  .prompt(mainPrompts)
  .then((answers: PromptAnswers) => {
    const pkgJSON = parseAnswers(answers);
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
          writePackageJson(pkgJSON);
        }
      })
      .catch(handler);
  })
  .catch(handler)