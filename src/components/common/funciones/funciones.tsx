import "jspdf-autotable";

/**Agrega los dias indicados a la fecha*/
export const agregarDias = (Fecha: any, dias: number): Date => {
  let result = Fecha;
  if (typeof Fecha === "string") result = new Date(Fecha);

  result.setDate(result.getDate() + dias);
  return result;
};

/**Le asigna nombre a cada componente de la tabla */
export const AsignarNombreMaterialTable = (): void => {
  // let tabla = document.getElementsByClassName("MuiGrid-root MuiGrid-container MuiGrid-item")[2];
  let tabla = document.getElementsByClassName("MuiGrid-root MuiGrid-container MuiGrid-item")[
    document.getElementsByClassName("MuiGrid-root MuiGrid-container MuiGrid-item").length - 1
  ];
  if (tabla) {
    tabla.id = "tabla";

    let cabezeraTabla = tabla.getElementsByClassName("MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters")[0];
    if (cabezeraTabla) {
      let busqueda = cabezeraTabla.getElementsByClassName(
        "MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedStart MuiInputBase-adornedEnd"
      )[0];
      if (busqueda) busqueda.id = "tablaBusqueda";

      let columnas = cabezeraTabla.getElementsByClassName(
        "MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
      )[0];
      if (columnas) columnas.id = "tablaColumnas";

      let csv = cabezeraTabla.getElementsByClassName(
        "MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
      )[1];
      if (csv) csv.id = "tablaCVS";
    }

    let grupos = tabla.getElementsByClassName("MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters")[1];
    if (grupos) grupos.id = "tablaGrupos";

    let cabeza = tabla.getElementsByClassName("MuiTableHead-root")[0];
    if (cabeza) cabeza.id = "tablaCabeza";
    if (cabeza) {
      let botonSeleccion = cabeza.getElementsByClassName("MuiIconButton-label")[0];
      if (botonSeleccion) botonSeleccion.id = "tablaBotonSeleccion";
    }

    let cuerpo = tabla.getElementsByClassName("MuiTableBody-root")[0];
    if (cuerpo) {
      cuerpo.id = "tablaCuerpo";

      let filtros = cuerpo.getElementsByClassName("MuiTableRow-root")[0];
      if (filtros) filtros.id = "tablaFiltros";

      let data = cuerpo.getElementsByClassName("MuiTableRow-root")[1];
      if (data) data.id = "tablaData";

      let boton1 = cuerpo.getElementsByClassName("MuiButtonBase-root MuiIconButton-root")[0];
      if (boton1) boton1.id = "tablaBoton1";

      let boton2 = cuerpo.getElementsByClassName("MuiButtonBase-root MuiIconButton-root")[1];
      if (boton2) boton2.id = "tablaBoton2";

      let boton3 = cuerpo.getElementsByClassName("MuiButtonBase-root MuiIconButton-root")[2];
      if (boton3) boton3.id = "tablaBoton3";

      let boton4 = cuerpo.getElementsByClassName("MuiButtonBase-root MuiIconButton-root")[3];
      if (boton4) boton4.id = "tablaBoton4";

      let boton5 = cuerpo.getElementsByClassName("MuiButtonBase-root MuiIconButton-root")[4];
      if (boton5) boton5.id = "tablaBoton5";

      let boton6 = cuerpo.getElementsByClassName("MuiButtonBase-root MuiIconButton-root")[5];
      if (boton6) boton6.id = "tablaBoton6";

      let boton7 = cuerpo.getElementsByClassName("MuiButtonBase-root MuiIconButton-root")[6];
      if (boton7) boton7.id = "tablaBoton7";
    }
  }
};

