'use strict'
let parse    = require('co-body'),
	_            = require('lodash'),
	USER_SCHEMA  = ['email', 'password'],
	mailOptions  = {
		from: 'Nark Narkingston <nark@nark.nark>',
	},
	jwt	= require('jsonwebtoken'),
	generatePassword = require('password-generator')

module.exports = main

function main() {
	let nark = this
	nark.router.post('/reset',reset)
	nark.router.post('/register',register)

	function* reset() {
		let newPassword = generatePassword(),
			body = yield parse(this),
			user = yield nark.User.findByEmail(body.email)
		if (!user.length) {
			this.throw(401, 'Couldn\'t find your email')
		} else {
			mailOptions.to = user.email
			mailOptions.subject = 'Password for Nark Reset'
			mailOptions.text = 'Hi,\n\nYour password was reset.\n\n' +
				'Your new password is ' + newPassword + '.\n\nNark'
			mailOptions.html = 'Hi,<br><br>Your password was reset.<br><br>'+
				'Your new password is ' + newPassword + '.<br><br>Nark'
			nark.transporter.sendMail(mailOptions,function(error, info) {
				if (error) {
					return console.log(error)
				}
				console.log('Message sent: ' + info.response)
			})
			user.password = newPassword
			user.save()
			this.body = 'saved password'
		}
	}

	function* register() {
		let that = this
		let body = yield parse(this),
			credentials = _.pick(body,USER_SCHEMA),
			user = new nark.User(credentials)
			yield user.hashPassword()
		yield user.save().then(function(result) {
			mailOptions.to = result.email
			mailOptions.subject = 'Password for Nark Reset'
			mailOptions.text = 'Hi,\n\nYou are now narkoleptic!\n\n' +
				'Thanks for joining us. We hope you\'ll be very satisfied.\n\nNark'
			mailOptions.html = 'Hi,<br><br>Your are now a narkophiliac!<br><br>' + 
				'Thanks for joining us. We hope you will be very satisfied.<br><br>Nark'
			this.transporter.sendMail(mailOptions,function(error, info) {
				if (error) {
					return console.log(error)
				}
				console.log('Message sent: ' + info.response)
			})
		}).error(function(error) {
			console.log(error)
			return that.throw(401, 'A user has already been registered with that email')
		})
		this.body = {
			token: jwt.sign(credentials, nark.config.secret)
		}
	}
}

