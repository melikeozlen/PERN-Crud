import pg from 'pg'
import dotnenv from 'dotenv'

dotnenv.config()

const postgresClient = new pg.Pool({
    connectionString:process.env.DB_CONNECTION_STRING
})

export default postgresClient