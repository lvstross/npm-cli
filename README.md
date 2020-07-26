# NPM CLI Starter
This repo is meant to be a starting point for building NPM ClI packages. It comes with the three essential components of building an publishable NPM CLI.
1. Starter bin command set up
2. Executable node script
3. Build scripts and development workflow.

## Example Code
The starter code is an example of the common command `npm init` and `npm init -y`.
This code provides a base example of the three common tasks of command line tools
1. Getting command line arguments
2. Getting user input
3. Writing to files

## Running The Example Code
Install packages `npm i`. At this point you can simply run the example with `npm start`. In order to run the example with the `-y` argument, run `npm run bin:up`. This will run the build script that will convert the typescript code to javascript and then run `npm link` to link the `cmd` command to your bin. When you've made changes to the code, be sure to run `npm run bin` to rebuild build the code. To unlink the `cmd` command from your bin, run `npm run bin:down`.