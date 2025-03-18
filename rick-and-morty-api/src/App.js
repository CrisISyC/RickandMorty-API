import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Characters from "./components/Character";
import CharacterDetail from "./components/CharacterDetail";
import UnderConstruction from "./components/UnderConstruction";

function App() {
  const [characters, setCharacters] = useState([]); // Todos los personajes de la API
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Personajes filtrados
  const [paginatedCharacters, setPaginatedCharacters] = useState([]); // Personajes en pantalla
  const [searchTerm, setSearchTerm] = useState(""); // Estado de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        let allData = [];
        let page = 1;
        let totalPages = 1;

        while (page <= totalPages) {
          const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
          const data = await res.json();

          allData = [...allData, ...data.results];

          totalPages = data.info.pages;
          page++;
        }

        setCharacters(allData);
        setFilteredCharacters(allData);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchAllCharacters();
  }, []);

  // Filtrar personajes según la búsqueda
  useEffect(() => {
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCharacters(filtered);
    setCurrentPage(1); // Reiniciar a la primera página cuando se realiza una búsqueda
  }, [searchTerm, characters]);

  // Paginación: actualizar `paginatedCharacters` cuando cambian `filteredCharacters` o `currentPage`
  useEffect(() => {
    const startIndex = (currentPage - 1) * 20;
    const endIndex = startIndex + 20;
    setPaginatedCharacters(filteredCharacters.slice(startIndex, endIndex));
  }, [filteredCharacters, currentPage]);

  // Cambiar de página
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(filteredCharacters.length / 20)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="app-title-container">
                  <h1 className="app-title">The Rick and Morty App</h1>
                </div>
                <div className="app-subtitle-container">
                  <h2 className="app-subtitle">Characters</h2>
                </div>
                <div className="search-bar-container">
                  <input
                    type="text"
                    placeholder="Buscar personaje..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                  />
                </div>
                <div className="results-count">
                  <p>{filteredCharacters.length} results found</p>
                </div>
                <Characters characters={paginatedCharacters} />
                <div className="pagination">
                  <button className="button-pagination" 
                  onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Before
                  </button>
                  <span className="span-pagination">Page {currentPage} of {Math.ceil(filteredCharacters.length / 20)}</span>
                  <button className="button-pagination" 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= Math.ceil(filteredCharacters.length / 20)}
                  >
                    Next
                  </button>
                </div>
              </>
            }
          />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/episodes" element={<UnderConstruction />} />
          <Route path="/locations" element={<UnderConstruction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
