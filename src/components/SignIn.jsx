import React from 'react';
import { PropTypes } from 'prop-types';

const SignIn = ({
  signIn,
}) => {
  let input;
  return (
    <div className="who">
      <p>Hi, what`s your name?</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        signIn(input.value);
        input.value = '';
      }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
          className="new_card_name"
        />
        <button className="button" type="submit">
          SignIn
        </button>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default SignIn;
