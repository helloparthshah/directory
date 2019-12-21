const express = require('express')
const path = require('path');
const hbs = require('hbs')

const Event = require('./models/events')

const app = express()
const port = process.env.PORT || 3000

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create public directory path
const publicPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './public')
const partialsPath = path.join(__dirname, './public/partials')

// Setup static directory to serve
app.use(express.static(publicPath));
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json())

app.get('', async (req, res) => { // defaults to home page
    const events = await Event.find({})
    res.render('index',events)
});

app.get('/events', async (req,res)=>{
    if(req.query.search)
    {
        const thename=req.query.search.toLowerCase()
        const events = await Event.find({$or:
            [
                {name:{'$regex': thename,$options:'i'}},
                {summary:{'$regex': thename,$options:'i'}},
                {location:{'$regex': thename,$options:'i'}},
                {time:{'$regex': thename,$options:'i'}},
                {cost:{'$regex': thename,$options:'i'}}
        ]})
        res.render('Index',events)
    }
    try{
        const events = await Event.find({})
        res.render('Index',events)
    }catch(e){
        res.status(500).send()
    }
});

app.post('/events', async (req, res) => {
    const event = new Event(req.body)

    try{
        await event.save()
        res.status(201).redirect('back')
    } catch(e){
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})