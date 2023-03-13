import "./App.css";
import { queryAll } from "./redux/actions";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./modulos/SearchBar/searchBar";
import { consulta_global } from "./functions/search";
import { useEffect } from "react";
import Secciones from "./modulos/secciones/secciones";
import Detail from "./modulos/detail/detailSeccion";
import Form from "./modulos/form/form";
import Footer from "./modulos/footer/footer";
import Home from "./modulos/Home/home";
function App(props) {
  const { consulta_all } = props;
  const { all } = props
  useEffect(() => {
    consulta_global().then((res)=>{
        consulta_all(res)
    }).then(()=>{
      console.log(all.length);
    })
  }, [all.length, consulta_all]);
  return (
    <div className="App">

      <SearchBar />
      <div className="padding-top-8">


      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/secciones" element={<Secciones/>}/>
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path="/form"  element={<Form/>}/>
      </Routes>
      </div>
    <Footer />
    </div>
  );
}
const mapStateToProps = (state) => {
  return { all: state.all };
};
const mapDispatchToProps = (dispatch) => {
  return {
    consulta_all: (param) => {
      dispatch(queryAll(param));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
