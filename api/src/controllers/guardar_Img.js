function save(file) {
    const image = file;
    if (!image) throw Error("No hay ninguna imagen");
    let ruta = "http://localhost:3001/uploads/" + image.name;
    image.mv(__dirname + "/../routes/uploads/" + image.name);
    return ruta
}

module.exports = save