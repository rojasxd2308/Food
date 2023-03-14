const { Router } = require("express");
const axios = require("axios");
const { route } = require("../app");
const { Diets, Recipe, Pasos, diets_recipe } = require("../db.js");
const { conn } = require("../db");

//const path = require("node:path");

//const { QueryTypes } = require("sequelize");
//const { stringify } = require("querystring");
const router = Router();
const API_KEY = "90d31cca822340a0911fb40d8f4fddca";
const spoon = "https://api.spoonacular.com/recipes/complexSearch";


//// importar helpers que podria reutilizar
const completar_dietas = require('../helpers/dbDiets');
const { guardado_temporal } = require('../helpers/consulta_api')
    ///// importando de controllers 
const consultatotal = require('../controllers/consulta_total');
const insertando_Receta = require("../controllers/insertarReceta");

///// ejecutando los iniciadores

// generando el json de todas las recetas 

/*
//comentandolo temporalmente
guardado_temporal(spoon, API_KEY).then(() => {
    console.log("json generado");
}).catch((e) => {
    console.log("error al realizar la peticion  :", e);
})*/




//// para subir a la DB las dietas
conn.sync().then(() => {
    completar_dietas();
}).catch(err => {
    console.error('No se pudo sincronizar los modelos con la base de datos:', err.message);
});





router.get("/recipes/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        let resultado = await consultatotal();
        resultado = resultado.filter((dato) => dato.id == id);
        if (resultado[0].length == 0) {
            res.status(500).send("no hay datos sobre este id");
        }
        res.json(resultado[0]);
    } catch (e) {
        console.log(e.message);
        res.status(500).send("Error al obtener datos de la API");
    }
});

router.get("/recipes", async(req, res) => {
    let resultado = await consultatotal();
    const nombre = req.query.name;
    if (nombre) {
        try {
            resultado = resultado.filter((dato) => {
                return dato.title.toLowerCase().includes(nombre.toLowerCase());
            });
            if (resultado.length > 0) {
                console.log(resultado);
                res.status(200)
                res.json(resultado);
            } else {
                res.json({ error: "no hay coincidencias" });
            }
        } catch (e) {
            res.json({ error: "error de conexion" });
        }
    } else {
        res.status(200)
        res.json(resultado);
    }
});

router.get("/diets", async(req, res) => {
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
router.post("/recipes", async(req, res) => {
    completar_dietas();
    const receta = req.body;
    const { image } = req.files;
    let id_nuevareceta = await insertando_Receta(receta, image);
    res.status(200)
    res.json({...req.body, id: id_nuevareceta });
});

module.exports = router;