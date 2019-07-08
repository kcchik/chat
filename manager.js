const User = require('./models/user')

exports.signup = (req, res) => {
  if (req.body.username.trim() && req.body.email.trim()) {
    User.find({
      $or: [
        { username: req.body.username.trim().toLowerCase() },
        { email: req.body.email.trim() },
      ],
    }, (e, user) => {
      if (user.length > 0) {
        req.session.error = 'that username or email is already taken'
        res.redirect('/signup')
      } else {
        const newUser = new User({
          username_formatted: req.body.username.trim(),
          username: req.body.username.trim().toLowerCase(),
          email: req.body.email.trim(),
        })
        newUser.save()
        req.session.uid = newUser._id
        res.redirect('/')
      }
    })
  } else {
    req.session.error = 'enter a username and an email'
    res.redirect('/signup')
  }
}

exports.login = (req, res) => {
  if (req.body.username.trim() && req.body.email.trim()) {
    User.find({
      username: req.body.username.trim().toLowerCase(),
      email: req.body.email.trim(),
    }, (e, user) => {
      if (!user.length) {
        req.session.error = 'incorrect username or email'
        res.redirect('/login')
      } else if (activeUsers.some(activeUser => activeUser.uid.toString() === user[0]._id.toString())) {
        req.session.error = 'that user is already logged in'
        res.redirect('/login')
      } else {
        req.session.uid = user[0]._id
        res.redirect('/')
      }
    })
  } else {
    req.session.error = 'enter a username and email'
    res.redirect('/login')
  }
}

exports.join = (req, res) => {
  if (req.session.uid) {
    User.find({ _id: req.session.uid }, (e, user) => {
      res.render('chat', { username: user[0].username_formatted, uid: req.session.uid })
    })
  } else {
    res.redirect('/')
  }
}
