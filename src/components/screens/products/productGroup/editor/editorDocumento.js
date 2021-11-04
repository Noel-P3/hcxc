import React from "react";
import {
  CardContent,
  Grid,
  Card,
  CardHeader,
  TextField,
} from "@material-ui/core";
import PropTypes from "prop-types";

export default function EditorDocumento({
  documento,
  modificandoAgregandoDocumento,
  errores,
  onInputChange,
}) {
  return (
    <Grid item xs={12}>
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
            <Grid item xs={12} sm={12} id="NOMBRE">
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
