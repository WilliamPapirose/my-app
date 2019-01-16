const initialState = {
  name: undefined,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { name: action.name };
    default:
      return state;
  }
};

export default user;
