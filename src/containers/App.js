import * as React from "react";
import Backdrop from "../components/Backdrop";
import Column from "../components/Column";
import Modal from "../components/Modal";
import * as data from "../data.json";
import "../styles.css";

const Layout = props => {
  const children = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      cardToDrop: props.cardToDrop,
      endNode: props.endNode,
      onClick: props.onClick,
      onDragOver: props.onDragOver,
      onDragStart: props.onDragStart,
      onDrop: props.onDrop,
      startNode: props.startNode
    });
  });
  return <div className="container">{children}</div>;
};

class App extends React.Component {
  state = {
    cards: data.cards,
    modalData: null,
    modalOpen: false
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.state.updateOnDrop ||
      this.state.modalOpen !== nextState.modalOpen
    ) {
      return true;
    } else {
      return false;
    }
  }
  componentDidUpdate() {
    if (this.state.modalOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        const modal = document.querySelector(".modal");
        if (modal) {
          modal.classList.add("open");
        }
      }, 25);
    } else {
      document.body.style.overflow = "auto";
    }
  }

  handleCardClick = ev => {
    const modalData = this.pickCard(ev.currentTarget.id)[0];
    this.setState({ modalOpen: true, modalData });
  };
  removeModal = ev => {
    document.querySelector(".modal").classList.remove("open");
    document.querySelector(".modal").classList.add("close");
    setTimeout(() => {
      this.setState({ modalOpen: false });
    }, 200);
  };
  pickCard = cardId => {
    return this.state.cards.filter(el => el.id === cardId);
  };
  render() {
    const { cards, modalOpen } = this.state;
    return (
      <React.Fragment>
        {modalOpen && <Modal cardData={this.state.modalData} />}
        {modalOpen && <Backdrop onClick={this.removeModal} />}
        <Layout
          cardToDrop={this.pickCard(this.props.state.cardId)[0]}
          endNode={this.props.state.endNode}
          startNode={this.props.state.startNode}
          onClick={this.handleCardClick}
          onDragStart={this.props.drag}
          onDragOver={this.props.allowDrop}
          onDrop={this.props.drop}
        >
          <Column name="Согласование" id="1" cards={cards} />
          <Column name="В ожидании" id="2" />
          <Column name="Разработка" id="3" />
          <Column name="Тестирование" id="4" />
          <Column name="Готово" id="5" />
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
