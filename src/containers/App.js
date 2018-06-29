import * as React from "react";
import Column from "../components/Column";
import { Provider } from "react-contextual";
import "styles.css";
import { isMobile } from "utilities";
import { dataState, uiState } from "state";

const Layout = props => {
  return <div className="container">{props.children}</div>;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    for (let i = 1; i < 6; i++) {
      this[`col_${i}`] = React.createRef();
    }
  }
  handleCardClick = ev => {};
  componentWillUpdate() {
    console.log("updating app");
  }
  componentDidMount() {
    window.addEventListener("load", this.getColumnSizes);
    window.addEventListener("touchmove", this.handleTouchMove, {
      passive: false
    });
    window.addEventListener("touchend", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  updateCol = (id, card, remove) => {
    const remoteData = dataState.getState();
    if (!remove) {
      let newOrder = [...remoteData[id]];
      newOrder.push(card);
      remoteData.updateOrder(id, newOrder);
    } else {
      let newOrder = [...remoteData[id]];
      newOrder.splice(newOrder.indexOf(card), 1);
      remoteData.updateOrder(id, newOrder);
    }
  };
  handleTouchMove = e => {
    if (uiState.getState().isPressed) {
      e.preventDefault() || this.handleMouseMove(e.touches[0]);
    } else {
      this.handleMouseMove(e.touches[0]);
    }
  };

  handleMouseUp = () => {
    const remoteUi = uiState.getState();
    const remoteData = dataState.getState();
    if (remoteData.hoveredCol) {
      remoteData.updateCards(remoteUi.currentCard.id, remoteData.hoveredCol);
      this.updateCol(remoteData.hoveredCol, remoteUi.currentCard);
      this.updateCol(remoteUi.initialCol, remoteUi.currentCard, "remove");
      uiState.getState().disableAnimation();
      remoteData.updateHovered(null);
    }
    remoteData.hoveredCol && this.getColumnSizes(remoteData.hoveredCol);
    uiState.getState().handleMouseUp();
  };
  checkBoundaries = (pageX, pageY) => {
    const remoteUi = uiState.getState();
    const columnData = [];
    for (let key in remoteUi) {
      if (key.match(/col_./g)) {
        columnData.push(remoteUi[key]);
      }
    }
    for (let column of columnData) {
      const { left, right, top, bottom, id } = column;
      if (pageX > left && pageX < right && pageY > top && pageY < bottom) {
        //console.log([left, right, top, bottom, id], pageY);
        return id;
      }
    }
  };
  getColumnSizes = column => {
    const remoteUi = uiState.getState();
    if (remoteUi.columnsLoaded === false) {
      if (typeof column !== "string") {
        let i = 1;
        for (let key in remoteUi) {
          if (key.match(/col_./g)) {
            remoteUi.getCoords(`${i}`, this[key].current.getCoords());
            i++;
          }
        }
      } else {
        remoteUi.getCoords(
          `${column}`,
          this[`col_${column}`].current.getCoords()
        );
      }
    }
    remoteUi.setColumnsLoaded();
  };

  handleMouseMove = ({ pageX, pageY }) => {
    const remoteUi = uiState.getState();
    const remoteData = dataState.getState();
    const mouseY = pageY - remoteUi.initialDeltaY;
    let mouseX = pageX - remoteUi.initialDeltaX;
    mouseX = isMobile()
      ? (mouseX += (window.screen.availWidth - 220) / 2)
      : window.innerWidth < 1100
        ? (mouseX += (window.innerWidth - 220) / 2)
        : mouseX;
    const columnID = this.checkBoundaries(pageX, pageY);
    columnID &&
      this[`col_${columnID}`].current.handleMouseMove(pageX, pageY, columnID);
    if (remoteUi.isPressed) {
      if (!columnID) {
        remoteData.updateHovered(null);
        return;
      }
      if (columnID !== remoteUi.initialCol) {
        uiState.getState().disableAnimation();
        remoteData.updateHovered(columnID);
      } else {
        remoteData.updateHovered(null);
      }
      remoteUi.updateCoords(mouseX, mouseY);
    }
  };
  render() {
    return (
      <Provider store={dataState}>
        <Provider store={uiState}>
          <Layout>
            <Column name="Согласование" category="1" ref={this.col_1} />
            <Column name="В ожидании" category="2" ref={this.col_2} />
            <Column name="Разработка" category="3" ref={this.col_3} />
            <Column name="Тестирование" category="4" ref={this.col_4} />
            <Column name="Готово" category="5" ref={this.col_5} />
          </Layout>
        </Provider>
      </Provider>
    );
  }
}

export default App;
