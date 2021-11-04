import React, { useState, useEffect, useRef, useContext } from "react";
import { Grid } from "@material-ui/core";
import { useReactToPrint } from "react-to-print";
import { Get } from "../../../common/functionServer/FunctionServer";
import BarraHerramienta from "../../../common/barraHerramienta/barraHerramienta";
import DetalleGrid from "../../../common/DetalleGrid/DetalleGrid";
import { AsignarNombreMaterialTable } from "../../../common/funciones/funciones";
import Editor from "./editor/editor";
import { authContext } from "../../../MainComponent";

export default function Inventory() {
  const collection = "Inventories";
  const titulo = "Inventario";
  const didMountRef = useRef(false);
  const { ID } = useContext(authContext);
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
    setData(
      await Get(`api/Inventories/get`, null, { condition: `ORDER BY ID ASC` })
    );
    setLoading(false);
  };

  /**Impresión**/
  const printRef = useRef();
  const onImprimir = useReactToPrint({
    content: () => printRef.current,
    pageStyle: "@page { size: letter portrait;}",
  });
  /**Impresión**/

  //Funciones para el editor
  const onVisualizar = (registro) => setDocumentoEditar(registro);
  const onCerrarEditor = () => {
    setDocumentoEditar(null);
    consultar();
  };

  const onNuevo = async () => {
    const almacen = await Get(`api/Almacens/get`, null, { condition: `` }, {});
    const grupo = await Get(
      `api/ProductGroups/get`,
      null,
      { condition: `` },
      {}
    );

    setDocumentoEditar({
      ID: null,
      ID_GRUPO: grupo[0].ID,
      GRUPO: grupo[0].NOMBRE,
      ID_ALMACEN: almacen[0].ID,
      ALMACEN: almacen[0].NOMBRE,
      NOMBRE: "",
      REFERENCIA: "",
      PRECIO: 0.0,
      COSTO: 0.0,
      ESTADO: false,
    });
  };

  //Funciones para el editor

  return documentoEditar ? (
    <Editor
      documentoEditar={documentoEditar}
      funcionCerrar={onCerrarEditor}
      usuarioId={ID}
      initModificandoAgregando={documentoEditar.ID ? false : true}
    />
  ) : (
    <div className="content">
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
  );
}
