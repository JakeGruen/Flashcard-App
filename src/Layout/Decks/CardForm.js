import React from 'react';
import {Link} from 'react-router-dom';

// function for the card form that takes in props -
//  the card, it's deck's id, the form's submit 
// component, and the form's change component
function CardForm(
      { submitForm, 
        changeForm, 
        card, 
        deckId }
    ) {
    
  
    return (

        <form 
        id="cardForm" 
        onSubmit={submitForm}
        >
                <div className="form-group">
                    {/* text area for front of card */}
                    <label>
                        Front
                    </label>
                    <textarea  
                        name="front"
                        value={card.front}
                        onChange={changeForm}
                        id="front" 
                        className="form-control" 
                        placeholder="Front side of card"
                        rows={4}
                    />
                </div>


                <div className="form-group">
                    {/* text area for back of card */}
                    <label>Back</label>
                    <textarea
                    name="back" 
                    value={card.back}
                    onChange={changeForm}
                    className="form-control" 
                    id="back" 
                    placeholder="Back side of card"
                    rows={4}
                    />
                </div>

                {/* button for when card form is completed */}
                <Link 
                    to={`/decks/${deckId}`} 
                    name="cancel" 
                    className="btn btn-secondary mr-3">
                    Done
                </Link>

                {/* save the card's content */}
                <button 
                    type="submit" 
                    className="btn btn-primary">
                    Save
                </button>
                
            </form>
    )

}

export default CardForm;