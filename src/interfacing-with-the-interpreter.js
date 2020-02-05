const { getQuickJS } = require("quickjs-emscripten");

// from:
// https://github.com/justjake/quickjs-emscripten/#interfacing-with-the-interpreter
module.exports = async function example() {
  console.log(getQuickJS)
  const QuickJS = await getQuickJS()
  const vm = QuickJS.createVm()
  let state = 0

  const fnHandle = vm.newFunction('nextId', () => {
    return vm.newNumber(++state)
  })

  vm.setProp(vm.global, 'nextId', fnHandle)
  fnHandle.dispose()

  const nextId = vm.unwrapResult(vm.evalCode(`nextId(); nextId(); nextId()`))
  console.log('vm result:', vm.getNumber(nextId), 'native state:', state)
}
