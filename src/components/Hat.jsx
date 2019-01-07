import React from 'react';
import PropTypes from 'prop-types';

const Hat = ({ user, signUp }) => (
  <div className="hat">
    <button type="button" className="button" style={{ float: 'left', padding: 0 }} onClick={() => { signUp(''); }}>Exit profile</button>
    <p style={{ fontSize: '22px' }}>{user}</p>
  </div>
);

Hat.propTypes = {
  user: PropTypes.string.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default Hat;
