import { createStore } from "react-contextual";
import * as data from "../data.json";

export const store = createStore({
  cards: data.cards,
  modalData: null,
  modalOpen: false,
  updateCards: (id, category) => {
    console.log("updating");
    return state => {
      const newCards = [...state.cards];
      newCards.forEach(el => {
        el.category = el.id === id ? category : el.category;
      });
      return {
        cards: newCards
      };
    };
  }
});
