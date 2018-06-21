import { createStore } from "react-contextual";

export const uiState = createStore({
  initialDeltaY: 0,
  mouseY: 0,
  pos: null,
  isPressed: false,
  handleMouseDown: (pos, pressY, { pageY }) => {
    return state => ({
      initialDeltaY: pageY - pressY,
      mouseY: pressY,
      pos: pos,
      isPressed: true
    });
  },
  updateY: y => {
    return state => ({
      mouseY: y
    });
  },
  handleMouseUp: () => state => ({
    isPressed: false,
    initialDeltaY: 0
  })
});
