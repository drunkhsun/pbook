const mysql = require('mysql')
const bluebird = require('bluebird')
const db = mysql.createConnection({
    host: '192.168.27.186',
    user: 'root',
    password: 'root',
    database: 'pbook',
})
db.connect();
bluebird.promisifyAll(db)

async function sqlQuery(sql) {
    try {
        var data = await db.queryAsync(sql)
    } catch (err) {
        console.log(err);
    }
    return data
}

module.exports =  { db, sqlQuery }