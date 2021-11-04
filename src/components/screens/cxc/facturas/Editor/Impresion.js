import React from "react";
import { Paper, Grid } from "@material-ui/core";
import {
  FormatearFecha,
  convertirTextoAFecha,
  FormatearNumero,
} from "../../../../common/funciones/funciones";
// import { loginContext } from "../../../../../App";
import CabezeraInforme from "../../../../common/cabezeraInforme/cabezeraInforme";
// import { IFACTURA_PROFORMA, ILoginState } from "../../../../../AppInterfaces";

export default function Impresion({ documento }) {
  return (
    <Paper
      elevation={0}
      square
      style={{ padding: "5px", flexGrow: 1 }}
      className="Impresion"
    >
      <CabezeraInforme
        noUsarNombreCompania={true}
        titulo="Facturas a clientes"
      />

      <Grid item xs={12}>
        {/* Titulo */}
        <Grid container item xs={12} spacing={1}>
          <Grid container item xs={8} spacing={1}>
            <div style={{ width: 150 }}>
              {/* <img
                src={process.env.PUBLIC_URL + "/Imagenes/companiaLogo.png"}
                alt="Logo Compania"
                width={150}
                height={100}
                style={{ objectFit: "contain" }}
              /> */}
            </div>

            <Grid item xs={6}>
              {/* {rnc ? <div>RNC: {rnc}</div> : null}
              {direccion ? <div>Dirección: {direccion}</div> : null}
              {telefono ? <div>Teléfono: {telefono}</div> : null}
              {email ? <div>E-Mail: {email}</div> : null} */}
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Grid item style={{ height: "20px" }}></Grid>
            <Grid item>
              <strong style={{ color: "red" }}>
                Factura No.: {documento.CODIGO}
              </strong>
            </Grid>
            <Grid item>
              <strong style={{ color: "blue" }}>{documento.VENDEDOR}</strong>
            </Grid>
            <Grid item>
              <strong>
                Fecha.:{" "}
                {FormatearFecha(
                  convertirTextoAFecha(documento.FECHA),
                  "DD-MM-YYYY"
                )}
              </strong>
            </Grid>
          </Grid>
        </Grid>

        <div style={{ height: "50px" }}></div>

        {/* Informacion */}
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={8}>
            {
              //documento.RNC_CEDULA&&
              documento.CLIENTE && (
                // documento.clienteDireccion&&
                <table>
                  <tbody>
                    {documento.RNC_CEDULA && (
                      <tr>
                        <td style={{ width: "120px" }}>RNC / Cédula.:</td>
                        <td>
                          <u>{documento.RNC_CEDULA}</u>
                        </td>
                      </tr>
                    )}
                    {documento.CLIENTE && (
                      <tr>
                        <td style={{ width: "120px" }}>Cliente.:</td>
                        <td>
                          <u>{documento.CLIENTE}</u>
                        </td>
                      </tr>
                    )}
                    {documento.DIRECCION && (
                      <tr>
                        <td style={{ width: "120px" }}>Dirección.:</td>
                        <td>
                          <u>{documento.DIRECCION}</u>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )
            }
          </Grid>

          <Grid item xs={1}>
            <table>
              <tbody>
                {documento.VENDEDOR && (
                  <tr>
                    <td style={{ width: "80px" }}>Vendedor.:</td>
                    <td>
                      <u>{documento.VENDEDOR}</u>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Grid>
        </Grid>
        {/* Productos */}
        <Grid container item xs={12} className="impresionGrid">
          <Grid item xs={12}>
            <table style={{ width: "100%" }}>
              <thead style={{ border: "1px solid black" }}>
                <tr>
                  {/* <th style={{width: '150px'}}>Referencia</th> */}
                  <th style={{ width: "250px" }}>Producto</th>
                  {/* <th style={{ width: "100px" }}>Medida</th> */}
                  <th style={{ width: "auto", textAlign: "right" }}>
                    Cantidad
                  </th>
                  <th style={{ width: "auto", textAlign: "right" }}>Precio</th>
                  <th style={{ width: "auto", textAlign: "right" }}>Bruto</th>
                  {documento.DESCUENTO ? (
                    <>
                      <th style={{ width: "auto", textAlign: "right" }}>
                        Descuento
                      </th>
                      <th style={{ width: "auto", textAlign: "right" }}>
                        Neto
                      </th>
                    </>
                  ) : null}
                  <th style={{ width: "auto", textAlign: "right" }}>Total</th>
                </tr>
              </thead>

              <tbody>
                {documento?.productos
                  ? documento.productos.map((pr, index) => (
                      <tr key={index}>
                        {/* <td>{pr.REFERENCIA}</td> */}
                        <td>{pr.DESCRIPCION}</td>
                        {/* <td>{pr.UNIDAD}</td> */}
                        <td style={{ textAlign: "right", padding: "5px" }}>
                          {FormatearNumero.format(pr.CANTIDAD)}
                        </td>
                        <td style={{ textAlign: "right", padding: "5px" }}>
                          {FormatearNumero.format(pr.PRECIO)}
                        </td>
                        <td style={{ textAlign: "right", padding: "5px" }}>
                          {FormatearNumero.format(pr.CANTIDAD * pr.PRECIO)}
                        </td>
                        {pr.DESCUENTOPOR ? (
                          <>
                            <td style={{ textAlign: "right", padding: "5px" }}>
                              {FormatearNumero.format(pr.DESCUENTO)}
                            </td>
                            <td style={{ textAlign: "right", padding: "5px" }}>
                              {FormatearNumero.format(pr.NETO)}
                            </td>
                          </>
                        ) : null}
                        <td style={{ textAlign: "right", padding: "5px" }}>
                          {FormatearNumero.format(pr.TOTAL)}
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
            <Grid item xs={12} style={{ textAlign: "center", padding: "20px" }}>
              ********************ULTIMA LINEA********************
            </Grid>
          </Grid>
        </Grid>

        {/* Pie de página */}
        <Grid container item xs={12} spacing={1} className="impresionPie">
          {/* Sumatoria */}
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={12}>
              <hr style={{ border: "0.5px solid black" }} />
            </Grid>

            <Grid item xs={4}>
              <div style={{ height: "100px" }}></div>
              {/* <hr
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  borderBottom: "1px solid black",
                  textAlign: "center",
                }}
              />
              <div style={{ textAlign: "center", width: "100%" }}>
                Autorizado Por
              </div> */}
            </Grid>

            <Grid item xs={4}>
              <div style={{ height: "100px" }}></div>
              {/* <hr
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  borderBottom: "1px solid black",
                  textAlign: "center",
                }}
              />
              <div style={{ textAlign: "center", width: "100%" }}>
                Recibido Por
              </div> */}
            </Grid>

            <Grid item xs={4}>
              <table style={{ width: "80%", marginLeft: "auto" }}>
                <tbody>
                  <tr>
                    <td style={{ width: "40%" }}>
                      <strong>BRUTO</strong>
                    </td>
                    <td style={{ textAlign: "right", width: "60%" }}>
                      <strong>{FormatearNumero.format(documento.BRUTO)}</strong>
                    </td>
                  </tr>

                  {documento.DESCUENTO ? (
                    <tr>
                      <td style={{ width: "40%" }}>
                        <strong>DESCUENTO</strong>
                      </td>
                      <td style={{ textAlign: "right", width: "60%" }}>
                        <strong>
                          -{FormatearNumero.format(documento.DESCUENTO)}
                        </strong>
                      </td>
                    </tr>
                  ) : null}

                  <tr>
                    <td></td>
                    <td>
                      <hr
                        style={{
                          borderBottom: "1px solid black",
                          textAlign: "right",
                          width: "100%",
                          marginTop: "0",
                          marginBottom: "0",
                        }}
                      />
                    </td>
                  </tr>

                  {documento.DESCUENTO ? (
                    <tr>
                      <td style={{ width: "40%" }}>
                        <strong>NETO</strong>
                      </td>
                      <td style={{ textAlign: "right", width: "60%" }}>
                        <strong>
                          {FormatearNumero.format(documento.NETO)}
                        </strong>
                      </td>
                    </tr>
                  ) : null}
                  {documento.ITBIS ? (
                    <tr>
                      <td style={{ width: "40%" }}>
                        <strong>ITBIS</strong>
                      </td>
                      <td style={{ textAlign: "right", width: "60%" }}>
                        <strong>
                          +{FormatearNumero.format(documento.ITBIS)}
                        </strong>
                      </td>
                    </tr>
                  ) : null}

                  <tr>
                    <td></td>
                    <td>
                      <hr
                        style={{
                          borderBottom: "1px solid black",
                          textAlign: "right",
                          width: "100%",
                          marginTop: "0",
                          marginBottom: "0",
                        }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td style={{ width: "40%" }}>
                      <strong>TOTAL PAGAR</strong>
                    </td>
                    <td
                      style={{ textAlign: "right", width: "60%", color: "red" }}
                    >
                      <strong>{FormatearNumero.format(documento.TOTAL)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Grid>

          {/* Notas */}
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={12}>
              Notas.: {documento.NOTA}
            </Grid>
          </Grid>

          {/* Pagos */}
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
