"use strict";

var options = require("../../server/db");
var Firebird = require("node-firebird");

module.exports = function (Client) {
  Client.get = (condition, cb) => {
    Firebird.attach(options, function (err, db) {
      let query = `SELECT * FROM VIEW_WEB_CLIENTS ${condition}`;

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

  Client.remoteMethod("get", {
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

  Client.modifyClient = (client, cb) => {
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
                    let query = `WHERE ID = ${
                      result ? result.ID : 0
                    } AND ID_USUARIO = ${client.ID_USUARIO}`;
                    Client.get(result ? query : "", (err, result) => {
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
              if (client.ID) {
                if (client.ELIMINAR) {
                  let query = `DELETE FROM CLIENTS WHERE ID = ${client.ID}`;

                  something(query);
                } else {
                  let query = `UPDATE CLIENTS SET NOMBRE = '${client.NOMBRE}', DIRECCION = '${client.DIRECCION}', TELEFONO = '${client.TELEFONO}', ID_VENDEDOR = ${client.ID_VENDEDOR}, ESTADO = ${client.ESTADO} WHERE ID = ${client.ID} AND ID_USUARIO = ${client.ID_USUARIO} RETURNING ID`;

                  something(query);
                }
              } else {
                let query = `INSERT INTO CLIENTS(ID,NOMBRE,DIRECCION,TELEFONO,ID_VENDEDOR,ID_USUARIO,ESTADO) VALUES(NULL,'${client.NOMBRE}','${client.DIRECCION}','${client.TELEFONO}', ${client.ID_VENDEDOR}, ${client.ID_USUARIO}, ${client.ESTADO}) RETURNING ID`;

                something(query);
              }
            }
          }
        );
      }
    });
  };

  Client.remoteMethod("modifyClient", {
    accepts: [
      {
        arg: "client",
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
