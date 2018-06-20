import { createStore } from "react-contextual";

export const uiState = createStore({
  initialDeltaY: 0,
  pos: null,
  isPressed: false,
  handleMouseDown: (pos, pressY, { pageY }) => {
    return state => ({
      initialDeltaY: pageY - pressY,
      pos: pos,
      isPressed: true
    });
  },
  handleMouseUp: () => state => ({
    isPressed: false
  })
});
