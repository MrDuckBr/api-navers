const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    database: 'NaveTeam',
    host: 'localhost',
    port: 5432
})

export default pool