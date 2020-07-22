#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_line_args_1 = __importDefault(require("command-line-args"));
const inquirer_1 = __importDefault(require("inquirer"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const options = command_line_args_1.default(constants_1.optionDefs);
const dirPath = utils_1.getDirPath();
const dirName = utils_1.getDirName();
if (options.yes) {
    const pkgJSON = utils_1.parseAnswers(constants_1.defaults);
    utils_1.writePackageJson(pkgJSON);
}
utils_1.logInit();
inquirer_1.default
    .prompt(constants_1.mainPrompts)
    .then((answers) => {
    const pkgJSON = utils_1.parseAnswers(answers);
    console.log(`
About to write to ${dirPath}/package.json:

${pkgJSON}
`);
    inquirer_1.default
        .prompt(constants_1.confirmPrompt)
        .then(({ okay }) => {
        console.log(okay);
        if (okay) {
            utils_1.writePackageJson(pkgJSON);
        }
    })
        .catch(utils_1.handler);
})
    .catch(utils_1.handler);
