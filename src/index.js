import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/App";
import DragndropInterface from "./hoc/DragndropInterface";
import "./index.css";

const DragndropApp = DragndropInterface(App);
ReactDOM.render(<DragndropApp />, document.getElementById("root"));
