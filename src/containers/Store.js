import { createStore } from "react-contextual";
import * as data from "../data.json";

export const store = createStore({
  cards: data.cards,
  modalData: null,
  modalOpen: false,
  hoveredCol: null,
  updateCards: (id, category) => {
    return state => {
      const newCards = [...state.cards];
      newCards.forEach(el => {
        el.category = el.id === id ? category : el.category;
      });
      return {
        cards: newCards
      };
    };
  },
  updateHovered: id => {
    return state => ({
      hoveredCol: id
    });
  },
  updateOrder: (id, newOrder) => {
    //console.log("updating order", id, newOrder);
    return state => {
      return {
        [id]: newOrder
      };
    };
  }
});
