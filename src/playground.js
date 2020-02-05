const { getQuickJS } = require("quickjs-emscripten");

module.exports = async function playground() {
  const QuickJS = await getQuickJS()
  const vm = QuickJS.createVm()


  const log = vm.newFunction('log', (p) => {
    // const s = vm.getNumber(p);
    const s = vm.getString(p);
    console.log('LOG:', s);
  });

  const _console = vm.newObject()
  vm.setProp(_console, 'log', log)
  log.dispose()
  vm.setProp(vm.global, 'console', _console)
  _console.dispose()

  const fnString = `
    const test = () => {

      // needs: vm.getString
      console.log('hello')

      // error: can't send functions - missing vm.getFunction
      // setTimeout(() => console.log('hey'), 1000)

      // this ends up returning: Promise {} but never resolving
      // missing vm.evalAsyncCode maybe?
      // const fs = await import('./fs');

      // error: require is not defined
      // const fs = require('fs');

      // error: Syntax error
      // import fs from 'fs';
      // import * as fs from 'fs';
      // console.log(fs)

      // note: this returns a Promise
      // const fs = import('./fs');
      // console.log(fs)

      // const contents = fs.readFileSync('/tmp/test', 'utf8');
      // console.log("file contents:", contents);
      // fs.writeFileSync('/tmp/test2', contents, 'utf8')

      return 42;
    }
    test();
  `

  const result = vm.evalCode(`${fnString};`)

  if (result.error) {
    console.log('Execution failed:', vm.dump(result.error))
    result.error.dispose()
  } else {
    console.log('Success:', vm.dump(result.value))
    result.value.dispose()
  }

  vm.dispose()
}
