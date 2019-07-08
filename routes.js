const manager = require('./manager')

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
      const { error } = req.session
      req.session.error = null
      res.render('signup', { error })
    }
  })

  app.post('/signup', manager.signup)

  app.get('/login', (req, res) => {
    if (req.session.uid) {
      res.redirect('/')
    } else {
      const { error } = req.session
      req.session.error = null
      res.render('login', { error })
    }
  })

  app.post('/login', manager.login)

  app.post('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
  })

  app.get('/chat', manager.join)

  app.get('*', (req, res) => {
    res.render('404')
  })
}
