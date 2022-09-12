import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Hello World' })
})

app.listen(3333, () => console.log('server is running...'))