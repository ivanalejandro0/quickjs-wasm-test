# What's this?

This is an small experiment I did to try to run Javascript in a sandboxed
environment.

To do this I use [QuickJS](https://bellard.org/quickjs/) compiled to
WebAssembly. All the heavy lifting of running QuickJS on WASM is done on [this
library](https://github.com/justjake/quickjs-emscripten/).
