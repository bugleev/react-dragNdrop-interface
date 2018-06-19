import * as React from "react";
import Backdrop from "../components/Backdrop";
import Column from "../components/Column";
import Modal from "../components/Modal";

import { Provider } from "react-contextual";
import "../styles.css";
import { store } from "./Store";

const Layout = props => {
  return <div className="container">{props.children}</div>;
};

class App extends React.Component {
  handleCardClick = ev => {
    const modalData = this.pickCard(ev.currentTarget.id)[0];
    this.setState({ modalOpen: true, modalData });
  };

  pickCard = cardId => {
    return this.state.cards.filter(el => el.id === cardId);
  };
  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <Layout>
            <Column name="Согласование" category="1" />
            <Column name="В ожидании" category="2" />
            <Column name="Разработка" category="3" />
            <Column name="Тестирование" category="4" />
            <Column name="Готово" category="5" />
          </Layout>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
