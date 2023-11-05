import express from "express";
import postgresClient from "../config/db.js";

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const text = "SELECT * FROM todoList WHERE is_delete = false ORDER BY id ASC"

        const { rows } = await postgresClient.query(text)

        return res.status(200).json(rows)
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })
    }
})

router.post('/addPost', async (req, res) => {
    try {
        const text = "INSERT INTO todoList (title,decription) VALUES ($1,$2) RETURNING *"

        const values = [req.body.title, req.body.description]

        const { rows } = await postgresClient.query(text, values)

        return res.status(201).json({ createdUser: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })
    }
})

router.post('/updateComplate', async (req, res) => {
    try {
        const text = 'UPDATE todoList SET complate = $1 WHERE id = $2 RETURNING *'

        const values = [req.body.complate, req.body.id]

        const { rows } = await postgresClient.query(text, values)

        return res.status(201).json({ createdUser: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })
    }
})
router.post('/update', async (req, res) => {
    try {
        const text = `UPDATE todoList
        SET title = $1, decription= $2
        WHERE id = $3;`

        const values = [req.body.title, req.body.decription, req.body.id]

        const { rows } = await postgresClient.query(text, values)

        return res.status(201).json({ createdUser: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })
    }
})
router.post('/delete', async (req, res) => {
    try {
        const text = `UPDATE todoList SET is_delete = true WHERE id = $1 RETURNING *`

        const values = [req.body.id]

        const { rows } = await postgresClient.query(text, values)

        return res.status(201).json({ createdUser: rows[0] })
    } catch (error) {
        console.log('Error occured', error.message)
        return res.status(400).json({ message: error.message })
    }
})

export default router