import { Column, Options, Localization } from '@material-table/core';
import { ExportCsv } from '@material-table/exporters';
import { FormatearNumeroCurrency, FormatearFecha, convertirTextoAFecha, ExportarPDF } from '../funciones/funciones';

export const options = (nombreFile?: string, titulo?: string) : Options<any> => (
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

export const cabezeras = (collection: string, utilizaCentroCosto: boolean = false) : Column<any>[] => {
    switch (collection) {
        case 'ActivoFijoActivos':
            return [
                { type: 'string', title: 'Referencia', field: 'referencia', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Categoría', field: 'categoriaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'numeric', title: 'Tasa Depr.', field: 'categoriaPorcentaje', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Cuenta Contable Activo', field: 'categoriaCuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Departamento', field: 'departamentoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cuenta Contable Gasto', field: 'departamentoCuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Grupo', field: 'grupoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Código de Barra', field: 'codigoBarra', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Marca', field: 'marca', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Modelo', field: 'modelo', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Serie', field: 'serie', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Factura', field: 'factura', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'numeric', title: 'Costo', field: 'costo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Suplidor', field: 'suplidor', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'date', title: 'Fecha Compra', field: 'fechaCompra', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.fechaCompra), 'DD-MM-YYYY') },
                { type: 'date', title: 'Fecha Inicio Depreciacion', field: 'fechaInicioDepreciacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.fechaInicioDepreciacion), 'DD-MM-YYYY') },
                { type: 'numeric', title: 'Depr. Acum. Inicial', field: 'depreciacionAcumuladaInicial', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'numeric', title: 'Valor en Libro', field: 'valorLibro', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Valor Residual', field: 'valorResidual', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Depr. Mensual', field: 'depreciacionMensual', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Depr. Acumulada', field: 'depreciacionAcumulada', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Está Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }  },
            ]

        case 'ActivoFijoCategoria':
            return [
                { type: "string", title: 'Categoría', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: "string", title: 'Porcentaje', field: 'porcentaje', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: "string", title: 'Cuenta Contable', field: 'cuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'ActivoFijoDepartamentos':
            return [
                { type: 'string', title: 'Departamento', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cuenta Contable', field: 'cuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Está Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }  },
            ]

        case 'ActivoFijoDepreciacions':
            return [
                { type: 'numeric', title: 'No. Depreciación', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
            ]

        case 'ActivoFijoDepreciacionDetalle':
            return [
                { type: 'string', title: 'Referencia', field: 'activoReferencia', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Nombre', field: 'activoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'date', title: 'Fecha de Compra', field: 'activoFechaCompra', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.activoFechaCompra), 'DD-MM-YYYY') },
                { type: 'currency', title: 'Costo Adquisición', field: 'activoCosto', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Depreciación Acum. Inicial', field: 'depreciacionAcumInicio', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Depreciación Actual', field: 'monto', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Depreciación Acumulada', field: 'depreciacionAcumFin', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Valor en Libro', field: 'valorLibro', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'ActivoFijoGrupos':
            return [
                { type: 'string', title: 'Grupo', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Está Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }  },
            ]

        case 'AGlobalMedioPagos':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'AGlobalTipoBienServicios':
            return [
                { type: 'numeric', title: 'Código', field: 'codigo606', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'AGlobalTipoAnulacion':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'AGlobalTipoComprobantes':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'AGlobalTipoIngresos':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'AGlobalTipoITBIS':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'AGlobalTipoRetencionIsrs':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Porcentaje', field: 'porcentaje', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
            ]

        case 'AGlobalTipoRetencionItbis':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Porcentaje', field: 'porcentaje', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
            ]

        case 'BancoCargos':
            return [
                { type: 'numeric', title: 'No. Cargo', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }  },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 }  },
                { type: 'string', title: 'Cuenta', field: 'bancoCuentaCuentaBancaria', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }  },
                { type: 'string', title: 'Nombre', field: 'bancoCuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }  },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }  },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }  },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }  },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }  },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }  },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }  },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }  },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }  },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }  },
            ]

        case 'BancoCheques':
            return [
                { type: 'numeric', title: 'No. Cheque', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cuenta', field: 'bancoCuentaCuentaBancaria', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Nombre', field: 'bancoCuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'currency', title: 'Monto', field: 'monto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Retenido ITBIS', field: 'montoRetItbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Retenido ISR', field: 'montoRetIsr', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'BancoConciliacions':
            return [
                { type: 'numeric', title: 'No. Conciliación', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cuenta', field: 'bancoCuentaCuentaBancaria', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Nombre', field: 'bancoCuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Bal. Inicio', field: 'balanceInicial', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'CK Concil.', field: 'ckConciliado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'CK Trans.', field: 'ckTransito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'TBS Concil.', field: 'tbsConciliado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'TBS Trans.', field: 'tbsTransito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'TBE Concil.', field: 'tbeConciliado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'TBE Trans.', field: 'tbeTransito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'CB Concil.', field: 'cbConciliado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'CB Trans.', field: 'cbTransito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'DP Concil.', field: 'dpConciliado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'DP Trans.', field: 'dpTransito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'CR Concil.', field: 'crConciliado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'CR Trans.', field: 'crTransito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Bal. Conciliado', field: 'balanceFinal', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Bal. Banco', field: 'balanceBanco', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Bal. Contable', field: 'balanceContable', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'BancoCuenta':
            return [
                { type: 'string', title: 'RNC', field: 'rnc', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Cuenta Bancaria', field: 'cuentaBancaria', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Teléfono 1', field: 'telefono1', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Teléfono 2', field: 'telefono2', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Teléfono 3', field: 'telefono3', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Teléfono 4', field: 'telefono4', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Dirección', field: 'direccion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cta. Contable', field: 'cuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'No Sobregiro', field: 'noPermiteSobregiro', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'BancoCreditos':
            return [
                { type: 'numeric', title: 'No. Crédito', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cuenta', field: 'bancoCuentaCuentaBancaria', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Nombre', field: 'bancoCuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'BancoDepositos':
            return [
                { type: 'numeric', title: 'No. Depósito.', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cuenta Bancaria', field: 'bancoCuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'BancoSolicituds':
            return [
                { type: 'boolean', title: 'Autorizado', field: 'isAutorizado', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'numeric', title: 'No. Solicitud', field: 'codigo', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cuenta', field: 'bancoCuentaCuentaBancaria', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Nombre', field: 'bancoCuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Monto', field: 'monto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Retenido ITBIS', field: 'montoRetItbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Retenido ISR', field: 'montoRetIsr', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'BancoTransferencia':
            return [
                { type: 'numeric', title: 'No. Transferencia', field: 'codigo', cellStyle: { minWidth: 200 }, headerStyle: { minWidth: 200 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cuenta', field: 'bancoCuentaCuentaBancaria', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Nombre', field: 'bancoCuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Monto', field: 'monto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Retenido ITBIS', field: 'montoRetItbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Retenido ISR', field: 'montoRetIsr', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'Compania':
            return [
                { type: 'string', title: 'RNC', field: 'rnc', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'numeric', title: 'Selectivo %', field: 'selectivoPor', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Propina %', field: 'propinaPor', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },        
                { type: 'string', title: 'Teléfono', field: 'telefono', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Dirección', field: 'direccion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'E-Mail', field: 'eMail', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Usa Centro Costo', field: 'utilizaCentroCosto', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'CompaniaMonedas':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'ContabilidadCatalogos':
            return [
                { type: 'string', title: 'Cuenta', field: 'cuenta', sorting: true, cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cuenta Control', field: 'cuentaControl', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }, hidden: true, hiddenByColumnsButton: true },
                { type: 'string', title: 'Nombre Cuenta Control', field: 'cuentaControlNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, hidden: true, hiddenByColumnsButton: true },
                { type: 'string', title: 'Tipo Cuenta', field: 'tipoCuentaId', lookup: { 1: 'ACTIVO', 2: 'PASIVO', 3: 'CAPITAL', 4: 'INGRESO', 5: 'COSTO', 6: 'GASTO' }, cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Origen', field: 'origen', lookup: { 1: 'DEBITO', 2: 'CREDITO' }, cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 }, hidden: true, hiddenByColumnsButton: true },
                { type: 'boolean', title: 'Es Control', field: 'isControl', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }, hidden: true, hiddenByColumnsButton: true },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }, hidden: true, hiddenByColumnsButton: true }
            ]

        case 'ContabilidadCentroCostos':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'ContabilidadCentroCostoProyectos':
            return [
                { type: 'string', title: 'Proyecto', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'ContabilidadCentroCostoSubProyectos':
            return [
                { type: 'string', title: 'Sub-Proyecto', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyectoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'ContabilidadConfiguracions':
            return [
                { type: 'string', title: 'Cta. Cierre Ejercicio Contable', field: 'cuentaCierreEjercicioContableNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaCierreEjercicioContable + ' - '+ rowData.cuentaCierreEjercicioContableNombre},
                { type: 'string', title: 'Cta. ITBIS por Pagar', field: 'cuentaItbisNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaItbis + ' - '+ rowData.cuentaItbisNombre },
                { type: 'string', title: 'Cta. Propina por Pagar', field: 'cuentaPropinaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaPropina + ' - '+ rowData.cuentaPropinaNombre },
                { type: 'string', title: 'Cta. Selectivo por Pagar', field: 'cuentaSelectivoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaSelectivo + ' - '+ rowData.cuentaSelectivoNombre },
                { type: 'string', title: 'Cta. Otros Impuestos', field: 'cuentaOtrosImpuestosNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaOtrosImpuestos + ' - '+ rowData.cuentaOtrosImpuestosNombre },
                { type: 'string', title: 'Cta. Descuento en Ventas', field: 'cuentaDescuentoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaDescuento + ' - '+ rowData.cuentaDescuentoNombre },
                { type: 'string', title: 'Cta. Descuento en Ventas NC', field: 'cuentaDebitoNCClienteNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaDebitoNCCliente + ' - '+ rowData.cuentaDebitoNCClienteNombre },   
                { type: 'string', title: 'Cta. Devoluciones en Venta NC', field: 'cuentaDebitoDVClienteNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaDebitoDVCliente + ' - '+ rowData.cuentaDebitoDVClienteNombre },
                { type: 'string', title: 'Cta. Descuento en Compras NC', field: 'cuentaCreditoNCSuplidorNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaCreditoNCSuplidor + ' - '+ rowData.cuentaCreditoNCSuplidorNombre },        
                { type: 'string', title: 'Cta. Retención ITBIS', field: 'cuentaRetItbisNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaRetItbis + ' - '+ rowData.cuentaRetItbisNombre },
                { type: 'string', title: 'Cta. Retención ISR', field: 'cuentaRetIsrNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaRetIsr + ' - '+ rowData.cuentaRetIsrNombre },
                { type: 'string', title: 'Cta. Ingreso ND Cliente', field: 'cuentaIngresoNotaDebitoClienteNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaIngresoNotaDebitoCliente + ' - '+ rowData.cuentaIngresoNotaDebitoClienteNombre },
                { type: 'string', title: 'Cta. Gasto ND Suplidor', field: 'cuentaCreditoNDSuplidorNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => rowData.cuentaCreditoNDSuplidor + ' - '+ rowData.cuentaCreditoNDSuplidorNombre },
            ]

        case 'ContabilidadEjercicioContableCerrados':
            return [
                { type: 'string', title: 'Año', field: 'ano', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                {
                    type: 'string', title: 'Mes', field: 'mes',
                    lookup: {
                        1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio',
                        7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
                    }, 
                    cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }
                },
            ]

        case 'ContabilidadEntradaDiarioManuals':
            return [
                { type: 'numeric', title: 'Código', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Concepto', field: 'concepto', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Destinatario', field: 'destinatario', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Anulado', field: 'isAnulado', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'ContabilidadPeriodoContableAbiertos':
            return [
                { type: 'string', title: 'Año', field: 'ano', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                {
                    type: 'string', title: 'Mes', field: 'mes',
                    lookup: {
                        1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio',
                        7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
                    }, 
                    cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }
                },
            ]

        case 'ContabilidadRep606':
            return [
                { type: 'string', title: 'Tipo', field: 'tipo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'numeric', title: 'Doc.', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Suplidor', field: 'suplidor', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'RNC / Cédula', field: 'suplidorRncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Identificador', field: 'identificador', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Tipo Bien / Servicio', field: 'tipoBienServicio', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'NCF', field: 'ncf', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'NCF Modificado', field: 'ncfModificado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Año / Mes', field: 'anoMes', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Día', field: 'dia', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Año / Mes Pago', field: 'anoMesPago', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Día Pago', field: 'diaPago', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Monto Servicios', field: 'netoServicio', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Monto Bienes', field: 'netoBien', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Monto Facturado', field: 'netoFacturado', cellStyle: { minWidth: 160 }, headerStyle: { minWidth: 160 } },
                { type: 'currency', title: 'ITBIS Facturado', field: 'itbisFacturado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS Retenido', field: 'retencionItbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS Art. 349', field: 'itbisArt349', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS al Costo', field: 'itbisCosto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS Adelantado', field: 'itbis', cellStyle: { minWidth: 160 }, headerStyle: { minWidth: 160 } },
                { type: 'currency', title: 'ITBIS Per. en Compras', field: 'itbisCompras', cellStyle: { minWidth: 200 }, headerStyle: { minWidth: 200 } },
                { type: 'string', title: 'Tipo Retención ISR', field: 'retencionIsrNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'ISR Retenido', field: 'retencionIsr', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ISR Per. en Compras', field: 'isrPercibidoCompras', cellStyle: { minWidth: 180 }, headerStyle: { minWidth: 180 } },
                { type: 'currency', title: 'Selectivo Consumo', field: 'selectivo', cellStyle: { minWidth: 170 }, headerStyle: { minWidth: 170 } },
                { type: 'currency', title: 'Otros Imp. y Tasas', field: 'otrosImpuestos', cellStyle: { minWidth: 170 }, headerStyle: { minWidth: 170 } },
                { type: 'currency', title: 'Propina Legal', field: 'propina', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Forma de Pago', field: 'formaPago', cellStyle: { minWidth: 350 }, headerStyle: { minWidth: 350 } },
            ]
        
        case 'ContabilidadRep607':
            return [
                { type: 'string', title: 'Tipo', field: 'tipo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'numeric', title: 'Doc.', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cliente', field: 'cliente', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'RNC / Cédula', field: 'clienteRncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Identificador', field: 'identificador', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'NCF', field: 'ncf', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'NCF Modificado', field: 'ncfModificado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Tipo Ingreso', field: 'tipoIngreso', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Fecha', field: 'fecha', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Fecha Retención', field: 'fechaRetencion', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Monto Facturado', field: 'montoFacturado', cellStyle: { minWidth: 160 }, headerStyle: { minWidth: 160 } },
                { type: 'currency', title: 'ITBIS Facturado', field: 'itbisFacturado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS Retenido', field: 'itbisRetenido', cellStyle: { minWidth: 160 }, headerStyle: { minWidth: 160 } },
                { type: 'currency', title: 'ITBIS Percibido', field: 'itbisPercibido', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ISR Retenido', field: 'isrRetenido', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ISR Percibido', field: 'isrPercibido', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Selectivo', field: 'selectivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Otros Impuestos', field: 'otrosImpuestos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Propina', field: 'propina', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Efectivo', field: 'efectivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Cheque / Trans. / Dep.', field: 'ckTbDp', cellStyle: { minWidth: 200 }, headerStyle: { minWidth: 200 } },
                { type: 'currency', title: 'Tarjeta', field: 'tarjeta', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Crédito', field: 'credito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Bonos', field: 'bonos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Permuta', field: 'permuta', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Otros Pagos', field: 'otrosPagos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'ContabilidadRep608':
            return [
                { type: 'string', title: 'Tipo', field: 'tipo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'numeric', title: 'Doc.', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cliente', field: 'cliente', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'RNC / Cédula', field: 'clienteRncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'NCF', field: 'ncf', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Fecha', field: 'fecha', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Tipo de Anulación', field: 'tipoAnulacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'ContabilidadRep623':
            return [
                { type: 'numeric', title: 'Doc.', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cliente', field: 'cliente', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'RNC / Cédula', field: 'clienteRncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Periodo', field: 'periodo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Fecha Retenido', field: 'fecha', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Valor Retenido', field: 'monto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Número de Referencia', field: 'documento', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Tipo de Referencia', field: 'tipoReferencia', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Banco', field: 'banco', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'ContabilidadRepIR17':
            return [
                { type: 'numeric', title: 'tipoRetencionId', field: 'tipoRetencionId', hidden: true },
                { type: 'numeric', title: 'Doc.', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'NCF', field: 'ncf', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Suplidor', field: 'suplidor', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'RNC / Cédula', field: 'suplidorRncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Tipo de Retención', field: 'tipoRetencionNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Monto Imponible', field: 'montoImponible', cellStyle: { minWidth: 170 }, headerStyle: { minWidth: 170 } },
                { type: 'currency', title: 'Valor Retenido', field: 'monto', cellStyle: { minWidth: 170 }, headerStyle: { minWidth: 170 } },
            ]

        case 'ContabilidadRepIR17Resumen':
            return [
                { type: 'string', title: 'Tipo de Retención', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Monto Imponible', field: 'montoImponible', cellStyle: { minWidth: 170 }, headerStyle: { minWidth: 170 } },
                { type: 'currency', title: 'Valor Retenido', field: 'monto', cellStyle: { minWidth: 170 }, headerStyle: { minWidth: 170 } },
            ]

        case 'ContabilidadRepBalanzaComprobacion':
            return [
                { type: 'string', title: 'control', field: 'control', hidden: true },
                { type: 'string', title: 'Cuenta', field: 'cuenta', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Nombre', field: 'cuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Auxiliares', field: 'auxiliares', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Débito', field: 'debito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Crédito', field: 'credito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'ContabilidadRepEntradaDiario':
            return [
                { type: 'string', title: 'Tipo de Documento', field: 'tipo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'No. Documento', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Concepto', field: 'concepto', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Destinatario', field: 'destinatario', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'ContabilidadRepMovimientoCuenta':
            return [
                { type: 'string', title: 'Tipo', field: 'tipo', cellStyle: { minWidth: 50 }, headerStyle: { minWidth: 50 } },
                { type: 'string', title: 'Doc.', field: 'documento', cellStyle: { minWidth: 50 }, headerStyle: { minWidth: 50 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Concepto', field: 'concepto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Destinatario', field: 'destinatario', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Bal. Ant.', field: 'balanceAnterior', cellStyle: { minWidth: 120 }, headerStyle: { minWidth: 120 } },
                { type: 'currency', title: 'Débito', field: 'debito', cellStyle: { minWidth: 120 }, headerStyle: { minWidth: 120 } },
                { type: 'currency', title: 'Crédito', field: 'credito', cellStyle: { minWidth: 120 }, headerStyle: { minWidth: 120 } },
                { type: 'currency', title: 'Balance', field: 'balancePosterior', cellStyle: { minWidth: 120 }, headerStyle: { minWidth: 120 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyectoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Sub-Proyecto', field: 'centroCostoSubProyectoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } }
            ]

        case 'ContabilidadRepResultado':
            return [
                { type: 'string', title: 'Cuenta', field: 'cuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Auxiliar', field: 'balance', render: rowData => (<span>{rowData.balance === null ? null : FormatearNumeroCurrency.format(rowData.balance)}</span>), cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Balance', field: 'balanceTotal', render: rowData => (<span>{rowData.balanceTotal === null ? null : FormatearNumeroCurrency.format(rowData.balanceTotal)}</span>), cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'ContabilidadRepSituacion':
            return [
                { type: 'string', title: 'Cuenta', field: 'cuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Auxiliar', field: 'balance', render: rowData => (<span>{rowData.balance === null ? null : FormatearNumeroCurrency.format(rowData.balance)}</span>), cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Balance', field: 'balanceTotal', render: rowData => (<span>{rowData.balanceTotal === null ? null : FormatearNumeroCurrency.format(rowData.balanceTotal)}</span>), cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'CxCClientes':
            return [
                { type: 'string', title: 'RNC/Cédula', field: 'rncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Nombre Comercial', field: 'nombreComercial', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'numeric', title: 'Crédito Días', field: 'condicionPago', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Crédito $', field: 'limiteCredito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 1', field: 'telefono1', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 2', field: 'telefono2', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 3', field: 'telefono3', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 4', field: 'telefono4', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'E-Mail', field: 'eMail', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Dirección', field: 'direccion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Contacto', field: 'contacto', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Grupo', field: 'grupoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Vendedor', field: 'vendedorNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Comprobante', field: 'tipoComprobanteNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } }
            ]

            case 'Clientes':
                return [
                    { type: 'string', title: 'Código', field: 'ID', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                    { type: 'string', title: 'Nombre', field: 'NOMBRE', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                    { type: 'string', title: 'Direccion', field: 'DIRECCION', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                    { type: 'string', title: 'Telefono', field: 'TELEFONO', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                ]

        case 'CxCClienteGrupos':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } }
            ]

        case 'CxCCotizacions':
            return [
                { type: 'numeric', title: 'No. Cotización.', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Vencimiento', field: 'fechaVence', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Cuenta', field: 'clienteNombre', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Destinatario', field: 'clienteDestinatario', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'RNC/Cédula', field: 'clienteRncCedula', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Dirección', field: 'clienteDireccion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Vendedor', field: 'vendedorNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Bruto', field: 'bruto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Descuento', field: 'descuento', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Neto', field: 'neto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS', field: 'itbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Selectivo', field: 'selectivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Otros Imp.', field: 'otrosImpuestos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Propina', field: 'propina', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'No. Factura', field: 'facturaCodigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Crédito', field: 'isCredito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'CxCCotizacionEstados':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } }
            ]

        case 'CxCVendedors':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Teléfono', field: 'telefono', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Celular', field: 'celular', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Dirección', field: 'direccion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } }
            ]

        case 'CxCFacturas':
            return [
                { type: 'numeric', title: 'No. Fact.', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Vencimiento', field: 'fechaVence', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cuenta', field: 'clienteNombre', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Destinatario', field: 'clienteDestinatario', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'RNC/Cédula', field: 'clienteRncCedula', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Dirección', field: 'clienteDireccion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Tipo NCF', field: 'tipoNcfNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'NCF', field: 'ncf', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Atención', field: 'atencion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Almacén', field: 'almacenNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Vendedor', field: 'vendedorNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Tipo Ingreso', field: 'tipoIngresoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Bruto', field: 'bruto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Descuento', field: 'descuento', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Neto', field: 'neto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS', field: 'itbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Selectivo', field: 'selectivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Otros Imp.', field: 'otrosImpuestos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Propina', field: 'propina', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Crédito', field: 'isCredito', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Tiene Pago', field: 'isPagado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'CxCNotaCreditos':
            return [
                { type: 'numeric', title: 'No. NC', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'RNC/Cédula', field: 'clienteRncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Cliente', field: 'clienteNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'NCF', field: 'ncf', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'NCF Afectado', field: 'ncfAfectado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'currency', title: 'Monto', field: 'monto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS', field: 'montoItbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
            ]

        case 'CxCNotaDebitos':
            return [
                { type: 'numeric', title: 'No. ND.', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cuenta', field: 'clienteNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'RNC/Cédula', field: 'clienteRncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Dirección', field: 'clienteDireccion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'NCF', field: 'ncf', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'NCF Afectado', field: 'ncfAfectado', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Ajuste', field: 'isAjuste', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'boolean', title: 'Tiene Pago', field: 'isPagado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'CxCRecibos':
            return [
                { type: 'numeric', title: 'No. Recibo.', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'RNC/Cédula', field: 'clienteRncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Cliente', field: 'clienteNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Monto Recibido', field: 'montoRecibido', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Retenido ITBIS', field: 'montoRetItbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Retenido ISR', field: 'montoRetIsr', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
            ]

        case 'CxPFacturas':
            return [
                { type: 'numeric', title: 'No. Factura', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'No. Orden', field: 'ordenId', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Vencimiento', field: 'fechaVence', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Suplidor', field: 'suplidorNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'NCF', field: 'ncf', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Almacén', field: 'almacenNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Neto', field: 'neto', render: rowData => FormatearNumeroCurrency.format(rowData.netoServicio + rowData.netoBien), cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS', field: 'itbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Selectivo', field: 'selectivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Otros Imp.', field: 'otrosImpuestos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Propina', field: 'propina', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Tiene Pago', field: 'isPagado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
            ]

        case 'CxPNotaCreditos':
            return [
                { type: 'numeric', title: 'No. Nota Crédito.', field: 'codigo', cellStyle: { minWidth: 200 }, headerStyle: { minWidth: 200 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'RNC/Cédula', field: 'suplidorRncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Sulidor', field: 'suplidorNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'NCF', field: 'ncf', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'NCF Afectado', field: 'ncfAfectado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Monto', field: 'monto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS', field: 'montoItbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
            ]

        case 'CxPOrdenCompras':
            return [
                { type: 'numeric', title: 'No. Orden', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Suplidor', field: 'suplidorNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Almacén', field: 'almacenNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Bruto', field: 'bruto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Descuento', field: 'descuento', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Neto', field: 'neto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS', field: 'itbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Selectivo', field: 'selectivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Otros Imp.', field: 'otrosImpuestos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Propina', field: 'propina', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Cerrado', field: 'isCerrado', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
            ]
        
        case 'CxPReembolsos':
            return [
                { type: 'numeric', title: 'No. Fact.', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Suplidor', field: 'suplidorNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Neto', field: 'neto', render: rowData => FormatearNumeroCurrency.format(rowData.netoServicio + rowData.netoBien), cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ITBIS', field: 'itbis', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Selectivo', field: 'selectivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Otros Imp.', field: 'otrosImpuestos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Propina', field: 'propina', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Tiene Pago', field: 'isPagado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
            ]

        case 'CxPSuplidors':
            return [
                { type: 'string', title: 'RNC/Cédula', field: 'rncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'numeric', title: 'Crédito Días', field: 'condicionPago', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 1', field: 'telefono1', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 2', field: 'telefono2', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 3', field: 'telefono3', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 4', field: 'telefono4', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'E-Mail', field: 'eMail', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Dirección', field: 'direccion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Contacto', field: 'contacto', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Grupo', field: 'grupoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Es Informal', field: 'isInformal', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } }
            ]

        case 'CxPSuplidorGrupos':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
            ]

        case 'CxPNotaDebitos':
            return [
                { type: 'numeric', title: 'No. ND.', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Cuenta', field: 'suplidorNombre', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'RNC/Cédula', field: 'suplidorRncCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Dirección', field: 'suplidorDireccion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'NCF', field: 'ncf', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'NCF Afectado', field: 'ncfAfectado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Moneda', field: 'monedaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Tasa', field: 'tasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Mon. Base', field: 'totalTasa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Pendiente', field: 'pendiente', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Centro Costo', field: 'centroCostoNombre', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Proyecto', field: 'centroCostoProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'sub-Proyecto', field: 'centroCostoSubProyecto', hidden: !utilizaCentroCosto, cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Ajuste', field: 'isAjuste', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'boolean', title: 'Anulado', field: 'isAnulado', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'boolean', title: 'Tiene Pago', field: 'isPagado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'InventarioAlmacens':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'InventarioConduceAlmacens':
            return [
                { type: 'numeric', title: 'Código', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Almacén', field: 'almacenNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Esta Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ] 

        case 'InventarioEntradaAlmacens':
            return [
                { type: 'numeric', title: 'Código', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Almacén', field: 'almacenNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Esta Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'InventarioLiquidacionAduanalTipoGastos':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } }
            ]

        case 'InventarioProduccionFormulas':
            return [
                { type: 'string', title: 'Referencia', field: 'productoReferencia', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Producto', field: 'productoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Procedimiento', field: 'procedimiento', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } }
            ]

        case 'InventarioProductos':
            return [
                { type: 'string', title: 'imagen', field: 'imagen', hidden: true },
                { type: 'string', title: 'Referencia', field: 'referencia', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Und. Medida', field: 'unidadMedida', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Grupo', field: 'grupoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Sub-Grupo', field: 'subGrupoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'ITBIS', field: 'tipoITBISNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Costo', field: 'costo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Cant. Ideal', field: 'cantIdeal', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Cant. Minima', field: 'cantMinima', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Cta. Ingreso', field: 'cuentaIngresoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cta. Inventario', field: 'cuentaInventarioNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cta. Costo', field: 'cuentaCostoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Es Servicio', field: 'isServicio', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } }
            ]

        case 'InventarioProductoGrupos':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cta. Ingreso', field: 'cuentaIngresoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cta. Inventario', field: 'cuentaInventarioNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cta. Costo', field: 'cuentaCostoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Tipo Inventario', field: 'tipoInventarioNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'No usar en FT.', field: 'noFacturar', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } }
            ]
            
        case 'InventarioProductoTipoInventarios':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'InventarioProductoSubGrupos':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Tipo Inventario', field: 'tipoInventarioNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Grupo', field: 'grupoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } }
            ]

        case 'InventarioRepExistencia':
            return [
                { type: 'string', title: 'Referencia', field: 'productoReferencia', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Producto', field: 'productoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Tipo Inventario', field: 'tipoInventarioNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Grupo', field: 'grupoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Sub-Grupo', field: 'subGrupoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Almacén', field: 'almacenNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'numeric', title: 'Existencia', field: 'existencia', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'InventarioRepProductoMovimiento':
            return [
                { type: 'string', title: 'Código', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Doc.', field: 'tipo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'numeric', title: 'Existencia Ant.', field: 'existenciaAnterior', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Entrada', field: 'entrada', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Salida', field: 'salida', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Existencia Act.', field: 'existenciaActual', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'InventarioSalidaAlmacens':
            return [
                { type: 'numeric', title: 'Código', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Almacén', field: 'almacenNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Esta Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ] 

        case 'InventarioTransferenciaAlmacens':
            return [
                { type: 'numeric', title: 'Código', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Fecha', field: 'fechaFormateada', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'string', title: 'Almacén Origen', field: 'almacenOrigenNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Almacén Destino', field: 'almacenDestinoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Observación', field: 'observacion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Esta Anulado', field: 'isAnulado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'NominaDepartamentos':
            return [
                { type: 'string', title: 'Departamento', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Está Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'Nominas':
            return [
                { type: 'numeric', title: 'Código', field: 'codigo', cellStyle: { minWidth: 100 }, headerStyle: { minWidth: 100 } },
                { type: 'date', title: 'Fecha Desde', field: 'fechaDesde', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.fechaDesde), 'DD-MM-YYYY') },
                { type: 'date', title: 'Fecha Hasta', field: 'fechaHasta', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.fechaHasta), 'DD-MM-YYYY') },
                { type: 'currency', title: 'Total', field: 'total', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Está Cerrado', field: 'isCerrado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'NominaDetalle':
            return [
                { type: 'string', title: 'Nombre', field: 'empleadoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cédula', field: 'empleadoCedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Pasaporte', field: 'empleadoPasaporte', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Tipo de Pago', field: 'tipoPago', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }, lookup: { 0: 'Nómina Electrónica', 1: 'Cheque', 2: 'Otro Medio' } },
                { type: 'currency', title: 'Mónto Bruto', field: 'montoBruto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Otros Pagos', field: 'otrosPagos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total de Pagos', field: 'totalPagos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }, render: rowData => <span style={{color: 'blue'}}>{FormatearNumeroCurrency.format(rowData.totalPagos)}</span>},
                { type: 'currency', title: 'Otros Déscuentos', field: 'otrosDescuentos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'AFP Empleado', field: 'AFPEmpleado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ARS Empleado', field: 'ARSEmpleado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ISR Empleado', field: 'ISREmpleado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total Déscuentos', field: 'totalDescuentos', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }, render: rowData => <span style={{color: 'red'}}>{FormatearNumeroCurrency.format(rowData.totalDescuentos)}</span> },
                { type: 'currency', title: 'Total Empleado', field: 'totalEmpleado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }, render: rowData => <span style={{color: 'green'}}>{FormatearNumeroCurrency.format(rowData.totalEmpleado)}</span> },
                { type: 'currency', title: 'Infotep', field: 'infotep', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Riesgo Laboral', field: 'riesgoLaboral', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'AFP Empresa', field: 'AFPEmpresa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'ARS Empresa', field: 'ARSEmpresa', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Total Empresa', field: 'totalPatrono', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }, render: rowData => <strong>{FormatearNumeroCurrency.format(rowData.totalPatrono)}</strong> },
            ]

        case 'NominaEmpleados':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cédula', field: 'cedula', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Pasaporte', field: 'pasaporte', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Tipo de Pago', field: 'tipoPago', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }, lookup: { 0: 'Nómina Electrónica', 1: 'Cheque', 2: 'Otro Medio' } },
                { type: 'string', title: 'Dirección', field: 'direccion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Teléfono 1', field: 'telefono1', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 2', field: 'telefono2', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 3', field: 'telefono3', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Teléfono 4', field: 'telefono4', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Estado Civil', field: 'estadoCivil', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'date', title: 'Fecha Nacimiento', field: 'fechaNacimiento', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.fechaNacimiento), 'DD-MM-YYYY') },
                { type: 'date', title: 'Fecha Graduado', field: 'fechaGraduado', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.fechaGraduado), 'DD-MM-YYYY') },
                { type: 'date', title: 'Fecha Entrada', field: 'fechaEntrada', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.fechaEntrada), 'DD-MM-YYYY') },
                { type: 'date', title: 'Fecha Salida', field: 'fechaSalida', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.fechaSalida), 'DD-MM-YYYY') },
                { type: 'string', title: 'Sexo', field: 'sexo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'E-Mail', field: 'eMail', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Idiomas', field: 'idiomas', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Sueldo Mensual', field: 'sueldoMensual', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Posición', field: 'posicion', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Contacto', field: 'contacto', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Banco', field: 'bancoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cuenta Bancaria', field: 'bancoCuenta', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Departamento', field: 'departamentoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Cuenta Contable', field: 'cuentaCobrarNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Es Extranjero', field: 'isExtranjero', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Está Cancelado', field: 'isCancelado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'NominaEmpleadoRenglonFijos':
            return [
                { type: 'string', title: 'Empleado', field: 'empleadoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Renglón', field: 'renglonNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Ejecuta en Quincena', field: 'quincena', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 }, lookup: { 0: 'Todas', 1: 'Primera', 2: 'Segunda' } },
                { type: 'currency', title: 'Monto', field: 'monto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'NominaEmpleadoRenglonVariables':
            return [
                { type: 'string', title: 'Empleado', field: 'empleadoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Renglón', field: 'renglonNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'date', title: 'Fecha ejecutada', field: 'fechaFormateada', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'currency', title: 'Monto', field: 'monto', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'NominaPrestamos':
            return [
                { type: 'numeric', title: 'Código', field: 'codigo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Empleado', field: 'empleadoNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Monto del Prestamo', field: 'montoPrestamo', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Monto Cuota', field: 'montoCuota', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Monto Pagado', field: 'montoPagado', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'currency', title: 'Monto Pendiente', field: 'montoPendiente', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'date', title: 'Fecha Inicio', field: 'fechaInicio', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.fechaInicio), 'DD-MM-YYYY') },
                { type: 'date', title: 'Fecha Fin Estimada', field: 'fechaFin', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 }, render: rowData => FormatearFecha(convertirTextoAFecha(rowData.fechaFin), 'DD-MM-YYYY') },
                { type: 'numeric', title: 'Cuotas Totales', field: 'cuotas', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'numeric', title: 'Cuotas Pagadas', field: 'cuotasPagadas', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Está Pagado', field: 'isPagado', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Está Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]

        case 'NominaRenglones':
            return [
                { type: 'string', title: 'Nombre', field: 'nombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'string', title: 'Tipo Cálculo', field: 'calculo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'string', title: 'Cuenta Contable', field: 'cuentaNombre', cellStyle: { minWidth: 250 }, headerStyle: { minWidth: 250 } },
                { type: 'boolean', title: 'Aplica AFP', field: 'isAplicaAFP', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Aplica ARS', field: 'isAplicaARS', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Aplica ISR', field: 'isAplicaISR', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Aplica Riesgo Laboral', field: 'isAplicaRiesgoLaboral', cellStyle: { minWidth: 200 }, headerStyle: { minWidth: 200 } },
                { type: 'boolean', title: 'Aplica Infotep', field: 'isAplicaInfotep', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Aplica Regalia', field: 'isAplicaRegalia', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
                { type: 'boolean', title: 'Está Inactivo', field: 'isInactivo', cellStyle: { minWidth: 150 }, headerStyle: { minWidth: 150 } },
            ]
    
        default: return [{}]
    }
}