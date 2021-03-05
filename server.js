// const app = require('express')()
// const bodyParser = require('body-parser')
// const nunjucks = require('nunjucks')
// const Nexmo = require('nexmo')

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// nunjucks.configure('views', { express: app })

// const nexmo = new Nexmo({ 
//   apiKey: 'API KEY FROM DASHBOARD',
//   apiSecret: 'API SECRET FROM DASHBOARD'
// })

// // Other code will go here

// app.listen(3000)


// const Nexmo = require('nexmo');

// const nexmo = new Nexmo({
//   apiKey: process.env.VON_KEY,
//   apiSecret: process.env.VON_SECRET,
// });

// const from = 'UniqueLaurelGlobal';
// const to = '2347080399120';
// const text = 'Hello from Vonage SMS API';

// nexmo.message.sendSms(from, to, text);