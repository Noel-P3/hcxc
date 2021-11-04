import React, { useState } from "react";
import {
  CardContent,
  Grid,
  Card,
  CardHeader,
  IconButton,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { Search, DeleteForever, AddCircle } from "@material-ui/icons";
import PropTypes from "prop-types";
import { FormatearNumero } from "../funciones/funciones";
import { Get } from "../functionServer/FunctionServer";
import Dialog from "../dialog/dialog";
import Busqueda from "../busqueda/busqueda";
// import { loginContext } from "../../../App";
import AlertMessage from "../../common/messageAlert/MessageAlert";

export function EditorProductosCantidad({
  documento,
  setDocumento,
  modificandoAgregandoDocumento,
  setDocumentoModificado,
}) {
  const [confirmarAccionEliminar, setConfirmarAccionEliminar] = useState(null);
  const [busquedaData, setBusquedaData] = useState(null);

  const onBuscar = (collection, index, propiedad, where, order) =>
    setBusquedaData({ collection, index, propiedad, where, order });
  const onBuscarCerrar = async (registro, indice) => {
    if (registro && busquedaData?.collection === "Inventories") {
      let nuevoEstado = JSON.parse(JSON.stringify(documento));
      if (typeof nuevoEstado.productos === "undefined")
        nuevoEstado.productos = [];
      nuevoEstado.productos.push({ CANTIDAD: 1, ELIMINAR: false });
      setDocumentoModificado(true);

      indice = nuevoEstado.productos.length - 1;

      nuevoEstado.productos[indice].DESCRIPCION = registro.NOMBRE
        ? registro.NOMBRE
        : "";
      nuevoEstado.productos[indice].PRECIO = registro.PRECIO
        ? registro.PRECIO
        : 0;

      nuevoEstado.productos[indice].ID_PRODUCTO = registro.ID;
      nuevoEstado.productos[indice].REFERENCIA = registro.REFERENCIA;
      nuevoEstado.productos[indice].BRUTO = 0;
      nuevoEstado.productos[indice].DESCUENTOPOR = 0;
      nuevoEstado.productos[indice].DESCUENTO = 0;
      nuevoEstado.productos[indice].NETO = 0;
      nuevoEstado.productos[indice].TOTAL = 0;

      onCalcularTodo(nuevoEstado);
    }
    setBusquedaData(null);
  };

  const onCalcularTodo = (nuevoEstado) => {
    let copiaData = nuevoEstado;
    var montoBruto = 0;
    var montoNeto = 0;

    for (let i = 0; i < copiaData.productos.length; i++) {
      montoBruto =
        copiaData.productos[i].CANTIDAD * copiaData.productos[i].PRECIO;

      copiaData.productos[i].BRUTO = montoBruto;

      if (copiaData.productos[i].DESCUENTOPOR) {
        copiaData.productos[i].DESCUENTO =
          (montoBruto * copiaData.productos[i].DESCUENTOPOR) / 100;

        montoNeto = montoBruto - copiaData.productos[i].DESCUENTO;

        copiaData.productos[i].NETO = montoNeto;
      } else {
        copiaData.productos[i].DESCUENTO = 0;
        copiaData.productos[i].NETO = montoNeto;
      }

      let total = montoBruto - copiaData.productos[i].DESCUENTO;
      copiaData.productos[i].TOTAL = total;
    }

    let totalBruto = copiaData.productos.reduce(
      (acc, productos) => (acc = acc + productos.BRUTO),
      0
    );

    let totalNeto = copiaData.productos.reduce(
      (acc, productos) => (acc = acc + productos.NETO),
      0
    );

    let totalDescuento = copiaData.productos.reduce(
      (acc, productos) => (acc = acc + productos.DESCUENTO),
      0
    );

    let totalMONTO = copiaData.productos.reduce(
      (acc, productos) => (acc = acc + productos.TOTAL),
      0
    );

    copiaData.BRUTO = totalBruto;
    copiaData.DESCUENTO = totalDescuento;
    copiaData.NETO = totalNeto;
    copiaData.TOTAL = totalMONTO;
    copiaData.PENDIENTE = totalMONTO;
    copiaData.PAGADO = 0;

    setDocumento(copiaData);
  };

  const onEliminarConfirmar = (indice) => setConfirmarAccionEliminar(indice);
  const onEliminar = () => {
    let nuevoEstado = JSON.parse(JSON.stringify(documento));
    nuevoEstado.productos[confirmarAccionEliminar].ELIMINAR = true;
    nuevoEstado.productos[confirmarAccionEliminar].CANTIDAD = 0;
    onCalcularTodo(nuevoEstado);
    setConfirmarAccionEliminar(null);
    setDocumentoModificado(true);
  };
  const onEliminarCancelar = () => setConfirmarAccionEliminar(null);

  const onInputChange = (indice, { name, value }) => {
    if (name === "CANTIDAD" && value <= 0) value = 0;
    if (name === "PRECIO" && value <= 0) value = 0;
    if (name === "BRUTO") return;
    if (name === "DESCUENTOPOR" && value <= 0) value = 0;
    if (name === "DESCUENTO") return;
    if (name === "TOTAL") return;
    if (name === "NETO") return;

    let nuevoEstado = JSON.parse(JSON.stringify(documento));
    nuevoEstado.productos[indice][name] = value;
    onCalcularTodo(nuevoEstado);
    setDocumentoModificado(true);
  };

  return (
    <>
      <Dialog
        open={confirmarAccionEliminar !== null ? true : false}
        titulo="¡Advertencia!"
        estiloTitulo="Warning"
        mensaje={`¿Seguro desea eliminar el registro "Fila ${
          confirmarAccionEliminar !== null ? confirmarAccionEliminar + 1 : ""
        }"?`}
        textoBtn1="Continuar y Eliminar Registro"
        textoBtn2="Cancelar"
        accionDialogBtn1={onEliminar}
        accionDialogBtn2={onEliminarCancelar}
      />

      {busquedaData && (
        <Busqueda
          funcionCerrar={onBuscarCerrar}
          collection={busquedaData.collection}
          where={busquedaData.where}
          order={busquedaData.order}
        />
      )}

      <Grid item xs={12}>
        <Card className="card" id="cardDetalleProductos">
          <CardHeader
            className="cardRoot cardTitle"
            title="Productos Asignados"
          />

          <CardContent className="cardContentDetalle">
            <Grid container spacing={1}>
              <Grid item xs={12} className="tablasDetalles">
                <Table size="small">
                  <TableHead className="tablasDetallesheader">
                    <TableRow>
                      {modificandoAgregandoDocumento && (
                        <TableCell className="tablasDetallesTitulo">
                          Acciones
                        </TableCell>
                      )}
                      <TableCell className="tablasDetallesTitulo">
                        Referencia
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo">
                        Producto
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo" align="right">
                        Cantidad
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo" align="right">
                        Precio
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo" align="right">
                        Bruto
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo" align="right">
                        Desc. %
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo" align="right">
                        Descuento
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo" align="right">
                        Neto
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo" align="right">
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {documento.productos && (
                    <TableBody>
                      {documento.productos.map(
                        (registro, index) =>
                          !registro.ELIMINAR && (
                            <TableRow key={index}>
                              {modificandoAgregandoDocumento ? (
                                <TableCell>
                                  <IconButton
                                    onClick={() => onEliminarConfirmar(index)}
                                  >
                                    <DeleteForever />
                                  </IconButton>
                                </TableCell>
                              ) : null}
                              <TableCell className={"tablasDetallesInput"}>
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <Button
                                      fullWidth
                                      id={`botonDetalleProductos-${index}`}
                                      onClick={() =>
                                        onBuscar(
                                          "Inventories",
                                          index,
                                          "Inventories",
                                          ``,
                                          "nombre ASC"
                                        )
                                      }
                                    >
                                      <Search />
                                      {registro.REFERENCIA}
                                    </Button>
                                  </Grid>
                                ) : (
                                  registro.REFERENCIA
                                )}
                              </TableCell>

                              <TableCell className={"tablasDetallesInput"}>
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <Button
                                      fullWidth
                                      id={`botonDetalleProductos-${index}`}
                                      onClick={() =>
                                        onBuscar(
                                          "Inventories",
                                          index,
                                          "Inventories",
                                          ``,
                                          "nombre ASC"
                                        )
                                      }
                                    >
                                      <Search />
                                      {registro.DESCRIPCION}
                                    </Button>
                                  </Grid>
                                ) : (
                                  registro.DESCRIPCION
                                )}
                              </TableCell>
                              <TableCell
                                className={"tablasDetallesInput"}
                                align="right"
                              >
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <TextField
                                      required={
                                        registro.CANTIDAD ? false : true
                                      }
                                      fullWidth
                                      id={`CANTIDAD-${index}`}
                                      name="CANTIDAD"
                                      placeholder="0.00"
                                      InputLabelProps={{ shrink: true }}
                                      variant="outlined"
                                      margin="normal"
                                      onChange={(event) =>
                                        onInputChange(index, event.target)
                                      }
                                      value={registro.CANTIDAD ?? ""}
                                      type="number"
                                    />
                                  </Grid>
                                ) : (
                                  FormatearNumero.format(registro.CANTIDAD)
                                )}
                              </TableCell>
                              <TableCell
                                className={"tablasDetallesInput"}
                                align="right"
                              >
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <TextField
                                      required={registro.PRECIO ? false : true}
                                      fullWidth
                                      id={`PRECIO-${index}`}
                                      name="PRECIO"
                                      placeholder="0.00"
                                      InputLabelProps={{ shrink: true }}
                                      variant="outlined"
                                      margin="normal"
                                      onChange={(event) =>
                                        onInputChange(index, event.target)
                                      }
                                      value={registro.PRECIO ?? ""}
                                      type="number"
                                    />
                                  </Grid>
                                ) : (
                                  FormatearNumero.format(registro.PRECIO)
                                )}
                              </TableCell>
                              <TableCell
                                className={"tablasDetallesInput"}
                                align="right"
                              >
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <TextField
                                      required={registro.BRUTO ? false : true}
                                      fullWidth
                                      id={`BRUTO-${index}`}
                                      name="BRUTO"
                                      placeholder="0.00"
                                      InputLabelProps={{ shrink: true }}
                                      variant="outlined"
                                      margin="normal"
                                      disabled
                                      onChange={(event) =>
                                        onInputChange(index, event.target)
                                      }
                                      value={registro.BRUTO ?? ""}
                                      type="number"
                                    />
                                  </Grid>
                                ) : (
                                  FormatearNumero.format(registro.BRUTO)
                                )}
                              </TableCell>
                              <TableCell
                                className={"tablasDetallesInput"}
                                align="right"
                              >
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <TextField
                                      required={
                                        registro.DESCUENTOPOR ? false : true
                                      }
                                      fullWidth
                                      id={`DESCUENTOPOR-${index}`}
                                      name="DESCUENTOPOR"
                                      placeholder="0.00"
                                      InputLabelProps={{ shrink: true }}
                                      variant="outlined"
                                      margin="normal"
                                      onChange={(event) =>
                                        onInputChange(index, event.target)
                                      }
                                      value={registro.DESCUENTOPOR ?? ""}
                                      type="number"
                                    />
                                  </Grid>
                                ) : (
                                  FormatearNumero.format(registro.DESCUENTOPOR)
                                )}
                              </TableCell>
                              <TableCell
                                className={"tablasDetallesInput"}
                                align="right"
                              >
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <TextField
                                      required={
                                        registro.DESCUENTO ? false : true
                                      }
                                      fullWidth
                                      id={`DESCUENTO-${index}`}
                                      name="DESCUENTO"
                                      placeholder="0.00"
                                      disabled
                                      InputLabelProps={{ shrink: true }}
                                      variant="outlined"
                                      margin="normal"
                                      onChange={(event) =>
                                        onInputChange(index, event.target)
                                      }
                                      value={registro.DESCUENTO ?? ""}
                                    />
                                  </Grid>
                                ) : (
                                  FormatearNumero.format(registro.DESCUENTO)
                                )}
                              </TableCell>
                              <TableCell
                                className={"tablasDetallesInput"}
                                align="right"
                              >
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <TextField
                                      required={registro.NETO ? false : true}
                                      fullWidth
                                      id={`NETO-${index}`}
                                      name="NETO"
                                      placeholder="0.00"
                                      disabled
                                      InputLabelProps={{ shrink: true }}
                                      variant="outlined"
                                      margin="normal"
                                      onChange={(event) =>
                                        onInputChange(index, event.target)
                                      }
                                      value={registro.NETO ?? ""}
                                    />
                                  </Grid>
                                ) : (
                                  FormatearNumero.format(registro.NETO)
                                )}
                              </TableCell>
                              <TableCell
                                className={"tablasDetallesInput"}
                                align="right"
                              >
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <TextField
                                      required={registro.TOTAL ? false : true}
                                      fullWidth
                                      id={`TOTAL-${index}`}
                                      name="TOTAL"
                                      placeholder="0.00"
                                      InputLabelProps={{ shrink: true }}
                                      variant="outlined"
                                      margin="normal"
                                      disabled
                                      onChange={(event) =>
                                        onInputChange(index, event.target)
                                      }
                                      value={registro.TOTAL ?? ""}
                                    />
                                  </Grid>
                                ) : (
                                  FormatearNumero.format(registro.TOTAL)
                                )}
                              </TableCell>
                            </TableRow>
                          )
                      )}
                      <TableRow>
                        {modificandoAgregandoDocumento && (
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                        )}
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell>
                          <strong>Bruto</strong>
                        </TableCell>
                        <TableCell>
                          <strong>=======</strong>
                        </TableCell>
                        <TableCell align="right">
                          {FormatearNumero.format(documento.BRUTO)}
                        </TableCell>
                      </TableRow>
                      {documento.DESCUENTO ? (
                        <TableRow className="styles">
                          {modificandoAgregandoDocumento && (
                            <TableCell className="TableCellNoBorderBottom"></TableCell>
                          )}
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell>
                            <strong>Descuento</strong>
                          </TableCell>
                          <TableCell>
                            <strong>=======</strong>
                          </TableCell>
                          <TableCell align="right">
                            -{FormatearNumero.format(documento.DESCUENTO)}
                          </TableCell>
                        </TableRow>
                      ) : (
                        <></>
                      )}
                      {documento.NETO ? (
                        <TableRow className="styles">
                          {modificandoAgregandoDocumento && (
                            <TableCell className="TableCellNoBorderBottom"></TableCell>
                          )}
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                          <TableCell>
                            <strong>Neto</strong>
                          </TableCell>
                          <TableCell>
                            <strong>=======</strong>
                          </TableCell>
                          <TableCell align="right">
                            {FormatearNumero.format(documento.NETO)}
                          </TableCell>
                        </TableRow>
                      ) : (
                        <></>
                      )}
                      <TableRow className="styles">
                        {modificandoAgregandoDocumento && (
                          <TableCell className="TableCellNoBorderBottom"></TableCell>
                        )}
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell className="TableCellNoBorderBottom"></TableCell>
                        <TableCell>
                          <strong>Total</strong>
                        </TableCell>
                        <TableCell>
                          <strong>=======</strong>
                        </TableCell>
                        <TableCell align="right">
                          {FormatearNumero.format(documento.TOTAL)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </Grid>
              <Grid item xs={12}>
                {modificandoAgregandoDocumento && (
                  <Button
                    fullWidth
                    id="botonMasProductos"
                    onClick={() => {
                      onBuscar(
                        "Inventories",
                        documento.productos.length,
                        "Inventories",
                        ``,
                        "NOMBRE ASC"
                      );
                    }}
                  >
                    <AddCircle />
                    Agregar Linea
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

EditorProductosCantidad.propTypes = {
  companiaId: PropTypes.number.isRequired,
  documento: PropTypes.object.isRequired,
  setDocumento: PropTypes.func.isRequired,
  modificandoAgregandoDocumento: PropTypes.bool.isRequired,
  setDocumentoModificado: PropTypes.func.isRequired,
};

export function EditorProductosAnalisis({
  documento,
  setDocumento,
  modificandoAgregandoDocumento,
  setDocumentoModificado,
}) {
  const [confirmarAccionEliminar, setConfirmarAccionEliminar] = useState(null);
  const [busquedaData, setBusquedaData] = useState(null);
  // const {
  //   companiaSeleccionada: { id },
  // } = useContext(loginContext);

  const onAgregar = () => {
    let nuevoEstado = JSON.parse(JSON.stringify(documento));
    if (typeof nuevoEstado.productos === "undefined")
      nuevoEstado.productos = [];
    nuevoEstado.productos.push({ cantidad: 1, eliminar: false });
    setDocumento(nuevoEstado);
    setDocumentoModificado(true);
  };

  const onBuscar = (collection, index, propiedad, where, order) =>
    setBusquedaData({ collection, index, propiedad, where, order });
  const onBuscarCerrar = (registro, nuevoRegistro, indice) => {
    const nuevoEstado = JSON.parse(JSON.stringify(documento));
    if (busquedaData) {
      if (!indice) indice = busquedaData.index;
    }

    if (
      registro &&
      busquedaData.collection === "Productos" &&
      busquedaData.propiedad === "productoNombre"
    ) {
      const producto = nuevoEstado.productos[indice];

      if (
        (registro && busquedaData?.collection === "Productos") ||
        nuevoRegistro
      ) {
        producto.idProducto = registro.id;
        producto.referencia = registro.referencia;
        producto.descripcion = registro.nombre ? registro.nombre : "";
        producto.cantidad = 0;
      }

      if (!producto.idProducto) nuevoEstado.productos.splice(indice, 1);
    } else if (
      registro &&
      busquedaData.collection === "Departamentos" &&
      busquedaData.propiedad === "Departamentos"
    ) {
      nuevoEstado.idDepartLabo = registro.id;
      nuevoEstado.departamento = registro.descripcion;
    } else nuevoEstado.productos.splice(indice, 1);

    setDocumento(nuevoEstado);

    setBusquedaData(null);
  };

  const onEliminarConfirmar = (indice) => setConfirmarAccionEliminar(indice);
  const onEliminar = () => {
    let nuevoEstado = JSON.parse(JSON.stringify(documento));
    nuevoEstado.productos[confirmarAccionEliminar].eliminar = true;
    nuevoEstado.productos[confirmarAccionEliminar].cantidad = 0;
    setDocumento(nuevoEstado);
    setConfirmarAccionEliminar(null);
    setDocumentoModificado(true);
  };
  const onEliminarCancelar = () => setConfirmarAccionEliminar(null);

  const onInputChange = (indice, { name, value }) => {
    if (name === "cantidad" && value <= 0) value = 0;

    let nuevoEstado = JSON.parse(JSON.stringify(documento));
    nuevoEstado.productos[indice][name] = value;
    setDocumento(nuevoEstado);
    setDocumentoModificado(true);
  };

  const onKeyDown = async (e) => {
    if (e.key === "Enter") {
      let producto = await Get(`api/Productos/Get`, null, null, {
        where: `REFERENCIA = '${e.target.value.toUpperCase()}'`,
        order: "REFERENCIA ASC",
      });

      if (producto.length) {
        onBuscarCerrar(producto[0], true, documento.productos.length);
      }
    }
  };

  return (
    <>
      <Dialog
        open={confirmarAccionEliminar !== null ? true : false}
        titulo="¡Advertencia!"
        estiloTitulo="Warning"
        mensaje={`¿Seguro desea eliminar el registro "Fila ${
          confirmarAccionEliminar !== null ? confirmarAccionEliminar + 1 : ""
        }"?`}
        textoBtn1="Continuar y Eliminar Registro"
        textoBtn2="Cancelar"
        accionDialogBtn1={onEliminar}
        accionDialogBtn2={onEliminarCancelar}
      />

      {busquedaData && (
        <Busqueda
          funcionCerrar={onBuscarCerrar}
          collection={busquedaData.collection}
          where={busquedaData.where}
          order={busquedaData.order}
        />
      )}

      <Grid item xs={12}>
        <Card className="card" id="cardDetalleProductos">
          <CardHeader
            className="cardRoot cardTitle"
            title="Productos Asignados"
          />

          <CardContent className="cardContentDetalle">
            <Grid container spacing={1}>
              {modificandoAgregandoDocumento && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="codigoBarraLectura"
                    name="codigoBarraLectura"
                    placeholder="Código de Barra ..."
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    onKeyDown={onKeyDown}
                  />
                </Grid>
              )}

              <Grid item xs={12} className="tablasDetalles">
                <Table size="small">
                  <TableHead className="tablasDetallesheader">
                    <TableRow>
                      {modificandoAgregandoDocumento && (
                        <TableCell className="tablasDetallesTitulo">
                          Acciones
                        </TableCell>
                      )}
                      <TableCell className="tablasDetallesTitulo">
                        Referencia
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo">
                        Producto
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo">
                        Cantidad
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {documento.productos && (
                    <TableBody>
                      {documento.productos.map(
                        (registro, index) =>
                          !registro.eliminar && (
                            <TableRow key={index}>
                              {modificandoAgregandoDocumento ? (
                                <TableCell>
                                  <IconButton
                                    onClick={() => onEliminarConfirmar(index)}
                                  >
                                    <DeleteForever />
                                  </IconButton>
                                </TableCell>
                              ) : null}

                              <TableCell className={"tablasDetallesInput"}>
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <Button
                                      fullWidth
                                      id={`botonDetalleProductos-${index}`}
                                      onClick={() =>
                                        onBuscar(
                                          "InventarioProductos",
                                          index,
                                          "productoNombre",
                                          `companiaId = ${0} and isInactivo = 0 and isServicio = 0`,
                                          "nombre ASC"
                                        )
                                      }
                                    >
                                      <Search />
                                      {registro.referencia}
                                    </Button>
                                  </Grid>
                                ) : (
                                  registro.referencia
                                )}
                              </TableCell>

                              <TableCell className={"tablasDetallesInput"}>
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <Button
                                      fullWidth
                                      id={`botonDetalleProductos-${index}`}
                                      onClick={() =>
                                        onBuscar(
                                          "InventarioProductos",
                                          index,
                                          "productoNombre",
                                          `companiaId = ${0} and isInactivo = 0 and isServicio = 0`,
                                          "nombre ASC"
                                        )
                                      }
                                    >
                                      <Search />
                                      {registro.descripcion}
                                    </Button>
                                  </Grid>
                                ) : (
                                  registro.descripcion
                                )}
                              </TableCell>
                              <TableCell
                                className={"tablasDetallesInput"}
                                align="right"
                              >
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <TextField
                                      required={
                                        registro.cantidad ? false : true
                                      }
                                      fullWidth
                                      id={`cantidad-${index}`}
                                      name="cantidad"
                                      placeholder="0.00"
                                      InputLabelProps={{ shrink: true }}
                                      variant="outlined"
                                      margin="normal"
                                      onChange={(event) =>
                                        onInputChange(index, event.target)
                                      }
                                      value={registro.cantidad ?? ""}
                                      type="number"
                                    />
                                  </Grid>
                                ) : (
                                  FormatearNumero.format(registro.cantidad)
                                )}
                              </TableCell>
                            </TableRow>
                          )
                      )}
                    </TableBody>
                  )}
                </Table>
              </Grid>
              <Grid item xs={12}>
                {modificandoAgregandoDocumento && (
                  <Button
                    fullWidth
                    id="botonMasProductos"
                    onClick={async () => {
                      if (documento.idDepartLabo) {
                        onAgregar();
                        onBuscar(
                          "Productos",
                          documento.productos.length,
                          "productoNombre",
                          `where companiaId = ${0} and isInactivo = 0 and isServicio = 1 and DEPARTLABOID = ${
                            documento.idDepartLabo
                          }`,
                          "nombre ASC"
                        );
                      } else {
                        AlertMessage("warning", "Debe elegir un departamento");
                        onBuscar("Departamentos", null, "Departamentos", null);
                      }
                    }}
                  >
                    <AddCircle />
                    Agregar Linea
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

EditorProductosAnalisis.propTypes = {
  companiaId: PropTypes.number.isRequired,
  documento: PropTypes.object.isRequired,
  setDocumento: PropTypes.func.isRequired,
  modificandoAgregandoDocumento: PropTypes.bool.isRequired,
  setDocumentoModificado: PropTypes.func.isRequired,
};

export function EditorProductosInformes({
  documento,
  setDocumento,
  modificandoAgregandoDocumento,
  setDocumentoModificado,
  onEstadoChange,
}) {
  const [confirmarAccionEliminar, setConfirmarAccionEliminar] = useState(null);
  const [busquedaData, setBusquedaData] = useState(null);

  const onAgregar = () => {
    let nuevoEstado = JSON.parse(JSON.stringify(documento));
    if (typeof nuevoEstado.productos === "undefined")
      nuevoEstado.productos = [];
    nuevoEstado.productos.push({ eliminar: false });
    setDocumento(nuevoEstado);
    setDocumentoModificado(true);
  };

  const onBuscar = (collection, index, propiedad, where, order) =>
    setBusquedaData({ collection, index, propiedad, where, order });
  const onBuscarCerrar = (registro, nuevoRegistro, indice) => {
    const nuevoEstado = JSON.parse(JSON.stringify(documento));
    if (busquedaData) {
      if (!indice) indice = busquedaData.index;
    }

    if (
      registro &&
      busquedaData.collection === "Departamentos" &&
      busquedaData.propiedad === "Departamentos"
    ) {
      nuevoEstado.idDepartLabo = registro.id;
      nuevoEstado.departamento = registro.descripcion;
    } else nuevoEstado.productos.splice(indice, 1);

    setDocumento(nuevoEstado);

    setBusquedaData(null);
  };

  const onEliminarConfirmar = (indice) => setConfirmarAccionEliminar(indice);
  const onEliminar = () => {
    let nuevoEstado = JSON.parse(JSON.stringify(documento));
    nuevoEstado.productos[confirmarAccionEliminar].eliminar = true;
    setDocumento(nuevoEstado);
    setConfirmarAccionEliminar(null);
    setDocumentoModificado(true);
  };
  const onEliminarCancelar = () => setConfirmarAccionEliminar(null);

  const onInputChange = (indice, { name, value }) => {
    let nuevoEstado = JSON.parse(JSON.stringify(documento));
    nuevoEstado.productos[indice][name] = value;
    setDocumento(nuevoEstado);
    setDocumentoModificado(true);
  };

  return (
    <>
      <Dialog
        open={confirmarAccionEliminar !== null ? true : false}
        titulo="¡Advertencia!"
        estiloTitulo="Warning"
        mensaje={`¿Seguro desea eliminar el registro "Fila ${
          confirmarAccionEliminar !== null ? confirmarAccionEliminar + 1 : ""
        }"?`}
        textoBtn1="Continuar y Eliminar Registro"
        textoBtn2="Cancelar"
        accionDialogBtn1={onEliminar}
        accionDialogBtn2={onEliminarCancelar}
      />

      {busquedaData && (
        <Busqueda
          funcionCerrar={onBuscarCerrar}
          collection={busquedaData.collection}
          where={busquedaData.where}
          order={busquedaData.order}
        />
      )}

      <Grid item xs={12}>
        <Card className="card" id="cardDetalleProductos">
          <CardHeader
            className="cardRoot cardTitle"
            title="Productos Asignados"
          />

          <CardContent className="cardContentDetalle">
            <Grid container spacing={1}>
              <Grid item xs={12} className="tablasDetalles">
                <Table size="small">
                  <TableHead className="tablasDetallesheader">
                    <TableRow>
                      {modificandoAgregandoDocumento && (
                        <TableCell className="tablasDetallesTitulo">
                          Acciones
                        </TableCell>
                      )}
                      <TableCell className="tablasDetallesTitulo">
                        Descripcion
                      </TableCell>
                      <TableCell className="tablasDetallesTitulo">
                        Esta inactivo
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {documento.productos && (
                    <TableBody>
                      {documento.productos.map(
                        (registro, index) =>
                          !registro.eliminar && (
                            <TableRow key={index}>
                              {modificandoAgregandoDocumento ? (
                                <TableCell>
                                  <IconButton
                                    onClick={() => onEliminarConfirmar(index)}
                                  >
                                    <DeleteForever />
                                  </IconButton>
                                </TableCell>
                              ) : null}

                              <TableCell className={"tablasDetallesInput"}>
                                {modificandoAgregandoDocumento ? (
                                  <Grid item xs={12}>
                                    <TextField
                                      required={
                                        registro.descripcion ? false : true
                                      }
                                      fullWidth
                                      id={`descipcion-${index}`}
                                      name="descripcion"
                                      placeholder=""
                                      InputLabelProps={{ shrink: true }}
                                      variant="outlined"
                                      margin="normal"
                                      onChange={(event) =>
                                        onInputChange(index, event.target)
                                      }
                                      value={registro.descripcion ?? ""}
                                      type="string"
                                    />
                                  </Grid>
                                ) : (
                                  registro.descripcion
                                )}
                              </TableCell>
                              <TableCell className={"tablasDetallesInput"}>
                                {modificandoAgregandoDocumento ? (
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={registro.isInactivo ?? false}
                                        name="isInactivoP"
                                        color="primary"
                                        onChange={() =>
                                          onEstadoChange({
                                            event: {
                                              target: {
                                                name: "productos.isInactivo",
                                                checked: registro.isInactivo
                                                  ? false
                                                  : true,
                                                indice: index,
                                              },
                                            },
                                          })
                                        }
                                      />
                                    }
                                    label="Esta Inactivo"
                                    labelPlacement="end"
                                  />
                                ) : (
                                  <div>
                                    <div>
                                      <strong>Esta Inactivo</strong>
                                    </div>
                                    <div>
                                      {registro.isInactivo ? "SI" : "NO"}
                                    </div>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          )
                      )}
                    </TableBody>
                  )}
                </Table>
              </Grid>
              <Grid item xs={12}>
                {modificandoAgregandoDocumento && (
                  <Button
                    fullWidth
                    id="botonMasProductos"
                    onClick={async () => {
                      if (documento.idDepartLabo) {
                        onAgregar();
                      } else {
                        AlertMessage("warning", "Debe elegir un departamento");
                        onBuscar("Departamentos", null, "Departamentos", null);
                      }
                    }}
                  >
                    <AddCircle />
                    Agregar Linea
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

EditorProductosInformes.propTypes = {
  companiaId: PropTypes.number.isRequired,
  documento: PropTypes.object.isRequired,
  setDocumento: PropTypes.func.isRequired,
  modificandoAgregandoDocumento: PropTypes.bool.isRequired,
  setDocumentoModificado: PropTypes.func.isRequired,
};
