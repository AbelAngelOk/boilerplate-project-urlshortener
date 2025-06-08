import fs from 'fs';
const dbFile = './db.json';

export function cargarDatos() {
  try {
    const data = fs.readFileSync(dbFile);
    return JSON.parse(data); // Se espera que sea un array de objetos
  } catch {
    return []; // Si no hay archivo o está vacío, devuelve un array vacío
  }
}

export function guardarUnDato(nuevoDato) {
  let datos = cargarDatos();

  // Cargar datos previos si existen
  if (fs.existsSync(dbFile)) {
    const contenido = fs.readFileSync(dbFile);
    datos = JSON.parse(contenido);
  }

  // Agregar nuevo dato
  datos.push(nuevoDato);

  // Guardar el array completo
  fs.writeFileSync(dbFile, JSON.stringify(datos, null, 2));
}


export function ultimoRegistro() {
  const db = cargarDatos();
  if (db.length === 0) {
    return 0; // Si no hay registros, devuelve 0
  }
  return db[db.length - 1]; // Devuelve el último registro
}