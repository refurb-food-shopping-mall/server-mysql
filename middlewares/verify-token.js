const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  let checkBearer = "Bearer "

  if (token && token.startsWith(checkBearer)) {
    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        res.status(404).json({
          success: false,
          message: "인증 실패"
        })
      } else {
        req.decode = decode
        next()
      }
    })
  } else {
    res.json({
      success: false,
      message: "토큰 포맷 에러"
    })
  }
}