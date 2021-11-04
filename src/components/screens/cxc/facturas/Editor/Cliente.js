import React from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {
    CardContent, Grid, Card, CardHeader, TextField
} from "@material-ui/core";

function Cliente({ documento, crearCliente, onInputChange }) {
    return (
        <Modal isOpen={true} zIndex={2000} size='lg'>
            <ModalHeader>
                <Button onClick={() => crearCliente(false)}>
                    Cancelar
                </Button>
                <Button
                    onClick={() => crearCliente(true)}
                    color='primary'
                    style={{ marginLeft: 5 }}
                >
                    Grabar
                </Button>
            </ModalHeader>
            <ModalBody>
                <Card>
                    <CardHeader className='cardRoot cardTitle' title='Creación de cliente' />
                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth id="CLIENTE" name="CLIENTE"
                                    label="Cliente" placeholder=""
                                    InputLabelProps={{ shrink: true }} variant="outlined"
                                    margin="normal"
                                    onChange={(e) => onInputChange(e.target)}
                                    value={documento.CLIENTE ?? ''}
                                    type="string"
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    fullWidth id="RNC_CEDULA" name="RNC_CEDULA"
                                    label="RNC/Cedula" placeholder=""
                                    InputLabelProps={{ shrink: true }} variant="outlined"
                                    margin="normal"
                                    onChange={(e) => onInputChange(e.target)}
                                    value={documento.RNC_CEDULA ?? ''}
                                    type="string"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth id="DIRECCION" name="DIRECCION"
                                    label="Dirección" placeholder=""
                                    InputLabelProps={{ shrink: true }} variant="outlined"
                                    margin="normal"
                                    onChange={(e) => onInputChange(e.target)}
                                    value={documento.DIRECCION ?? ''}
                                    type="text"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </ModalBody>
        </Modal>
    )
}

export default Cliente
