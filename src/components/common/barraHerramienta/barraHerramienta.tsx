import React, { useContext } from "react";
import classes from './barraHerramienta.module.css';
import { authContext } from '../../MainComponent';
import { Grid, Button, Fab, Hidden } from "@material-ui/core";
import { 
    Print, Check, LockOpen, Lock, Search, Edit, DeleteForever,
    Add, ChevronLeft, FileCopy, Sync
} from "@material-ui/icons";

export default function BarraHerramienta(
    {
        accionNuevo, botonNuevoDesHabilitar = false, botonNuevoTexto, botonNuevoIcono,
        accionModificar, botonModificarDesHabilitar = false,
        accionEliminar, botonEliminarDesHabilitar = false,
        accionConsultar, botonConsultarDesHabilitar = false,
        accionGrabar, botonGrabarDesHabilitar = false,
        accionCancelar, botonCancelarDesHabilitar = false,
        accionImprimir, botonImprimirDesHabilitar = false,
        accionConvertir, botonConvertirDesHabilitar = false, botonConvertirTexto,
        accionRefrescar, botonRefrescarDesHabilitar = false, botonRefrescarTexto,
        isGrabando = false
    } :
    {
        accionNuevo?: () => void, botonNuevoDesHabilitar?: boolean, botonNuevoTexto?: string, botonNuevoIcono?: string,
        accionModificar?: () => void, botonModificarDesHabilitar?: boolean,
        accionEliminar?: () => void, botonEliminarDesHabilitar?: boolean,
        accionConsultar?: () => void, botonConsultarDesHabilitar?: boolean,
        accionGrabar?: () => void, botonGrabarDesHabilitar?: boolean,
        accionCancelar?: () => void, botonCancelarDesHabilitar?: boolean,
        accionImprimir?: () => void, botonImprimirDesHabilitar?: boolean,
        accionConvertir?: () => void, botonConvertirDesHabilitar?: boolean, botonConvertirTexto?: string,
        accionRefrescar?: () => void, botonRefrescarDesHabilitar?: boolean, botonRefrescarTexto?: string,
        isGrabando?: boolean
    }
): JSX.Element {  
    const { roleNombre } = useContext(authContext);

    const iconoMostrar = (icono?: string) => {
        if (icono === 'LockOpen') return (<LockOpen className={classes.iconos} />) 
        else if (icono === 'Lock') return (<Lock className={classes.iconos} />)  
        else return (<Add className={classes.iconos} fontSize="large" />)
    }

    const iconoMostrarMovil = (icono?: string) => {
        if (icono === 'LockOpen') return (<LockOpen fontSize="large" />) 
        else if (icono === 'Lock') return (<Lock fontSize="large" />)  
        else return (<Add fontSize="large" />)
    }

    return (
        <Grid container item spacing={1} className={classes.contenedor}>
            {accionNuevo &&
            <Grid item xs={4} sm={2}>
                <Hidden smDown>
                    <Button 
                        fullWidth
                        id='botonNuevoDocumento' 
                        onClick={() => accionNuevo()}
                        className={classes.botonNuevo}
                        disabled={botonNuevoDesHabilitar ? true : false}
                        variant="contained"
                    >
                        {iconoMostrar(botonNuevoIcono)}
                        {botonNuevoTexto ? botonNuevoTexto : 'Nuevo'}                                        
                    </Button>
                </Hidden>
                <Hidden mdUp>
                    <Fab
                        id='botonNuevoDocumento' 
                        color="primary"
                        onClick={() => accionNuevo()}
                        className={classes.botonNuevo}
                        disabled={botonNuevoDesHabilitar ? true : false}
                        size="medium"
                        classes={{sizeMedium: classes.botonFlotante}}
                    >
                        {iconoMostrarMovil(botonNuevoIcono)}
                    </Fab>
                </Hidden>
            </Grid>} 

            {accionModificar && 
            <Grid item xs={4} sm={2}>
                <Hidden smDown>
                    <Button 
                        fullWidth
                        variant="contained" 
                        id='botonModificarDocumento' 
                        onClick={() => accionModificar()}
                        className={classes.botonModificar}
                        disabled={botonModificarDesHabilitar ? true : false}
                    >
                        <Edit className={classes.iconos} />
                        Modificar                                        
                    </Button>
                </Hidden>
                <Hidden mdUp>
                    <Fab
                        id='botonModificarDocumento' 
                        onClick={() => accionModificar()}
                        className={classes.botonModificar}
                        disabled={botonModificarDesHabilitar ? true : false}
                        size="medium"
                        classes={{sizeMedium: classes.botonFlotante}}
                    >
                        <Edit fontSize="large" />
                    </Fab>
                </Hidden>
            </Grid>} 

            {accionEliminar &&
            roleNombre === 'administrador' &&
            <Grid item xs={4} sm={2}>
                <Hidden smDown>
                    <Button 
                        fullWidth
                        variant="contained"
                        id='botonEliminar'
                        onClick={() => accionEliminar()}
                        className={classes.botonEliminar}
                        disabled={botonEliminarDesHabilitar ? true : false}
                    >
                        <DeleteForever className={classes.iconos} />
                        Eliminar
                    </Button>
                </Hidden>
                <Hidden mdUp>
                    <Fab
                        id='botonEliminar'
                        onClick={() => accionEliminar()}
                        disabled={botonEliminarDesHabilitar ? true : false}
                        className={classes.botonEliminar}
                        size="medium"
                        classes={{sizeMedium: classes.botonFlotante}}
                    >
                        <DeleteForever fontSize="large" />
                    </Fab>
                </Hidden>
            </Grid>}

            {accionConsultar &&
            <Grid item xs={4} sm={2}>
                <Hidden smDown>
                    <Button 
                        fullWidth
                        id='botonConsultar' 
                        onClick={() => accionConsultar()}
                        variant="contained"
                        disabled={botonConsultarDesHabilitar ? true : false}
                    >
                        <Search className={classes.iconos} />
                        {'Consultar'}                                        
                    </Button>
                </Hidden>
                <Hidden mdUp>
                    <Fab
                        id='botonConsultar' 
                        color="default"
                        onClick={() => accionConsultar()}
                        disabled={botonConsultarDesHabilitar ? true : false}
                        size="medium"
                        classes={{sizeMedium: classes.botonFlotante}}
                    >
                        <Search fontSize="large" />
                    </Fab> 
                </Hidden>
            </Grid>} 

            {accionGrabar &&
            <Grid item xs={4} sm={2}>
                <Hidden smDown>
                    <Button 
                        fullWidth
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        id='botonGuardar'
                        onClick={() => accionGrabar()}
                        className={classes.botonGrabar}
                        disabled={(botonGrabarDesHabilitar || isGrabando) ? true : false}
                    >
                        <Check className={classes.iconos} fontSize="large" />
                        Guardar
                    </Button>
                </Hidden>
                <Hidden mdUp>
                    <Fab
                        id='botonGuardar' 
                        onClick={() => accionGrabar()}
                        className={classes.botonGrabar}
                        disabled={botonGrabarDesHabilitar ? true : false}
                        size="medium"
                        classes={{sizeMedium: classes.botonFlotante}}
                    >
                        <Check fontSize="large" />
                    </Fab>
                </Hidden>
            </Grid>}

            {accionCancelar &&
            <Grid item xs={4} sm={2}>
                <Hidden smDown>
                    <Button 
                        fullWidth
                        variant="contained" 
                        color="primary"
                        className={classes.botonCancelar}
                        id='botonCancelar'
                        onClick={() => accionCancelar()}
                        disabled={botonCancelarDesHabilitar ? true : false}
                    >
                        <ChevronLeft className={classes.iconos} fontSize="large" />
                        Regresar
                    </Button>
                </Hidden>
                <Hidden mdUp>
                    <Fab
                        id='botonCancelar' 
                        onClick={() => accionCancelar()}
                        className={classes.botonCancelar}
                        disabled={botonCancelarDesHabilitar ? true : false}
                        size="medium"
                        classes={{sizeMedium: classes.botonFlotante}}
                    >
                        <ChevronLeft fontSize="large" />
                    </Fab>
                </Hidden>
            </Grid>}

            {accionImprimir &&
            <Grid item xs={4} sm={2}>
                <Hidden smDown>
                    <Button 
                        fullWidth
                        variant="contained" 
                        id='botonImprimir' 
                        className={classes.botonImprimir}
                        disabled={botonImprimirDesHabilitar ? true : false}
                        onClick={accionImprimir}
                    >
                        <Print className={classes.iconos} />
                        Imprimir                                        
                    </Button>
                </Hidden>
                <Hidden mdUp>                        
                    <Fab
                        id='botonImprimir' 
                        color="default"
                        disabled={botonImprimirDesHabilitar ? true : false}
                        size="medium"
                        classes={{sizeMedium: classes.botonFlotante}}
                        onClick={accionImprimir}
                    >
                        <Print fontSize="large" />
                    </Fab>   
                </Hidden>
            </Grid>}

            {accionConvertir &&
                <Grid item xs={4} sm={2}>
                    <Hidden smDown>
                        <Button 
                            fullWidth
                            variant="contained" 
                            id='botonConvertir' 
                            className={classes.botonConvertir}
                            disabled={botonConvertirDesHabilitar ? true : false}
                            onClick={accionConvertir}
                        >
                            <FileCopy className={classes.iconos} />
                            {botonConvertirTexto?botonConvertirTexto:'Imprimir'}                                        
                        </Button>
                    </Hidden>
                    <Hidden mdUp>                        
                        <Fab
                            id='botonConvertir' 
                            color="default"
                            disabled={botonConvertirDesHabilitar ? true : false}
                            size="medium"
                            classes={{sizeMedium: classes.botonFlotante}}
                            onClick={accionConvertir}
                        >
                            <FileCopy fontSize="large" />
                        </Fab>   
                    </Hidden>
                </Grid>
            }

            {accionRefrescar &&
                <Grid item xs={4} sm={2}>
                    <Hidden smDown>
                        <Button 
                            fullWidth
                            variant="contained" 
                            id='botonRefrescar' 
                            className={classes.botonRefrescar}
                            disabled={botonRefrescarDesHabilitar ? true : false}
                            onClick={accionRefrescar}
                        >
                            <Sync className={classes.iconos} />
                            {botonRefrescarTexto?botonRefrescarTexto:'Refrescar'}                                        
                        </Button>
                    </Hidden>
                    <Hidden mdUp>                        
                        <Fab
                            id='botonRefrescar' 
                            color="default"
                            disabled={botonRefrescarDesHabilitar ? true : false}
                            size="medium"
                            classes={{sizeMedium: classes.botonFlotante}}
                            onClick={accionRefrescar}
                        >
                            <Sync fontSize="large" />
                        </Fab>   
                    </Hidden>
                </Grid>
            }
        </Grid>
    )
}