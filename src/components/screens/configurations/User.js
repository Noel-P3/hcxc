import React, { useState, useEffect, useContext, useCallback } from "react";
import { authContext } from '../../MainComponent';
import {
    CardContent, Grid, Card, CardHeader, TextField
} from "@material-ui/core";
import { GrabarCustom } from '../../common/functionServer/FunctionServer';
import BarraHerramienta from "../../common/barraHerramienta/barraHerramienta";
import AlertMessage from "../../common/messageAlert/MessageAlert";

function User({ onLogOut }) {
    const { ID, USER, NAME, LASTNAME, EMAIL, PASSWORD } = useContext(authContext);
    const [modificandoAgregandoDocumento, setModificandoAgregandoDocumento] = useState(false);
    const [isGrabando, setIsGrabando] = useState(false);
    const [documento, setDocumento] = useState(
        {
            ID: null,
            USER: null,
            NAME: null,
            LASTNAME: null,
            EMAIL: null,
            PASSWORD: null,
        }
    );
    useEffect(() => {
        setDocumento({
            ID: ID,
            USER: USER,
            NAME: NAME,
            LASTNAME: LASTNAME,
            EMAIL: EMAIL,
            PASSWORD: PASSWORD,
        });
    }, [ID, USER, NAME, LASTNAME, EMAIL, PASSWORD]);

    const accionModificar = () => setModificandoAgregandoDocumento(true);

    const accionGrabar = useCallback(async () => {
        let user = await GrabarCustom('api/Users/modifyUser', documento, true);

        setIsGrabando(false);

        if (user.length) {
            AlertMessage('success', 'Cambios realizados correctamente, vuelva a iniciar sesión');
            onLogOut();
        }
    },[onLogOut,documento])

    useEffect(() => { 
        if (isGrabando) {
            accionGrabar(); 
        }        
    }, [isGrabando,accionGrabar]);

    const onInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setDocumento({ ...documento, [event.target.name]: value });
    }



    return (
        <div className='simplepage'>
            <BarraHerramienta
                accionGrabar={() => setIsGrabando(true)}
                // accionCancelar={accionCancelarConfirmar}
                accionModificar={accionModificar}

                botonModificarDesHabilitar={modificandoAgregandoDocumento}
                botonGrabarDesHabilitar={!modificandoAgregandoDocumento}
                isGrabando={isGrabando}
            />

            <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
                    <Card className='card'>
                        <CardHeader className='cardRoot cardTitle' title='Perfil del usuario' />

                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                    {modificandoAgregandoDocumento ?
                                        <TextField
                                            required={documento.USER ? false : true} autoFocus fullWidth id="USER" name="USER"
                                            label="Nombre usuario corto para loguear" placeholder=""
                                            InputLabelProps={{ shrink: true }} variant="outlined"
                                            margin="normal"
                                            error={documento.errorNombre ? true : false}
                                            helperText={documento.errorNombre}
                                            onChange={onInputChange}
                                            value={documento.USER ? documento.USER : ''}
                                        />
                                        : <div><div><strong>Nombre usuario corto para loguear</strong></div><div>{documento.USER}</div></div>}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {modificandoAgregandoDocumento ?
                                        <TextField
                                            required={documento.NAME ? false : true} autoFocus fullWidth id="nombre" name="NAME"
                                            label="Nombre del usuario" placeholder=""
                                            InputLabelProps={{ shrink: true }} variant="outlined"
                                            margin="normal"
                                            error={documento.errorNombre ? true : false}
                                            helperText={documento.errorNombre}
                                            onChange={onInputChange}
                                            value={documento.NAME ? documento.NAME : ''}
                                        />
                                        : <div><div><strong>Nombre del usuario</strong></div><div>{documento.NAME}</div></div>}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {modificandoAgregandoDocumento ?
                                        <TextField
                                            required={documento.EMAIL ? false : true} autoFocus fullWidth id="EMAIL" name="EMAIL"
                                            label="Correo electronico" placeholder=""
                                            InputLabelProps={{ shrink: true }} variant="outlined"
                                            margin="normal"
                                            error={documento.errorNombre ? true : false}
                                            helperText={documento.errorNombre}
                                            onChange={onInputChange}
                                            value={documento.EMAIL ? documento.EMAIL : ''}
                                        />
                                        : <div><div><strong>Correo electronico</strong></div><div>{documento.EMAIL}</div></div>}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {modificandoAgregandoDocumento ?
                                        <TextField
                                            required={documento.LASTNAME ? false : true} autoFocus fullWidth id="LASTNAME" name="LASTNAME"
                                            label="Apellidos del usuario" placeholder=""
                                            InputLabelProps={{ shrink: true }} variant="outlined"
                                            margin="normal"
                                            error={documento.errorNombre ? true : false}
                                            helperText={documento.errorNombre}
                                            onChange={onInputChange}
                                            value={documento.LASTNAME ? documento.LASTNAME : ''}
                                        />
                                        : <div><div><strong>Apellidos del usuario</strong></div><div>{documento.LASTNAME}</div></div>}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {modificandoAgregandoDocumento ?
                                        <TextField
                                            required={documento.PASSWORD ? false : true} autoFocus fullWidth id="PASSWORD" name="PASSWORD"
                                            label="Contraseña" placeholder=""
                                            InputLabelProps={{ shrink: true }} variant="outlined"
                                            margin="normal"
                                            error={documento.errorNombre ? true : false}
                                            helperText={documento.errorNombre}
                                            onChange={onInputChange}
                                            type='password'
                                            value={documento.PASSWORD ? documento.PASSWORD : ''}
                                        />
                                        : <div><div><strong>Contraseña</strong></div><div></div></div>}
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <BarraHerramienta
                accionGrabar={() => setIsGrabando(true)}
                accionModificar={accionModificar}
                botonModificarDesHabilitar={modificandoAgregandoDocumento}
                botonGrabarDesHabilitar={!modificandoAgregandoDocumento}
                isGrabando={isGrabando}
            />
        </div>
    )
}

export default User
