import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { get_diets } from "../../functions/search";
import { newRecipe } from "../../functions/search";
import validando from "../../functions/validateImage";
import "./form.css"
export default function Form(params) {
  /// para redireccionar
  const navigate = useNavigate();
  //////

  const [pasos, setPasos] = useState([
    {
      id: 1,
      step: "",
    },
  ]);
  const [dietas, setDietas] = useState([]);
  useEffect(() => {
    get_diets().then((res) => {
      setDietas(res);
    });
  }, []);
  //agregando un contador para dietas
  let x = 0;
  const [dietasSelected, setDietasSelected] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    healtScore: 50,
    imagen: null,
    diet: [],
  });
  function agregar_pasos(params) {
    console.log(pasos.length);
    setPasos([
      ...pasos,
      {
        id: pasos.length + 1,
        step: "",
      },
    ]);
  }
  function actualizar_pasos(e) {
    const id = parseInt(e.target.name);
    const value = e.target.value;
    const indice = pasos.findIndex((paso) => paso.id === id);
    const nuevosPasos = [...pasos];
    nuevosPasos[indice] = {
      ...nuevosPasos[indice],
      step: value,
    };
    setPasos(nuevosPasos);
    //console.log(pasos);
  }
  function handleInputChange(e) {
    const { name, type, value, files, checked } = e.target;
    console.log(value);
    if (type === "checkbox") {
      if (checked) {
        setDietasSelected([...dietasSelected, value]);
      } else {
        // si el checkbox fue deseleccionado aunque no funciona tan bien xd
        const index = dietasSelected.indexOf(value);
        if (index > -1) {
          const newDietasSelected = [...dietasSelected];
          newDietasSelected.splice(index, 1);
          setDietasSelected(newDietasSelected);
        }
      }
    }
    const dietValue = dietasSelected.length > 0 ? [...dietasSelected] : [];
    let inputValue = type === "file" ? files[0] : type === "range" ? value : dietValue.length > 0 ? dietValue : value;
    if (type === "file") {
      if(!validando(files[0])){
        alert('Por favor, seleccione una imagen válida');
        inputValue = ''   
      }
    }
    
    console.log(type, inputValue);
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  }
  useEffect(() => {
    setFormData({
      ...formData,
      diet: dietasSelected,
    });
  }, [dietasSelected]);

  function handleSubmit() {
    // validando campos
    let emptyFields = [];

    if (!formData.name) {
      emptyFields.push("Nombre");
    }
    if (!formData.summary) {
      emptyFields.push("Resumen");
    }
    if (!formData.imagen) {
      emptyFields.push("Imagen");
    }
    /* if (!formData.pasos.some((paso) => !paso.step)) {
        emptyFields.push("Pasos");
      }*/
    if (!formData.diet.length) {
      emptyFields.push("Dietas");
    }

    if (emptyFields.length > 0) {
      alert(
        `Completa los siguientes campos primero: ${emptyFields.join(", ")}`
      );
    } else {
      newRecipe(formData, pasos).then((res)=>{

          //console.log(res);
          navigate(`/detail/${res.id}`);
      });

    }
  }

  function contador() {
    let texto =
      "linear-gradient(to left, red " +
      (100 - formData.healtScore) +
      "%,yellow 10%, green " +
      formData.healtScore / 2 +
      "%)";
    let desc_nivel;
    if (formData.healtScore > 70) {
      desc_nivel = "Muy Saludable";
    } else if (formData.healtScore > 40) {
      desc_nivel = "Saludable";
    } else {
      desc_nivel = "Casi saludable";
    }
    return (
      <div>
        <h3 style={{ backgroundImage: texto }}>{formData.healtScore}</h3>
        <h3>{desc_nivel}</h3>
      </div>
    );
  }

  return (
    <div className="formulario">
      <h1>Crea una nueva receta</h1>
      <div className="elemento">
        <h4>Nombre de tu receta:</h4>
        <input type="text" name="name" onChange={handleInputChange} />
      </div>
      <div className="elemento">
        <h4 className="cien">Resumen del plato</h4>
        <textarea
          name="summary"
          id=""
          cols="30"
          rows="10"
          onChange={handleInputChange}
          placeholder="Describe tu receta con tus propias palabras"
        ></textarea>{" "}
      </div>
      <div className="elemento">
        <h4 className="cien">
          Selecciona el nivel de Salud de la receta (0-100)
        </h4>
        <input
          type="range"
          name="healtScore"
          id="nivel-salud"
          min={0}
          max={100}
          defaultValue={50}
          onChange={handleInputChange}
        />
        <div className="cien">{contador()}</div>
      </div>
      <div className="elemento">
        <h4 className="cien">Detalla los pasos para tu receta</h4>
        {pasos.map((el) => {
          return (
            <div key={el.id} className="cien">
              <span>{el.id + "° paso: "}</span>
              <input
                className="paso"
                type="text"
                
                name={el.id}
                onChange={actualizar_pasos}
              />
            </div>
          );
        })}
        <button className="subir" onClick={agregar_pasos}>
          Añadir más pasos
        </button>
      </div>
      <div className="elemento">
        <h4 className="cien">Sube una imagen de tu receta*</h4>
        <input
          type="file"
          name="imagen"
          id="imagen-input"
          onChange={handleInputChange}
        />
        <label for="imagen-input" className="custom-file-upload">
          {formData.imagen ? formData.imagen.name : " Seleccionar archivo"}
        </label>
      </div>
      <div className="elemento el-dietas">
        <h4 className="cien">Selecciona el tipo de dieta al que pertenece</h4>
        {dietas &&
          dietas.map((el) => {
            return (
              <div className="dieta_2">
                <input
                  key={(x)}
                  type="checkbox"
                  name="diet"
                  value={(x += 1)}
                  onClick={handleInputChange}
                />
                <label htmlFor="">{el}</label>
                <br />
              </div>
            );
          })}
      </div>
      <input
        type="button"
        className="subir"
        value="Subir nueva receta"
        onClick={handleSubmit}
      />
    </div>
  );
}
