import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Get } from "../../../common/functionServer/FunctionServer";
import BarraHerramienta from "../../../common/barraHerramienta/barraHerramienta";
import {
  FormatearFecha,
  AsignarNombreMaterialTable,
  convertirTextoAFecha,
} from "../../../common/funciones/funciones";
import DetalleGrid from "../../../common/DetalleGrid/DetalleGrid";
import FiltrosFecha from "../../../common/filtrosFecha/FiltrosFecha";
import { detailPanel } from "./GridPanels";
import Editor from "./Editor/Editor";

export default function Factura({ onRegresarPanel }) {
  const collection = "Facturas";
  const titulo = "Facturas clientes";
  const [filtros, setFiltros] = useState({
    fechaDesde: FormatearFecha(new Date(), "YYYY-MM-DD"),
    fechaHasta: FormatearFecha(new Date(), "YYYY-MM-DD"),
  });
  const [filtrosQuery, setFiltrosQuery] = useState({
    fechaDesde: FormatearFecha(new Date(), "YYYY-MM-DD"),
    fechaHasta: FormatearFecha(new Date(), "YYYY-MM-DD"),
  });
  const [documentoEditar, setDocumentoEditar] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const didMountRef = useRef(false);

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
      await Get(
        `api/Facturas/get`,
        undefined,
        {
          condition: `WHERE cast(fecha as date) between '${FormatearFecha(
            convertirTextoAFecha(filtrosQuery.fechaDesde),
            "MM-DD-YYYY"
          )}' and '${FormatearFecha(
            convertirTextoAFecha(filtrosQuery.fechaHasta),
            "MM-DD-YYYY"
          )}'`,
        },
        {}
      )
    );
    setLoading(false);
  };

  /**Impresión**/
  const printRef = useRef(null);
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
    const cliente = await Get(`api/Clients/get`, undefined, {
      condition: `ORDER BY ID ASC`,
    });

    const vendedor = await Get(`api/Sellers/get`, undefined, {
      condition: `ORDER BY ID ASC`,
    });

    setDocumentoEditar({
      ID: null,
      CODIGO: null,
      ID_CLIENTE: cliente[0].ID ?? null,
      CLIENTE: cliente[0].NOMBRE ?? null,
      DIRECCION: cliente[0].DIRECCION ?? null,
      ID_ALMACEN: 1,
      ALMACEN: "ALMACEN PRINCIPAL",
      ID_VENDEDOR: vendedor[0].ID ?? null,
      VENDEDOR: vendedor[0].NOMBRE ?? null,
      FECHA: FormatearFecha(new Date(), "YYYY-MM-DD"),
      BRUTO: 0.0,
      DESCUENTO: 0.0,
      NETO: 0.0,
      TOTAL: 0.0,
      PAGADO: 0.0,
      PENDIENTE: 0.0,
      NOTA: null,
      productos: [],
    });
  };

  return documentoEditar ? (
    documentoEditar && (
      <Editor
        documentoEditar={documentoEditar}
        onCerrar={onCerrarEditor}
        initModificandoAgregando={documentoEditar.ID ? false : true}
      />
    )
  ) : (
    <>
      {isLoading ? null : (
        <>
          <BarraHerramienta
            accionImprimir={onImprimir}
            accionNuevo={onNuevo}
            accionConsultar={() => setFiltrosQuery(filtros)}
            accionCancelar={onRegresarPanel}
          />

          <FiltrosFecha filtros={filtros} setFiltros={setFiltros} />

          <div className="content" ref={printRef}>
            <DetalleGrid
              isLoading={isLoading}
              data={data ? data : []}
              onVisualizar={onVisualizar}
              collection={collection}
              titulo={titulo}
              detailPanel={detailPanel}
            />
          </div>
        </>
      )}
    </>
  );
}
