const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/auth.routes.js');
const messageRoutes = require('./routes/message.routes.js');
const userRoutes = require('./routes/user.routes.js');

const {app, server} = require('./socket/socket.js');


const connectToMongoDB = require('./db/connectToMongoDB.js');

// const app = express();
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();
dotenv.config();

app.use(express.json());    // To parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser());    // To parse the incoming requests with cookies(from req.cookies)
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(_dirname, 'frontend/dist')));    // To serve the static files from the React app

app.get("*",(req, res)=>{
    res.sendFile(path.join(_dirname, 'frontend','dist','index.html'))
})


// app.get('/',(req,res)=>{
//     res.send("Hello World!");
// });


server.listen(PORT, ()=>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});