import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCards.js'

// App config
const app = express();
const port = process.env.PORT || 8001
const connection_url = 'mongodb+srv://admin:TDzdldW4NnK6aKoa@cluster0.hfhbh.mongodb.net/tinderdb?retryWrites=true&w=majority'

// Middleware
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello World!!!'));

app.post('/tinder/cards', (req, res) => {
    const dbCards = req.body;

    Cards.create(dbCards,(err,data)=>{
        if(err)
        {
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req,res)=>{
    Cards.find((err,data)=>{
        if(err)
        {
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})
// Listener
app.listen(port, () => console.log(`Listning on port: ${port}`));