/**Convierte una imagen en base64 */
export const ConvertirImagenBase64 = (archivo: any, cb: Function): void => {
  let reader = new FileReader();
  reader.readAsDataURL(archivo);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

/**Cambia el tamaño de una imagen */
export const CambiarTamanoImagen = (archivo: any, maxWidth: number, maxHeight: number, calidad: number): void => {
  var reader = new FileReader();
  reader.readAsDataURL(archivo);
  reader.onload = function (event: any) {
    var dataUrl: any = event.target.result;

    var image = new Image();
    image.src = dataUrl;
    image.onload = function () {
      var canvas = document.createElement("canvas");

      var width = image.width;
      var height = image.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      var ctx: any = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, width, height);
      // cb(canvas.toDataURL("image/jpeg", calidad));
      return canvas.toDataURL("image/jpeg", calidad);
    };
  };
};

export function ExportarPDF(columns: any[], data: any[] = [], filename = "data", titulo = "") {
  try {
    const JSpdf = typeof window !== "undefined" ? require("jspdf").jsPDF : null;
    const columnStyles: any = {};

    const finalData: any[] = data.map((row: any) =>
      row.map((valor: any, index: number) =>
        (columns[index].type !== "currency" || isNaN(valor)) ? valor : FormatearNumeroCurrency.format(valor)
      )
    );

    columns.forEach((columna: any, index: number) => columna.type === 'currency' ? columnStyles[index] = {halign: 'right'} : null);

    if (JSpdf !== null) {
      const content = {
        startY: 80,
        head: [columns.map(col => col.title)],
        body: finalData,
        columnStyles,
      };
      const unit = "pt";
      const size = "A4";
      const orientation = "landscape";
      const doc = new JSpdf(orientation, unit, size);
      doc.setFontSize(15);
      doc.text(titulo, 40, 40);
      doc.autoTable(content);
      doc.save(filename + ".pdf");
    }
  } catch (err) {
    console.error(`exporting pdf : unable to import 'jspdf-autotable' : ${err}`);
  }
}

/**Formatea el monto a moneda */
export const FormatearNumero = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
/**Formatea el monto a moneda con etiqueta DOP */
export const FormatearNumeroCurrency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

/**Convierte un texto en un objeto fecha: Formato: YYYY-MM-DD*/
export const convertirTextoAFecha = (fecha: string): Date =>
  fecha ? new Date(+fecha.slice(0, 4), +fecha.slice(5, 7) - 1, +fecha.slice(8, 10)) : new Date();

/**Convierte una fecha en un texto con el formato especificado*/
export const FormatearFecha = (fecha: Date, formato: "YYYY-MM-DD" | "DD-MM-YYYY" | "MM-DD-YYYY"): string => {
  if (fecha) {
    if (formato === "YYYY-MM-DD") {
      return (
        fecha.getFullYear().toString() +
        "-" +
        (fecha.getMonth() + 1 < 10 ? "0" : "") +
        (fecha.getMonth() + 1).toString() +
        "-" +
        (fecha.getDate() < 10 ? "0" : "") +
        fecha.getDate().toString()
      );
    } else if (formato === "DD-MM-YYYY") {
      return (
        (fecha.getDate() < 10 ? "0" : "") +
        fecha.getDate().toString() +
        "-" +
        (fecha.getMonth() + 1 < 10 ? "0" : "") +
        (fecha.getMonth() + 1).toString() +
        "-" +
        fecha.getFullYear().toString()
      );
    } else if (formato === "MM-DD-YYYY") {
      return (
        (fecha.getMonth() + 1 < 10 ? "0" : "") +
        (fecha.getMonth() + 1).toString() +
        "-" +
        (fecha.getDate() < 10 ? "0" : "") +
        fecha.getDate().toString() +
        "-" +
        fecha.getFullYear().toString()
      );
    } else return fecha + "";
  } else return "";
};

/**Recibe un arreglo y devuelve el mismo con la propiedad fechaFormateada de la fecha
 * @param {Array} data arreglo con un campo fecha el cual se convertira a texto
 */
