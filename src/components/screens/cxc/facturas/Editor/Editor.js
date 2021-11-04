import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { useReactToPrint } from "react-to-print";
import {
  GrabarCustom,
  Get,
} from "../../../../common/functionServer/FunctionServer";
import BarraHerramienta from "../../../../common/barraHerramienta/barraHerramienta";
import AlertMessage from "../../../../common/messageAlert/MessageAlert";
import Dialog from "../../../../common/dialog/dialog";
import {
  FormatearFecha,
  convertirTextoAFecha,
} from "../../../../common/funciones/funciones";
import { validarValorAsignado } from "../../../../common/validaciones/validaciones";
import { EditorProductosCantidad as EditorProductos } from "../../../../common/editorProductos/EditorProductos";
import EditorDocumento from "./Documento";
import Impresion from "./Impresion";

export default function Editor({
  documentoEditar,
  onCerrar,
  initModificandoAgregando = false,
}) {
  const collection = "Facturas";
  const [modificandoAgregandoDocumento, setModificandoAgregandoDocumento] =
    useState(false);
  const [confirmarAccionCancelar, setConfirmarAccionCancelar] = useState(false);
  const [confirmarAccionEliminar, setConfirmarAccionEliminar] = useState(false);
  const [documentoModificado, setDocumentoModificado] = useState(false);
  const [errores, setErrores] = useState({});
  const [documento, setDocumento] = useState(documentoEditar);
  const [isGrabando, setIsGrabando] = useState(false);

  /**Asigna el documento a editar con infomacion de evento */
  useEffect(() => {
    setDocumento(documentoEditar);
    setModificandoAgregandoDocumento(initModificandoAgregando);
  }, [documentoEditar, initModificandoAgregando]);

  /**Impresión**/
  const printRef = useRef(null);
  const onImprimir = useReactToPrint({
    content: () => printRef.current,
    pageStyle: "@page { size: letter portrait;}",
  });
  /**Impresión**/

  //Acciones de la barra de herramientas
  const accionNuevo = async () => {
    const cliente = await Get(`api/Clients/get`, undefined, {
      condition: `ORDER BY ID ASC`,
    });

    const vendedor = await Get(`api/Sellers/get`, undefined, {
      condition: `ORDER BY ID ASC`,
    });

    setDocumento({
      ID: null,
      CODIGO: null,
      ID_CLIENTE: cliente[0].ID ?? null,
      CLIENTE: cliente[0].NOMBRE ?? null,
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

    setModificandoAgregandoDocumento(true);
  };

  const accionModificar = () => {
    if (!documento.PAGADO) {
      setModificandoAgregandoDocumento(true);
    } else {
      AlertMessage(
        "error",
        "Esta Proforma tiene monto aplicado. Primero debe eliminar el pago para poder modificar."
      );
    }
  };

  const accionEliminarConfirmar = () => setConfirmarAccionEliminar(true);
  const onEliminar = async () => {
    if (!documento.PAGADO) {
      const copiaData = { ...documento, ELIMINAR: true };

      const respuesta = await GrabarCustom(
        `api/${collection}/modifyFactura`,
        copiaData,
        false
      );

      if (respuesta.length) onCerrar();
      else setConfirmarAccionEliminar(false);
    } else {
      AlertMessage(
        "error",
        "Esta factura tiene pago aplicado. Primero debe quitar el pago para poder eliminar la factura."
      );
      setConfirmarAccionEliminar(false);
    }
  };
  const onEliminarCancelar = () => setConfirmarAccionEliminar(false);

  const accionCancelarConfirmar = () =>
    documentoModificado ? setConfirmarAccionCancelar(true) : onCancelar();
  const onCancelar = () => onCerrar(documento);
  const onCancelarCancelar = () => setConfirmarAccionCancelar(false);

  const onGrabarCustom = useCallback(async () => {
    //Validaciones
    let error = {};
    error = {
      ...error,
      ...validarValorAsignado(
        "productos",
        documento.productos.filter((e) => !e.ELIMINAR) || [],
        "Debe indicar algún producto para continuar."
      ),
    };
    error = {
      ...error,
      ...validarValorAsignado(
        "clientes",
        documento.ID_CLIENTE,
        "Debe indicar un cliente."
      ),
    };

    if (JSON.stringify(error) !== "{}") {
      setErrores(error);
      setIsGrabando(false);
      return;
    }
    // Validaciones

    const nuevoEstado = documento;

    nuevoEstado.FECHA = FormatearFecha(
      convertirTextoAFecha(documento.FECHA),
      "MM-DD-YYYY"
    );

    const nuevoDoc = await GrabarCustom(
      `api/${collection}/modifyFactura`,
      nuevoEstado
    );

    setIsGrabando(false);

    if (nuevoDoc.length) {
      nuevoDoc[0].FECHA = FormatearFecha(
        convertirTextoAFecha(nuevoDoc[0].FECHA),
        "YYYY-MM-DD"
      );
      setDocumento(nuevoDoc[0]);
      setDocumentoModificado(false);
      setModificandoAgregandoDocumento(false);
    }
  }, [documento]);
  //Acciones de la barra de herramientas

  useEffect(() => {
    if (isGrabando) onGrabarCustom();
  }, [isGrabando, onGrabarCustom]);

  return (
    <>
      <BarraHerramienta
        accionGrabar={() => setIsGrabando(true)}
        accionCancelar={accionCancelarConfirmar}
        accionNuevo={accionNuevo}
        accionModificar={accionModificar}
        accionEliminar={accionEliminarConfirmar}
        accionImprimir={onImprimir}
        botonNuevoDesHabilitar={modificandoAgregandoDocumento}
        botonModificarDesHabilitar={modificandoAgregandoDocumento}
        botonEliminarDesHabilitar={modificandoAgregandoDocumento}
        botonGrabarDesHabilitar={!modificandoAgregandoDocumento}
        isGrabando={isGrabando}
      />

      <Dialog
        open={confirmarAccionCancelar}
        titulo="¡Advertencia!"
        estiloTitulo="Warning"
        mensaje="¿Seguro desea cancelar el proceso?, Existen cambios sin GrabarCustom si procede serán descartados."
        textoBtn1="Continuar y Descartar Cambios"
        textoBtn2="Cancelar"
        accionDialogBtn1={onCancelar}
        accionDialogBtn2={onCancelarCancelar}
      />

      <Dialog
        open={confirmarAccionEliminar}
        titulo="¡Advertencia!"
        estiloTitulo="Warning"
        mensaje="¿Seguro desea eliminar el registro completo?"
        textoBtn1="Continuar y Eliminar Registro"
        textoBtn2="Cancelar"
        accionDialogBtn1={onEliminar}
        accionDialogBtn2={onEliminarCancelar}
      />

      {modificandoAgregandoDocumento ? (
        <div className="content">
          <Grid container item xs={12} spacing={1}>
            <EditorDocumento
              companiaId={0 ?? 0}
              documento={documento}
              setDocumento={setDocumento}
              modificandoAgregandoDocumento={modificandoAgregandoDocumento}
              setDocumentoModificado={setDocumentoModificado}
              errores={errores}
            />

            <EditorProductos
              companiaId={0 ?? 0}
              documento={documento}
              setDocumento={setDocumento}
              modificandoAgregandoDocumento={modificandoAgregandoDocumento}
              setDocumentoModificado={setDocumentoModificado}
            />
          </Grid>
        </div>
      ) : (
        <Grid container item xs={12} ref={printRef}>
          <Impresion documento={documento} />
        </Grid>
      )}

      <BarraHerramienta
        accionGrabar={() => setIsGrabando(true)}
        accionCancelar={accionCancelarConfirmar}
        accionNuevo={accionNuevo}
        accionModificar={accionModificar}
        accionEliminar={accionEliminarConfirmar}
        accionImprimir={onImprimir}
        botonNuevoDesHabilitar={modificandoAgregandoDocumento}
        botonModificarDesHabilitar={modificandoAgregandoDocumento}
        botonEliminarDesHabilitar={modificandoAgregandoDocumento}
        botonGrabarDesHabilitar={!modificandoAgregandoDocumento}
        isGrabando={isGrabando}
      />
    </>
  );
}
