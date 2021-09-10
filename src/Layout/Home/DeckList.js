import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { deleteDeck } from '../../utils/api/index.js'

function DeckList({deck, updateDecks}) {
    // deck includes the following content
    const { id, name, description, cards } = deck
    const deckLength = cards.length
    const history = useHistory()

    // delete button handler
    const deleteHandler = async () => {
          if (window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")) {
            await deleteDeck(id)
            updateDecks(-1)
            history.go(0)
          } else {
              history.go(0)
          } 
      }

    
      return ( 
        <div className="card w-75 mb-4">
            <div className="card-body">
                <div className="row px-3">
                    <h5 className="card-title">{name}</h5>
                    <p className="ml-auto">{deckLength} cards</p>
                </div>
                <p className="card-text">{description}</p>
                <div className="row px-3">
                    <Link to={`/decks/${id}`} className="btn btn-secondary">
                            <i className="fa fa-eye" aria-hidden="true">
                            </i> 
                        View
                    </Link>

                    <Link to={`/decks/${id}/study`} className="btn btn-primary ml-3">
                        <i className="fa fa-bookmark" aria-hidden="true">
                        </i> 
                        Study
                    </Link>

                    <button 
                        onClick={deleteHandler} 
                        name="delete" 
                        value={id} 
                        className="btn btn-danger ml-auto">
                        <i className="fa fa-trash" aria-hidden="true">
                        </i>
                        </button>
                </div>
            </div>
        </div>
    )
}

export default DeckList;