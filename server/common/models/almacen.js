"use strict";

var options = require("../../server/db");
var Firebird = require("node-firebird");

module.exports = function (Almacen) {
  Almacen.get = (condition, cb) => {
    Firebird.attach(options, function (err, db) {
      let query = `SELECT * FROM ALMACEN ${condition}`;

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

  Almacen.remoteMethod("get", {
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

  Almacen.modifyAlmacen = (object, cb) => {
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
                    Almacen.get(result ? query : "", (err, result) => {
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
                  let query = `DELETE FROM ALMACEN WHERE ID = ${object.ID}`;

                  something(query);
                } else {
                  let query = `UPDATE ALMACEN SET NOMBRE = '${object.NOMBRE}' WHERE ID = ${object.ID} RETURNING ID`;

                  something(query);
                }
              } else {
                let query = `INSERT INTO ALMACEN(ID,NOMBRE) VALUES(NULL,'${object.NOMBRE}') RETURNING ID`;

                something(query);
              }
            }
          }
        );
      }
    });
  };

  Almacen.remoteMethod("modifyAlmacen", {
    accepts: [
      {
        arg: "Almacen",
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
