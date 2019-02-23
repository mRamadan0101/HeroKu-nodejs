const express = require('express');
const hbs = require('hbs');
const fs =  require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');




app.use((req,res,next)=>{

var now = new Date().toString();

var log = `${now}: ${req.method} ${req.url}`;
fs.appendFile('server.log', log + '\n',(err)=>{

	if (err) {console.log('Unable to handel request')}
});

console.log(log); 
next();

});

// app.use((req,res,next)=>{

// 	res.render('mintain.hbs',{
// 		errortitile:"We'll be back soon!",
// 		errorMessage: 'Sorry for the inconvenience — The Team'
// 	});
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{

	return new Date().getFullYear();
});


hbs.registerHelper('screamIt',(text)=>{

	return text.toUpperCase();

})
app.get('/',(req,res)=>{

	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Hello from Node JS'
		
	});
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
	pageTitle: 'About Page',
	someText: 'Test P in Node JS'
});

});


app.get('/bad',(req,res) => {

	res.send({

			Status:0,
			message:'404 Not found',
			
	});
});

app.listen(3000);