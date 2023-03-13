const fs = require("fs");
const axios = require("axios");
/////////////////////////// intento de guardado local de recetas para leerlo en otra funcion ``
async function guardado_temporal(spoon, API_KEY) {
    try {
        // max offset is 999
        const number = 100;
        let offset = 0;
        const instructionsRequired = true;
        const addRecipeInformation = true;
        let temporal = [];
        while (offset < 1000) {
            direccion_post = spoon + "?apiKey=" + API_KEY + "&number=" + number + "&offset=" + offset + "&instructionsRequired=" + instructionsRequired +
                "&addRecipeInformation=" +
                addRecipeInformation;
            console.log("offset = " + offset);
            const respuesta = await axios.get(direccion_post);
            temporal = [...temporal, ...respuesta.data.results];
            offset += number;
        }
        let finalarray = {
            results: temporal,
        };
        const jsonStr = JSON.stringify(finalarray);
        // Especificamos la ruta y nombre del archivo
        const rutaArchivo = `./src/routes/datos_falsos/archivo.json`;
        // Guardamos el contenido en el archivo
        fs.writeFile(rutaArchivo, jsonStr, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("Archivo guardado exitosamente.");
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function leer() {
    // Leer el archivo
    const data = fs.readFileSync(`./src/routes/datos_falsos/archivo.json`, "utf-8");

    // Convitiendo el archivo en un objeto JSON
    const json = JSON.parse(data);

    // busco el arreglo de resultados
    const resultado = json.results
    return resultado
    console.log(resultado.length);
}

async function consulta(params) {
    try {
        /*const respuesta = await axios.get(
          "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
        );
        resultado = respuesta.data.results;*/
        resultado = leer()

        return resultado;
    } catch (e) {
        console.log(e);
        return e;
    }
}
module.exports = { consulta, guardado_temporal }