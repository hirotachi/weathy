import React from "react";
import {Provider} from "react-redux";
import configureStore from "../store/configureStore";
import Homepage from "./Homepage";
import "normalize.css/normalize.css";
import "../styles/styles.scss";


const store = configureStore();
const App = () => (
  <Provider store={store}>
    <Homepage/>
  </Provider>
);

export default App;