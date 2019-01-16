import { connect } from 'react-redux';
import Column from '../components/Column';
import { addCard, deleteCard, hideAddForm, showAddForm } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (text, id, user) => {
      dispatch(addCard(text, id, user));
    },
    deleteCard: (id, columnId) => {
      dispatch(deleteCard(id, columnId));
    },
    hideAddForm: (columnId) => {
      dispatch(hideAddForm(columnId));
    },
    showAddForm: (columnId) => {
      dispatch(showAddForm(columnId));
    },
  };
};

const ColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Column);

export default ColumnContainer;
