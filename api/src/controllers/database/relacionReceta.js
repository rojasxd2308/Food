const { diets_recipe } = require("../../db.js");

function rel_diet_recip(diets, id) {
    dividido = diets.split(",");;
    try {
        dividido.map((el) => {
            diets_recipe
                .create({
                    recipeId: id,
                    dietIdDiet: el,
                })
                .then((result) => {
                    console.log(
                        "La creación de la relación de dietas se completó exitosamente"
                    );
                })
                .catch((error) => {
                    console.log("Ocurrió un error al crear la relación de dietas:", error);
                });
        });
    } catch (error) { console.log(error.message); }
}

module.exports = rel_diet_recip