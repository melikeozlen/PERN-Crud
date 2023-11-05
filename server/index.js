import express from 'express'
import cors from 'cors' 
import postgresClient from './config/db.js'

import router from './routers/router.js'

const app = express()
app.use(cors());
app.use(express.json())

app.use('/api', router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    postgresClient.connect(err => {
        if(err) {
            console.log('connection error', err.stack)
        }else {
            console.log('db connection successful')
        }
    })
})

