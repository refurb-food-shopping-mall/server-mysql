const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const { sequelize } = require('./models');
const  initModels  =  require ( "./models/init-models" );

const  models  =  initModels ( sequelize );

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
app.use(cors({
  origin: 'http://localhost:8080'
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 라우팅 설정
const routes = require('./routes')
const authRoutes = require('./routes/auth')
const productroutes = require('./routes/product');
const reviewroutes = require('./routes/review');
const qnaroutes = require('./routes/qna');

app.use('/api', routes)
app.use('/api', authRoutes)
app.use('/api', productroutes)
app.use('/api', reviewroutes)
app.use('/api', qnaroutes)


app.listen(3000, (err) => {
  if (err) {
    console.log(err)
  }
  console.log("🚀 [[3000번 포트]] food-refurb-shopping-mall SERVER running 🚀")
})