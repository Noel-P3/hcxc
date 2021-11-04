"use strict";

var options = require("../../server/db");
var Firebird = require("node-firebird");

module.exports = function (Factura) {
  Factura.get = (condition, cb) => {
    Firebird.attach(options, function (err, db) {
      let query = `SELECT * FROM VIEW_WEB_FACTURA ${condition}`;

      if (err) cb(err);
      else {
        // db = DATABASE
        db.query(query, [], async (error, data) => {
          if (error) cb(error);
          else {
            if (data.length) {
              const copiaData = data;

              for (let i = 0; i < data.length; i++) {
                await new Promise((resolve, reject) => {
                  let detalle = `SELECT * FROM FACTURA_DETALLE WHERE ID_FACTURA = ${copiaData[i].ID}`;

                  db.query(detalle, [], (error1, data1) => {
                    if (error1) reject(error1);
                    else {
                      copiaData[i].productos = data1;
                      resolve(copiaData);
                    }
                  });
                });
              }

              db.detach();
              cb(null, copiaData);
            } else cb(null, undefined);
          }
        });
      }
    });
  };

  Factura.remoteMethod("get", {
    accepts: [
      {
        arg: "condition",
        type: "string",
        required: false,
      },
    ],
    returns: {
      type: "array",
      root: true,
    },
    http: {
      verb: "GET",
    },
  });

  Factura.modifyFactura = (object, cb) => {
    Firebird.attach(options, function (err, db) {
      if (err) cb(err);
      else {
        // db = DATABASE
        db.transaction(
          Firebird.ISOLATION_READ_COMMITED,
          function (error, transaction) {
            if (error) cb(error);
            else {
              if (object.ID) {
                if (object.ELIMINAR) {
                  //*******ELIMINAR***********/
                  let query = `DELETE FROM FACTURA_DETALLE WHERE ID_FACTURA = ${object.ID}`;

                  new Promise((resolve, reject) => {
                    transaction.query(query, [], (error, result) => {
                      if (error) reject(error);
                      else resolve(result);
                    });
                  })
                    .then(async () => {
                      query = `DELETE FROM FACTURA WHERE ID = ${object.ID}`;
                      await new Promise((resolve, reject) => {
                        transaction.query(query, [], (error, result) => {
                          if (error) reject(error);
                          else resolve(result);
                        });
                      });
                    })
                    .then(() => {
                      transaction.commit(function (err) {
                        if (err)
                          throw new Error("Sucedio algun error inesperado");
                        else cb(null, "Documento eliminado sastifactoriamente");
                        db.detach();
                      });
                    })
                    .catch((error) => {
                      transaction.rollback();
                      cb(error);
                    });
                } else {
                  // **********UPDATE***********
                  let query = `UPDATE FACTURA SET CODIGO = ${object.CODIGO}, ID_CLIENTE = ${object.ID_CLIENTE}, CLIENTE = '${object.CLIENTE}', DIRECCION = '${object.DIRECCION}', ID_ALMACEN = ${object.ID_ALMACEN}, ID_VENDEDOR = ${object.ID_VENDEDOR}, VENDEDOR = '${object.VENDEDOR}', FECHA = '${object.FECHA}', BRUTO = ${object.BRUTO}, DESCUENTO = ${object.DESCUENTO}, NETO = ${object.NETO}, TOTAL = ${object.TOTAL}, PAGADO = ${object.PAGADO}, PENDIENTE = ${object.PENDIENTE}, NOTA = '${object.NOTA}' WHERE (ID = ${object.ID}) RETURNING ID, CODIGO;`;

                  new Promise((resolve, reject) => {
                    transaction.query(query, [], (error, result) => {
                      if (error) reject(error);
                      else resolve(result);
                    });
                  })
                    .then(async (result) => {
                      for (let i = 0; i < object.productos.length; i++) {
                        if (object.productos[i].ID) {
                          if (object.productos[i].ELIMINAR) {
                            let eliminar = `DELETE FROM FACTURA_DETALLE WHERE ID_PRODUCTO = ${object.productos[i].ID_PRODUCTO}`;
                            await new Promise((resolve, reject) => {
                              transaction.query(
                                eliminar,
                                [],
                                (error, result) => {
                                  if (error) reject(error);
                                  else resolve(result);
                                }
                              );
                            });
                          } else {
                            let update = `UPDATE FACTURA_DETALLE SET ID_FACTURA = ${object.ID}, ID_PRODUCTO = ${object.productos[i].ID_PRODUCTO}, DESCRIPCION = '${object.productos[i].DESCRIPCION}',REFERENCIA = '${object.productos[i].REFERENCIA}', CANTIDAD = ${object.productos[i].CANTIDAD}, PRECIO = ${object.productos[i].PRECIO}, BRUTO = ${object.productos[i].BRUTO}, DECUENTOPOR = ${object.productos[i].DECUENTOPOR}, DESCUENTO = ${object.productos[i].DESCUENTO}, NETO = ${object.productos[i].NETO}, TOTAL = ${object.productos[i].TOTAL} WHERE (ID = ${object.productos[i].ID});`;

                            await new Promise((resolve, reject) => {
                              transaction.query(update, [], (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                              });
                            });
                          }
                        } else {
                          if (object.productos[i].ELIMINAR === false) {
                            let insert = `INSERT INTO FACTURA_DETALLE (ID, ID_FACTURA, ID_PRODUCTO, DESCRIPCION, REFERENCIA, CANTIDAD, PRECIO, BRUTO, DECUENTOPOR, DESCUENTO, NETO, TOTAL) VALUES (NULL, ${object.ID}, ${object.productos[i].ID_PRODUCTO}, '${object.productos[i].DESCRIPCION}', '${object.productos[i].REFERENCIA}', ${object.productos[i].CANTIDAD}, ${object.productos[i].PRECIO}, ${object.productos[i].BRUTO}, ${object.productos[i].DECUENTOPOR}, ${object.productos[i].DESCUENTO}, ${object.productos[i].NETO}, ${object.productos[i].TOTAL});`;

                            await new Promise((resolve, reject) => {
                              transaction.query(insert, [], (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                              });
                            });
                          }
                        }
                      }
                      return result;
                    })
                    .then((result) => {
                      transaction.commit(function (err) {
                        if (err)
                          throw new Error("Sucedio algun error inesperado");
                        let query = ``;
                        Factura.get(result ? query : "", (err, result) => {
                          if (err) cb(err);
                          else cb(null, result);
                        });
                        db.detach();
                      });
                    })
                    .catch((error) => {
                      transaction.rollback();
                      cb(error);
                    });
                }
              } else {
                /********INSERT*******/
                let query = `INSERT INTO FACTURA (ID, CODIGO, ID_CLIENTE, CLIENTE, DIRECCION, ID_ALMACEN, ID_VENDEDOR, VENDEDOR, FECHA, BRUTO, DESCUENTO, NETO, TOTAL, PAGADO, PENDIENTE, NOTA) VALUES (NULL, ${object.CODIGO}, ${object.ID_CLIENTE}, '${object.CLIENTE}', '${object.DIRECCION}', ${object.ID_ALMACEN}, ${object.ID_VENDEDOR}, '${object.VENDEDOR}', '${object.FECHA}', ${object.BRUTO}, ${object.DESCUENTO}, ${object.NETO}, ${object.TOTAL}, ${object.PAGADO}, ${object.PENDIENTE}, '${object.NOTA}') RETURNING ID;`;

                new Promise((resolve, reject) => {
                  transaction.query(query, [], (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                  });
                })
                  .then(async (result) => {
                    for (let i = 0; i < object.productos.length; i++) {
                      if (!object.productos[i].ELIMINAR) {
                        let insert = `INSERT INTO FACTURA_DETALLE (ID, ID_FACTURA, ID_PRODUCTO, DESCRIPCION, REFERENCIA, CANTIDAD, PRECIO, BRUTO, DECUENTOPOR, DESCUENTO, NETO, TOTAL) VALUES (NULL, ${result.ID}, ${object.productos[i].ID_PRODUCTO}, '${object.productos[i].DESCRIPCION}', '${object.productos[i].REFERENCIA}', ${object.productos[i].CANTIDAD}, ${object.productos[i].PRECIO}, ${object.productos[i].BRUTO}, ${object.productos[i].DESCUENTOPOR}, ${object.productos[i].DESCUENTO}, ${object.productos[i].NETO}, ${object.productos[i].TOTAL});`;

                        await new Promise((resolve, reject) => {
                          transaction.query(insert, [], (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                          });
                        });
                      }
                    }
                    return result;
                  })
                  .then((result) => {
                    transaction.commit(function (err) {
                      if (err)
                        throw new Error("Sucedio algun error inesperado");
                      let query = `WHERE ID = ${result.ID}`;

                      Factura.get(query, (err, result) => {
                        if (err) cb(err);
                        else {
                          db.detach();
                          cb(null, result);
                        }
                      });
                    });
                  })
                  .catch((error) => {
                    transaction.rollback();
                    db.detach();
                    cb(error);
                  });
              }
            }
          }
        );
      }
    });
  };

  Factura.remoteMethod("modifyFactura", {
    accepts: [
      {
        arg: "object",
        type: "object",
        http: { source: "body" },
        required: true,
      },
    ],
    returns: {
      type: "array",
      root: true,
    },
    http: {
      verb: "POST",
    },
  });
};
