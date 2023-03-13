import "./secciones.css";
import { connect} from "react-redux";
import React, { useEffect, useState } from "react";
import Seccion from "./seccion";
import { organizar,dividir } from "../../functions/search";


import Paginacion from "../paginado/paginacion";




function SearchBar(props) {
  const { all } = props;
  const [tempAll, setTempAll] = useState([]);
  const [tempDivided, setTempDivided] = useState([]);
  const [options, setOptions] = useState({
    ordenamientoH: "1",
    ordenamientoN: "0",
    cantidad: "15",
  });
  const [paginate ,setPaginate] = useState({
    inicio: '1',
    espacio: '10'
  })

  useEffect(() => {
    if (all.length > 0) {
      const organizado = organizar(all, options);
      // arreglo temporal ya organizado
      setTempAll(organizado);
    }
  }, [options, all]);

  

  
  useEffect(()=>{
    if (tempAll.length > 0) {
      const dividido = dividir(tempAll, paginate);
      const organizado = organizar(dividido, options);
      // arreglo temporal ya organizado
      setTempDivided(organizado)
    }
  },[paginate,tempAll])


  function handleOptions(e) {
   if (e.target.name === 'ordenamientoH') {
    setOptions({
        ...options,
        ordenamientoH: e.target.value,
        ordenamientoN: '0'
      });
   }
   if (e.target.name === 'ordenamientoN') {
    setOptions({
        ...options,
        ordenamientoN: e.target.value,
        ordenamientoH: '0'
      });
   }
   if (e.target.name === 'cantidad') {
    setOptions({
        ...options,
        cantidad: e.target.value,
        });
   }
 
  }
  function handlePaginate(e) {
    setPaginate({
      inicio: '1', espacio: e.target.value 
    })
  }

  const handlePageClick = (e) => {
    setPaginate({
      ...paginate, inicio: (e.selected*parseInt(paginate.espacio)+ 1)
    })
    console.log(e.selected);
  };
  return (
    <div>
      <div className="tSecciones">
      <h1>Conoce todas nuestras recetas</h1>
     
      </div>
      <div className="opciones">
        <h2>Opciones de filtrado</h2>
        <div className="elemento">

        <label htmlFor="">Por nivel de salud : </label>
        <select name="ordenamientoH" defaultValue={options.ordenamientoH} id="" onChange={handleOptions}>
          <option value="1" >
            Mayor a menor
          </option>
          <option value="2">Menor a mayor</option>
        </select>
        </div>
        <div className="elemento">
          
        <div className="divisor"></div>
        <label htmlFor=""> Alfabéticamente : </label>
        <select name="ordenamientoN" defaultValue={options.ordenamientoN} id="" onChange={handleOptions}>
          <option value="2">
            de A a la Z
          </option>
          <option value="1">de Z a la A</option>
        </select>
        </div>
        <div className="elemento">

        <label htmlFor="">Número de resultados</label>
        <select name="cantidad" id="" defaultValue={options.cantidad} onChange={handleOptions}>
          <option value="10">10</option>
          <option value="15" >
            15
          </option>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
        </select>
        </div>
    <div className="elemento">

        <label htmlFor="">Opciones de paginacion: </label>
        <select name="cantidadP" id="" defaultValue={paginate.espacio} onChange={handlePaginate}>
          <option value="5">5</option>
          <option value="10" >
            10
          </option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
    </div>
      </div>
      <div className="container">
        {    tempDivided.map((el) => {
        return <Seccion id={el.id} key={el.id} />;
      })}
      </div>
      <div className="navigation">
      <Paginacion options={options}  paginate={paginate} handlePageClick={handlePageClick}/>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { all: state.all };
};

export default connect(mapStateToProps, null)(SearchBar);
