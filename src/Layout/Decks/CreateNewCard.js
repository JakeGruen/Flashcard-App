import React, { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { createCard, readDeck } from '../../utils/api/index.js'
import CardForm from "./CardForm.js"




function CreateNewCard({updateDecks}) {
    // create an empty array for the original state of card deck
    const [deck, setDeck] = useState([])

    
  
    const [card, addCard] = useState(
        {front: "", 
        back: "", 
        deckId: ""}
        )


    // create a variable for deck's id
    const {deckId} = useParams()


    // use useEffect() to create a callback function with a deck's
    // id as a dependency
    useEffect(() => {

        // use abortController() to abort any web requests for different
        // decks
        const abortController = new AbortController()

        // create a variable that takes a deck's id, and returns it's 
        // api url
        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal)
            // with this url, set an array containing the data from the deck
            setDeck(() => response)
        }

        // return the newly created deck
        deckInfo()
        return () => abortController.abort()
    }, [deckId])



    // changeForm takes the targeted deck, and modifies a card's
    // useState to also contain it's name and value 
    const changeForm = ({ target }) => {
        addCard({...card, [target.name]: target.value})
    }


    
    const submitForm = async (event) => {
        event.preventDefault()
        // takes sets a card's object to contain all the
        // correct key/value pairs using addCard()
        addCard({...card, deckId: deckId})
        // makes a post request to add the card to the deck's
        // card list, and stringify's so it is no longer an 
        // object using createCard()
        await createCard(deckId, card)
        // return the new length of the card deck using
        // updateDecks()
        updateDecks(1)
        // update the deck with the newly added card using addCard()
        addCard({front: "", back: "", deckId: ""})
    }


   
    return (
        <div className="col-9 mx-auto">
           
            {/*navigation bar */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">

                    {/* link to home page */}
                    <li className="breadcrumb-item">
                        <Link to={"/"}>
                            <i className="fa fa-home" aria-hidden="true"></i>
                            Home
                        </Link>
                    </li>

                    {/*  link to deck */}
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>

                    {/* link for adding a card */}
                    <li className="breadcrumb-item">
                        Add Card
                        </li>

                </ol>
            </nav>


            <div className="row pl-3 pb-2">
                {/* display the deck's name and "add card" */}
                <h1>{deck.name}: Add Card</h1>
            </div>

            {/* display the card form */}
            <CardForm 
            submitForm={submitForm} 
            changeForm={changeForm} 
            card={card} 
            deckId={deckId} 
            />

        </div>
    )
}

export default CreateNewCard;