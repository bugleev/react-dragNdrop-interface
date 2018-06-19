import { createStore } from "react-contextual";
import * as data from "../data.json";

export const store = createStore({
  cards: data.cards,
  modalData: null,
  modalOpen: false,
  up: () => state => ({ count: state.count + 1 }),
  down: () => state => ({ count: state.count - 1 })
});
