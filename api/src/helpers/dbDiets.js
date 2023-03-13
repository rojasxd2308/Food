const { consulta } = require("./consulta_api");
const { Diets } = require("../db.js");
async function completar_dietas(params) {
    let arrDiet = [];
    try {
        let resultado = await consulta();
        resultado.forEach((element) => {
            arrDiet = [...arrDiet, ...element.diets];
        });
        const dataArr = new Set(arrDiet);
        let result = [...dataArr];
        //insertando el dato que no existe (hardcodeando)
        result.push("vegetarian")
        result.forEach((element) => {
            Diets.findOrCreate({
                where: { name: element },
                defaults: { name: element },
            });
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = completar_dietas;