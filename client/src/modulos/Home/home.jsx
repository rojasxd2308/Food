import "./home.css"
import { Link } from "react-router-dom";
export default function Home(params) {
    return(
        <div className="home">
            <h3>Bienvenido a</h3>
            <h1>Spoonacular</h1>
            <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.</p>
            <Link to={'/secciones'}>
            <button>Ver las recetas</button>
            </Link>
        </div>
    )
}