import React from 'react';
import PropTypes from 'prop-types';

const Hat = ({ user, signIn }) => (
  <div className="hat">
    <button type="button" className="button" style={{ float: 'left', padding: 0 }} onClick={() => { signIn(''); }}>Exit profile</button>
    <p style={{ fontSize: '22px' }}>{user}</p>
  </div>
);

Hat.propTypes = {
  user: PropTypes.string.isRequired,
  signIn: PropTypes.func.isRequired,
};

export default Hat;
