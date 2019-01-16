import { connect } from 'react-redux';
import Card from '../components/Card';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const CardContainer = connect(mapStateToProps)(Card);

export default CardContainer;
