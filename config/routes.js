module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('login')
  })

  app.get('/chat', (req, res) => {
    res.render('index')
  })
}