export const FormatearFechaArray = (data: any[]): any[] => {
  if (data && data.length) {
    return data.map(elemento => {
      if (elemento.fecha) elemento.fechaFormateada = FormatearFecha(convertirTextoAFecha(elemento.fecha), "DD-MM-YYYY");
      return elemento;
    });
  } else return data;
};

/**Arreglo de meses */
export const Meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

/**Recibe el mes en numero y devuelve el nombre */
export const NombreMes = (mes: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12): string => {
  switch (mes) {
    case 1:
      return "Enero";
    case 2:
      return "Febrero";
    case 3:
      return "Marzo";
    case 4:
      return "Abril";
    case 5:
      return "Mayo";
    case 6:
      return "Junio";
    case 7:
      return "Julio";
    case 8:
      return "Agosto";
    case 9:
      return "Septiembre";
    case 10:
      return "Octubre";
    case 11:
      return "Noviembre";
    case 12:
      return "Diciembre";
  }
};

/**
 * devuelve un arreglo con los registros unicos segun campo unico
 */
export const RegistrosUnicos = (arregloOriginal: any[], campoUnico: string): any[] => {
  let registrosUnicos: any[] = [];

  if (arregloOriginal) {
    arregloOriginal.forEach(registro => {
      if (registrosUnicos.every(elemento => elemento[campoUnico] !== registro[campoUnico])) {
        registrosUnicos.push(registro);
      }
    });
  }

  return registrosUnicos;
};

export const numeroALetra = (numero: number): string => {
  let valor = 0;
  let texto = "";
  let comodin = "";
  const unidades = [
    "",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
    "once",
    "doce",
    "trece",
    "catorce",
    "quince",
    "dieciseis",
    "diecisiete",
    "dieciocho",
    "diecinueve",
  ];
  const decenas = [
    "",
    "diez",
    "veinte",
    "treinta",
    "cuarenta",
    "cincuenta",
    "sesenta",
    "setenta",
    "ochenta",
    "noventa",
  ];

  valor = Math.floor(numero / 1000000);
  numero = numero - valor * 1000000;
  if (valor === 1) texto = `${texto} un millon`;
  else if (valor > 1) texto = `${texto} ${unidades[valor]} millones`;

  valor = Math.floor(numero / 100000);
  numero = numero - valor * 100000;
  if (valor === 1) texto = `${texto} cien${Math.floor(numero / 1000) > 0 ? "to" : ""}`;
  else if (valor > 1) texto = `${texto} ${unidades[valor]} cien${Math.floor(numero / 1000) > 0 ? "tos" : ""}`;
  if (valor > 0) comodin = "mil";

  valor = Math.floor(numero / 10000);
  if (valor >= 2) {
    numero = numero - valor * 10000;
    texto = `${texto} ${decenas[valor]}`;
  }
  if (valor > 0) comodin = "mil";

  valor = Math.floor(numero / 1000);
  numero = numero - valor * 1000;
  if (valor === 0) texto = `${texto} ${comodin}`;
  else if (valor === 1) texto = `${texto} un mil`;
  else if (valor > 1) texto = `${texto} ${unidades[valor]} mil`;

  valor = Math.floor(numero / 100);
  numero = numero - valor * 100;
  if (valor === 1) texto = `${texto} cien${numero > 0 ? "to" : ""}`;
  else if (valor === 5) texto = `${texto} quinientos`;
  else if (valor > 1) texto = `${texto} ${unidades[valor]} cientos`;

  valor = Math.floor(numero / 10);
  if (valor > 1) {
    texto = `${texto} ${decenas[valor]}`;
    numero = numero - valor * 10;

    valor = Math.floor(numero);
    if (numero >= 1) {
      texto = `${texto} y ${unidades[valor]}`;
      numero = numero - valor;
    }
  } else {
    valor = Math.floor(numero);
    texto = `${texto} ${unidades[valor]}`;
    numero = numero - valor;
  }

  numero = +(numero * 100).toFixed(2);
  texto = `${texto} CON ${numero > 10 ? numero : "0" + numero}/100`;

  return texto;
};
