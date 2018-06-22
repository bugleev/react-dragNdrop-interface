import React from "react";
import { Spring, animated, interpolate } from "react-spring";
import { subscribe } from "react-contextual";
import { uiState } from "../containers/UIState";

export const UICard = subscribe(uiState)(props => <Card uiProps={props} />);

class Card extends React.Component {
  shouldComponentUpdate(prevProps, nextProps) {
    if (
      prevProps.uiProps.ids &&
      prevProps.uiProps.pos &&
      prevProps.uiProps.ids.indexOf(prevProps.uiProps.pos.id) !== -1
    ) {
      return true;
    } else return false;
  }
  componentWillUpdate() {
    //console.log("updating", this.props.uiProps.cardInfo.id);
  }
  handleMouseEnter = () => {
    console.log("entering");
  };

  render() {
    const {
      cardInfo,
      yOrder,
      isPressed,
      mouseY,
      pageX,
      pos
    } = this.props.uiProps;
    const { data, id } = cardInfo;
    const active = cardInfo === pos && isPressed;
    const style = active
      ? {
          x: pageX,
          y: mouseY,
          scale: 1.1,
          shadow: 16,
          zIndex: 99
        }
      : {
          x: 0,
          y: yOrder * 165,
          scale: 1,
          shadow: 1,
          zIndex: 10
        };
    return (
      <Spring native immediate={active} to={style}>
        {({ x, y, shadow, scale, zIndex }) => (
          <animated.div
            className="draggable card"
            id={`${id}`}
            onMouseDown={uiState
              .getState()
              .handleMouseDown.bind(null, cardInfo, yOrder * 165)}
            onMouseUp={uiState.getState().handleMouseUp}
            style={{
              boxShadow: interpolate(
                shadow,
                shadow =>
                  `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2.3 * shadow}px 0px`
              ),
              zIndex: active ? 99 : 1,
              userSelect: isPressed ? "none" : "auto",
              transform: interpolate(
                [x, y, scale],
                (x, y, scale) =>
                  `translate3d(${x}px, ${y}px, 0) scale(${scale})`
              )
            }}
          >
            <div className="card--link">
              <p />
              <a href="">{data.link}</a>
            </div>
            <div className="card--number">
              <div>
                <span>
                  №&#32;<a href="">{data.number}</a>
                </span>
                <span>норм</span>
              </div>
            </div>
            <div className="card--status">
              <span>{data.status}</span>
            </div>
            <div className="card--body">
              <p>{data.body}</p>
            </div>
            <div className="card--stamp">
              <span>{data.stamp}</span>
            </div>
          </animated.div>
        )}
      </Spring>
    );
  }
}
