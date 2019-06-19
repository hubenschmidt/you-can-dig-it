exports.discogs = (req, res) => {
    const io = req.app.get('io')
    const user = { 
      name: req.user.username,
    //   photo: req.user.photos[0].value.replace(/_normal/, '')
    }
    io.in(req.session.socketId).emit('discogs', user)
    res.end()
  }

//  normally move configuration functionality like this 
//   into the callbacks of the passportInit function as mentioned above and 
//   move the user into a database at that point in time. 
  
//   exports.google = (req, res) => {
//     const io = req.app.get('io')
//     const user = { 
//       name: req.user.displayName,
//       photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250')
//     }
//     io.in(req.session.socketId).emit('google', user)
//     res.end()
//   }
  
//   exports.facebook = (req, res) => {
//     const io = req.app.get('io')
//     const { givenName, familyName } = req.user.name
//     const user = { 
//       name: `${givenName} ${familyName}`,
//       photo: req.user.photos[0].value
//     }
//     io.in(req.session.socketId).emit('facebook', user)
//     res.end()
//   }
  
//   exports.github = (req, res) => {
//     const io = req.app.get('io')
//     const user = { 
//       name: req.user.username,
//       photo: req.user.photos[0].value
//     }
//     io.in(req.session.socketId).emit('github', user)
//     res.end()
//   } 