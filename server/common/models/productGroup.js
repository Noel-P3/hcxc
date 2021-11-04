"use strict";

var options = require("../../server/db");
var Firebird = require("node-firebird");

module.exports = function (ProductGroup) {
  ProductGroup.get = (condition, cb) => {
    Firebird.attach(options, function (err, db) {
      let query = `SELECT * FROM PRODUCTS_GROUP ${condition}`;

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

  ProductGroup.remoteMethod("get", {
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

  ProductGroup.modifyProductGroup = (object, cb) => {
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
                    ProductGroup.get(result ? query : "", (err, result) => {
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
                  let query = `DELETE FROM PRODUCTS_GROUP WHERE ID = ${object.ID}`;

                  something(query);
                } else {
                  let query = `UPDATE PRODUCTS_GROUP SET NOMBRE = '${object.NOMBRE}' WHERE ID = ${object.ID} RETURNING ID`;

                  something(query);
                }
              } else {
                let query = `INSERT INTO PRODUCTS_GROUP(ID,NOMBRE) VALUES(NULL,'${object.NOMBRE}') RETURNING ID`;

                something(query);
              }
            }
          }
        );
      }
    });
  };

  ProductGroup.remoteMethod("modifyProductGroup", {
    accepts: [
      {
        arg: "ProductGroup",
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
