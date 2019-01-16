const initialState = {
  0: false,
  1: false,
  2: false,
  3: false,
};

const addCardIsShowed = (state = initialState, action) => {
  switch (action.type) {
    case 'HIDE_ADD_CARD_FORM':
      return {
        ...state,
        [action.columnId]: false,
      };
    case 'SHOW_ADD_CARD_FORM':
      return {
        ...state,
        [action.columnId]: true,
      };
    default:
      return state;
  }
};

export default addCardIsShowed;
