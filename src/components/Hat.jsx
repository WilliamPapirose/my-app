import React from 'react';
import PropTypes from 'prop-types';

const Hat = ({ user, signIn }) => (
  <div className="hat">
    <button type="button" className="button left" onClick={() => { signIn(''); }}>Exit profile</button>
    <p className="hatUserName">{user}</p>
  </div>
);

Hat.propTypes = {
  user: PropTypes.string.isRequired,
  signIn: PropTypes.func.isRequired,
};

export default Hat;
