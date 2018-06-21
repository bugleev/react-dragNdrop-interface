import React from "react";
import Card, { UICard } from "./Card";
import { Subscribe } from "react-contextual";
import { store } from "../containers/Store";
import { uiState } from "../containers/UIState";

export default class Column extends React.Component {
  state = {
    order: []
  };
  shouldComponentUpdate(prevState, nextProps) {
    console.log(prevState, nextProps);
    return true;
  }

  componentDidMount() {
    const remoteState = store.getState();
    const cardOrder = remoteState.cards.filter(
      el => el.category === this.props.category
    );
    console.log(cardOrder);
    this.setState({ order: cardOrder });
  }
  handleMouseMove = ({ pageY }) => {
    const clamp = (n, min, max) => Math.max(Math.min(n, max), min);
    const reinsert = (arr, from, to) => {
      const _arr = arr.slice(0);
      const val = _arr[from];
      _arr.splice(from, 1);
      _arr.splice(to, 0, val);
      return _arr;
    };

    const remoteUi = uiState.getState();
    if (remoteUi.isPressed) {
      const mouseY = pageY - remoteUi.initialDeltaY;
      const currentRow = clamp(
        Math.round((pageY - remoteUi.initialDeltaY) / 165),
        0,
        this.state.order.length - 1
      );
      let newOrder = this.state.order;
      if (currentRow !== this.state.order.indexOf(remoteUi.pos)) {
        newOrder = reinsert(
          this.state.order,
          this.state.order.indexOf(remoteUi.pos),
          currentRow
        );
        this.setState({ order: newOrder });
      }
      uiState.getState().updateY(mouseY);
    }
  };
  render() {
    const { order } = this.state;
    return (
      <div className="column" onMouseMove={this.handleMouseMove}>
        <p className="field-text">
          {this.props.name}
          <span>({order.length})</span>
        </p>

        <div>
          {order.map((el, i) => <UICard key={i} cardInfo={el} yOrder={i} />)}
        </div>
      </div>
    );
  }
}
