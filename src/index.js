const assert = require("assert");

// import examples
const fibonacci = require("./fib.js")
const log = require("./log.js");
const playground = require("./playground.js");
const promiseTest = require("./promise.js");
const returnValue = require("./return-value.js");
const example = require("./interfacing-with-the-interpreter.js");

async function run() {
  await log()

  const r = await fibonacci(10);
  assert(r == 55);
  console.log("Fibonacci of 10 is", r)

  const rv = await returnValue()
  console.log("Returned value:", rv)

  // await promiseTest();
}

run();
