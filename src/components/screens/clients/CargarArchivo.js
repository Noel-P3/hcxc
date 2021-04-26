import React, { useState } from 'react';
import { CardContent, Grid, Card, CardHeader, TextField } from "@material-ui/core";
import PropTypes from 'prop-types';
import CSVReader from "react-csv-reader";
import { GrabarVariosDocumentosNuevos } from "../../../common/server/funcionesServidor";

export default function CargarArchivo({data, companiaId, collection, funcionActualizar}) {
    const [errores, setErrores] = useState(null);

    const onLoadFile = async dataLeida => {
        let errores = '';

        let nombresRepetidos = dataLeida.map(e => dataLeida.filter(v => v.nombre+'' === e.nombre+'').length > 1?e.nombre:null)
        .filter(e => e !== null);

        if (nombresRepetidos.length) {            
            errores = errores + `* Existen nombres repetidos en el mismo archivo. Por favor revisar cuentas: ${JSON.stringify(...nombresRepetidos)}.`;
        }

        let rncRepetidos = dataLeida.map(e => dataLeida.filter(v => v.rnc_cedula+'' === e.rnc_cedula+'').length > 1?e.rnc_cedula:null)
        .filter(e => e !== null);

        if (rncRepetidos.length) {            
            errores = errores + `* Existen RNC / Cédula repetidos en el mismo archivo. Por favor revisar cuentas: ${JSON.stringify(...rncRepetidos)}.`;
        }        

        setErrores(errores);

        let cuentasNuevas = dataLeida.filter(registro => !data.some(e => e.rncCedula+'' === registro.rnc_cedula+''))
        .filter(registro => !data.some(e => e.nombre+'' === registro.nombre+''))
        .map(e => ({
            ...e, 
            companiaId, 
            isInactivo: 0, 
            condicionPago: e.condicion_pago, 
            limiteCredito: e.limite_credito
        }));

        //Buscar grupos en un bucle for await

        if (!errores){
            await GrabarVariosDocumentosNuevos(`api/${collection}`, cuentasNuevas);
            funcionActualizar();
        }
    }

    return (
        <Grid item xs={12}>
            <Card className='card' id='cardCarga'>
                <CardHeader className='cardRoot cardTitle' title='Cargar Archivo de Clientes' />

                <CardContent>   
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <CSVReader
                                onFileLoaded={onLoadFile}
                                parserOptions={{
                                    header: true,
                                    dynamicTyping: true,
                                    skipEmptyLines: true,
                                    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
                                }}
                            />
                        </Grid>

                        {errores&&
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth name="errores"
                                label="Errores" placeholder=""
                                InputLabelProps={{ shrink: true }} variant="outlined"
                                margin="normal"
                                value={errores}
                                multiline rows={4}
                            /> 
                        </Grid>}
                    </Grid>                             
                </CardContent>
            </Card>
        </Grid>
    )
}

CargarArchivo.propTypes = {
    data: PropTypes.array.isRequired,
    companiaId: PropTypes.number.isRequired,
    collection: PropTypes.string.isRequired,
    funcionActualizar: PropTypes.func.isRequired
}