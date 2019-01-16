import React from 'react';
import { PropTypes } from 'prop-types';
import ColumnContainer from '../containers/ColumnContainer';
import SignInContainer from '../containers/SignInContainer';


const Board = ({ user, columns }) => (
  <React.Fragment>
    { !user.name && (
      <div role="presentation" className="fade">
        <SignInContainer />
      </div>
    )}
    { user.name && (
      <React.Fragment>
        {user.name}
        {columns.map(column => <ColumnContainer key={column.id} id={column.id} name={column.name} />)}
      </React.Fragment>
    )}
  </React.Fragment>
);

Board.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  columns: PropTypes.arrayOf(PropTypes.any).isRequired,
};

Board.defaultProps = {
  user: { name: '' },
};

export default Board;
