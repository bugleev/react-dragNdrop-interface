import * as React from "react";
import Backdrop from "../components/Backdrop";
import Column from "../components/Column";
import Modal from "../components/Modal";
import { uiState } from "../containers/UIState";

import { Provider } from "react-contextual";
import "../styles.css";
import { store } from "./Store";

const Layout = props => {
  return <div className="container">{props.children}</div>;
};

class App extends React.Component {
  handleCardClick = ev => {};
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <Provider store={uiState}>
            <Layout>
              <Column name="Согласование" category="1" />
              <Column name="В ожидании" category="2" />
              <Column name="Разработка" category="3" />
              <Column name="Тестирование" category="4" />
              <Column name="Готово" category="5" />
            </Layout>
          </Provider>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
