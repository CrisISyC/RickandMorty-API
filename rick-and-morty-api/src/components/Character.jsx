import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Character.css";

function Characters({ characters }) {
  return (
    <div className="characters-container">
      {characters.map((character) => (
        <Link to={`/character/${character.id}`} key={character.id} className="character-link">
          <div className="character-container">
            <img
              className="image-character"
              src={character.image}
              alt={character.name}
            />
            <div className="container-text">
              <p className="name">{character.name}</p>
              <div className="info-row">
                <p className="status">
                  <span className="status-dot" style={{ backgroundColor: getStatusColor(character.status) }}></span>
                  {character.status}
                </p>
                <p>-</p>
                <p className="species">{character.species}</p>
              </div>
              <p className="gender">{character.gender}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "alive":
      return "green";
    case "dead":
      return "red";
    default:
      return "gray";
  }
};

export default Characters;
