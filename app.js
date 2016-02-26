'use strict'

var express = require('express')

var app = express()
app.set('port', 3000)
app.use(express.static('public'))

app.listen(app.get('port'), () => {
  console.log('Chat Server listening on port ' + app.get('port'))
})