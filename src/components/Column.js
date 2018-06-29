import React from "react";
import { UICard } from "./Card";
import { Subscribe } from "react-contextual";
import { dataState, uiState } from "state";
import { clamp, reinsert, isMobile } from "utilities";

export default class Column extends React.Component {
  constructor(props) {
    super(props);
    this.column = React.createRef();
  }

  componentDidMount() {
    const remoteData = dataState.getState();
    const cardOrder = remoteData.cards.filter(
      el => el.category === this.props.category
    );
    remoteData.updateOrder(this.props.category, cardOrder);
    uiState
      .getState()
      .getCoords(
        this.props.category,
        this.column.current.getBoundingClientRect()
      );
  }
  getCoords = () => {
    return this.column.current.getBoundingClientRect();
  };
  populateIds = () => {
    let arr = [];
    dataState.getState()[this.props.category].forEach(el => arr.push(el.id));
    return arr;
  };
  handleMouseMove = (pageX, pageY) => {
    const remoteUi = uiState.getState();
    if (remoteUi.isPressed) {
      const remoteOrder = dataState.getState()[this.props.category];
      const currentRow = clamp(
        Math.round((pageY - remoteUi.initialDeltaY) / 165),
        0,
        remoteOrder.length - 1
      );
      let newOrder = [...dataState.getState()[this.props.category]];
      if (
        currentRow !== remoteOrder.indexOf(remoteUi.currentCard) &&
        remoteOrder.indexOf(remoteUi.currentCard) !== -1
      ) {
        newOrder = reinsert(
          remoteOrder,
          remoteOrder.indexOf(remoteUi.currentCard),
          currentRow
        );
        dataState.getState().updateOrder(this.props.category, newOrder);
        uiState.getState().triggerUpdate();
      }
    }
  };
  render() {
    const mobile = isMobile();
    return (
      <Subscribe to={dataState}>
        {props => {
          const renderOrder = props[this.props.category];
          return (
            <div
              style={{
                minHeight: `${
                  mobile || window.innerWidth < 1100
                    ? renderOrder
                      ? renderOrder.length * 200
                      : 300
                    : (props.longestCol && props.longestCol * 180) || 900
                }px`
              }}
              className={`column ${
                props.hoveredCol === this.props.category ? "insert" : ""
              }`}
              ref={this.column}
            >
              <p className="field-text">
                {this.props.name}
                <span>({renderOrder && renderOrder.length})</span>
              </p>
              <div>
                {renderOrder &&
                  renderOrder.map((el, i) => {
                    return (
                      <UICard
                        key={i}
                        ids={this.populateIds()}
                        cardInfo={el}
                        yOrder={i}
                      />
                    );
                  })}
              </div>
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
