let nextCardId = 0;

export const addCard = (text, columnId, user) => {
  return {
    type: 'ADD_CARD',
    id: nextCardId++,
    text,
    user,
    columnId,
  };
};

export const deleteCard = (id, columnId) => {
  return {
    type: 'DELETE_CARD',
    id,
    columnId,
  };
};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
};

export const signIn = (name) => {
  return {
    type: 'SIGN_IN',
    name,
  };
};

export const renameCard = (text, id) => {
  return {
    type: 'RENAME_CARD',
    text,
    id,
  };
};

export const hideShowAddForm = (columnId) => {
  return {
    type: 'HIDE_ADD_CARD_FORM',
    columnId,
  };
};
