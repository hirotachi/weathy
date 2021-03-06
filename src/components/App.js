import React from "react";
import {Provider} from "react-redux";
import configureStore from "../store/configureStore";
import "normalize.css/normalize.css";
import "../styles/styles.scss";
import AppRouter from "../routers/AppRouter";


const store = configureStore();
const App = () => (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);

export default App;