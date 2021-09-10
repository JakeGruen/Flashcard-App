import React, { useState, useEffect } from "react"
import DeckList from "./DeckList"
import { Link } from "react-router-dom"
import { listDecks } from '../../utils/api/index.js'

function Home({updateDecks, deckLength}) {
  const [decks, setDecks] = useState([])

  useEffect(() => { 

    const abortController = new AbortController()
    const retrieveDecks = async () => { 
      const ApiDecks = await listDecks(abortController.signal)
        setDecks(() => ApiDecks)
        } 

    retrieveDecks()
    return () => abortController.abort() 
  }, [deckLength])

   
    return (
      <div>  
        <div className="row mx-auto w-75">
            <Link to="/decks/new" className="btn btn-secondary w-25 mb-3">
              <i className="fa fa-plus" aria-hidden="true">
              </i> 
              Create Deck
            </Link>
        </div>

        <div className="row w-100 mx-auto flex-column align-items-center">
            {decks.map((deck) => 
              <DeckList 
                key={deck.id} 
                deck={deck} 
                updateDecks={updateDecks} 
              />)}
        </div>
        
      </div>
    )
}

export default Home;