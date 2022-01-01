const express = require('express')
const {sequelize, User, Post} = require('./models')

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

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({})
    return res.json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Something went wrong'})
  }
})
app.get('/users/:uuid', async (req, res) => {
  try {
    const uuid = req.params.uuid
    const user = await User.findOne({
      where: {uuid}
    })
    return res.json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Something went wrong'})
  }
})

app.post('/post', async (req, res) => {
const {userUuid, body} = req.body
try {

  const user = await User.findOne({where: {
    uuid: userUuid
  }})
  const post = await Post.create({body, userId: user.id})
  return res.json(post)
} catch (error) {
  console.log(error)
  return res.status(500).json({error: 'Something went wrong'})
}
})



app.listen(5500, async () => {
  console.log('Server up and running')
  await sequelize.authenticate()

  console.log('Database Connected!')
})