import React, { FunctionComponent, Component } from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Signup from "./components/Signup";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactTestUtils from "react-dom/test-utils";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() }); // needs this for enzyme to run

describe("App", async () => {
  it("render App", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe("Signup", async () => {
  it("render Signup", () => {
    // ReactTestUtils.isElement(<Signup />);
    mount(<Signup />);
  });
});
