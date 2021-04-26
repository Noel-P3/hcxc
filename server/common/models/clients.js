'use strict';

var options = require('../../server/db');
var Firebird = require('node-firebird');

module.exports = function (Client) {
    Client.get = (condition, cb) => {
        Firebird.attach(options, function (err, db) {

            let query = `SELECT * FROM CLIENTS`;

            if (err) cb(err)
            else {
                // db = DATABASE
                db.query(query, [], (error, data) => {
                    db.detach();
                    if (error) cb(error)
                    else cb(null, data)
                })
            }
        });
    }

    Client.remoteMethod('get', {
        accepts: [
            {
                arg: 'condition',
                type: 'string',
                required: false
            },
        ],
        returns: {
            type: 'array',
            root: true
        },
        http: {
            verb: 'GET'
        }
    })

    Client.modifyClient = (client, cb) => {
        Firebird.attach(options, function (err, db) {
            if (err) cb(err)
            else {
                // db = DATABASE
                db.transaction(Firebird.ISOLATION_READ_COMMITED, function (error, transaction) {
                    if (error) cb(error)
                    else {
                        if (client.ID) {
                            new Promise((resolve, reject) => {
                                let query = `UPDATE CLIENTS SET NOMBRE = '${client.NOMBRE}', DIRECCION = '${client.DIRECCION}', TELEFONO = '${client.TELEFONO}', ID_VENDEDOR = ${client.ID_VENDEDOR} WHERE ID = ${client.ID}`;

                                transaction.query(query, [], (error, result) => {
                                    if (error) reject(error)
                                    else resolve(result)
                                })
                            })
                            .then(() => {
                                transaction.commit(function (err) {
                                    if (err) transaction.rollback();
                                    Client.get({}, (err, result) => {
                                        if (err) cb(err)
                                        else cb(null, result)
                                    })
                                    db.detach();
                                })
                            })
                            .catch((error) => {
                                transaction.rollback();
                                cb(error)
                            })
                        }
                    }
                })
            }
        });
    }

    Client.remoteMethod('modifyClient', {
        accepts: [
            {
                arg: 'client',
                type: 'object',
                http: { source: 'body' },
                required: true
            },
        ],
        returns: {
            type: 'array',
            root: true
        },
        http: {
            verb: 'POST'
        }
    })
};