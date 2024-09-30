function doGet(e) {
    // Cambia aquí tu idioma-país y zona horaria
   const fecha = new Date().toLocaleString("es-MX", {timeZone:"America/Mexico_City"});
 
   // Registramos la asistencia usando el correo y los parámetros que vienen en la URL
   registrarAsistencia( e.parameter.id, e.parameter.nombre);
 
   // Damos retroalimentación sobre lo que sucedió:
   return HtmlService.createHtmlOutput(`
    Asistencia registrada correctamente. <br><br>
    Fecha: ${fecha}<br>
    ID: ${e.parameter.id}<br>
    Nombre: ${e.parameter.nombre}`);
 }
 
 function registrarAsistencia(correo, id, nombre) {
   // Debes cambiar este identificador por el de tu documento de hoja de cálculo
   const sheet = SpreadsheetApp.openById("1eNGFR5JgHm4hubGM3mUiS7g63aiL2WzUaajY2K3nFyc");
   const asistencia = sheet.getSheetByName("Asistencia");
   const lastRow = asistencia.getLastRow() + 1;
   asistencia.getRange(lastRow, 1).setValue(id);
   asistencia.getRange(lastRow, 2).setValue(nombre);
   asistencia.getRange(lastRow, 3).setValue(new Date());
 }
 
 
 
 
 
 
 const FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/invitaciones-55c1a/databases/(default)/documents/people';
  const FIRESTORE_API_KEY = 'AIzaSyDKoJ7TPLSXJGM5zr19LnTmgRiCxKLU4PI';
  
 function exportToFirestore() {
   const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Copia de Hoja 1"); // Accede a la hoja "Copia de Hoja 1"
   const data = sheet.getDataRange().getValues();
 
   // Empieza en la fila 2 para evitar encabezados
   for (let i = 1; i < data.length; i++) {
     let row = data[i];
 
     let id = row[0].toString(); // Asegura que el id sea una cadena
     let principalName = row[1].toString(); // Columna B (principalName)
     let code = row[8]; // Columna I (code), sin convertir a string aún
 
     // Si 'code' es una fórmula, reemplázalo con su valor estático
     if (sheet.getRange(i + 1, 9).getFormula()) {  // La columna I es la 9
       code = sheet.getRange(i + 1, 9).getValue(); // Obtiene el valor generado
       sheet.getRange(i + 1, 9).setValue(code); // Convierte el valor en estático
     }
 
     let qrUrl = row[9].toString(); // Asegura que qrUrl sea una cadena
     let etiqueta = row[10].toString(); // Columna K (etiqueta)
 
     // Crear el arreglo de 'acompanist'
     let acompanists = [];
     for (let j = 2; j <= 7; j++) { // Columnas C-H (accompanist1-6)
       if (row[j] !== "") { // Solo si hay un nombre en la columna
         acompanists.push({
           mapValue: {
             fields: {
               name: { stringValue: row[j].toString() }, // Asegura que sea una cadena
               asist: { nullValue: null },
               principalName: { stringValue: principalName },
               etiqueta: { stringValue: etiqueta }
             }
           }
         });
       }
     }
 
     // Crear el documento que se enviará a Firestore
     let document = {
       fields: {
         id: { stringValue: id },
         principalName: { stringValue: principalName },
         code: { stringValue: code.toString() }, // Asegura que code sea un string
         qrUrl: { stringValue: qrUrl },
         etiqueta: { stringValue: etiqueta },
         acompanist: { arrayValue: { values: acompanists }}
       }
     };
 
     // Llamada a la función para guardar el documento en Firestore
     postToFirestore(document);
   }
 }
 // Función para hacer POST a Firestore usando la API de Firestore
 function postToFirestore(data) {
   const url = `${FIREBASE_URL}?key=${FIRESTORE_API_KEY}`;
   
   const options = {
     method: 'POST', // POST para crear nuevos documentos
     contentType: 'application/json',
     payload: JSON.stringify(data),
     muteHttpExceptions: true // Para ver más detalles del error en caso de que falle
   };
 
   const response = UrlFetchApp.fetch(url, options);
   Logger.log(response.getContentText()); // Registra la respuesta completa
 }
 

