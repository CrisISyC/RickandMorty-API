import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../stylesheets/CharacterDetail.css"

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await res.json();
        setCharacter(data);
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <h2>Cargando personaje...</h2>;

  return (
    <div className="character-detail">
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p><strong>Estado:</strong> {character.status}</p>
      <p><strong>Especie:</strong> {character.species}</p>
      <p><strong>Género:</strong> {character.gender}</p>
      <p><strong>Origen:</strong> {character.origin.name}</p>
      <p><strong>Ubicación:</strong> {character.location.name}</p>
      <Link to="/" className="back-link"> Volver</Link>
    </div>
  );
}

export default CharacterDetail;
