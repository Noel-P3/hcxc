import React from 'react';
import classes from "./dialog.module.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

/**
 * Muestra cuadro de dialogo para solicitar accion del usuario
 * @param Open booleano que indica si se muestra o no
 * @param Titulo texto del titulo
 * @param EstiloTitulo color o estilo, Default, Warning, Danger, Success, Information
 * @param Mensaje texto del cuerpo
 * @param TextoBtn1 texto del primer botón
 * @param TextoBtn2 texto del segundo botón, si esta vacio no muestra el botón
 * @param AccionDialogBtn1 acción del primer botón
 * @param AccionDialogBtn2 acción del segundo botón
 */
export default function Dialog({
    open, mensaje, estiloTitulo, titulo, accionDialogBtn1, textoBtn1, accionDialogBtn2, textoBtn2
}) {    
    return (
        <Modal isOpen={open} zIndex={2000}>
            <ModalHeader className={classes[estiloTitulo]}>{titulo}</ModalHeader>
            <ModalBody>{mensaje}</ModalBody>
            <ModalFooter>
                <Button onClick={accionDialogBtn1} color="success">
                    {textoBtn1}
                </Button>
                {' '}
                {textoBtn2 !== '' &&
                <Button onClick={accionDialogBtn2} color="danger">
                    {textoBtn2}
                </Button>}
            </ModalFooter>
        </Modal>
    );
}