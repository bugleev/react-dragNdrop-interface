import * as React from "react";

const Modal = props => {
  const { data } = props.cardData;
  return (
    <div className="modal">
      <div className="card--link">
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
    </div>
  );
};
export default Modal;
