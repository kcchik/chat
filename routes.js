const userController = require('./manager')

module.exports = (app) => {
  app.get('/', (req, res) => {
    if (req.session.uid) {
      res.redirect('/chat')
    } else {
      res.render('landing')
    }
  })

  app.get('/signup', (req, res) => {
    if (req.session.uid) {
      res.redirect('/')
    } else {
      res.render('signup')
    }
  })

  app.post('/signup', userController.signup)

  app.get('/login', (req, res) => {
    if (req.session.uid) {
      res.redirect('/')
    } else {
      res.render('login')
    }
  })

  app.post('/login', userController.login)

  app.post('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
  })

  app.get('/chat', userController.join)

  app.get('*', (req, res) => {
    res.render('404')
  })
}
