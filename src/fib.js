const { getQuickJS } = require("quickjs-emscripten");

module.exports = async function fibonacci(fibN) {
  const QuickJS = await getQuickJS();
  const vm = QuickJS.createVm();

  const fnString = `
    function fib(n) {
      if (n <= 0) return 0;
      if (n == 1) return 1;
      return fib(n - 1) + fib(n - 2);
    }
  `;

  const result = vm.evalCode(`${fnString}; fib(${fibN})`);

  let ret;

  if (result.error) {
    console.log("Execution failed:", vm.dump(result.error));
    result.error.dispose();
  } else {
    ret = vm.dump(result.value); // keep the result
    result.value.dispose();
  }

  vm.dispose();

  return ret;
}
