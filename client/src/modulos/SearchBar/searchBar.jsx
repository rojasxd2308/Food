import { accion1 } from "../../redux/actions";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import { filtrado_nombre } from "../../functions/search";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import "./searchbar.css";


function SearchBar(props) {
    const entradaRef = useRef(null);
  const resultadoRef = useRef(null);
  const [inputFocused, setInputFocused] = React.useState(false);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        entradaRef.current &&
        !entradaRef.current.contains(e.target) &&
        resultadoRef.current &&
        !resultadoRef.current.contains(e.target)
      ) {
        setInputFocused(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [entradaRef, resultadoRef]);

  const [lista_res, setLista] = React.useState([]);
  const { all } = props;
  function actualizando(e) {
    setLista([]);
    let temp_lista = [];
    if (all.length > 0) {
      const filtrado = filtrado_nombre(all, e.target.value);
      filtrado.forEach((element) => {
        temp_lista.push({
          id: element.id,
          title: element.title,
        });
      });
      setLista(temp_lista);
    } else {
      console.log("espera por favor");
    }
  }
  return (
    <div className="searchBar">
      <div className="buscador">
        <div className="secciones">

            <div className="direccion">
         <NavLink exact="true" to="/" className={(navData) => (navData.isActive ? "link_active" : 'none')}>
            Inicio
         </NavLink>
            </div>
            <div className="direccion">
         <NavLink exact="true" to="/secciones" className={(navData) => (navData.isActive ? "link_active" : 'none')}>
            Secciones
         </NavLink>
            </div>
            <div className="direccion">
         <NavLink exact="true" to="/form" className={(navData) => (navData.isActive ? "link_active" : 'none')}>
            Nueva Receta
         </NavLink>
            </div>
        </div>
        <input
          type="text"
          className="entrada"
          placeholder="titulo de receta"
          onChange={actualizando}
          ref={entradaRef}
          onFocus={() => setInputFocused(true)}
        />  
        </div>
        <div className={`resultado ${inputFocused ? 'active' : ''}`} ref={resultadoRef}>
            <div className="secciones">

            </div>
          <div className="radius"  onFocus={() => setInputFocused(true)}>
            {lista_res.map((el) => {
              return (
                <Link to={`/detail/${el.id}`}>
                  <span>{el.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
    
    </div>
  );
}
const mapStateToProps = (state) => {
  return { all: state.all };
};
const mapDispatchToProps = (dispatch) => {
  return {
    busca: (param) => {
      dispatch(accion1(param));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
