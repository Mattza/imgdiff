const runner = require("./runner/runner");
const testMgm = require("./testsMgm");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
const port = 4000;

app.get("/api/hello", (req, res) => res.send("asdsadsd"));

app.get("/api/run/:name", async (req, res) => {
  const test = await testMgm.get(req.params.name);

  const resaa = await runner(test, { headless: true });
  res.send(resaa);
});

app.get("/api/testSet/:name?", async (req, res) => {
  return res.send(await testMgm.get(req.params.name));
});
app.post("/api/testSet/:name?", async (req, res) => {
  await testMgm.save(req.params.name, req.body);
  return res.send(await testMgm.get(req.params.name));
});
app.get("/api/elements", async (req, res) => {
  return res.send(await testMgm.elements());
});
app.post("/api/elements", async (req, res) => {
  return res.send(await testMgm.elements(req.body));
});

app.use("/img", express.static("img"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
