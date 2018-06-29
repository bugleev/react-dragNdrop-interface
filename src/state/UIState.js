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
      pageX: mobile.offset,
      currentCard: currentCard,
      initialCol: currentCard.category,
      isPressed: true
    });
  },
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
        top:
          isMobile() || window.innerWidth < 1100 ? top + window.scrollY : top,
        bottom:
          isMobile() || window.innerWidth < 1100
            ? bottom + window.scrollY
            : bottom
      }
    });
  },
  handleMouseUp: () => state => ({
    isPressed: false,
    initialDeltaY: 0,
    initialDeltaX: 0,
    pageX: 0
  }),

  setColumnsLoaded: () => state => ({
    columnsLoaded: true
  }),
  disableAnimation: () => state => ({
    animate: false,
    drop: true
  })
});
export default uiState;
