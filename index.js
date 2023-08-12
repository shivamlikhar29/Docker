const express = require('express')
const mongoose = require('mongoose')
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");
let RedisStore = require("connect-redis")
const {MONGO_USER, MONGO_IP, MONGO_PASSWORD, MONGO_PORT, REDIS_PORT, REDIS_URL, SESSION_SECRET} = require('./config/config')

const app = express()
// let redisClient = redis.createClient({
//     host: REDIS_URL,
//     port: REDIS_PORT,
//   });

app.enable("trust proxy");

app.use(cors({}));

// app.use(
//     session({
//       store: new RedisStore({ client: redisClient }),
//       secret: SESSION_SECRET,
//       cookie: {
//         secure: false,
//         resave: false,
//         saveUninitialized: false,
//         httpOnly: true,
//         maxAge: 30000,
//       },
//     })
//   );
  

app.use(express.json())

const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')

const connectWithRetry = () => {
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
     .then(()=> console.log("Connect to DB"))
     .catch((error)=> {
        console.log(error)
        setTimeout(connectWithRetry,5000)
    })
}

connectWithRetry()

app.get("/api/v1",(req,res)=>{
    res.send("<h1>ddddzdddddzzdx</h1>")
    console.log("ran")
})

app.use('/api/v1/posts',postRouter)
app.use('/api/v1/users',userRouter)


const port = process.env.PORT || 3000

app.listen(port,()=>{
    return console.log(`On port ${port}`)
}) 