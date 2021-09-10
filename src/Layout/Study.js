import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { readDeck } from '../utils/api/index.js'
import CardList from './CardList'


function Study() {
    const [deck, setDeck] = useState({})
    const {deckId} = useParams()
    
    useEffect(() => { 
        const findDeck = async () => { 
            const currDeck = await readDeck(deckId)
            setDeck(()=> currDeck)    
        }
        findDeck()
    }, [deckId])
    

    if (Object.keys(deck).length) {
        return (
            <div className="col-9 mx-auto">

                {/* navigation bar */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">

                        <li className="breadcrumb-item">
                            <Link to={"/"}><i className="fa fa-home" aria-hidden="true">
                                </i> Home
                            </Link>
                        </li>
                        
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>

                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>
                </nav>
                
                {/* title */}
                <div>
                    <h1>{deck.name}: Study</h1>
                </div>

                {/* card list */}
                <CardList cards={deck.cards}/>
            </div>
        )

    } else {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">
                   Loading...
                </span>
            </div>
        ) 
    }
}

export default Study;