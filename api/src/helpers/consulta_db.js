const { conn } = require("../db");

async function consultaDb() {
    let recetas_db = [];
    //consulta a receta
    try {
        const recetas = await conn.query(
            "SELECT id, name, image,summary,nivel FROM recipes"
        );
        // hay un conflicto con la consulta de clumnas que tienen alguna mayuscula por lo que tengo que consultar todo para esto
        const dietas_recetas = await conn.query("SELECT * FROM diets_recipe");
        const dietas_js = await conn.query("SELECT name FROM diets");
        const pasos = await conn.query(`select * from pasos`);
        /// lo pasaré en un array porque es mejor

        let dietas_arr = [];
        dietas_js[0].forEach((die) => {
            dietas_arr.push(die.name);
        });
        recetas[0].forEach(async(el) => {
            // ??? si no hay este log , lo siguiente no funciona xd
            console.log(el);
            ////////// end ????

            let temp = {
                id: el.id,
                title: el.name,
                image: el.image,
                summary: el.summary,
                healthScore: el.nivel,
            };
            let temp2 = [];
            dietas_recetas[0].forEach((el2) => {
                console.log(el.id, el2.recipeId);
                if (el.id == el2.recipeId) {
                    temp2.push(dietas_arr[el2.dietIdDiet]);
                }
            });
            temp = {...temp, diets: temp2 };

            let estructura = [{
                name: "",
                steps: [],
            }, ];
            let temp3 = [];
            let i = 0;
            pasos[0].forEach((el3) => {
                if (el3.receta_id == el.id) {
                    temp3.push({
                        number: i++,
                        step: el3.description,
                        ingredients: "",
                        equipment: "",
                    });
                }
            });
            estructura[0] = { name: "", steps: temp3 };
            temp = {...temp, analyzedInstructions: estructura };
            console.log(temp);
            recetas_db.push(temp);
        });

        return recetas_db;
    } catch (error) {
        console.log(error);
    }
}

module.exports = consultaDb