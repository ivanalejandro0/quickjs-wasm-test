const { getQuickJS } = require("quickjs-emscripten");


module.exports = async function promiseTest() {
  const QuickJS = await getQuickJS()
  const vm = QuickJS.createVm()

  const fnString = `
    function test() {
      return new Promise(resolve => resolve(42))
    }
    test()
  `

  const result = vm.evalCode(`${fnString};`)

  if (result.error) {
    console.log('Execution failed:', vm.dump(result.error))
    result.error.dispose()
  } else {
    // resulting Promise gets JSON.stringify-ed and we just receive: {}
    console.log('Success:', vm.dump(result.value))
    result.value.dispose()
  }

  vm.dispose()
}
