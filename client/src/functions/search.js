const axios = require("axios")


// es muy lento
/*export const handleSearch = async () => {
    let nombre = "flower"
   console.log("encontrado");
   try {
       const response = await fetch(`http://localhost:3001/recipes?name=${nombre}`)
       const data = await response.json();
       return data;
   } catch (e) {
         console.log(e);
         return("no hay internet")
   }
}*/

// v2.0
export function filtrado_nombre(recetas, nombre) {
    let resultado = recetas.filter((dato) => {
        return dato.title.toLowerCase().includes(nombre.toLowerCase());
    });
    if (resultado.length > 0) {
        return resultado;
    } else {
        return [{ title: "no hay coincidencias", id: "00000" }];
    }
}

//// para organizar los datos de toda la lista

export function organizar(recetas, opciones) {
    const cantidad = opciones.cantidad;
    const ordenamientoH = opciones.ordenamientoH;
    const ordenamientoN = opciones.ordenamientoN;
    switch (ordenamientoH) {
        case "1":
            recetas.sort((a, b) => b.healthScore - a.healthScore);

            break;
        case "2":
            recetas.sort((a, b) => a.healthScore - b.healthScore);

            break;
        default:
            break;
    }
    switch (ordenamientoN) {
        case "1":
            recetas.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case "2":
            recetas.sort((a, b) => a.title.localeCompare(b.title));
            break;

        default:
            break;
    }

    //console.log(recetas);
    //primero filtrado por cantidad
    var resultado = recetas.slice(0, cantidad);

    return resultado;
}
// toma el array organizado y devuerve una parte de este 
export function dividir(recetas_org, opciones) {
    const long_recetas = recetas_org.length
    const inicio = parseInt(opciones.inicio)
    const espacio = parseInt(opciones.espacio)
    let resultado = []
        //console.log("lon:"+long_recetas ,"i" + inicio ,!"e" + espacio);
    if (inicio > long_recetas) {
        console.log("no habria nada que mostrar");
        resultado = recetas_org
    } else if (espacio > (long_recetas - inicio - 1)) {
        console.log("el espacio es demasiado : " + (long_recetas - inicio - 1));
        resultado = recetas_org.slice(inicio - 1, inicio - 1 + espacio)
    } else {
        resultado = recetas_org.slice(inicio - 1, (inicio - 1 + espacio))
    }
    return resultado

}



//// para obtener detalles de una receta
export async function detalles_receta(id) {
    console.log("peticion detalles");
    try {
        const response = await fetch(`http://localhost:3001/recipes/${id}`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
        return { error: "no hay internet" };
    }

}
/////// obtener los tipos de dietas
export async function get_diets(id) {
    try {
        const response = await fetch(`http://localhost:3001/diets`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
}
////////////// insertar nueva rececta
export function newRecipe(recetas, pasos) {
    const url = "http://localhost:3001/recipes";
    /// tipo form
    ////////
    const formData = new FormData();
    console.log(pasos);
    formData.append('image', recetas.imagen);
    pasos.forEach((paso, index) => {
        formData.append(`paso-${index}`, paso.step)
    });
    const data = {
        ...recetas,
    };
    // todo data al formData
    for (let key in data) {
        formData.append(key, data[key]);
    }
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    return axios.post(url, formData, config)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}
/// 
export const consulta_global = async() => {
    try {
        const response = await fetch(`http://localhost:3001/recipes`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
        return { error: "no hay internet" };
    }
};