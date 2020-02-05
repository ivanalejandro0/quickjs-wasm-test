# What's this?

This is an small experiment I did to try to run Javascript in a sandboxed
environment.

To do this I use [QuickJS](https://bellard.org/quickjs/) compiled to
WebAssembly. All the heavy lifting of running QuickJS on WASM is done on [this
library](https://github.com/justjake/quickjs-emscripten/).


## Running the thing

```
$ # inside this repository
$ yarn install
$ yarn start
```

[![Edit test-refactor-redux-reducers](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/ivanalejandro0/quickjs-wasm-test/tree/master/)


## What can be done?

Take a look at example code inside of `src/` folder.

## My take on this

What works:
- run javascript code in isolation
- push functions into the VM, (like `console.log`, or `fetch`)
- extract results from the VM

Not so good yet:
- very new projects, scarce docs, and not many people using it
- it seems that not all of QuickJS is exposed to WASM
- I had no success working with imports/require but I may be doing something wrong
- async code doesn't seem not to be working

I need to take another look to the things that didn't work for me and maybe
reach to other people to see if I'm doing something wrong, or if there's other
work to be done on the glue parts.
