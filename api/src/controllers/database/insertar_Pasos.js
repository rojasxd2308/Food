const { Pasos } = require("../../db.js");

function insert_steps(steps, id) {
    try {
        steps.map((el) => {
            Pasos.create({
                    receta_id: id,
                    description: el,
                })
                .then((result) => {
                    console.log(
                        "La creación de la relación de pasos se completó exitosamente"
                    );
                })
                .catch((error) => {
                    throw Error("Ocurrió un error al crear la relación de pasos:", error.name);
                });
        });
    } catch (error) { console.log(error.name); }
}

module.exports = insert_steps