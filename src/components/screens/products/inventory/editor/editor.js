import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { GrabarCustom } from "../../../../common/functionServer/FunctionServer";
import BarraHerramienta from "../../../../common/barraHerramienta/barraHerramienta";
import Dialog from "../../../../common/dialog/dialog";
import EditorDocumento from "./editorDocumento";

export default function Editor({
  documentoEditar,
  funcionCerrar,
  initModificandoAgregando,
}) {
  const [modificandoAgregandoDocumento, setModificandoAgregandoDocumento] =
    useState(false);
  const [confirmarAccionCancelar, setConfirmarAccionCancelar] = useState(false);
  const [confirmarAccionEliminar, setConfirmarAccionEliminar] = useState(false);
  const [documentoModificado, setDocumentoModificado] = useState(false);
  const [errores, setErrores] = useState({});
  const [documento, setDocumento] = useState({ isInactivo: false });
  const [isGrabando, setIsGrabando] = useState(false);

  useEffect(() => {
    setDocumento(documentoEditar);
    setModificandoAgregandoDocumento(initModificandoAgregando);
  }, [documentoEditar, initModificandoAgregando]);

  const onInputChange = (event) => {
    const value = event.target.value;

    if (event.target.name === "NOMBRE" && value.length > 150) return;

    setDocumentoModificado(true);
    setDocumento({ ...documento, [event.target.name]: value });
  };

  const onEstadoChange = ({ event }) => {
    const value =
      event.target.name === "ESTADO"
        ? event.target.checked
        : event.target.value;

    setDocumentoModificado(true);
    setDocumento({ ...documento, [event.target.name]: value });
  };

  //Acciones de la barra de herramientas
  const accionNuevo = async () => {
    setDocumento({
      ID: null,
      ID_GRUPO: null,
      ID_ALMACEN: null,
      NOMBRE: "",
      REFERENCIA: "",
      PRECIO: 0.0,
      COSTO: 0.0,
      ESTADO: false,
    });

    setModificandoAgregandoDocumento(true);
  };

  const accionModificar = () => setModificandoAgregandoDocumento(true);

  const accionEliminarConfirmar = () => setConfirmarAccionEliminar(true);
  const accionEliminar = async () => {
    let copiaData = { ...documento, ELIMINAR: true };
    let respuesta = await GrabarCustom(
      `api/Inventories/modifyInventory`,
      copiaData,
      false
    );
    if (respuesta.length || respuesta.length === 0) {
      funcionCerrar();
    } else setConfirmarAccionEliminar(false);
  };
  const accionEliminarCancelar = () => setConfirmarAccionEliminar(false);

  const accionCancelarConfirmar = () =>
    documentoModificado ? setConfirmarAccionCancelar(true) : accionCancelar();
  const accionCancelar = () => funcionCerrar(documento);
  const accionCancelarCancelar = () => setConfirmarAccionCancelar(false);

  const accionGrabar = useCallback(async () => {
    //Validaciones
    let error = {};

    if (JSON.stringify(error) !== "{}") {
      setErrores(error);
      setIsGrabando(false);
      return;
    }
    //Validaciones
    let nuevoDoc = await GrabarCustom(
      `api/Inventories/modifyInventory`,
      documento,
      false
    );

    setIsGrabando(false);

    if (nuevoDoc.length) {
      setDocumento(nuevoDoc[0]);
      setDocumentoModificado(false);
      setModificandoAgregandoDocumento(false);
    }
  }, [documento]);
  //Acciones de la barra de herramientas

  useEffect(() => {
    if (isGrabando) accionGrabar();
  }, [isGrabando, accionGrabar]);

  return (
    <>
      <BarraHerramienta
        accionGrabar={() => setIsGrabando(true)}
        accionCancelar={accionCancelarConfirmar}
        accionNuevo={accionNuevo}
        accionModificar={accionModificar}
        accionEliminar={accionEliminarConfirmar}
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
        mensaje="¿Seguro desea cancelar el proceso?, Existen cambios sin grabar si procede serán descartados."
        textoBtn1="Continuar y Descartar Cambios"
        textoBtn2="Cancelar"
        accionDialogBtn1={accionCancelar}
        accionDialogBtn2={accionCancelarCancelar}
      />

      <Dialog
        open={confirmarAccionEliminar}
        titulo="¡Advertencia!"
        estiloTitulo="Warning"
        mensaje="¿Seguro desea eliminar el registro completo?"
        textoBtn1="Continuar y Eliminar Registro"
        textoBtn2="Cancelar"
        accionDialogBtn1={accionEliminar}
        accionDialogBtn2={accionEliminarCancelar}
      />

      <div className="content">
        <Grid container item xs={12} spacing={1}>
          <EditorDocumento
            onEstadoChange={onEstadoChange}
            setDocumento={setDocumento}
            documento={documento}
            modificandoAgregandoDocumento={modificandoAgregandoDocumento}
            errores={errores}
            onInputChange={onInputChange}
            setDocumentoModificado={setDocumentoModificado}
          />
        </Grid>
      </div>

      <BarraHerramienta
        accionGrabar={() => setIsGrabando(true)}
        accionCancelar={accionCancelarConfirmar}
        accionNuevo={accionNuevo}
        accionModificar={accionModificar}
        accionEliminar={accionEliminarConfirmar}
        botonNuevoDesHabilitar={modificandoAgregandoDocumento}
        botonModificarDesHabilitar={modificandoAgregandoDocumento}
        botonEliminarDesHabilitar={modificandoAgregandoDocumento}
        botonGrabarDesHabilitar={!modificandoAgregandoDocumento}
        isGrabando={isGrabando}
      />
    </>
  );
}

Editor.propTypes = {
  documentoEditar: PropTypes.object.isRequired,
  funcionCerrar: PropTypes.func.isRequired,
  initModificandoAgregando: PropTypes.bool.isRequired,
};
