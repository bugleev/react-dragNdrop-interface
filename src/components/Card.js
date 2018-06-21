import React from "react";
import { Gesture } from "react-with-gesture";
import { Spring, animated, interpolate } from "react-spring";
import { Subscribe, subscribe } from "react-contextual";
import { uiState } from "../containers/UIState";

export const UICard = subscribe(uiState)(props => <Card uiProps={props} />);

class Card extends React.Component {
  shouldComponentUpdate(prevProps, nextProps) {
    console.log(prevProps.uiProps.pos);
    return true;
  }

  render() {
    const { cardInfo, yOrder, isPressed, mouseY, pos } = this.props.uiProps;
    const { data, id } = cardInfo;
    const active = cardInfo === pos && isPressed;
    const style = active
      ? {
          y: mouseY,
          scale: 1.1,
          shadow: 16
        }
      : {
          y: yOrder * 165,
          scale: 1,
          shadow: 1
        };
    return (
      <React.Fragment>
        <Spring native immediate={active} to={style}>
          {({ y, shadow, scale }) => (
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
                zIndex: pos && pos.id === id ? 99 : 1,
                userSelect: isPressed ? "none" : "auto",
                transform: interpolate(
                  [y, scale],
                  (y, scale) => `translate3d(0px, ${y}px, 0) scale(${scale})`
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
      </React.Fragment>
    );
  }
}
