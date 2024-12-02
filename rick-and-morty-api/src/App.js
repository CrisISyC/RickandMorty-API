import { useState, useEffect } from 'react';
import './App.css';
import Character from './components/Character'; // Importa el componente Characters.

function App() {
  const [characters, setCharacters] = useState([]); // Estado para múltiples personajes.

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/1,2,3,500") // URL para obtener más personajes.
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data); // Guardamos los personajes en el estado.
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Manejo de errores.
      });
  }, []); // Solo ejecuta una vez al cargar el componente.

  return (
    <div className="App">
      <div className="Information">
        {/* Pasamos los personajes como prop */}
        <Character characters={characters} />
      </div>
    </div>
  );
}

export default App;

