// Config DB
const knex = require('knex');

// MySQL
const config = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'coder'
    },
    pool: { min: 0, max: 7 }
  };

const configSQLite3 = {
    client: 'sqlite3',
    connection: { filename: './src/db/messages/messages.sqlite' },
    useNullAsDefault: true
}

const mysqlConnection = knex(config);
const sqliteConnection = knex(configSQLite3);

module.exports = { mysqlConnection, sqliteConnection };