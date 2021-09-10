
import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom'

function CardList({ cards }) {
    const [currentCard, setCurrentCard] = useState(0)
    // set the card to be on the front side
    const [frontSide, setFrontSide] = useState(true)
    const {deckId} = useParams()
    const history = useHistory()
    
    // if user is on the last card in the deck, notify to restart it,
    // or return to home page if not
    const nextHandler = () => {
        if (currentCard === (cards.length-1)) {
            window.confirm("Click OK to restart the deck, or CANCEL to return to the homepage.")
            ? setCurrentCard(() => 0) 
            : history.push("/")

        // if not, go to next card
        } else {
            setCurrentCard((currentCard) => currentCard+1)
            setFrontSide(() => !frontSide)
        }
    }

    // if user flips card, change sides
    const flipHandler = () => {
        setFrontSide(() => !frontSide)
    }
 
    
    // if there are more than two cards in the deck
    if (cards.length > 2) { 
        return (
            <div className="row p-3">
                <div className="card w-100">

                    <div className="card-body">
                        <h5 className="card-title">
                            Card {currentCard+1} of {cards.length}
                        </h5>
                    
                        <p className="card-text">
                            {frontSide ? cards[currentCard].front : cards[currentCard].back}
                        </p>

                        {/* flip card button */}
                        <button onClick={flipHandler} className="btn btn-secondary mr-3">
                            Flip
                        </button>

                        {/* if card is on back side, provide a button to go to next card */}
                        {frontSide ? null : 
                        <button onClick={nextHandler} className="btn btn-primary">
                            Next
                        </button>}                 
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className="row p-3 w-100">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Not enough cards.
                        </h5>
                        <p className="card-text">
                            You need at least 3 cards to study. There are {cards.length} cards in this deck.
                        </p>

                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary ml-3">
                                <i className="fa fa-plus" aria-hidden="true">
                                </i> 
                            Add Cards
                        </Link>
                    </div>
                </div>
            </div>
        )    
    }
}

export default CardList;