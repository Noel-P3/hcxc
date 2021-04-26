import React from 'react';
import {
    CardContent, Grid, Card, CardHeader, TextField, InputAdornment,
    IconButton
} from "@material-ui/core";
import { Search, Close } from '@material-ui/icons';
import PropTypes from 'prop-types';

export default function EditorDocumento({
    documento, modificandoAgregandoDocumento, errores, onInputChange, accionBuscar, companiaId, accionLimpiar, tipoComprobante, roleNombre
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
                        <Grid item xs={12} sm={6} id="vendedorNombre">
                            {modificandoAgregandoDocumento ?
                                <TextField
                                    disabled fullWidth name="vendedorNombre"
                                    label="Vendedor Asignado"
                                    InputLabelProps={{ shrink: true }} variant="outlined"
                                    margin="normal"
                                    error={errores.vendedorNombre ? true : false}
                                    helperText={errores.vendedorNombre}
                                    value={documento.vendedorNombre ?? ''}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                {documento.vendedorNombre ?
                                                    <IconButton onClick={() => accionLimpiar(null, null, 'vendedorNombre')}>
                                                        <Close />
                                                    </IconButton>
                                                    :
                                                    <IconButton onClick={() => accionBuscar(
                                                        'CxCVendedors', null, null, 'vendedorNombre',
                                                        `companiaId = ${companiaId} and isInactivo = 0`, 'nombre ASC'
                                                    )}>
                                                        <Search />
                                                    </IconButton>}
                                            </InputAdornment>
                                    }}
                                />
                                : <div><div><strong>vendedorNombre</strong></div><div>{documento.vendedorNombre}</div></div>}
                        </Grid>
                        <Grid item xs={12} sm={6} id="DIRECCION">
                            {modificandoAgregandoDocumento ?
                                <TextField
                                    fullWidth name="DIRECCION"
                                    label="Dirección"
                                    InputLabelProps={{ shrink: true }} variant="outlined"
                                    margin="normal"
                                    error={errores.DIRECCION ? true : false}
                                    helperText={errores.DIRECCION}
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
                                    value={documento.TELEFONO ?? ''}
                                />
                                : <div><div><strong>Teléfono</strong></div><div>{documento.TELEFONO}</div></div>}
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