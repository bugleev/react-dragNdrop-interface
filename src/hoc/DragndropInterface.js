import * as React from "react";

function DragndropInterface(WrappedComponent) {
  return class Interface extends React.Component {
    state = {
      cardId: null,
      endNode: null,
      nextSib: null,
      prevSib: null,
      startNode: null,
      updateOnDrop: false
    };

    drag = ev => {
      ev.dataTransfer.setData("text", ev.currentTarget.id);
      const parent = ev.currentTarget.parentElement;
      const prevNode = parent.previousSibling;
      const nextNode = parent.nextSibling;
      const prevSib = prevNode && prevNode.id;
      const nextSib = nextNode && nextNode.id;
      if (prevSib !== this.state.prevSib || nextSib !== this.state.nextSib) {
        this.setState({
          cardId: ev.currentTarget.id,
          prevSib,
          nextSib,
          startNode: parent.id,
          updateOnDrop: false
        });
      } else {
        this.setState({
          cardId: ev.currentTarget.id,
          startNode: parent.id,
          updateOnDrop: false
        });
      }
    };

    allowDrop = ev => {
      const currentTarget = ev.target;
      if (
        currentTarget.id === this.state.prevSib ||
        currentTarget.id === this.state.nextSib
      ) {
        ev.preventDefault();
        return;
      } else {
        ev.dataTransfer.dropEffect = "none";
      }
    };

    drop = ev => {
      if (
        ev.target.id === this.state.prevSib ||
        ev.target.id === this.state.nextSib
      ) {
        ev.preventDefault();
        this.setState({ endNode: ev.target.id, updateOnDrop: true }, () => {
          setTimeout(() => {
            this.setState({ endNode: null, startNode: null });
          }, 100);
        });
      }
    };

    render() {
      return (
        <WrappedComponent
          state={this.state}
          drop={this.drop}
          allowDrop={this.allowDrop}
          drag={this.drag}
          {...this.props}
        />
      );
    }
  };
}

export default DragndropInterface;
