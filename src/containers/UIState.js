import { createStore } from "react-contextual";

export const uiState = createStore({
  initialDeltaY: 0,
  initialDeltaX: 0,
  pageX: 0,
  mouseY: 0,
  pos: null,
  isPressed: false,
  initialCol: null,
  hoveredCol: null,
  handleMouseDown: (pos, pressY, { pageX, pageY }) => {
    return state => ({
      initialDeltaY: pageY - pressY,
      initialDeltaX: pageX,
      mouseY: pressY,
      pageX: 0,
      pos: pos,
      initialCol: pos.category,
      isPressed: true
    });
  },
  updateCoords: (x, y) => {
    return state => ({
      pageX: x,
      mouseY: y
    });
  },
  updateHovered: id => {
    return state => ({
      hoveredCol: id
    });
  },
  getCoords: (column, { left, right, top, bottom }) => {
    return state => ({
      [`col_${column}`]: {
        id: column,
        left,
        right,
        top,
        bottom
      }
    });
  },
  handleMouseUp: () => state => ({
    isPressed: false,
    initialDeltaY: 0,
    initialDeltaX: 0,
    pageX: 0
  })
});
