"use strict";

var options = require("../../server/db");
var Firebird = require("node-firebird");

module.exports = function (Seller) {
  Seller.get = (condition, cb) => {
    Firebird.attach(options, function (err, db) {
      let query = `SELECT * FROM SELLER ${condition}`;

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

  Seller.remoteMethod("get", {
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

  Seller.modifySeller = (seller, cb) => {
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
                    Seller.get(result ? query : "", (err, result) => {
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
              if (seller.ID) {
                if (seller.ELIMINAR) {
                  let query = `DELETE FROM SELLER WHERE ID = ${seller.ID}`;

                  something(query);
                } else {
                  let query = `UPDATE SELLER SET NOMBRE = '${seller.NOMBRE}', DIRECCION = '${seller.DIRECCION}', TELEFONO = '${seller.TELEFONO}', ESTADO = ${seller.ESTADO} WHERE ID = ${seller.ID} AND ID_USUARIO = ${seller.ID_USUARIO} RETURNING ID`;

                  something(query);
                }
              } else {
                let query = `INSERT INTO SELLER(ID,NOMBRE,DIRECCION,TELEFONO,ID_USUARIO,ESTADO) VALUES(NULL,'${seller.NOMBRE}','${seller.DIRECCION}','${seller.TELEFONO}', ${seller.ID_USUARIO}, ${seller.ESTADO}) RETURNING ID`;

                something(query);
              }
            }
          }
        );
      }
    });
  };

  Seller.remoteMethod("modifySeller", {
    accepts: [
      {
        arg: "Seller",
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
