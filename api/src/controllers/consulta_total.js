const consultaDb = require('../helpers/consulta_db')
const { consulta } = require('../helpers/consulta_api')

async function consultatotal() {
    try {
        let resultado = await consultaDb();
        let resultado2 = await consulta();

        return [...resultado, ...resultado2];
    } catch (e) {
        throw new Error(`Error al obtener resultados totales: ${e.message}`);
    }
}
module.exports = consultatotal