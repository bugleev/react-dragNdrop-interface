import * as React from "react";
import Card from "./Card";
import { Subscribe } from "react-contextual";
import { store } from "../containers/Store";

export default class Column extends React.Component {
  render() {
    const { category } = this.props;
    let count = 0;
    return (
      <Subscribe to={store} select={props => ({ cards: props.cards })}>
        {props => (
          <div className="column">
            <p className="field-text">
              {this.props.name}
              <span>
                ({props.cards.filter(el => el.category === category).length})
              </span>
            </p>
            {props.cards.map((el, i) => {
              return el.category === category
                ? (count++,
                  <Card key={i} data={el.data} id={el.id} yOrder={count} />)
                : null;
            })}
          </div>
        )}
      </Subscribe>
    );
  }
}
