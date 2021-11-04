import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  CardContent,
  Grid,
  Card,
  CardHeader,
  TextField,
} from "@material-ui/core";

function Vendedor({ documento, crear, onInputChange }) {
  const [vendedor, setVendedor] = useState({
    DIRECCION: "",
    TELEFONO: "",
  });

  const inputVendedor = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    if (event.target.name === "DIRECCION" && value.length > 250) return;
    if (event.target.name === "TELEFONO" && value.length > 30) return;

    setVendedor({ ...vendedor, [event.target.name]: value });
  };
  return (
    <Modal isOpen={true} zIndex={2000} size="lg">
      <ModalHeader>
        <Button onClick={() => crear(false)}>Cancelar</Button>
        <Button
          onClick={() => crear(vendedor)}
          color="primary"
          style={{ marginLeft: 5 }}
        >
          Grabar
        </Button>
      </ModalHeader>
      <ModalBody>
        <Card>
          <CardHeader
            className="cardRoot cardTitle"
            title="Creación de vendedor"
          />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="VENDEDOR"
                  name="VENDEDOR"
                  label="Vendedor"
                  placeholder=""
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  onChange={onInputChange}
                  value={documento.VENDEDOR ?? ""}
                  type="string"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  id="DIRECCION"
                  name="DIRECCION"
                  label="Dirección"
                  placeholder=""
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  onChange={inputVendedor}
                  value={vendedor.DIRECCION ?? ""}
                  type="string"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="TELEFONO"
                  name="TELEFONO"
                  label="Teléfono"
                  placeholder=""
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  onChange={inputVendedor}
                  value={vendedor.TELEFONO ?? ""}
                  type="text"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </ModalBody>
    </Modal>
  );
}

export default Vendedor;
