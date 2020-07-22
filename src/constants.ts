import { OptionDefinition } from 'command-line-args';
import { getDirName } from './utils';

export const optionDefs: OptionDefinition[] = [
  { name: 'yes', alias: 'y', type: Boolean, defaultValue: true },
];

export const mainPrompts = [
  {
    name: 'pkgName',
    message: `package name:`,
    default: getDirName()
  },
  {
    name: 'version',
    message: 'version:',
    default: '1.0.0'
  },
  {
    name: 'description',
    message: 'description: ',
    default: ''
  },
  {
    name: 'entryPoint',
    message: 'entry point:',
    default: 'index.js'
  },
  {
    name: 'testCommand',
    message: 'test command: ',
    default: 'echo \"Error: no test specified\" && exit 1'
  },
  {
    name: 'gitRepo',
    message: 'git repository: ',
    default: ''
  },
  {
    name: 'keywords',
    message: 'keywords: ',
    default: ''
  },
  {
    name: 'author',
    message: 'author: ',
    default: ''
  },
  {
    name: 'license',
    message: 'license:',
    default: 'ISC'
  }
];

export const confirmPrompt = [
  {
    name: 'okay',
    message: 'Is this OK?',
    type: 'confirm'
  }
];