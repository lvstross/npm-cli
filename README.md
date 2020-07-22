# NPM CLI boilerplate

## Install packages
```bash
npm i
```

## Running the code
There are two methods to run the cli script.
1. Run it through ts-node directly `npm start`
2. Run it through the bin command

Using the seconds options involes a small amount of set up.
1. Open the `package.json` file and edit the `bin` command string `"cmd"` to whatever you want it to be. Pick something unique that wouldn't already be in your system bin directory.
2. Run `npm run bin:up` to build the script with Typescript and link the code to your bin.
3. When you've made changes to the code, be sure to run `npm run bin:restart`.
4. When you want to unlink your code to your bin, run `npm run bin:down`.
