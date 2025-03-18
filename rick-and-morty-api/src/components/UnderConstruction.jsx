import { useLocation } from "react-router-dom";
import "../stylesheets/UnderConstruction.css";
import constructionImage from "../assets/fondo.jpg";

function UnderConstruction() {
  const location = useLocation();

  const titles = {
    "/episodes": "Episodes",
    "/locations": "Locations",
  };

  return (
    <div className="construction-container">
      <h2 className="app-subtitle">{titles[location.pathname] || "Page"}</h2>
      <img src={constructionImage} alt="Página en construcción" className="construction-image" />
    </div>
  );
}

export default UnderConstruction;
