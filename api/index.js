const express = require('express')
const serverless = require('serverless-http')
const fs = require('fs')
const nj = require('nunjucks')
const path = require('path')
const app = express()
const port = 3000

nj.configure(path.join(__dirname, '..', '/public'), {
	autoescape: true,
	express: app,
})

app.set('view-engine', 'html')

// app.use(express.static(path.join(__dirname, '..', '/public')))

app.get('/', (req, res) => {
	res.render('index.html', {
		message: 'Hello world!!!',
		secondMessage: 'Greetings from the creator'
	})
})

app.get('/blogs', (req, res) => {
	fs.readdir(path.join(__dirname, '..', '/public/blogs'), function(err, files) {
		if(err) return

		res.render('blogs/index.html', {
			blogLists: files.map(function(f) {
				let fName = f.replaceAll('.html', '')

				if(fName !== 'index') {
					return fName
				}
			})
		})
	})
})

app.get('/blogs/:blogId', (req, res) => {
	blogId = req.params.blogId

	res.render(`blogs/${blogId}.html`)
})

app.get('/test', (req, res) => {
	res.render('test.html')
})

app.listen(port, () => {
	console.log(`App running on port ${port}`)
})

module.exports = app
module.exports.handler = serverless(app)
