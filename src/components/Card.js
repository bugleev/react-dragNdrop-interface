import React from "react";
import { Spring, animated, interpolate } from "react-spring";
import { subscribe } from "react-contextual";
import { uiState, dataState } from "state";
import { isMobile } from "utilities";

export const UICard = subscribe(uiState)(props => <Card uiProps={props} />);

class Card extends React.Component {
  getNeighbours = card => {
    const remoteUi = this.props.uiProps;
    const remoteData = dataState.getState();
    const currentId = remoteData[remoteUi.initialCol].indexOf(card);
    return [currentId + 1, currentId, currentId - 1];
  };
  shouldComponentUpdate(prevProps, nextProps) {
    const remoteUi = prevProps.uiProps;
    // update only current card and two neighbours on reordering
    if (
      remoteUi.isPressed &&
      remoteUi.updateCards === true &&
      remoteUi.cardInfo.category === remoteUi.initialCol
    ) {
      const range = this.getNeighbours(remoteUi.currentCard);
      const currentId = this.props.uiProps.ids.indexOf(
        this.props.uiProps.cardInfo.id
      );
      return range.indexOf(currentId) !== -1;
    }
    // update on drop
    if (
      !remoteUi.isPressed &&
      remoteUi.drop &&
      remoteUi.cardInfo.category === remoteUi.initialCol
    ) {
      return true;
    }
    //update only pressed card
    if (remoteUi.currentCard === remoteUi.cardInfo) {
      return true;
    }
    return false;
  }

  render() {
    const {
      animate,
      cardInfo,
      yOrder,
      isPressed,
      mouseY,
      pageX,
      currentCard
    } = this.props.uiProps;
    const { data, id } = cardInfo;
    const active = cardInfo === currentCard && isPressed;
    const mobileOffset = isMobile() ? (window.screen.availWidth - 220) / 2 : 0;
    const style = active
      ? {
          x: pageX,
          y: mouseY,
          scale: 1.1,
          shadow: 16
        }
      : {
          x: mobileOffset,
          y: yOrder * 165,
          scale: 1,
          shadow: 1
        };
    return (
      <Spring native immediate={animate ? active : true} to={style}>
        {({ x, y, shadow, scale }) => (
          <animated.div
            className="draggable card"
            id={`${id}`}
            onMouseDown={uiState
              .getState()
              .handleMouseDown.bind(null, cardInfo, yOrder * 165, {
                type: "desktop",
                offset: 0
              })}
            onTouchStart={uiState
              .getState()
              .handleMouseDown.bind(null, cardInfo, yOrder * 165, {
                type: "mobile",
                offset: mobileOffset
              })}
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
