const initialState = [
  { id: 0, name: 'TODO' },
  { id: 1, name: 'In Progress' },
  { id: 2, name: 'Testing' },
  { id: 3, name: 'Done' },
];

const columns = (state = initialState, action) => {
  switch (action.type) {
    case 'RENAME_COLUMN':
      return state.map((column) => {
        if (column.id === action.id) {
          return {
            ...column,
            name: action.name,
          };
        }
        return column;
      });
    default:
      return state;
  }
};

export default columns;
