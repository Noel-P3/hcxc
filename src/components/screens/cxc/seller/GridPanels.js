import React from "react";
import { AccountBalanceWallet } from "@material-ui/icons";
import { FormatearNumero } from "../../../common/funciones/funciones";

export const detailPanel = () => [
  {
    icon: () => <AccountBalanceWallet />,
    tooltip: "Ver Balances",
    render: (rowData) => (
      <div className="MaterialTablePanel tablasDetalles" id="pnlBalances">
        <table>
          <thead className="tablasDetallesheader">
            <tr>
              <th className="tablasDetallesTitulo">Moneda</th>
              <th className="tablasDetallesTitulo">Balance</th>
            </tr>
          </thead>

          <tbody>
            {rowData.balances &&
              rowData.balances.map((e) => {
                return (
                  <tr key={e.id}>
                    <td className="tablasDetallesFilas">{e.monedaNombre}</td>
                    <td className="tablasDetallesFilas">
                      {FormatearNumero.format(e.balance)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    ),
  },
];
