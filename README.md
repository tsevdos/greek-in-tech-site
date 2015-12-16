[![Build Status](https://api.travis-ci.org/tsevdos/greek-in-tech.svg?branch=gh-pages)](https://travis-ci.org/tsevdos/greek-in-tech)

# Greek in Tech
A project that demonstrates many greek words and names that we constantly use on modern computing and software engineering. You can view the site on [greekintech.com](http://greekintech.com/).

## Getting Started
You need to have [node.js](https://nodejs.org/) and [bower](http://bower.io/) and installed. When you are ready you can install all dependencies by typing :

1. `npm install`
2. `npm start`

After installation you need only need to start the server using the last command.

## Contributing
All the entries are available from a [single JSON file](https://github.com/tsevdos/greek-in-tech/blob/master/js/app/data/entries.json). You can contribute entries with a pull request. If you don't want to mess with a pull request you can suggest an entry by [creating an issue](https://github.com/tsevdos/greek-in-tech/issues). If you still find it hard, you can drop me an email (see my profile).

## Run tests
Make sure grunt is installed globally on your system `npm install -g grunt-cli` and that you have run `npm install` first.

```
grunt mocha
```
## TODO
1. Add more entries
2. Minimize js with rjs
