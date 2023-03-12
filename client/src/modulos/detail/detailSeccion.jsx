import { useParams } from "react-router-dom";
import { detalles_receta } from "../../functions/search";
import { useState } from "react";
import { useEffect } from "react";
import "./detail.css";
export default function Detail(params) {
  const { id } = useParams();
  const [datos, setDatos] = useState({});
  useEffect(() => {
    if (id) {
      detalles_receta(id).then((res) => {
        setDatos({ ...datos, ...res });
        //console.log(res);
        console.log(datos.analyzedInstructions)
      });
    }
  }, []);

  return (
    <div className="detail-container">
      <div className="entrada">
        
      <h2>{datos.title}</h2>
      <img src={datos.image} alt="" />
      <div
        dangerouslySetInnerHTML={{ __html: datos.summary }}
        className="resumen"
        ></div>
        </div>
      <div className="nivel">

      <h3> Nivel de salud : {datos.healthScore}</h3>
      </div>
      <div className="contenDiet">
        <h3>Tipo de dietas:</h3>
        <ul>
          {datos.diets &&
            datos.diets.map((el) => {
              return <li>{el}</li>;
            })}
        </ul>
      </div>
      <div className="contenPasos">
        <h3>Pasos para la receta: </h3>
        {datos.analyzedInstructions &&
          datos.analyzedInstructions[0].steps.map((el) => {
            return (
              <div className="pasos">
                <span className="bold">
                  {el.number} {".- "}
                    </span>
                   {el.step}
              </div>
            );
          })}
      </div>
    </div>
  );
}
