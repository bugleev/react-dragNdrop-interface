import { createStore } from "react-contextual";

export const order = createStore({
  cards: [],
  updateOrder: (id, newOrder) => {
    console.log("updating order", id, newOrder);
    return state => {
      return {
        [`col_${id}`]: newOrder
      };
    };
  }
});
