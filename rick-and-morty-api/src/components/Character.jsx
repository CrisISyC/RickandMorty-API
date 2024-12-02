import React from "react";
import "../stylesheets/Character.css"

function Characters({ characters }) {
  return (
    <div className="characters-container">
      {characters.map((character) => (
        <div key={character.id} className="character-container">
          <img
            className="image-character"
            src={character.image} // Usamos los datos del personaje.
            alt={character.name}
          />
          <div className="container-text">
            <p className="name">{character.name}</p>
            <p className="species">{character.species}</p>
            <p className="status">{character.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Characters;
