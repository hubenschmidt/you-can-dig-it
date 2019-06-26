exports.unlink =  (req, res) =>{

  req.session.destroy(function (err){
      res.redirect('/')
    })
  }


exports.discogs = (req, res) => {

    const io = req.app.get('io')
    const user = {
      name: req.user.username,
    }

    io.in(req.session.socketId).emit('discogs', user)
    res.end()  
}
