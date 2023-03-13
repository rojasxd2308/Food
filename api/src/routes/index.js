const { Router } = require("express");
const axios = require("axios");
const { route } = require("../app");
const { Diets, Recipe, Pasos, diets_recipe } = require("../db.js");
const { conn } = require("../db");
const fs = require("fs");
const path = require("node:path");

const { QueryTypes } = require("sequelize");
const { stringify } = require("querystring");
const router = Router();
const API_KEY = "90d31cca822340a0911fb40d8f4fddca";
const spoon = "https://api.spoonacular.com/recipes/complexSearch";
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
/////////////////////////// intento de guardado local de recetas para practicar ``
async function robo(params) {
  try {
    // max offset is 999
    const number = 100;
    let offset = 0;
    const instructionsRequired = true;
    const addRecipeInformation = true;
    let temporal = [];
    while (offset < 1000) {
      direccion_post =
        spoon +
        "?apiKey=" +
        API_KEY +
        "&number=" +
        number +
        "&offset=" +
        offset +
        "&instructionsRequired=" +
        instructionsRequired +
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

  // Convertir el archivo en un objeto JSON
  const json = JSON.parse(data);

  // Acceder al arreglo de usuarios
  const resultado = json.results
  return resultado
  console.log(resultado.length);
}
router.get("/prueba", async (req, res) => {
  //verificando que ya esté en la base de datos
  //robo();
  leer()
});

////////////////////////////////////////////////////

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
    recetas[0].forEach(async (el) => {
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
      temp = { ...temp, diets: temp2 };

      let estructura = [
        {
          name: "",
          steps: [],
        },
      ];
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
      temp = { ...temp, analyzedInstructions: estructura };
      console.log(temp);
      recetas_db.push(temp);
    });

    return recetas_db;
  } catch (error) {
    console.log(error);
  }
}
async function crear(params) {
  try {
    const result = ["nbnnvn", "asdasdff", "asdas", "asdasd"];
    const promises = result.map((element) => {
      return Recipe.create({
        name: element,
        image:
          "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa-945x630.jpg",
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

//// para subir a la DB las dietas
async function completar_dietas(params) {
  let arrDiet = [];
  try {
    let resultado = await consulta();
    resultado.forEach((element) => {
      arrDiet = [...arrDiet, ...element.diets];
    });
    const dataArr = new Set(arrDiet);

    let result = [...dataArr];
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
conn.sync().then(() => {
  completar_dietas();
}).catch(err => {
  console.error('No se pudo sincronizar los modelos con la base de datos:', err);
});


//// function para crear y poder ver resultados

/////////////////
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function consultatotal() {
  try {
    let resultado = await consultaDb();
    let resultado2 = await consulta();

    return [...resultado, ...resultado2];
  } catch (e) {
    console.log(e);
  }
}

router.get("/recipes/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    let resultado = await consultatotal();
    resultado = resultado.filter((dato) => dato.id == id);
    res.json(resultado[0]);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error al obtener datos de la API");
  }
});

router.get("/recipes", async (req, res) => {
  let resultado = await consultatotal();
  const nombre = req.query.name;
  if (nombre) {
    try {
      resultado = resultado.filter((dato) => {
        return dato.title.toLowerCase().includes(nombre.toLowerCase());
      });
      if (resultado.length > 0) {
        console.log(resultado);
        res.json(resultado);
      } else {
        res.json({ error: "no hay coincidencias" });
      }
    } catch (e) {
      res.json({ error: "error de conexion" });
    }
  } else {
    res.json(resultado);
  }
});

router.get("/diets", async (req, res) => {
  //verificando que ya esté en la base de datos
  let diets_db = await Diets.findAll({
    attributes: ["name"],
  });
  let arrDiet = [];
  console.log(typeof diets_db);
  console.log(diets_db.length);
  if (diets_db.length == 0) {
    completar_dietas().then((respuesta) => {
      res.json(respuesta);
    });
  } else {
    diets_db.forEach((element) => {
      arrDiet = [...arrDiet, element.name];
    });
    res.json(arrDiet);
  }
});
////// aqlgo para poder guardar las imagenes subidas

router.post("/recipes", async (req, res) => {
  completar_dietas();
  const nombre = req.body.name;
  const summary = req.body.summary;
  const nivel = req.body.healtScore;
  let id_nuevareceta;
  //const steps = req.body.steps;
  const receta = req.body;
  const steps = [];
  let i = 0;
  while (receta[`paso-${i}`]) {
    steps.push(receta[`paso-${i}`]);
    i++;
  }
  let diets = req.body.diet;
  const { image } = req.files;
  if (!image) return res.sendStatus(400);
  let ruta = "http://localhost:3001/uploads/" + image.name;
  // condicional para verificar datos
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

      // insert a tabla intermedia
      // consulta id del receta
      id_nuevareceta = nueva_Receta.id
      //
      dividido = diets.split(",");
      //console.log(nueva_Receta);
      try {
        dividido.map((el) => {
          console.log("elemento: " + el + " para la tabla " + nueva_Receta.id);
          diets_recipe
            .create({
              recipeId: nueva_Receta.id,
              dietIdDiet: el,
            })
            .then((result) => {
              console.log(
                "La creación de la relación se completó exitosamente"
              );
            })
            .catch((error) => {
              console.log("Ocurrió un error al crear la relación:", error);
            });
        });
      } catch (error) {
        console.log(error);
      }
      try {
        console.log(steps);
        steps.map((el) => {
          Pasos.create({
            receta_id: nueva_Receta.id,
            description: el,
          })
            .then((result) => {
              console.log(
                "La creación de la relación se completó exitosamente"
              );
            })
            .catch((error) => {
              console.log("Ocurrió un error al crear la relación:", error);
            });
        });
      } catch (error) {
        console.log(error.name);
      }
      // insertando pasos
    }
  } catch (e) {
    console.log(e);
  }
  // Move the uploaded image to our upload folder
  image.mv(__dirname + "/uploads/" + image.name);

  res.json({...req.body,id: id_nuevareceta});
});

module.exports = router;
