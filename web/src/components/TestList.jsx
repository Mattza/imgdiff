import React, { Component } from "react";
import { Link } from "react-router-dom";
export class TestList extends Component {
  state = {
    list: []
  };
  async componentDidMount() {
    const list = await this.fetch("/api/testSet");
    this.setState({ list });
  }
  fetch = async (path, data) => {
    const response = await fetch(path, data);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  render() {
    return (
      <ul>
        {this.state.list.map(item => (
          <li key={item}>
            <Link to={`/testSet/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    );
  }
}
