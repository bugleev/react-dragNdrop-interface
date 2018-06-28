import { createStore } from "react-contextual";
import * as data from "data.json";

const dataState = createStore({
  cards: data.cards,
  modalData: null,
  modalOpen: false,
  hoveredCol: null,
  longestCol: null,
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
    return state => {
      let i = 1;
      let length = 0;
      for (let key in state) {
        if (key <= 5) {
          length = state[key].length > length ? state[key].length : length;
          i++;
        }
      }
      return {
        [id]: newOrder,
        longestCol: length
      };
    };
  }
});
export default dataState;
