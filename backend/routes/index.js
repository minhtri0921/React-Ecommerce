const usersRouter = require('./users')
const registerRouter = require('./register')
const loginRouter = require('./login')
const productsRouter = require('./products')

function route(app) {
    app.use('/users', usersRouter)
    app.use('/register', registerRouter)
    app.use('/login',loginRouter)
    app.use('/products',productsRouter)
}

module.exports = route;