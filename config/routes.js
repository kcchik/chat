module.exports = (app, db) => {
  app.get('/', (req, res) => {
    res.render('login')
  })

  app.post('/chat', (req, res) => {
    db.collection('users').insertOne(req.body, (error, result) => {
      if (error) {
        return console.log(error)
      }
      res.render('chat', { username: req.body.username })
    })
  })
}