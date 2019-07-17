import React, { Component } from "react";
import { fetchy } from "../common.js";
let operators = [
  { text: "Gå till", value: "go" },
  { text: "Knapptryckning", value: "sendkey" },
  { text: "Klick", value: "click" },
  { text: "Bild", value: "screenshot" },
  { text: "Väntar", value: "waitfor" }
];
export class Testset extends Component {
  state = {
    runResult: [],
    elements: [],
    testSet: {}
  };
  async componentDidMount() {
    const { setName } = this.props.match.params;
    console.log("setName", this.props.match.params);
    const testSet = await fetchy(`/api/testSet/${setName}`);

    const elements = [
      ...(await fetchy(`/api/elements`)).map(obj => obj.name),
      ""
    ];
    this.setState({ testSet, setName, elements }, () => this.run());
  }
  run = async () => {
    const runResult = await fetchy(`/api/run/${this.state.setName}`);
    this.setState({ runResult });
    console.log(runResult);
  };
  save = async () => {
    const testSet = await fetchy(
      `/api/testSet/${this.state.setName}`,
      this.state.testSet
    );
    this.run();
    this.setState({ testSet });
  };
  addStep = test => {
    test.steps.push({});
    this.setState({ testSet: this.state.testSet });
  };

  handleChange = event => {
    const keys = event.target.name.split(".");
    const lastKey = keys.splice(keys.length - 1, 1);
    const obj = keys.reduce((acc, item) => acc[item], this.state.testSet);
    obj[lastKey] = event.target.value;
    this.setState({
      testSet: this.state.testSet
    });
  };

  render() {
    if (!this.state.testSet.tests) {
      return <div />;
    }
    return (
      <div>
        {this.state.testSet.tests.map((test, testIndex) => (
          <div key={test.testName}>
            <h2>{test.testName}</h2>
            <button onClick={this.run}>Run</button>
            {test.steps.map((step, stepIndex) => (
              <div key={stepIndex} className="step">
                <div className="form-part">
                  <Select
                    label="Operation"
                    value={step.operator}
                    options={operators}
                    onChange={this.handleChange}
                    name={`tests.${testIndex}.steps.${stepIndex}.operator`}
                  />
                  {["go"].includes(step.operator) && (
                    <Input
                      label="Url"
                      value={step.url}
                      onChange={this.handleChange}
                      name={`tests.${testIndex}.steps.${stepIndex}.url`}
                    />
                  )}
                  {["sendkey", "click", "screenshot"].includes(
                    step.operator
                  ) && (
                    <Input
                      label="css-selector"
                      value={step["css-selector"]}
                      onChange={this.handleChange}
                      name={`tests.${testIndex}.steps.${stepIndex}.css-selector`}
                    />
                  )}
                  {["sendkey", "click", "screenshot"].includes(
                    step.operator
                  ) && (
                    <Select
                      label="element"
                      value={step["element"]}
                      onChange={this.handleChange}
                      name={`tests.${testIndex}.steps.${stepIndex}.element`}
                      options={this.state.elements.map(text => ({
                        text,
                        value: text
                      }))}
                    />
                  )}
                  {["sendkey"].includes(step.operator) && (
                    <Input
                      label="Knapptryckning"
                      value={step.keys}
                      onChange={this.handleChange}
                      name={`tests.${testIndex}.steps.${stepIndex}.keys`}
                    />
                  )}
                  {["waitfor"].includes(step.operator) && (
                    <Input
                      label="Timeout"
                      value={step.timeout}
                      onChange={this.handleChange}
                      name={`tests.${testIndex}.steps.${stepIndex}.timeout`}
                    />
                  )}
                </div>
                <div className="result-part">
                  {this.state.runResult[stepIndex] && (
                    <img
                      src={"/" + this.state.runResult[stepIndex]}
                      width="300px"
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="buttons">
              <button onClick={() => this.addStep(test)}>Lägg till steg</button>
              <button onClick={this.save}>Spara</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
const Select = ({ name, value, options, onChange, label }) => (
  <div className="form-element">
    <label htmlFor={name}>
      {label}
      <select name={name} onChange={onChange} defaultValue={value}>
        {options.map(({ text, value }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </label>
  </div>
);
const Input = ({ name, value, onChange, label }) => (
  <div className="form-element">
    <label htmlFor={name}>
      {label}
      <input name={name} value={value} onChange={onChange} />
    </label>
  </div>
);
