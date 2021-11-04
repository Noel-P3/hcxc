import React from 'react';
import { CardContent, Grid, Card, CardHeader, TextField } from "@material-ui/core";

export default function FiltrosFecha(
    { filtros, setFiltros, soloFechaHasta = false, children } :
    { filtros: { fechaDesde?: string, fechaHasta: string }, setFiltros: (...args: any) => void, soloFechaHasta?: boolean, children?: React.ReactNode }
): JSX.Element {
    return (
        <Grid item xs={12}>
            <Card className='card' id='cardFiltros'>
                <CardHeader className='cardRoot cardTitle' title='Filtros' />

                <CardContent>
                    <Grid container item xs={12} spacing={1}>
                        {!soloFechaHasta &&
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth id="fechaDesde" name="fechaDesde"
                                    label="Fecha Desde"
                                    InputLabelProps={{ shrink: true }} variant="outlined"
                                    margin="normal"
                                    value={filtros.fechaDesde ?? ''}
                                    type="date"
                                    onChange={(e) => setFiltros({ ...filtros, fechaDesde: e.target.value })}
                                />
                            </Grid>
                        }

                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth id="fechaHasta" name="fechaHasta"
                                label="Fecha Hasta"
                                InputLabelProps={{ shrink: true }} variant="outlined"
                                margin="normal"
                                value={filtros.fechaHasta ?? ''}
                                type="date"
                                onChange={(e) => setFiltros({ ...filtros, fechaHasta: e.target.value })}
                            />
                        </Grid>
                    </Grid>

                    {children}
                </CardContent>
            </Card>
        </Grid>
    )
}