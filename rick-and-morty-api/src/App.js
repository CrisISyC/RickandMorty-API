import { useState, useEffect } from "react";
import "./App.css";
import Character from "./components/Character";

function App() {
  const [characters, setCharacters] = useState([]); // Lista de personajes
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        const data = await res.json();
        setCharacters(data.results); // Solo los personajes de la página actual
        setTotalPages(data.info.pages); // Total de páginas
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, [currentPage]); // Se ejecuta cuando cambia la página

  return (
    <div className="App">
      <div className="information-characters">
        <Character characters={characters} />
      </div>

      {/* Controles de paginación */}
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ← Anterior
        </button>

        <span>Página {currentPage} de {totalPages}</span>

        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

export default App;
