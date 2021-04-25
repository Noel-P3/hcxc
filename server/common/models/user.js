'use strict';

var options = require('../../server/db');
var Firebird = require('node-firebird');

module.exports = function (User) {
    User.getUser = (user, password, cb) => {
        Firebird.attach(options, function (err, db) {

            let query = `SELECT * FROM "USER" WHERE "USER" = '${user}' and password = '${password}' or (email = '${user}' and password = '${password}')`;

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

    User.remoteMethod('getUser', {
        accepts: [
            {
                arg: 'user',
                type: 'string',
                required: true
            },
            {
                arg: 'password',
                type: 'string',
                required: true
            }
        ],
        returns: {
            type: 'array',
            root: true
        },
        http: {
            verb: 'GET'
        }
    })
    User.modifyUser = (user, cb) => {
        Firebird.attach(options, function (err, db) {
            if (err) cb(err)
            else {
                // db = DATABASE
                db.transaction(Firebird.ISOLATION_READ_COMMITED, function (error, transaction) {
                    if (error) cb(error)
                    else {
                        new Promise((resolve, reject) => {
                            let query = `UPDATE "USER" SET "USER" = '${user.USER}', NAME = '${user.NAME}', LASTNAME = '${user.LASTNAME}', EMAIL = '${user.EMAIL}', PASSWORD = '${user.PASSWORD}' WHERE ID = ${user.ID}`;

                            transaction.query(query, [], (error, result) => {
                                if (error) reject(error)
                                else resolve(result)
                            })
                        })
                        .then(() => {
                            transaction.commit(function (err) {
                                if (err) transaction.rollback();
                                else db.detach(); cb(null, [{pasa: 'Hola'}]);
                            })
                        })
                        .catch((error) => {
                            transaction.rollback();
                            cb(error)
                        })
                    }
                })
            }
        });
    }

    User.remoteMethod('modifyUser', {
        accepts: [
            {
                arg: 'user',
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