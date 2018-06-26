import React from "react";
import { UICard } from "./Card";
import { Subscribe, subscribe } from "react-contextual";
import { store } from "../containers/Store";
import { order } from "../containers/Order";
import { uiState } from "../containers/UIState";

export default class Column extends React.Component {
  constructor(props) {
    super(props);
    this.column = React.createRef();
  }
  state = {
    class: ""
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUpdate() {}
  componentWillMount() {}
  componentDidMount() {
    const cardOrder = this.props.cards.filter(
      el => el.category === this.props.category
    );
    store.getState().updateOrder(this.props.category, cardOrder);
    uiState
      .getState()
      .getCoords(
        this.props.category,
        this.column.current.getBoundingClientRect()
      );
  }
  componentWillUnmount() {}
  populateIds = () => {
    let arr = [];
    store.getState()[this.props.category].forEach(el => arr.push(el.id));
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
    this.state.class && this.setState({ class: "" });
    const remoteUi = uiState.getState();
    const remoteOrder = store.getState()[this.props.category];
    if (remoteUi.isPressed) {
      console.log("leaving", this.props);
      if (remoteOrder.indexOf(remoteUi.pos) === -1) {
        this.state.class && this.setState({ class: "" });
        // remoteUi.handleMouseUp();
      }
    }
  };
  clearClass = () => {
    //this.state.class && this.setState({ class: "" });
    !this.state.class && this.setState({ class: "insert" });
    // remoteUi.handleMouseUp();
  };
  handleMouseMove = (pageX, pageY) => {
    const remoteUi = uiState.getState();
    if (remoteUi.isPressed) {
      if (store.getState()[this.props.category].indexOf(remoteUi.pos) === -1) {
        //!this.state.class && this.setState({ class: "insert" });
      }
      const remoteOrder = store.getState()[this.props.category];
      const currentRow = this.clamp(
        Math.round((pageY - remoteUi.initialDeltaY) / 165),
        0,
        remoteOrder.length - 1
      );
      let newOrder = [...store.getState()[this.props.category]];
      //console.log("moving", this.props);
      if (
        currentRow !== remoteOrder.indexOf(remoteUi.pos) &&
        remoteOrder.indexOf(remoteUi.pos) !== -1
      ) {
        newOrder = this.reinsert(
          remoteOrder,
          remoteOrder.indexOf(remoteUi.pos),
          currentRow
        );
        store.getState().updateOrder(this.props.category, newOrder);
      } else {
        if (remoteOrder.indexOf(remoteUi.pos) === -1) {
          //this.props.updateCards(remoteUi.pos.id, this.props.category);
        }
      }
    }
  };
  render() {
    //console.log("rendering!", store.getState());
    return (
      <Subscribe to={store}>
        {props => {
          const renderOrder = props[this.props.category];
          return (
            <div
              className={`column ${
                props.hoveredCol === this.props.category ? "insert" : ""
              }`}
              onMouseLeave={this.handleMouseLeave}
              ref={this.column}
            >
              <p className="field-text">
                {this.props.name}
                <span>({renderOrder && renderOrder.length})</span>
              </p>
              <div>
                {renderOrder &&
                  renderOrder.map((el, i) => {
                    //console.log("loop[ing", renderOrder);
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
