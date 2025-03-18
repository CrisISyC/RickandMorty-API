import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Characters from "./components/Character";
import CharacterDetail from "./components/CharacterDetail";

function App() {
  const [characters, setCharacters] = useState([]); // Lista de personajes
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Lista filtrada
  const [searchTerm, setSearchTerm] = useState(""); // Estado de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        const data = await res.json();
        setCharacters(data.results); // Lista de personajes de la API
        setFilteredCharacters(data.results); // Inicialmente, la lista filtrada es la misma
        setTotalPages(data.info.pages);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, [currentPage]); // Se ejecuta cuando cambia la página

  // Filtrar personajes en vivo
  useEffect(() => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [searchTerm, characters]); // Se actualiza cada vez que cambia el término de búsqueda o los personajes

  return (
    <Router>
      <div className="App">
        <Header />
  
        {/* Pantalla con el título */}
        <div className="app-title-container">
          <h1 className="app-title">The Rick and Morty App</h1>
        </div>
  
        <Routes>
          <Route
            path="/"
            element={
              <>
                <input
                  type="text"
                  placeholder="Buscar personaje..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-bar"
                />
                <div className="information-characters">
                  <Characters characters={filteredCharacters} />
                </div>
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
              </>
            }
          />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;