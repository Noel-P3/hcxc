import React, { useState, useEffect, useRef } from 'react';
import { Grid } from "@material-ui/core";
import { useReactToPrint } from 'react-to-print';
import { Get } from "../../common/functionServer/FunctionServer";
import BarraHerramienta from '../../common/barraHerramienta/barraHerramienta';
import DetalleGrid from '../../common/DetalleGrid/DetalleGrid';
import { AsignarNombreMaterialTable } from '../../common/funciones/funciones';
import Editor from './editor/editor';

export default function Cliente() {
    const collection = 'Clientes';
    const titulo = 'Clientes';
    const didMountRef = useRef(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [documentoEditar, setDocumentoEditar] = useState(null);

    useEffect(() => {
        if (!didMountRef.current) {
            consultar();
            didMountRef.current = true;
        } else {
            AsignarNombreMaterialTable();
        }
    });

    const consultar = async () => {
        setLoading(true);
        setData(await Get(`api/Clients/get`, null, null,{}
        ));
        setLoading(false);
    };

    /**Impresión**/
    const printRef = useRef();
    const onImprimir = useReactToPrint({
        content: () => printRef.current,
        pageStyle: "@page { size: letter portrait;}"
    });
    /**Impresión**/

    //Funciones para el editor
    const onVisualizar = (registro) => setDocumentoEditar(registro);
    const onCerrarEditor = () => { setDocumentoEditar(null); consultar(); };

    const onNuevo = async () => {
        setDocumentoEditar(
            {
                ID: data.ID,
                NOMBRE: data.NOMBRE,
                DIRECCION: data.DIRECCION,
                TELEFONO: data.TELEFONO, 
            }
        );
    };
 
    //Funciones para el editor

    return (
        documentoEditar ?
        <Editor
        documentoEditar={documentoEditar}
        funcionCerrar={onCerrarEditor}
        initModificandoAgregando={documentoEditar.ID ? false : true}
        />
            :
            <div className='content'>
                <BarraHerramienta accionImprimir={onImprimir} accionNuevo={onNuevo} />

                <Grid container item xs={12} ref={printRef}>
                    <DetalleGrid
                        isLoading={loading}
                        data={data}
                        onVisualizar={onVisualizar}
                        collection={collection}
                        titulo={titulo}
                    />
                </Grid>
            </div>
    )
}