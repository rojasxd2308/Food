const insert_steps = require("./database/insertar_Pasos");
const rel_diet_recip = require("./database/relacionReceta");
const save = require("./guardar_Img");
const { Recipe } = require("../db.js");


async function insertando_Receta(dieta_datos, image) {
    const nombre = dieta_datos.name;
    const summary = dieta_datos.summary;
    const nivel = dieta_datos.healtScore;
    let diets = dieta_datos.diet;
    const steps = [];
    let i = 0;
    while (dieta_datos[`paso-${i}`]) {
        steps.push(dieta_datos[`paso-${i}`]);
        i++;
    }
    //console.log(image);
    let ruta = save(image)
    try {
        if (
            typeof nombre == "string" &&
            typeof ruta == "string" &&
            typeof summary == "string" &&
            typeof nivel == "string"
        ) {
            console.log("insertando");
            const nueva_Receta = await Recipe.create({
                name: nombre,
                image: ruta,
                summary: summary,
                nivel: nivel,
            });
            let id = nueva_Receta.id
                /////// agregrando relacion entre nueva receta-dieta////////
            rel_diet_recip(diets, id)

            //////// insertando los pasos de nva receta //////
            insert_steps(steps, id)
                // insertando pasos
            return id
        }
    } catch (e) {
        console.log("error insertando nueva receta : " + e.message);
    }
}

module.exports = insertando_Receta