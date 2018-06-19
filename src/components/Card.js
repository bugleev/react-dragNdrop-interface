import React from "react";
import { Gesture } from "react-with-gesture";
import { Spring, animated, interpolate } from "react-spring";

class Card extends React.PureComponent {
  render() {
    const { data, id, yOrder } = this.props;
    return (
      <React.Fragment>
        <Gesture>
          {({ down, xDelta, yDelta }) => (
            <Spring
              native
              to={{
                x: down ? xDelta : 0,
                y: down ? yDelta : yOrder * 165,
                shadow: down ? 16 : 1,
                zIndex: down ? 99 : 1
              }}
              immediate={name =>
                down &&
                (name === "x" ||
                  name === "y" ||
                  name === "shadow" ||
                  name === "zIndex")
              }
            >
              {({ x, y, shadow, zIndex }) => (
                <animated.div
                  className="draggable card"
                  id={`${id}`}
                  style={{
                    boxShadow: interpolate(
                      shadow,
                      shadow =>
                        `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2.3 *
                          shadow}px 0px`
                    ),
                    zIndex: interpolate(zIndex, zIndex => `${zIndex}`),
                    transform: interpolate(
                      [x, y],
                      (x, y) => `translate3d(${x}px, ${y}px, 0)`
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
          )}
        </Gesture>
      </React.Fragment>
    );
  }
}
export default Card;
