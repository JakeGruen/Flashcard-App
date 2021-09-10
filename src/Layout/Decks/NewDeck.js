import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { createDeck } from '../../utils/api/index.js'


function NewDeck({updateDecks}) {
   
    const [newDeck, setNewDeck] = useState({name: "", description: ""})

  
    const history = useHistory()

    // use changeForm to take the target deck and set it contain
    // it's current content as well as it's updated name and description
    const changeDeck = ({ target }) => {
        setNewDeck({...newDeck, [target.name]: target.value})
    }
    
    // create the new deck w/ event handler
    const submitDeck = async (event) => {
        event.preventDefault()
        const response = await createDeck(newDeck)
        // push the deck into history using the useHistory() hook
        history.push(`/decks/${response.id}`)
        // update the card deck using updateDeck()
        updateDecks(1)
    }


    return (
        <div className="col-9 mx-auto">
            
            {/* navigation bar that contains two links */}
            <nav aria-label="breadcrumb">

                <ol className="breadcrumb">                  
                    <li className="breadcrumb-item">
                        {/* link the redirects to the home page */}
                        <Link to={"/"}>
                            <i 
                            className="fa fa-home" 
                            aria-hidden="true">
                            </i> 
                            Home
                        </Link>
                    </li>
                    
                    {/* label for the current page that says "create deck" */}
                    <li style={{textAlign: 'center'}}
                    className="breadcrumb-item"
                    >Create Deck
                    </li>                
                </ol>

            </nav>

           
            <form style={{backgroundColor: "aqua"}}
                onSubmit={submitDeck}>

                    {/* text input for the card deck's name */}
                <div className="form-group">
                    <label>
                        Name
                    </label>

                    <input 
                        style={{textAlign: 'center'}}
                        type="text" 
                        name="name"
                        value={newDeck.name}
                        onChange={changeDeck}
                        id="name" 
                        className="form-control" 
                        placeholder="Deck name" 
                    />
                </div>

                {/* text area for card description */}
                <div className="form-group">
                    <label>
                        Description
                    </label>

                    <textarea 
                    name="description" 
                    style={{textAlign: 'center'}}
                    value={newDeck.description}
                    onChange={changeDeck}
                    className="form-control" 
                    id="description" 
                    placeholder="Deck description"
                    rows={4}
                    />
                </div>

                {/*  cancel deck */}
                <Link 
                    to="/" 
                    name="cancel" 
              
                    className="btn btn-secondary 03">
                    Cancel
                </Link>

                {/* submit deck */}
                <button 
                    type="submit" 
                    className="btn btn-primary">
                    Submit
                </button>

            </form>
            
        </div>
    )
}

export default NewDeck;