import React from 'react';
import { AccountBalanceWallet } from '@material-ui/icons';
import { FormatearNumero } from '../funciones/funciones';
import { ICuenta } from '../Intefaces/Interfaces';

export const panelRegistroContable = (utilizaCentroCosto = false) => ([
    {
        icon: () => <AccountBalanceWallet />,
        tooltip: 'Ver Cuentas Contables',
        render: (rowData: { cuentas: ICuenta[] }) => (
            <div className='MaterialTablePanel tablasDetalles' id='pnlCuentas'>
                <table>
                    <thead className='tablasDetallesheader'>
                        <tr>
                            <th className='tablasDetallesTitulo'>Cuenta</th>
                            <th className='tablasDetallesTitulo'>Nombre</th>
                            <th className='tablasDetallesTitulo' align='right'>Débito</th>
                            <th className='tablasDetallesTitulo' align='right'>Crédito</th>
                            {utilizaCentroCosto &&
                                <>
                                    <th className='tablasDetallesTitulo'>Centro Costo</th>
                                    <th className='tablasDetallesTitulo'>Proyecto</th>
                                    <th className='tablasDetallesTitulo'>Sub-Proyecto</th>
                                </>
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {rowData.cuentas && rowData.cuentas.map(e => {
                            return <tr key={e.id}>
                                <td className='tablasDetallesFilas'>{e.cuenta}</td>
                                <td className='tablasDetallesFilas'>{e.cuentaNombre}</td>
                                <td className='tablasDetallesFilas' align='right'>{FormatearNumero.format(e.debito)}</td>
                                <td className='tablasDetallesFilas' align='right'>{FormatearNumero.format(e.credito)}</td>
                                {utilizaCentroCosto &&
                                    <>
                                        <td className='tablasDetallesFilas'>{e.centroCostoNombre}</td>
                                        <td className='tablasDetallesFilas'>{e.centroCostoProyectoNombre}</td>
                                        <td className='tablasDetallesFilas'>{e.centroCostoSubProyectoNombre}</td>
                                    </>
                                }
                            </tr>
                        })}

                        <tr className='tablasDetallesFoot'>
                            <td><strong>Totales</strong></td>
                            <td><strong>======</strong></td>
                            <td className='tablasDetallesFilas' align="right">
                                <strong>
                                    {
                                        rowData.cuentas?.length ?
                                            FormatearNumero.format(rowData.cuentas.reduce((acc, cuenta) => acc + +cuenta.debito, 0)) : '0.00'
                                    }
                                </strong>
                            </td>
                            <td className='tablasDetallesFilas' align="right">
                                <strong>
                                    {
                                        rowData.cuentas?.length ?
                                            FormatearNumero.format(rowData.cuentas.reduce((acc, cuenta) => acc + +cuenta.credito, 0)) : '0.00'
                                    }
                                </strong>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
])