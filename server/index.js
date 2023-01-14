require('dotenv').config()
const express = require(`express`)
const cors = require(`cors`)
const {sequelize} = require(`./util/database`)


const {SERVER_PORT} = process.env

const {Post} = require('./models/posts')
const {User} = require(`./models/user`)
const {getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost} = require(`./controllers/posts`)
const {login, register} = require(`./controllers/auth`)
const {isAuthenticated} = require(`./middleware/isAuthenticated`)

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Post)
Post.belongsTo(User)

app.post(`/register`, register)
app.post(`/login`, login)


app.get(`/posts`, getAllPosts)
app.get(`/userposts/:userId`, getCurrentUserPosts)

app.post(`/posts`, isAuthenticated, addPost)
app.put(`/posts/:id`, isAuthenticated, editPost)
app.delete(`/posts/:id`, isAuthenticated, deletePost)

sequelize.sync()
    .then(() => {
        app.listen(SERVER_PORT, () => console.log (`Server is up on port ${SERVER_PORT}`))
    })
    .catch(err => console.log(err))
