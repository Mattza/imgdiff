import React, { Component } from "react";
import { fetchy } from "../common.js";
import { Input } from "./commonComponents.jsx";

export class Elements extends Component {
  state = {
    elements: []
  };
  async componentDidMount() {
    console.log("elements");
    const elements = await fetchy(`/api/elements`);
    this.setState({ elements });
  }
  save = async () => {
    const testSet = await fetchy(
      `/api/testSet/${this.state.setName}`,
      this.state.testSet
    );
    this.run();
    this.setState({ testSet });
  };
  addElement = test => {
    test.steps.push({});
    this.setState({ testSet: this.state.testSet });
  };

  handleChange = event => {
    const keys = event.target.name.split(".");
    const lastKey = keys.splice(keys.length - 1, 1);
    console.log(keys);
    console.log(this.state.elements);
    const obj = keys.reduce((acc, item) => acc[item], this.state.elements);
    obj[lastKey] = event.target.value;
    this.setState({
      elements: this.state.elements
    });
  };

  render() {
    return (
      <div>
        {this.state.elements.map((element, elementIndex) => (
          <div className="element">
            <div>
              <Input
                name={`${elementIndex}.name`}
                value={element.name}
                onChange={this.handleChange}
                label="Namn"
              />
              <Input
                name={`${elementIndex}.css-selector`}
                value={element["css-selector"]}
                onChange={this.handleChange}
                label="CSS-selector"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
