import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ user, signIn }) => (
  <div className="hat">
    <button type="button" className="button left" onClick={() => { signIn(''); }}>Exit profile</button>
    <p className="hatUserName">{user}</p>
  </div>
);

Header.propTypes = {
  user: PropTypes.string.isRequired,
  signIn: PropTypes.func.isRequired,
};

export default Header;
