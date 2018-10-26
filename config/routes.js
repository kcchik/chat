module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('login')
  })

  app.post('/chat', (req, res) => {
    res.render('chat')
  })
}