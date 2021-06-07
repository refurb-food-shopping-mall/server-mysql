const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const { sequelize } = require('./models');

dotenv.config()

const app = express()

app.set('port', process.env.PORT || 3000);

// Sequelize sync
sequelize.sync({ force: false })
  .then(() => {
    console.log('✨mysql 데이터베이스 연결 성공✨')
  })
  .catch((err) => {
    console.error(err)
  })

// 미들웨어 등록
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 라우팅 설정
const routes = require('./routes')
const authRoutes = require('./routes/auth')

app.use('/', routes)
app.use('/', authRoutes)

app.listen(3000, (err) => {
  if (err) {
    console.log(err)
  }
  console.log("🚀 [[3000번 포트]] food-refurb-shopping-mall SERVER running 🚀")
})