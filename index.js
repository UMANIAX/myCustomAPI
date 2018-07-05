const express = require('express')
const app = express()
const keys = require('./keys')
const mailer = require('./config/nodeMailerConfig')
const bodyParser = require('body-parser')

// some middlleware
app.use(bodyParser.urlencoded({extended: true}))

// port
app.listen(process.env.PORT || 3000)

//for CORS
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://umangpahwa.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/sendMail', function (req, res) {

    let userData

    for (let key in req.body)
        userData = JSON.parse(key)

    if (userData.accessKey !== keys.incoming)
        return res.send("Don't Force In")

    const mailFrom = userData.mailFrom,
        mailTo = userData.mailTo,
        content = userData.content,
        subject = userData.subject

    mailer.sendMail(mailTo, mailFrom, content, subject)
    res.send("Job Done")
})

app.get('/', function (req, res) {

    res.send(`It's Up!`)
})

app.get('*', function (req, res) {

    res.send('invalid')
})