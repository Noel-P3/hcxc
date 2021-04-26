import React, { useContext } from 'react';
import classes from './cabezeraInforme.module.css';
import { authContext } from '../../MainComponent';
import { IAuthContext } from '../Intefaces/Interfaces';

export default function CabezeraInforme(
    { titulo, textoFiltros, noUsarNombreCompania = false } : 
    { titulo?: string, textoFiltros?: string, noUsarNombreCompania?: boolean }
) {
    const { USER } = useContext(authContext) as IAuthContext;

    return (
        <div className="impresionCabezera">
            <div className={classes.fecha}>{(new Date()).toString()}</div>
            <div className={classes.usuario}>{USER}</div>
        
            <div className={classes.cuerpo}>
                {<div className={classes.compania}>'jaja'</div>}
                {titulo && <div className={classes.titulo}>{titulo}</div>}                
                {textoFiltros && <div className={classes.filtros}>{textoFiltros}</div>}
            </div>
        </div>
    )
}