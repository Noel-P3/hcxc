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

export default function EditorDocumento({
  documento,
  setDocumento,
  modificandoAgregandoDocumento,
  errores,
  onInputChange,
  onEstadoChange,
  setDocumentoModificado,
}) {
  const [busquedaData, setBusquedaData] = useState(null);

  const onBuscar = (collection, propiedad, where, order, listadoManual) =>
    setBusquedaData({ collection, propiedad, where, order, listadoManual });

  const onBuscarCerrar = (registro) => {
    if (registro && busquedaData.propiedad === "Groups") {
      setDocumento({
        ...documento,
        ID_GRUPO: registro.ID,
        GRUPO: registro.NOMBRE,
      });
    } else if (registro && busquedaData.propiedad === "Almacens") {
      setDocumento({
        ...documento,
        ID_ALMACEN: registro.ID,
        ALMACEN: registro.NOMBRE,
      });
    }

    setBusquedaData(null);
  };

  const onLimpiar = (propiedad) => {
    if (propiedad === "GRUPO") {
      setDocumento({ ...documento, ID_GRUPO: null, GRUPO: null });
    } else if (propiedad === "ALMACEN") {
      setDocumento({ ...documento, ID_ALMACEN: null, ALMACEN: null });
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
        />
      )}
      <Grid item xs={12}>
        <Card className="card">
          <CardHeader
            className="cardRoot cardTitle"
            title={
              modificandoAgregandoDocumento
                ? "Edición de Producto"
                : "Visualizando Producto"
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
                    error={errores.NOMBRE ? true : false}
                    helperText={errores.NOMBRE}
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
              <Grid item xs={12} sm={6} id="REFERENCIA">
                {modificandoAgregandoDocumento ? (
                  <TextField
                    fullWidth
                    name="REFERENCIA"
                    label="Referencia"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    error={errores.REFERENCIA ? true : false}
                    helperText={errores.REFERENCIA}
                    onChange={onInputChange}
                    value={documento.REFERENCIA ?? ""}
                  />
                ) : (
                  <div>
                    <div>
                      <strong>Referencia</strong>
                    </div>
                    <div>{documento.REFERENCIA}</div>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6} id="PRECIO">
                {modificandoAgregandoDocumento ? (
                  <TextField
                    fullWidth
                    name="PRECIO"
                    label="Precio"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    error={errores.PRECIO ? true : false}
                    helperText={errores.PRECIO}
                    onChange={onInputChange}
                    value={documento.PRECIO ?? ""}
                    type="number"
                  />
                ) : (
                  <div>
                    <div>
                      <strong>Precio</strong>
                    </div>
                    <div>{documento.PRECIO}</div>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6} id="GRUPO">
                {modificandoAgregandoDocumento ? (
                  <TextField
                    disabled
                    fullWidth
                    name="GRUPO"
                    label="Grupo de producto"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    error={errores.GRUPO ? true : false}
                    helperText={errores.GRUPO}
                    value={documento.GRUPO ?? ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {documento.GRUPO ? (
                            <IconButton onClick={() => onLimpiar("GRUPO")}>
                              <Close />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() =>
                                onBuscar(
                                  "ProductGroups",
                                  "Groups",
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
                      <strong>Grupo de producto</strong>
                    </div>
                    <div>{documento.GRUPO}</div>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6} id="COSTO">
                {modificandoAgregandoDocumento ? (
                  <TextField
                    fullWidth
                    name="COSTO"
                    label="Costo"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    error={errores.COSTO ? true : false}
                    helperText={errores.COSTO}
                    onChange={onInputChange}
                    value={documento.COSTO ?? ""}
                    type="number"
                  />
                ) : (
                  <div>
                    <div>
                      <strong>Costo</strong>
                    </div>
                    <div>{documento.COSTO}</div>
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
    </>
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
