import React, { useState } from "react";
import {
  CardContent,
  Grid,
  Card,
  CardHeader,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Search, Close } from "@material-ui/icons";
import {
  FormatearFecha,
  convertirTextoAFecha,
} from "../../../../common/funciones/funciones";
import Busqueda from "../../../../common/busqueda/busqueda";
import Cliente from "./Cliente";
import { GrabarCustom } from "../../../../common/functionServer/FunctionServer";

export default function EditorDocumento({
  companiaId,
  documento,
  setDocumento,
  modificandoAgregandoDocumento,
  setDocumentoModificado,
  errores,
}) {
  const [busquedaData, setBusquedaData] = useState(null);
  const [crearCliente, setCrearCliente] = useState(false);

  const onBuscar = (collection, propiedad, where, order, listadoManual) =>
    setBusquedaData({ collection, propiedad, where, order, listadoManual });
  const onBuscarCerrar = (registro, permitirNuevoRegistro) => {
    if (permitirNuevoRegistro) {
      setCrearCliente(true);
    }

    if (
      registro &&
      busquedaData.collection === "Clients" &&
      busquedaData.propiedad === "Clients"
    ) {
      setDocumento({
        ...documento,
        ID_CLIENTE: registro.ID,
        CLIENTE: registro.NOMBRE,
        DIRECCION: registro.DIRECCION,
      });
    } else if (
      registro &&
      busquedaData.collection === "Sellers" &&
      busquedaData.propiedad === "Sellers"
    ) {
      setDocumento({
        ...documento,
        ID_VENDEDOR: registro.ID,
        VENDEDOR: registro.NOMBRE,
      });
    }
    setBusquedaData(null);
  };

  const cliente = async (condicion) => {
    if (condicion) {
      const nuevoEstado = documento;

      nuevoEstado.DESTINATARIO = documento.CLIENTE;

      const idCliente = await GrabarCustom(
        `api/CxCClientes/crearModificar`,
        nuevoEstado
      );

      if (idCliente.length) {
        setDocumento({
          ...nuevoEstado,
          ID_CLIENTE: idCliente[0].ID_CLIENTE,
          NOAVANCE: 0,
        });
      }
    } else {
      onLimpiar("Clients");
    }

    setCrearCliente(false);
  };

  const onInputChange = ({ name, type, value, checked }) => {
    value = type === "checkbox" ? checked : value;

    if (name === "DIRECCION" && value.length > 250) return;
    if (name === "NOTA" && value.length > 250) return;

    setDocumento({ ...documento, [name]: value });

    setDocumentoModificado(true);
  };

  const onLimpiar = (propiedad) => {
    if (propiedad === "Clients") {
      setDocumento({
        ...documento,
        ID_CLIENTE: 0,
        CLIENTE: "",
        DIRECCION: "",
      });
    } else if (propiedad === "Sellers") {
      setDocumento({
        ...documento,
        ID_VENDEDOR: 0,
        VENDEDOR: "",
      });
    }

    setDocumentoModificado(true);
  };

  return (
    <>
      {busquedaData && (
        <Busqueda
          funcionCerrar={onBuscarCerrar}
          collection={busquedaData.collection}
          where={busquedaData.where}
          order={busquedaData.order}
          listadoManual={busquedaData.listadoManual}
          permitirNuevoRegistro={true}
        />
      )}

      {crearCliente && (
        <Cliente
          documento={documento}
          crearCliente={cliente}
          onInputChange={onInputChange}
        />
      )}

      {modificandoAgregandoDocumento && (
        <Grid item xs={12}>
          <Card className="card">
            <CardHeader
              className="cardRoot cardTitle"
              title="Edición de Factura"
            />

            <CardContent>
              <Grid container spacing={1}>
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      fullWidth
                      disabled={documento.ID ? true : false}
                      id="CODIGO"
                      name="CODIGO"
                      label="No. Factura"
                      placeholder=""
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      margin="normal"
                      error={errores.CODIGO ? true : false}
                      helperText={errores.CODIGO}
                      onChange={(e) => onInputChange(e.target)}
                      value={documento.CODIGO ?? ""}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={false}
                      label="Fecha"
                      placeholder=""
                      name="FECHA"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      margin="normal"
                      error={errores.FECHA ? true : false}
                      helperText={errores.FECHA}
                      onChange={(e) => onInputChange(e.target)}
                      value={
                        FormatearFecha(
                          convertirTextoAFecha(documento.FECHA),
                          "YYYY-MM-DD"
                        ) ?? ""
                      }
                      type="date"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      disabled
                      fullWidth
                      id="CLIENTE"
                      name="CLIENTE"
                      label="Cliente"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      margin="normal"
                      error={errores.CLIENTE ? true : false}
                      helperText={errores.CLIENTE}
                      value={documento.CLIENTE ?? ""}
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                documento.CLIENTE
                                  ? onLimpiar("Clients")
                                  : onBuscar(
                                      "Clients",
                                      "Clients",
                                      ``,
                                      "nombre ASC"
                                    )
                              }
                            >
                              {documento.CLIENTE ? <Close /> : <Search />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      disabled
                      fullWidth
                      id="DIRECCION"
                      name="DIRECCION"
                      label="Dirección"
                      placeholder=""
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      margin="normal"
                      error={errores.DIRECCION ? true : false}
                      helperText={errores.DIRECCION}
                      onChange={(e) => onInputChange(e.target)}
                      value={documento.DIRECCION ?? ""}
                      type="text"
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      disabled
                      fullWidth
                      id="VENDEDOR"
                      name="VENDEDOR"
                      label="Vendedor"
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      margin="normal"
                      error={errores.VENDEDOR ? true : false}
                      helperText={errores.VENDEDOR}
                      value={documento.VENDEDOR ?? ""}
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                documento.VENDEDOR
                                  ? onLimpiar("Sellers")
                                  : onBuscar(
                                      "Sellers",
                                      "Sellers",
                                      ``,
                                      "nombre ASC"
                                    )
                              }
                            >
                              {documento.VENDEDOR ? <Close /> : <Search />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="NOTA"
                      name="NOTA"
                      label="Observación"
                      placeholder=""
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      margin="normal"
                      error={errores.NOTA ? true : false}
                      helperText={errores.NOTA}
                      onChange={(e) => onInputChange(e.target)}
                      value={documento.NOTA ?? ""}
                      multiline
                      rows={4}
                      type="text"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
}
