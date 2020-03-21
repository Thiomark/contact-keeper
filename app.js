const express = require('express');
const connectDB = require('./config/db')
const dotenv = require('dotenv')
//const cors = require('cors')
const path = require('path')
const app = express()

dotenv.config({"path": "./config/config.env"})
connectDB()

//app.use(cors())
app.use(express.json())
//app.use(cookieParser());

app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/contacts', require('./routes/contacts'))
app.use('/api/v1/users', require('./routes/user'))
// app.all('*', (req, res, next) => {
//     res.status(404).json({
//         success: false,
//         message: `Can't find ${req.originalUrl} on the server`
//     })
// })

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))




