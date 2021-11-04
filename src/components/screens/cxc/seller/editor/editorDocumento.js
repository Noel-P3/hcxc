import React from 'react';
import {
    CardContent, Grid, Card, CardHeader, TextField, FormControlLabel, Switch 
} from "@material-ui/core";
import PropTypes from 'prop-types';

export default function EditorDocumento({
    documento, modificandoAgregandoDocumento, errores, onInputChange, onEstadoChange
}) {
    return (
        <Grid item xs={12}>
            <Card className='card'>
                <CardHeader className='cardRoot cardTitle' title={modificandoAgregandoDocumento ? 'Edición de Cliente' : 'Visualizando Cliente'} />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} id="NOMBRE">
                            {modificandoAgregandoDocumento ?
                                <TextField
                                    fullWidth name="NOMBRE"
                                    label="Nombre" placeholder=""
                                    InputLabelProps={{ shrink: true }} variant="outlined"
                                    margin="normal"
                                    error={errores.contacto ? true : false}
                                    helperText={errores.contacto}
                                    onChange={onInputChange}
                                    value={documento.NOMBRE ?? ''}
                                />
                                : <div><div><strong>Nombre</strong></div><div>{documento.NOMBRE}</div></div>}
                        </Grid>
                        <Grid item xs={12} sm={6} id="DIRECCION">
                            {modificandoAgregandoDocumento ?
                                <TextField
                                    fullWidth name="DIRECCION"
                                    label="Dirección" placeholder=""
                                    InputLabelProps={{ shrink: true }} variant="outlined"
                                    margin="normal"
                                    error={errores.contacto ? true : false}
                                    helperText={errores.contacto}
                                    onChange={onInputChange}
                                    value={documento.DIRECCION ?? ''}
                                />
                                : <div><div><strong>Dirección</strong></div><div>{documento.DIRECCION}</div></div>}
                        </Grid>
                        <Grid item xs={12} sm={6} id="TELEFONO">
                            {modificandoAgregandoDocumento ?
                                <TextField
                                    fullWidth name="TELEFONO"
                                    label="Teléfono"
                                    InputLabelProps={{ shrink: true }} variant="outlined"
                                    margin="normal"
                                    error={errores.TELEFONO ? true : false}
                                    helperText={errores.TELEFONO}
                                    onChange={onInputChange}
                                    value={documento.TELEFONO ?? ''}
                                />
                                : <div><div><strong>Teléfono</strong></div><div>{documento.TELEFONO}</div></div>}
                        </Grid>
                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs={12} id="ESTADO">
                                {modificandoAgregandoDocumento ?
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={documento.ESTADO ?? false}
                                                name="ESTADO" color="primary"
                                                onChange={() => onEstadoChange({event: {target: {name: 'ESTADO', checked: documento.ESTADO ? false : true}}})}
                                            />
                                        }
                                        label="Esta Inactivo" labelPlacement="end"
                                    />
                                    : <div><div><strong>Esta Inactivo</strong></div><div>{documento.ESTADO ? 'SI' : 'NO'}</div></div>}
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
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
    roleNombre: PropTypes.string
}