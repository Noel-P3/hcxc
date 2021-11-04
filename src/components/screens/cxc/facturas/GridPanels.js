import React from "react";
import { ListAlt } from "@material-ui/icons";
import { FormatearNumero } from "../../../common/funciones/funciones";

export const detailPanel = [
  {
    icon: () => <ListAlt />,
    tooltip: "Ver Productos",
    render: (rowData) => (
      <div className="MaterialTablePanel tablasDetalles" id="pnlProductos">
        <table>
          <thead className="tablasDetallesheader">
            <tr>
              <th className="tablasDetallesTitulo">Referencia</th>
              <th className="tablasDetallesTitulo">Nombre</th>
              <th className="tablasDetallesTitulo">Cantidad</th>
              <th className="tablasDetallesTitulo">Precio</th>
              {rowData.DESCUENTO ? (
                <th className="tablasDetallesTitulo">Descuento %</th>
              ) : null}
              {rowData.DESCUENTO ? (
                <th className="tablasDetallesTitulo">Descuento</th>
              ) : null}
              <th className="tablasDetallesTitulo">Neto</th>
              <th className="tablasDetallesTitulo">Total</th>
            </tr>
          </thead>

          <tbody>
            {rowData.productos &&
              rowData.productos.map((e) => {
                return (
                  <tr key={e.ID}>
                    <td className="tablasDetallesFilas">{e.REFERENCIA}</td>
                    <td className="tablasDetallesFilas">{e.DESCRIPCION}</td>
                    <td className="tablasDetallesFilas">
                      {FormatearNumero.format(e.CANTIDAD)}
                    </td>
                    <td className="tablasDetallesFilas">
                      {FormatearNumero.format(e.PRECIO)}
                    </td>
                    {rowData.DESCUENTO ? (
                      <td className="tablasDetallesFilas">
                        {FormatearNumero.format(e.DESCUENTOPOR)}
                      </td>
                    ) : null}
                    {rowData.DESCUENTO ? (
                      <td className="tablasDetallesFilas">
                        {FormatearNumero.format(e.DESCUENTO)}
                      </td>
                    ) : null}
                    <td className="tablasDetallesFilas">
                      {FormatearNumero.format(e.NETO)}
                    </td>
                    <td className="tablasDetallesFilas">
                      {FormatearNumero.format(e.TOTAL)}
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
