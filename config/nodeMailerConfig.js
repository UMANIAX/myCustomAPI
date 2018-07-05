const nodemailer = require('nodemailer')
const theKeys = require('../keys')

let mailFunc = {}

mailFunc.sendMail = function (mailTo, mailFrom, content, subject) {

    let transporter = nodemailer.createTransport({
	  host: 'smtp.sendgrid.net',
	  port: 465,
	  auth: {
	    user: 'apikey',
	    pass: theKeys.sendgridId
	  }
	})

	let mailOptions = {
	  from: mailFrom,
	  to: mailTo,
	  subject: subject,
	  text: content
	}

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response)
	  }
	})
}

module.exports = mailFunc

