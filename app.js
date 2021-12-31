const express = require('express')
const {sequelize, User} = require('./models')

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
const {name,email, role} = req.body

try {
  const user = await User.create({name, email, role})
  return res.json(user)
} catch (error) {
  console.log(error)
  return res.status(500).json(error)
}
})

app.listen(5500, async () => {
  console.log('Server up and running')
 //create database tables based on the models present
  await sequelize.sync({force: true})

  console.log('Database Synced!')
})