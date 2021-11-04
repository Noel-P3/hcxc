"use strict";

var options = require("../../server/db");
var Firebird = require("node-firebird");

module.exports = function (Inventory) {
  Inventory.get = (condition, cb) => {
    Firebird.attach(options, function (err, db) {
      let query = `SELECT * FROM VIEW_WEB_INVENTORY ${condition}`;

      if (err) cb(err);
      else {
        // db = DATABASE
        db.query(query, [], (error, data) => {
          db.detach();
          if (error) cb(error);
          else cb(null, data);
        });
      }
    });
  };

  Inventory.remoteMethod("get", {
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

  Inventory.modifyInventory = (object, cb) => {
    Firebird.attach(options, function (err, db) {
      if (err) cb(err);
      else {
        // db = DATABASE
        db.transaction(
          Firebird.ISOLATION_READ_COMMITED,
          function (error, transaction) {
            const something = async (query) => {
              await new Promise((resolve, reject) => {
                transaction.query(query, [], (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                });
              })
                .then((result) => {
                  transaction.commit(function (err) {
                    if (err) transaction.rollback();
                    let query = `WHERE ID = ${result ? result.ID : 0}`;
                    Inventory.get(result ? query : "", (err, result) => {
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
            };

            if (error) cb(error);
            else {
              if (object.ID) {
                if (object.ELIMINAR) {
                  let query = `DELETE FROM INVENTORY WHERE ID = ${object.ID}`;

                  something(query);
                } else {
                  let query = `UPDATE INVENTORY SET NOMBRE = '${object.NOMBRE}', REFERENCIA = '${object.REFERENCIA}', PRECIO = ${object.PRECIO}, COSTO = ${object.COSTO}, ID_GRUPO = ${object.ID_GRUPO}, ID_ALMACEN = ${object.ID_ALMACEN}, ESTADO = ${object.ESTADO} WHERE ID = ${object.ID} RETURNING ID`;

                  something(query);
                }
              } else {
                let query = `INSERT INTO INVENTORY(ID, ID_GRUPO, ID_ALMACEN, NOMBRE, REFERENCIA, PRECIO, COSTO, ESTADO) VALUES(NULL, ${object.ID_GRUPO}, ${object.ID_ALMACEN}, '${object.NOMBRE}', '${object.REFERENCIA}', ${object.PRECIO}, ${object.COSTO}, ${object.ESTADO}) RETURNING ID`;

                something(query);
              }
            }
          }
        );
      }
    });
  };

  Inventory.remoteMethod("modifyInventory", {
    accepts: [
      {
        arg: "Inventory",
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
