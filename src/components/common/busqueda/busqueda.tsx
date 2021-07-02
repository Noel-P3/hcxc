import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import BusquedaGrid from './busquedaGrid';

export default function Busqueda(
    { funcionCerrar, collection, where, order, listadoManual, permitirNuevoRegistro } :
    { funcionCerrar: (registro?: any, nuevoRegistro?: boolean) => void , collection: string, where?: string, order?: string, listadoManual?: any[], permitirNuevoRegistro?: string }
) {    
    return (
        <Modal isOpen={true} zIndex={2000} size='lg'>
            <ModalHeader>
                <Button onClick={() => funcionCerrar()}>
                    Cancelar
                </Button>

                {permitirNuevoRegistro &&
                <Button 
                    onClick={() => funcionCerrar(null, true)}
                    color='primary'
                    style={{marginLeft: 5}}
                >
                    Nuevo
                </Button>}                        
            </ModalHeader>
            <ModalBody>
                <BusquedaGrid
                    onClick={funcionCerrar}
                    collection={collection}
                    where={where}
                    order={order}
                    listadoManual={listadoManual}
                />
            </ModalBody>
        </Modal>
    );
}