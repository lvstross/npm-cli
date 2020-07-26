#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const command_line_args_1 = __importDefault(require("command-line-args"));
const utils_1 = require("./helpers/utils");
const utils_2 = require("./utils");
const constants_1 = require("./constants");
const options = command_line_args_1.default(constants_1.optionDefs);
const dirPath = utils_1.getDirPath();
if (options.yes) {
    const pkgJSON = utils_2.parseAnswers(constants_1.defaults);
    utils_2.writePackageJson(pkgJSON);
}
utils_2.logInit();
inquirer_1.default
    .prompt(constants_1.mainPrompts)
    .then((answers) => {
    const pkgJSON = utils_2.parseAnswers(answers);
    console.log(`
About to write to ${dirPath}/package.json:

${pkgJSON}
`);
    inquirer_1.default
        .prompt(constants_1.confirmPrompt)
        .then(({ okay }) => {
        if (okay) {
            utils_2.writePackageJson(pkgJSON);
        }
    })
        .catch(utils_2.handler);
})
    .catch(utils_2.handler);
