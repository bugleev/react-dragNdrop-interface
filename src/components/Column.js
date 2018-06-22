import React from "react";
import { UICard } from "./Card";

import { store } from "../containers/Store";
import { uiState } from "../containers/UIState";

export default class Column extends React.Component {
  constructor(props) {
    super(props);
    this.column = React.createRef();
  }
  state = {
    order: [],
    class: ""
  };

  shouldComponentUpdate(prevState, nextProps) {
    //console.log(prevState, nextProps);
    return true;
  }

  componentDidMount() {
    const remoteState = store.getState();
    const cardOrder = remoteState.cards.filter(
      el => el.category === this.props.category
    );
    uiState
      .getState()
      .getCoords(
        this.props.category,
        this.column.current.getBoundingClientRect()
      );

    this.setState({
      order: cardOrder
    });
  }
  componentWillUnmount() {}
  populateIds = () => {
    let arr = [];
    this.state.order.forEach(el => arr.push(el.id));
    return arr;
  };

  clamp = (n, min, max) => Math.max(Math.min(n, max), min);
  reinsert = (arr, from, to) => {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
  };
  handleMouseLeave = () => {
    const remoteUi = uiState.getState();
    if (remoteUi.isPressed) {
      console.log("leaving", this.props);
      if (this.state.order.indexOf(remoteUi.pos) === -1) {
        this.state.class && this.setState({ class: "" });
      }
    }
  };
  handleMouseMove = (pageX, pageY) => {
    const remoteUi = uiState.getState();
    if (remoteUi.isPressed) {
      // if (this.state.order.indexOf(remoteUi.pos) === -1) {
      //   !this.state.class && this.setState({ class: "insert" });
      // }
      const currentRow = this.clamp(
        Math.round((pageY - remoteUi.initialDeltaY) / 165),
        0,
        this.state.order.length - 1
      );

      let newOrder = this.state.order;
      //console.log("moving", this.props);
      if (
        currentRow !== this.state.order.indexOf(remoteUi.pos) &&
        this.state.order.indexOf(remoteUi.pos) !== -1
      ) {
        newOrder = this.reinsert(
          this.state.order,
          this.state.order.indexOf(remoteUi.pos),
          currentRow
        );
        this.setState({ order: newOrder });
      } else {
        if (this.state.order.indexOf(remoteUi.pos) === -1) {
          store.getState().updateCards(remoteUi.pos.id, this.props.category);
        }
      }
    }
  };
  render() {
    const { order } = this.state;
    return (
      <div
        className={`column ${this.state.class}`}
        onMouseLeave={this.handleMouseLeave}
        ref={this.column}
      >
        <p className="field-text">
          {this.props.name}
          <span>({order.length})</span>
        </p>

        <div>
          {order.map((el, i) => (
            <UICard key={i} ids={this.populateIds()} cardInfo={el} yOrder={i} />
          ))}
        </div>
      </div>
    );
  }
}
