const { getQuickJS } = require("quickjs-emscripten");

module.exports = async function returnValue() {
  const QuickJS = await getQuickJS();
  const vm = QuickJS.createVm();

  const fnString = `
    const test = () => {
      return 42;
    }
    test();
  `;

  const result = vm.evalCode(`${fnString};`);
  let retVal;

  if (result.error) {
    console.log("Execution failed:", vm.dump(result.error));
    result.error.dispose();
  } else {
    retVal = vm.dump(result.value);
    result.value.dispose();
  }

  vm.dispose();

  return retVal;
}
