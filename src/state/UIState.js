import { createStore } from "react-contextual";
import { isMobile } from "utilities";

const uiState = createStore({
  initialDeltaY: 0,
  initialDeltaX: 0,
  pageX: 0,
  mouseY: 0,
  columnsLoaded: false,
  currentCard: null,
  isPressed: false,
  initialCol: null,
  animate: true,
  updateCards: false,
  drop: false,
  handleMouseDown: (currentCard, pressY, mobile, e) => {
    return state => ({
      columnsLoaded: false,
      drop: false,
      animate: true,
      updateCards: false,
      initialDeltaY:
        mobile.type === "mobile"
          ? e.touches[0].pageY - pressY
          : e.pageY - pressY,
      initialDeltaX: mobile.type === "mobile" ? e.touches[0].pageX : e.pageX,
      mouseY: pressY,
      pageX: mobile.type === "mobile" ? mobile.offset : 0,
      currentCard: currentCard,
      initialCol: currentCard.category,
      isPressed: true
    });
  },
  handleTouchStart: (key, pressLocation, e) =>
    this.handleMouseDown(key, pressLocation, e.touches[0]),
  updateCoords: (x, y) => state => ({
    pageX: x,
    mouseY: y
  }),
  updateHovered: id => state => ({
    hoveredCol: id
  }),
  triggerUpdate: () => state => ({
    updateCards: true
  }),
  getCoords: (column, { left, right, top, bottom }) => {
    return state => ({
      [`col_${column}`]: {
        id: column,
        left,
        right,
        top: isMobile() ? top + window.scrollY : top,
        bottom: isMobile() ? bottom + window.scrollY : bottom
      }
    });
  },
  handleMouseUp: () => state => ({
    isPressed: false,
    initialDeltaY: 0,
    initialDeltaX: 0,
    pageX: 0
  }),

  columns: () => state => ({
    columnsLoaded: true
  }),
  disableAnimation: () => state => ({
    animate: false,
    drop: true
  })
});
export default uiState;
