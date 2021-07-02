import React, { useState, useEffect, useCallback } from 'react';
import { Get } from "../functionServer/FunctionServer";
import MaterialTable from 'material-table';
import { Grid } from "@material-ui/core";
import { options, localization, cabezeras } from '../opcionesComunesMaterialTable/opcionesComunesMaterialTable';
import { BookLoader } from '../loader/loader';

export default function BusquedaGrid(
    { onClick, collection, where = '', order = '', listadoManual }:
        { onClick: (registro: any) => void, collection: string, where?: string, order?: string, listadoManual?: any[] }
) {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const consultar = useCallback(async () => {
        setIsLoading(true);
        if (listadoManual) setData(listadoManual);
        else setData(await Get(`api/${collection}/get`, undefined, { where, order }));
        setIsLoading(false);
    }, [collection, where, order, listadoManual]);

    useEffect(() => { consultar() }, [consultar]);

    return (
        <Grid container item>
            <Grid item xs={12}>
                {isLoading ? <BookLoader /> :
                    <MaterialTable
                        title="Búsqueda"
                        onRowClick={(event, rowData, togglePanel) => onClick(rowData)}
                        columns={cabezeras(collection)}
                        data={data}
                        options={{ ...options(), paging: true, searchAutoFocus: true, maxBodyHeight: (window.innerHeight - 200), minBodyHeight: 400, grouping: false, exportButton: false, columnsButton: false }}
                        localization={localization}
                    />
                }
            </Grid>
        </Grid>
    )
}