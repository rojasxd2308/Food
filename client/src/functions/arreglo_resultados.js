export default function arr_res(cantidad) {
  /// generar un arreglo par ala cantidad de resultados a mostrar segun la cantidad de elementos
  let temp = [];
  while (cantidad > 20) {
    temp.push(String(cantidad));
    cantidad = Math.floor(cantidad / 2);
  }
  return temp;
}
