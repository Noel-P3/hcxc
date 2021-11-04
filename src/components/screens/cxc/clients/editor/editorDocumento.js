import React, { useState } from "react";
import {
  CardContent,
  Grid,
  Card,
  CardHeader,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { Search, Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import Busqueda from "../../../../common/busqueda/busqueda";
import Vendedor from "./vendedor";
import { GrabarCustom } from "../../../../common/functionServer/FunctionServer";

export default function EditorDocumento({
  documento,
  modificandoAgregandoDocumento,
  errores,
  onInputChange,
  companiaId,
  accionLimpiar,
  onEstadoChange,
  setDocumento,
}) {
  const [busquedaData, setBusquedaData] = useState(null);
  const [nuevoRegistro, SetNuevoRegistro] = useState(null);
  const onBuscar = (collection, propiedad, where, order, listadoManual) =>
    setBusquedaData({ collection, propiedad, where, order, listadoManual });
  const onBuscarCerrar = (registro, permitirNuevoRegistro) => {
    if (registro) {
      setDocumento({
        ...documento,
        VENDEDOR: registro.NOMBRE,
        ID_VENDEDOR: registro.ID,
      });
      setBusquedaData(null);
    } else {
      setBusquedaData(null);
    }

    if (permitirNuevoRegistro) {
      setBusquedaData(null);
      SetNuevoRegistro(true);
    }
  };

  const crearVendedor = async (object) => {
    if (object) {
      let vendedor = {
        ID: null,
        NOMBRE: documento.VENDEDOR,
        DIRECCION: object.DIRECCION,
        TELEFONO: object.TELEFONO,
        ID_USUARIO: documento.ID_USUARIO,
        ESTADO: false,
        ELIMINAR: false,
      };

      let nuevoVendedor = await GrabarCustom(
        `api/Sellers/modifySeller`,
        vendedor,
        false
      );

      if (nuevoVendedor) {
        setDocumento({ ...documento, ID_VENDEDOR: nuevoVendedor[0].ID });
        SetNuevoRegistro(false);
      } else SetNuevoRegistro(false);
    } else SetNuevoRegistro(false);
  };

  return (
    <Grid item xs={12}>
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

      {nuevoRegistro && (
        <Vendedor
          documento={documento}
          crear={crearVendedor}
          onInputChange={onInputChange}
        />
      )}

      <Card className="card">
        <CardHeader
          className="cardRoot cardTitle"
          title={
            modificandoAgregandoDocumento
              ? "Edición de Cliente"
              : "Visualizando Cliente"
          }
        />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} id="NOMBRE">
              {modificandoAgregandoDocumento ? (
                <TextField
                  fullWidth
                  name="NOMBRE"
                  label="Nombre"
                  placeholder=""
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  error={errores.contacto ? true : false}
                  helperText={errores.contacto}
                  onChange={onInputChange}
                  value={documento.NOMBRE ?? ""}
                />
              ) : (
                <div>
                  <div>
                    <strong>Nombre</strong>
                  </div>
                  <div>{documento.NOMBRE}</div>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6} id="VENDEDOR">
              {modificandoAgregandoDocumento ? (
                <TextField
                  disabled
                  fullWidth
                  name="VENDEDOR"
                  label="Vendedor Asignado"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  error={errores.VENDEDOR ? true : false}
                  helperText={errores.VENDEDOR}
                  value={documento.VENDEDOR ?? ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {documento.VENDEDOR ? (
                          <IconButton
                            onClick={() =>
                              accionLimpiar(null, null, "VENDEDOR")
                            }
                          >
                            <Close />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() =>
                              onBuscar(
                                "Sellers",
                                "VENDEDOR",
                                `WHERE ESTADO = FALSE`,
                                "nombre ASC",
                                null
                              )
                            }
                          >
                            <Search />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <div>
                  <div>
                    <strong>Vendedor</strong>
                  </div>
                  <div>{documento.VENDEDOR}</div>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6} id="DIRECCION">
              {modificandoAgregandoDocumento ? (
                <TextField
                  fullWidth
                  name="DIRECCION"
                  label="Dirección"
                  placeholder=""
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  error={errores.contacto ? true : false}
                  helperText={errores.contacto}
                  onChange={onInputChange}
                  value={documento.DIRECCION ?? ""}
                />
              ) : (
                <div>
                  <div>
                    <strong>Dirección</strong>
                  </div>
                  <div>{documento.DIRECCION}</div>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6} id="TELEFONO">
              {modificandoAgregandoDocumento ? (
                <TextField
                  fullWidth
                  name="TELEFONO"
                  label="Teléfono"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  error={errores.TELEFONO ? true : false}
                  helperText={errores.TELEFONO}
                  onChange={onInputChange}
                  value={documento.TELEFONO ?? ""}
                />
              ) : (
                <div>
                  <div>
                    <strong>Teléfono</strong>
                  </div>
                  <div>{documento.TELEFONO}</div>
                </div>
              )}
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={12} id="ESTADO">
                {modificandoAgregandoDocumento ? (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={documento.ESTADO ?? false}
                        name="ESTADO"
                        color="primary"
                        onChange={() =>
                          onEstadoChange({
                            event: {
                              target: {
                                name: "ESTADO",
                                checked: documento.ESTADO ? false : true,
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
                    <div>{documento.ESTADO ? "SI" : "NO"}</div>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

EditorDocumento.propTypes = {
  documento: PropTypes.object.isRequired,
  modificandoAgregandoDocumento: PropTypes.bool.isRequired,
  errores: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  accionBuscar: PropTypes.func.isRequired,
  companiaId: PropTypes.number.isRequired,
  accionLimpiar: PropTypes.func.isRequired,
  tipoComprobante: PropTypes.array.isRequired,
  roleNombre: PropTypes.string,
};
