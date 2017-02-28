let express = require('express');
let app = express();

let port = process.env.PORT || 3000;
app.set('port', port);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req,res){	
	res.sendFile(__dirname + '/public/index.html');
});


app.listen(app.get('port'), function(err){
	console.log(`Now listening on port ${app.get('port')}`);
});