import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"
import Header from "./Header"
import Home from "./Home/Home"
import Study from "./Study"
import CreateNewCard from "./Decks/CreateNewCard"
import EditCard from "./Decks/EditCard"
import NewDeck from "./Decks/NewDeck"
import Deck from "./Decks/Deck"
import EditDeck from "./Decks/EditDeck"
import NotFound from "./NotFound"


function Layout() {
  const [deckLength, setDeckLength] = useState(0)
  // update the decks by adding the total number of decks together
  const updateDecks = (newDecks) => {
    setDeckLength(() => deckLength + newDecks)
  }
 
  return (
    <div>

      {/* header component */}
      <Header />

      <div className="container mb-4">
        {/* TODO: Implement the screen starting here */}

        <Switch>
    
          {/* home component */}
          <Route path="/" exact>
            <Home updateDecks={updateDecks} deckLength={deckLength} />
          </Route>
           {/* createDeck component */}
          <Route path="/decks/new">
            <NewDeck updateDecks={updateDecks} />
          </Route>

           {/* deck component */}
          <Route path="/decks/:deckId" exact>
            <Deck updateDecks={updateDecks} />
          </Route>

           {/* study component */}
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

           {/* edit deck component */}
          <Route path="/decks/:deckId/edit">
            <EditDeck updateDecks={updateDecks} />
          </Route>

           {/* add card component */}
          <Route path="/decks/:deckId/cards/new">
            <CreateNewCard updateDecks={updateDecks} />
          </Route>

           {/* edit card component */}
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard updateDecks={updateDecks} />
          </Route>

           {/* not found component for errors */}
          <Route>
            <NotFound />  
          </Route>

        </Switch>
        
      </div>
    </div>
  )
}

export default Layout;