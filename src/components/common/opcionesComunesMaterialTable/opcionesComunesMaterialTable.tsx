import { Column, Options, Localization } from '@material-table/core';
import { ExportCsv } from '@material-table/exporters';
import { ExportarPDF } from '../funciones/funciones';

export const options = (nombreFile?: string, titulo?: string): Options<any> => (
    {
        headerStyle: {
            color: '#800000',
            fontSize: '11px',
            fontWeight: 'bold'
        },
        rowStyle: {
            fontSize: '11px'
        },
        grouping: true,
        filtering: true,
        paging: false,
        exportMenu: [
            {
                label: 'Exportar PDF',
                exportFunc: (cols, datas) => ExportarPDF(cols, datas, nombreFile ? nombreFile : 'PDFFile', titulo)
            },
            {
                label: 'Exportar CSV',
                exportFunc: (cols, datas) => ExportCsv(cols, datas, nombreFile ? nombreFile : 'CSVFile')
            }
        ],
        search: true,
        showTitle: true,
        tableLayout: 'auto',
        columnsButton: true,
        sorting: true,
        draggable: true
    }
)


export const localization: Localization = {
    grouping: {
        placeholder: 'Arrastra aquí las cabezeras que deseas agrupar.'
    },
    toolbar: {
        addRemoveColumns: 'Agregar o remover columnas',
        showColumnsTitle: 'Mostrar / Ocultar columnas',
        showColumnsAriaLabel: 'Mostrar / Ocultar columnas',
        searchTooltip: 'Buscar',
        searchPlaceholder: 'Buscar...',
        exportTitle: 'Exportar',
        exportAriaLabel: 'Exportar'
    },
    header: {
        actions: 'Acciones'
    },
    body: {
        emptyDataSourceMessage: 'No hay información que presentar',
    }
}

export const cabezeras = (collection: string, utilizaCentroCosto: boolean = false): Column<any>[] => {
    switch (collection) {
        case 'Clientes':
            return [
                { type: 'numeric', title: 'Código', field: 'ID', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Nombre', field: 'NOMBRE', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Direccion', field: 'DIRECCION', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Telefono', field: 'TELEFONO', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Vendedor', field: 'VENDEDOR', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Estado', field: 'ESTADO', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'Sellers':
            return [
                { type: 'numeric', title: 'Código', field: 'ID', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Nombre', field: 'NOMBRE', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Direccion', field: 'DIRECCION', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Telefono', field: 'TELEFONO', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Estado', field: 'ESTADO', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        default: return [{}]
    }
}