import { connect } from 'react-redux';
import Board from '../components/Board';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    columns: state.columns,
  };
};

const BoardContainer = connect(
  mapStateToProps,
)(Board);

export default BoardContainer;
