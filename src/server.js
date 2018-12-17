const express = require('express')
const bodyParser = require('body-parser');
const path = require("path")
const morgan = require('morgan');
const app = express()
const models = require('./models/index');
const methodOverride = require('method-override')

const Routes = require('./routes');
const MiddleWare = require('./MiddleWare');
app.set('views' , path.join(__dirname, 'view' ));
app.set('view engine', "pug");


// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

// Add a bit of logging
app.use(morgan('short'))






//Get
app.get('/', Routes.indexHandler )
app.get('/enclos', Routes.enclosHandler )
app.get('/enclos/:tagA', Routes.enclosDetailHandler)
app.get('/singes', Routes.SingeHandler)
app.get('/singes/:tagA',Routes.SingeDetailHandler)
app.get('/enclos/:tagA/singes',Routes.SingesParEnclosHandler)
app.get('/enclos/:tagA/singes/:tagB', Routes.SingeParEnclosHandler)
//post

app.post('/enclos',[NotEmptyEnclos],Routes.CreateEnclosHandler)
app.post('/singes',[NotEmptySinge] , Routes.CreateSingesHandler)
app.post('/enclos/:tagA/singes',[addsinge,NotEmptySinge] ,Routes.CreateSingesLinkEnclosHandler )

//put
app.put('/singes/:tagA', Routes.PutSingeHandler)
app.put('/enclos/:tagA', Routes.PutEnclosHandler)

//delete
app.delete('/singes/:tagA', Routes.DeleteSingeHandler)
app.delete('/enclos/:tagA',Routes.DeleteEnclosHandler)
app.delete('/enclos/:tagA/singes/', Routes.DeleteSingesLinkEnclosHandler)
app.delete('/enclos/:tagA/singes/:tagB',  [removesinge] ,Routes.DeleteSingeLinkEnclosHandler )





function NotEmptyEnclos(req,res,next){
	if(
		 req.body.name != "" &&
	   req.body.NbreSinge != null &&
	   req.body.ContenanceMax != null
	)
	{
		next();
	}
	else
	{
		res.json(404)
	}

}


function NotEmptySinge(req,res,next){
		if(
			 req.body.username != ""&&
			 req.body.race != ""&&
			 req.body.age != ""&&
			 req.body.nomEnclos != ""
		)
		{
			next();
		}
		else
		{
			res.json(404)
		}

}



function addsinge(req,res,next){
		
		
  models.Enclos.findOne(
	 {
		 
		 where: { id: req.params.tagA }
	 })
	.then((enclos) => {
		if(enclos.NbreSinge < enclos.ContenanceMax )
		{	
			var result = 	(enclos.NbreSinge +1)
				enclos.update(
				{NbreSinge: result},
			)
				.then(() => {
						
						next();
				})
				.catch((err) =>
				{
					res.json(err)
				})
			
		}
		else
		{
			res.json("l'enclos est plein");
		}
	
	
  })
		.catch((err) =>
	{
		res.json(err)
	})
			
}



function removesinge(req,res,next){
		
		
  models.Enclos.findOne(
	 {
		 
		 where: { id: req.params.tagA }
	 })
	.then((enclos) => {

			var result = 	(enclos.NbreSinge -1)
				enclos.update(
				{NbreSinge: result},
			)
				.then(() => {
						
						next();
				})
				.catch((err) =>
				{
					res.json(err)
				})
	
  })
		.catch((err) =>
	{
		res.json(err)
	})
			
		
}




// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   * 
   * Listen only when database connection is sucessfull
   */
  app.listen(process.env.PORT, function() {
    console.log('Express server listening on port ' + process.env.PORT);
  });
});
