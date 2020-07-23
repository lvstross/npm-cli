"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePackageJson = exports.parseAnswers = exports.handler = exports.getDirName = exports.getDirPath = exports.logInit = void 0;
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
exports.logInit = () => {
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
exports.getDirPath = () => `${process.env.INIT_CWD || process.env.PWD}`;
exports.getDirName = () => {
    var _a;
    const dirPath = exports.getDirPath();
    return (_a = dirPath === null || dirPath === void 0 ? void 0 : dirPath.split('/')) === null || _a === void 0 ? void 0 : _a.pop();
};
exports.handler = (error) => {
    console.log(chalk_1.default.red.bold(error));
    process.exit();
};
exports.parseAnswers = (answers) => {
    var _a, _b;
    const keywords = answers.keywords !== ''
        ? (_b = (_a = answers.keywords) === null || _a === void 0 ? void 0 : _a.split(',')) === null || _b === void 0 ? void 0 : _b.map((word) => word === null || word === void 0 ? void 0 : word.replace(/\s/g, '')) : [];
    const gitRepo = answers.gitRepo;
    const hasGitRepo = gitRepo !== '';
    const repo = hasGitRepo
        ? { repository: { type: 'git', url: `git+${gitRepo}.git` } }
        : {};
    const repoBugAndHomepage = hasGitRepo
        ? { bugs: { url: `${gitRepo}/issues` }, homepage: `${gitRepo}#readme` }
        : {};
    const pkgJS = Object.assign(Object.assign(Object.assign({ name: answers.pkgName, version: answers.version, description: answers.description, main: answers.entryPoint, scripts: {
            test: answers.testCommand
        } }, repo), { keywords, author: answers.author, license: answers.license }), repoBugAndHomepage);
    return JSON.stringify(pkgJS, null, 2);
};
exports.writePackageJson = (pkgJSON) => {
    const dirPath = exports.getDirPath();
    fs_1.writeFileSync(`${dirPath}/package.json`, pkgJSON);
    process.exit();
};
