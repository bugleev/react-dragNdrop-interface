import React from "react";
import { Gesture } from "react-with-gesture";
import { Spring, animated, interpolate } from "react-spring";
import { Subscribe } from "react-contextual";
import { uiState } from "../containers/UIState";

class Card extends React.PureComponent {
  render() {
    const { cardInfo, yOrder } = this.props;
    const { data, id } = cardInfo;
    return (
      <Subscribe
        to={uiState}
        select={state => ({
          initialDeltaY: state.initialDeltaY,
          pos: state.pos
        })}
      >
        {props => (
          <React.Fragment>
            <Gesture>
              {({ down, xDelta, yDelta, y }) => {
                const style = down
                  ? {
                      x: xDelta,
                      y: y - props.initialDeltaY,
                      scale: 1.1,
                      shadow: 16,
                      zIndex: 99
                    }
                  : {
                      x: 0,
                      y: yOrder * 165,
                      scale: 1,
                      shadow: 1,
                      zIndex: 1
                    };

                return (
                  <Spring
                    native
                    to={style}
                    immediate={name => down && name === "y"}
                  >
                    {({ x, y, shadow, zIndex, scale }) => (
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
                              `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2.3 *
                                shadow}px 0px`
                          ),
                          zIndex: id === props.pos ? 99 : 1,
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
              }}
            </Gesture>
          </React.Fragment>
        )}
      </Subscribe>
    );
  }
}
export default Card;
