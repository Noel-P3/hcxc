import React, { Component } from "react";
import classes from "./ImpresionListado.module.css";
import CabezeraInforme from "../../cabezeraInforme/cabezeraInforme";
import MaterialTable from '@material-table/core';

class ImpresionListado extends Component { 
    render() {
        return(            
            <div className={classes.cuerpo}>         
                <CabezeraInforme 
                    titulo={this.props.tituloImpresion}
                    textoFiltros={this.props.textoFiltros}
                />

                {
                    this.props.datosImpresion ?
                    <MaterialTable
                        columns={this.props.cabezerasImpresion}
                        data={this.props.datosImpresion}
                        options={{
                            headerStyle: {
                                color: '#800000',
                                fontSize: '13px',
                                fontWeight: 'bold'
                            },
                            grouping: false,
                            filtering: false,
                            paging: false,
                            exportButton: false,
                            search: false,
                            toolbar: false,
                            showTitle: false,
                            draggable: false,
                            tableLayout: 'auto'
                        }}                
                    />   
                :
                    null
                }
            </div>                    
        )
    }
}

export default ImpresionListado;