import React from 'react';
import { PropTypes } from 'prop-types';

const AddCard = ({
  addCard,
}) => {
  let input;
  return (
    <div className="addform">
      <button type="button" className="button plus" onClick={}> + </button>
      {isFormShowed && (
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            addCard(input.value);
            input.value = '';
          }}
          >
            <p>
              <input
                maxLength="42"
                ref={(node) => { input = node; }}
                className="new_card_name"
                type="text"
                placeholder="Card Name"
                required="required"
              />
              <input className="button" type="submit" value="Create" />
            </p>
          </form>
          <button type="button" className="button" onClick={() => { input.value = ''; }}> Cancel </button>
        </div>
      )}
    </div>
  );
};

AddCard.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default AddCard;
