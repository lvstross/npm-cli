#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        utils_2.logInit();
        const answers = yield inquirer_1.default.prompt(constants_1.mainPrompts);
        const pkgJSON = utils_2.parseAnswers(answers);
        console.log(`
  About to write to ${dirPath}/package.json:

  ${pkgJSON}
  `);
        const confirm = yield inquirer_1.default.prompt(constants_1.confirmPrompt);
        if (confirm.okay) {
            utils_2.writePackageJson(pkgJSON);
        }
    }
    catch (error) {
        utils_2.handler(error);
    }
}))();
