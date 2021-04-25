import { baseUrl } from "../../../shared/BaseUrl";
import AlertMessage from "../messageAlert/MessageAlert";
import MensajeError from '../messageError/messageError';

const serverCall = async (rutaAPI, method, headers, body, messageOnSuccess) => {

    try {
        const response = await fetch(rutaAPI, 
            { 
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                credentials: 'same-origin',
                body
            }
        );

        let documento = '';

        try {
            documento = await response.json();
        } catch (error) {}

        //Se convierte de object a array para tener respuestas estandarizadas
        if (documento.length === undefined) documento = [documento];
        // console.log('Respuesta del servidor:',documento);
        
        if (response.ok) {
            if (messageOnSuccess) AlertMessage('success', messageOnSuccess);
            return documento;
        } else throw new Error(JSON.stringify(documento[0].error.message)); 
    } catch (mensajeError) {
        //Se procesa el error por el catalogo de errores que hay si no existe se devuelve el error como tal
        if (MensajeError(mensajeError.message)) {
            AlertMessage('error',MensajeError(mensajeError.message));
        }
        else AlertMessage('error', mensajeError.message); 
        //Se estandariza los errores para devolver arreglo vacio de forma que se pueda asignar automatico a variables de manejo de data
        return [];        
    }
}

export const Grabar = (rutaAPI, info, isCrearModificar) => serverCall(
    baseUrl + rutaAPI +  (!isCrearModificar?info.id ? `/${info.id}` : ``:``), 
    !isCrearModificar?'PATCH':'POST', 
    null,
    JSON.stringify(info), 
    'Documento actualizado satisfactoriamente.'
);

/**
 * Ejecuta el custom end point para grabar y actualizar
 * @param {string} rutaAPI El end point para grabar
 * @param {object} documento El documento a grabar
 * @param {boolean} noMostrarMensaje No presentar el mensaje
 */
export const GrabarCustom = (rutaAPI = '', documento = {}, noMostrarMensaje = false) => serverCall(
    baseUrl + rutaAPI, 
    'POST', 
    null,
    JSON.stringify(documento), 
    noMostrarMensaje ? null : 'Documento actualizado satisfactoriamente.'
);

/**
 * Graba varios documentos al mismo tiempo
 * @param {string} rutaAPI El custom end point para grabar varios documentos
 * @param {array} info Arreglo de documentos a grabar
 */
export const GrabarVariosDocumentosNuevos = (rutaAPI = '', info = []) => serverCall(
    baseUrl + rutaAPI, 
    'POST', 
    null,
    JSON.stringify(info), 
    'Documentos grabados satisfactoriamente.'
);

export const Get = (rutaAPI, filtro, arregloHeaders) => serverCall(
    baseUrl + rutaAPI + (filtro?`?filter=${JSON.stringify(filtro)}`:``), 
    'GET', 
    arregloHeaders,
    null, 
    null,
);

export const Ejecutar = (rutaAPI, arregloHeaders, body, message) => serverCall(
    baseUrl + rutaAPI, 
    'POST', 
    arregloHeaders,
    body?JSON.stringify(body):null, 
    message
);

export const Eliminar = (rutaAPI, id, noMostrarMensaje) => serverCall(
    baseUrl + rutaAPI + (`/${id}`), 
    'DELETE', 
    null,
    null, 
    noMostrarMensaje?null:'Documento eliminado satisfactoriamente.'
);

/**
 * Ejecuta el custom end point para eliminar
 * @param {string} rutaAPI El end point para eliminar
 * @param {object} documento El documento que se va a eliminar
 * @param {boolean} noMostrarMensaje Determina si muestra el mensaje
 */
export const EliminarCustom = (rutaAPI = '', documento = {}, noMostrarMensaje = false) => serverCall(
    baseUrl + rutaAPI, 
    'DELETE', 
    null,
    JSON.stringify(documento), 
    noMostrarMensaje?null:'Documento eliminado satisfactoriamente.'
);