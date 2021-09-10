import React from "react";

function Header() {
  return (
    <header style={{backgroundColor: "lightBlue", textAlign: "center"}}>
      <div className="container text-black">
        <h1 className="display-4">Flashcard-o-matic</h1>
        <p className="lead">Discover The Flashcard Difference.</p>
      </div>
    </header>
  );
}

export default Header;
