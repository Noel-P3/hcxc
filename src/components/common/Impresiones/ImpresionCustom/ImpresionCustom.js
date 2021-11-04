import React, { Component } from "react";
import classes from "./ImpresionCustom.module.css";
import CabezeraInforme from "../../cabezeraInforme/cabezeraInforme";

class ImpresionCustom extends Component { 
    render() {
        return(            
            <div className={classes.cuerpo}>         
                <CabezeraInforme 
                    titulo={this.props.tituloImpresion}
                    textoFiltros={this.props.textoFiltros}
                />

                {this.props.datosImpresion ?
                    this.props.datosImpresion
                : null}
            </div>                    
        )
    }
}

export default ImpresionCustom;