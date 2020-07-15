pogo-bic
========

Determines the best move setup for a pokemon

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pogo-bic.svg)](https://npmjs.org/package/pogo-bic)
[![Downloads/week](https://img.shields.io/npm/dw/pogo-bic.svg)](https://npmjs.org/package/pogo-bic)
[![License](https://img.shields.io/npm/l/pogo-bic.svg)](https://github.com/ebertsch/pogo-bic/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g pogo-bic

$ pogo-bic zekrom
fetching data... done
Name: Zekrom
Rank   Type      Quick Move               Charge Move              
1      electric  Charge Beam (electric)   Wild Charge (electric)   
4      dragon    Dragon Breath (dragon)   Outrage (dragon)   

$ pogo-bic (-v|--version|version)
pogo-bic/1.0.0 darwin-x64 node-v12.14.1

$ pogo-bic --help [COMMAND]
USAGE
  $ pogo-bic POKEMON

OPTIONS
  -a, --alolan     use the Alolan form for the given Pokemon
  -f, --form=form  specifies a form for the given Pokemon.(Black, White, Armored, etc.)
  -g, --galarian   use the Galarian form for the given Pokemon
  -h, --help       show CLI help
  -v, --version    show CLI version
```
<!-- usagestop -->
# Commands

