#!/usr/bin/env node
import inquirer from 'inquirer';
import commandLineArgs from 'command-line-args';
import { PromptAnswers } from './types';
import { getDirPath } from './helpers/utils';
import { logInit, handler, parseAnswers, writePackageJson } from './utils';
import { optionDefs, mainPrompts, confirmPrompt, defaults } from './constants';

/**
 * NPM Init Example Script
 * 
 * 1. Shows how to get command line arguments
 * 2. Shows how to get user input
 * 3. Shows how to write to a file
 */

// Get utils
const options = commandLineArgs(optionDefs);
const dirPath = getDirPath();

// If -y is passed, generate default package.json file
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
        if (okay) {
          writePackageJson(pkgJSON);
        }
      })
      .catch(handler);
  })
  .catch(handler);