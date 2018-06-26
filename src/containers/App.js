import * as React from "react";
import Backdrop from "../components/Backdrop";
import Column from "../components/Column";
import Modal from "../components/Modal";
import { Provider } from "react-contextual";
import "../styles.css";
import { store } from "./Store";
import { order } from "./Order";
import { uiState } from "../containers/UIState";
import * as data from "../data.json";

const Layout = props => {
  return <div className="container">{props.children}</div>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    for (let i = 1; i < 6; i++) {
      this[`col_${i}`] = React.createRef();
    }
    this.state = {
      cards: data.cards,
      prevCategory: null
    };
  }
  updateCards = (id, category) => {
    const newCards = [...this.state.cards];
    let prevCategory;
    newCards.forEach(el => {
      if (el.id === id) {
        prevCategory = el.category;
        el.category = category;
      }
    });
    this.setState({ cards: newCards, prevCategory });
  };
  handleCardClick = ev => {};
  componentDidMount() {
    window.addEventListener("mousemove", this.handleMouseMove);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
  }

  checkBoundaries = (pageX, pageY) => {
    const remoteState = uiState.getState();
    const columnData = [];
    for (let key in remoteState) {
      if (key.match(/col_./g)) {
        columnData.push(remoteState[key]);
      }
    }
    for (let column of columnData) {
      const { left, right, top, bottom, id } = column;
      if (pageX > left && pageX < right && pageY > top && pageY < bottom) {
        //console.log([left, right, top, bottom, id], id);
        return id;
      }
    }
  };
  handleMouseMove = ({ pageX, pageY }) => {
    const remoteUi = uiState.getState();
    const mouseY = pageY - remoteUi.initialDeltaY;
    const mouseX = pageX - remoteUi.initialDeltaX;
    const columnID = this.checkBoundaries(pageX, pageY);
    columnID &&
      this[`col_${columnID}`].current.handleMouseMove(pageX, pageY, columnID);
    if (remoteUi.isPressed) {
      if (!columnID) {
        store.getState().updateHovered(null);
        return;
      }
      if (columnID !== remoteUi.initialCol) {
        store.getState().updateHovered(columnID);
      } else {
        store.getState().updateHovered(null);
      }
    }
    uiState.getState().updateCoords(mouseX, mouseY);
  };
  render() {
    const { cards } = this.state;
    return (
      <Provider store={store}>
        <Provider store={uiState}>
          <Layout>
            <Column
              name="Согласование"
              category="1"
              cards={cards}
              updateCards={this.updateCards}
              ref={this.col_1}
            />
            <Column
              name="В ожидании"
              category="2"
              cards={cards}
              updateCards={this.updateCards}
              ref={this.col_2}
            />
            <Column
              name="Разработка"
              category="3"
              cards={cards}
              updateCards={this.updateCards}
              ref={this.col_3}
            />
            {/* <Column
                name="Тестирование"
                category="4"
                cards={cards}
                updateCards={this.updateCards}
                ref={this.col_4}
              />
              <Column
                name="Готово"
                category="5"
                cards={cards}
                updateCards={this.updateCards}
                ref={this.col_5}
              /> */}
          </Layout>
        </Provider>
      </Provider>
    );
  }
}

export default App;
