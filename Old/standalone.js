const runner = require("./runner/runner");
const testMgm = require("./testsMgm");
// const test = require("./test.json");

const doit = async () => {
  //   const resaa = await runner(test, { headless: false });
  //   const resaa = await testMgm.get("hsb");
  const resaa = await testMgm.write("hsb2", { taco: "nacho" });
  console.log(resaa);
};

doit();
