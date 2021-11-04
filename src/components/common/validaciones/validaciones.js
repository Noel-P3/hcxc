import AlertMessage from "../messageAlert/MessageAlert";

export const ValidarCustom = (
  nombreCampo = "",
  mensajeError = "",
  valor1 = true,
  valor2 = true,
  valor3 = true,
  valor4 = true
) => {
  if (valor1 && valor2 && valor3 && valor4) {
    AlertMessage("error", mensajeError);
    return { [nombreCampo]: mensajeError };
  }
};

/**
 * Verifica que las cuentas contables segun proyecto esten cuadradas debitos y creditos
 * @param {string} nombreCampo Nombre de la propiedad que hace referencia
 * @param {array} arregloCuentas Cuentas del documento
 * @param {string} mensajeError Mensaje de error a mostrar cuando no se cumpla la condicion
 */
export const validarCuentasContablesCuadradas = (
  nombreCampo,
  arregloCuentas,
  mensajeError
) => {
  let alertar = false;
  const centroCostos = [
    ...new Set(arregloCuentas.map((cuenta) => cuenta.centroCostoId)),
  ];
  const centroCostoProyectos = [
    ...new Set(arregloCuentas.map((cuenta) => cuenta.centroCostoProyectoId)),
  ];
  const centroCostoSubProyectos = [
    ...new Set(arregloCuentas.map((cuenta) => cuenta.centroCostoSubProyectoId)),
  ];

  if (centroCostos[0] !== null && centroCostos[0] !== undefined) {
    for (let i = 0; i < centroCostos.length; i++) {
      if (
        +arregloCuentas
          .filter((cuenta) => cuenta.centroCostoId === centroCostos[i])
          .reduce((acc, val) => acc + +val.debito - +val.credito, 0)
          .toFixed(2) !== 0
      )
        alertar = true;
    }
  }

  if (
    centroCostoProyectos[0] !== null &&
    centroCostoProyectos[0] !== undefined
  ) {
    for (let i = 0; i < centroCostoProyectos.length; i++) {
      if (
        +arregloCuentas
          .filter(
            (cuenta) => cuenta.centroCostoProyectoId === centroCostoProyectos[i]
          )
          .reduce((acc, val) => acc + +val.debito - +val.credito, 0)
          .toFixed(2) !== 0
      )
        alertar = true;
    }
  }

  if (
    centroCostoSubProyectos[0] !== null &&
    centroCostoSubProyectos[0] !== undefined
  ) {
    for (let i = 0; i < centroCostoSubProyectos.length; i++) {
      if (
        +arregloCuentas
          .filter(
            (cuenta) =>
              cuenta.centroCostoSubProyectoId === centroCostoSubProyectos[i]
          )
          .reduce((acc, val) => acc + +val.debito - +val.credito, 0)
          .toFixed(2) !== 0
      )
        alertar = true;
    }
  }

  if (
    +arregloCuentas
      .reduce((acc, val) => acc + +val.debito - +val.credito, 0)
      .toFixed(2) !== 0
  )
    alertar = true;

  if (alertar) {
    AlertMessage("error", mensajeError);
    return { [nombreCampo]: mensajeError };
  } else return null;
};

/**
 * Verifica que la cuenta principal tenga el mismo valor que el total del documento
 * @param {string} nombreCampo Nombre de la propiedad que hace referencia
 * @param {number} cuentaPrincipalId Cuenta principal del documento que sirve de nexo con el modulo
 * @param {array} arregloCuentas Cuentas del documento
 * @param {number} total Total del documento
 * @param {string} mensajeError Mensaje de error a mostrar cuando no se cumpla la condicion
 */
export const validarCuentaPrincipalIgualTotal = (
  nombreCampo,
  cuentaPrincipalId,
  arregloCuentas,
  total,
  mensajeError
) => {
  if (
    Math.abs(
      arregloCuentas
        .filter((cuenta) => cuenta.cuentaId === cuentaPrincipalId)
        .reduce((acc, val) => acc + +val.debito - +val.credito, 0)
    ) !== Math.abs(+total)
  ) {
    AlertMessage("error", mensajeError);
    return { [nombreCampo]: mensajeError };
  } else return null;
};

/**
 * Verifica que las cuentas de inventario tengan el mismo valor que el total del documento
 * @param {string} nombreCampo Nombre de la propiedad que hace referencia
 * @param {number} arregloProductos Productos con su cuenta de inventario
 * @param {array} arregloCuentas Cuentas del documento
 * @param {number} total Total del documento
 * @param {string} mensajeError Mensaje de error a mostrar cuando no se cumpla la condicion
 */
export const validarCuentaPrincipalIgualTotalInventario = (
  nombreCampo,
  arregloProductos,
  arregloCuentas,
  total,
  mensajeError
) => {
  const cuentasInventario = [
    ...new Set(arregloProductos.map((producto) => producto.cuentaInventarioId)),
  ];

  if (
    arregloCuentas
      .filter((cuenta) => cuentasInventario.includes(cuenta.cuentaId))
      .reduce((acc, val) => acc + +val.debito - +val.credito, 0) !== +total
  ) {
    AlertMessage("error", mensajeError);
    return { [nombreCampo]: mensajeError };
  } else return null;
};

export const validarNumeroPositivo = (nombreCampo, valor, mensajeError) => {
  if (valor <= 0) {
    AlertMessage("error", mensajeError);
    return { [nombreCampo]: mensajeError };
  } else return null;
};

export const validarValorAsignado = (nombreCampo, valor, mensajeError) => {
  if (
    valor === null ||
    valor === undefined ||
    JSON.stringify(valor) === "[]" ||
    JSON.stringify(valor) === "{}" ||
    valor === ""
  ) {
    AlertMessage("error", mensajeError);
    return { [nombreCampo]: mensajeError };
  } else return null;
};

export const validarValorEmail = (valor, nombreCampo, mensajeError) => {
  if (valor) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valor)) {
      AlertMessage("error", mensajeError);
      return { [nombreCampo]: mensajeError };
    }
  } else return null;
};

export const validarValorNumero = (valor, nombreCampo, mensajeError) => {
  if (isNaN(Number(valor))) {
    AlertMessage("error", mensajeError);
    return { [nombreCampo]: mensajeError };
  }
};

export const validarValorUnico = (
  dataOriginal,
  dataNueva,
  nombreCampo,
  mensajeError
) => {
  if (
    dataOriginal.some(
      (e) => e[nombreCampo] === dataNueva[nombreCampo] && e.id !== dataNueva.id
    )
  ) {
    AlertMessage("error", mensajeError);
    return { [nombreCampo]: mensajeError };
  } else return null;
};
