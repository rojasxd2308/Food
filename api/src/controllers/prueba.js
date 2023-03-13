async function crear(params) {
    try {
        const result = ["nbnnvn", "asdasdff", "asdas", "asdasd"];
        const promises = result.map((element) => {
            return Recipe.create({
                name: element,
                image: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa-945x630.jpg",
                summary: element,
                nivel: 50,
            });
        });
        const result2 = [1, 2, 3];
        const segundaPr = result2.map((element) => {
            diets_recipe.create({
                recipeId: element,
                dietIdDiet: 1,
            });
        });
        const result3 = [2, 3];
        const tercerPr = result3.map((element) => {
            diets_recipe.create({
                recipeId: element,
                dietIdDiet: 2,
            });
        });
    } catch (e) {
        console.log(e);
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
router.get("/prueba", async(req, res) => {
    //verificando que ya esté en la base de datos
    //guardado_temporal();
    leer()
});