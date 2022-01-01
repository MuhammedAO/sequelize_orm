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
    uuid: userUuid,
    include: 'posts'
  }})
  const post = await Post.create({body, userId: user.id})
  return res.json(post)
} catch (error) {
  console.log(error)
  return res.status(500).json({error: 'Something went wrong'})
}
})

app.get('/posts', async (req, res) => {
  try {
    const post = await Post.findAll({include: 'user'})
    return res.json(post)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: 'Something went wrong'})
  }
  })

  app.delete('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({ where: { uuid } })
  
      await user.destroy()
  
      return res.json({ message: 'User deleted!' })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  
  app.put('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { name, email, role } = req.body
    try {
      const user = await User.findOne({ where: { uuid } })
  
      user.name = name
      user.email = email
      user.role = role
  
      await user.save()
  
      return res.json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  })
  

app.listen(5500, async () => {
  console.log('Server up and running')
  await sequelize.authenticate()

  console.log('Database Connected!')
})