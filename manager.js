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
    res.redirect('/signup')
  }
}

exports.login = (req, res) => {
  if (req.body.username.trim() && req.body.email.trim()) {
    User.find({
      username: req.body.username.trim().toLowerCase(),
      email: req.body.email.trim(),
    }, (e, user) => {
      if (user.length > 0
        && activeUsers.every(activeUser => activeUser.uid.toString() !== user[0]._id.toString())) {
        req.session.uid = user[0]._id
        res.redirect('/')
      } else {
        res.redirect('/login')
      }
    })
  } else {
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
