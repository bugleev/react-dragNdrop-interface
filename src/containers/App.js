import * as React from "react";
import { Provider } from "react-contextual";
import Column from "../components/Column";
import { isMobile, checkBoundaries } from "utilities";
import { dataState, uiState } from "state";
import "styles.css";

const columns = [
  "Согласование",
  "В ожидании",
  "Разработка",
  "Тестирование",
  "Готово"
];

class App extends React.Component {
  constructor(props) {
    super(props);
    for (let i = 1; i <= columns.length; i++) {
      this[`col_${i}`] = React.createRef();
    }
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

  handleTouchMove = e => {
    if (uiState.getState().isPressed) {
      e.preventDefault() || this.handleMouseMove(e.touches[0]);
    } else {
      this.handleMouseMove(e.touches[0]);
    }
  };
  handleMouseUp = () => {
    document.body.classList.remove("no-select");
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
    remoteUi.handleMouseUp();
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
    const columnID = checkBoundaries(pageX, pageY, remoteUi);
    columnID &&
      this[`col_${columnID}`].current.handleMouseMove(pageX, pageY, columnID);
    if (remoteUi.isPressed) {
      document.body.classList.add("no-select");
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
  render() {
    return (
      <Provider store={dataState}>
        <Provider store={uiState}>
          <div className="container">
            {columns.map((column, id) => (
              <Column
                name={column}
                key={column}
                category={`${id + 1}`}
                ref={this[`col_${id + 1}`]}
              />
            ))}
          </div>
        </Provider>
      </Provider>
    );
  }
}

export default App;