//  Funciona bien, actualiza el asist de cada invitado, pero no la mesa asignada. 




// Código que funciona bien y genera los documentos de acuerdo al nombre del id pero falla en el code
function doGet(e) {
  // Cambia aquí tu idioma-país y zona horaria
 const fecha = new Date().toLocaleString("es-MX", {timeZone:"America/Mexico_City"});

 // Registramos la asistencia usando el correo y los parámetros que vienen en la URL
 registrarAsistencia( e.parameter.id, e.parameter.nombre);

 // Damos retroalimentación sobre lo que sucedió:
 return HtmlService.createHtmlOutput(`
  Asistencia registrada correctamente. <br><br>
  Fecha: ${fecha}<br>
  ID: ${e.parameter.id}<br>
  Nombre: ${e.parameter.nombre}`);
}

function registrarAsistencia(correo, id, nombre) {
 // Debes cambiar este identificador por el de tu documento de hoja de cálculo
 const sheet = SpreadsheetApp.openById("1eNGFR5JgHm4hubGM3mUiS7g63aiL2WzUaajY2K3nFyc");
 const asistencia = sheet.getSheetByName("Asistencia");
 const lastRow = asistencia.getLastRow() + 1;
 asistencia.getRange(lastRow, 1).setValue(id);
 asistencia.getRange(lastRow, 2).setValue(nombre);
 asistencia.getRange(lastRow, 3).setValue(new Date());
}






const FIREBASE_URL = 'https://firestore.googleapis.com/v1/projects/invitaciones-55c1a/databases/(default)/documents/people';
const FIRESTORE_API_KEY = 'AIzaSyDKoJ7TPLSXJGM5zr19LnTmgRiCxKLU4PI';

function exportToFirestore() {
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Copia de Hoja 1");
const data = sheet.getDataRange().getValues();

// Empieza en la fila 2 para evitar encabezados
for (let i = 1; i < data.length; i++) {
  let row = data[i];

  let id = row[0].toString(); // Asegura que el id sea una cadena
  let principalName = row[1].toString(); // Columna B (principalName)
  let code = row[8]; // Columna I (code), sin convertir a string aún

  // Si 'code' es una fórmula, reemplázalo con su valor estático
  if (sheet.getRange(i + 1, 9).getFormula()) {  // La columna I es la 9
    code = sheet.getRange(i + 1, 9).getValue(); // Obtiene el valor generado
    sheet.getRange(i + 1, 9).setValue(code); // Convierte el valor en estático
  }

  let qrUrl = row[9].toString(); // Asegura que qrUrl sea una cadena
  let etiqueta = row[10].toString(); // Columna K (etiqueta)

  // Crear el arreglo de 'acompanist'
  let acompanists = [];
  for (let j = 2; j <= 7; j++) { // Columnas C-H (accompanist1-6)
    if (row[j] !== "") { // Solo si hay un nombre en la columna
      acompanists.push({
        mapValue: {
          fields: {
            name: { stringValue: row[j].toString() }, // Asegura que sea una cadena
            asist: { nullValue: null },
            principalName: { stringValue: principalName },
            etiqueta: { stringValue: etiqueta }
          }
        }
      });
    }
  }

  // Crear el documento que se enviará a Firestore
  let document = {
    fields: {
      id: { stringValue: id },
      principalName: { stringValue: principalName },
      code: { stringValue: code.toString() }, // Asegura que code sea un string
      qrUrl: { stringValue: qrUrl },
      etiqueta: { stringValue: etiqueta },
      acompanist: { arrayValue: { values: acompanists }}
    }
  };

  // Llamada a la función para guardar el documento en Firestore
  postToFirestore(document, id);
}
}

// Función para hacer PATCH a Firestore usando la API de Firestore
function postToFirestore(data, docId) {
const url = `${FIREBASE_URL}/${docId}?key=${FIRESTORE_API_KEY}`; // Incluye el ID en la URL

const options = {
  method: 'PATCH', // PATCH para crear o actualizar documentos con el ID especificado
  contentType: 'application/json',
  payload: JSON.stringify(data),
  muteHttpExceptions: true
};

const response = UrlFetchApp.fetch(url, options);
Logger.log(response.getContentText()); // Registra la respuesta completa
}
