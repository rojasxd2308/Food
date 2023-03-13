import { useEffect, useState } from "react";
import { detalles_receta } from "../../functions/search";
import { Link } from "react-router-dom";
import "./secciones.css"
export default function Seccion(props) {
  const { id } = props;
  const [datos, setDatos] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (id) {
      detalles_receta(id).then((res) => {
        setDatos({ ...datos, ...res });
        //console.log(res);
      });
    }
  }, []);
  return (
    <div className="seccion" >
            <img
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        style={{ display: isLoading ? "none" : "block" }}
        src={datos.image}
        alt="será una imagen"
      
      />
      {isLoading && (
        <img
          style={{ display: isLoading ? "block" : "none" }}
          src="http://localhost:3001/uploads/cargando.gif"
          alt="cargando..."
        />
      )}
      <h4>{datos.title}</h4>
      <div className="datos">

      <h4>Nivel de salud{datos.healthScore}</h4>
      <ul className="lista-dietas">
        {datos.diets && datos.diets.map((el) => {
          return (<li key={el}>{el}</li> );
        })}
        
      </ul>
      <div className="padding-1">

      <Link to={`/detail/${props.id}`}>
          <div>saber más...</div>
        </Link>
      </div>
      </div>
    </div>
  );
}
