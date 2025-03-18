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
      
      <div className="construction-content">
        <p>
          Wubba Lubba Dub Dub!  
          It looks like the page you're trying to access is still under construction.  
          Maybe it's lost in another dimension! Try again later, or ask Rick to fix it...  
          if he's not too busy with science stuff!
        </p>
        <img src={constructionImage} alt="Página en construcción" className="construction-image" />
      </div>
    </div>
  );
}  

export default UnderConstruction;
