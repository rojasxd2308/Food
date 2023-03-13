import "./home.css"
import { Link } from "react-router-dom";
export default function Home(params) {
    return(
        <div className="home">
            <h3>Bienvenido a</h3>
            <h1>Spoonacular</h1>
            <p>Integer et aliquet diam, a hendrerit ipsum. Duis nulla ligula, accumsan congue quam venenatis, mattis tristique odio. Vivamus scelerisque, urna nec dignissim lacinia, quam eros auctor massa, ut eleifend libero mi eu dolor. Morbi et elit finibus, cursus dui non, finibus leo. Pellentesque vitae tincidunt elit. Sed turpis mauris</p>
            <Link to={'/secciones'}>
            <button>Ver las recetas</button>
            </Link>
        </div>
    )
}