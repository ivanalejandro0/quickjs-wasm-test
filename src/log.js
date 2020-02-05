const assert = require("assert");

const { getQuickJS } = require("quickjs-emscripten");

module.exports = async function log() {
  const QuickJS = await getQuickJS();
  const vm = QuickJS.createVm();

  // inject `console.log` function into the vm {
  const log = vm.newFunction("log", p => {
    // const s = vm.getNumber(p);
    const s = vm.getString(p);
    console.log("LOG:", s);
  });

  const _console = vm.newObject();
  vm.setProp(_console, "log", log);
  log.dispose();
  vm.setProp(vm.global, "console", _console);
  _console.dispose();
  // } inject `console.log` function into the vm

  const fnString = `
    const test = () => {
      console.log('hello from inside the VM')
    }
    test();
  `;

  const result = vm.evalCode(`${fnString};`);

  if (result.error) {
    console.log("Execution failed:", vm.dump(result.error));
    result.error.dispose();
  } else {
    result.value.dispose();
  }

  vm.dispose();
}
