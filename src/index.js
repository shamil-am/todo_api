import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import TodoContextProvider from "./Context/TodoContext";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
//
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 2000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.FADE,
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </AlertProvider>,
  document.getElementById("root")
);
