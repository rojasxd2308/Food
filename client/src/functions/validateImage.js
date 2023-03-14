export default function validando(file) {
  const tipos = ["image/gif", "image/jpeg", "image/png", "image/jfif"];
  return file && tipos.includes(file["type"]);
}
