
const models = require('./models/index');



//Route pour Get
exports.indexHandler = (req, res) => {
    models.Enclos.count().then(nbe => {
        models.Singe.count().then(nbs => {
            res.render('index.pug', { nbEnclos: nbe , nbSinge: nbs });
     })
    })

}

exports.enclosHandler = (req,res) => {
    models.Enclos.findAll()
	.then((enclos)=> {
		
		res.render('enclos.pug', { EnclosList: enclos })
		
		})
		.catch((err) =>
		{
			res.json(err)
	})

}

exports.enclosDetailHandler = (req,res) => {
	models.Enclos.findOne(
        {
            where: { id: req.params.tagA }
        })
       .then((enclos) => {
         res.render('enclos_detail.pug', {enclos: enclos})
       })
       .catch((err) =>
       {
           res.json(err)
       })
}

exports.SingeHandler = (req,res) => {

    models.Singe.findAll()
	.then((singes)=> {
		res.render("listeSinge", {personList: singes})
		//res.json(singes)
		})
		.catch((err) =>
		{
				res.json(err)
		})

}


exports.SingeDetailHandler = (req,res) => {
    models.Singe.findOne(
        {
            where: { id: req.params.tagA },
        })
       .then((thesinge) => {
           
           res.render("detail", {singe: thesinge})
       })
       .catch((err) => {
         res.json(err)
       })

}


exports.SingesParEnclosHandler = (req,res) => {
	models.Enclos.findOne( 
        {	
            where: { id: req.params.tagA 	},
               
           include: models.Singe
        }).then((theEnclos) => {
       
               res.render('Singes', {personList: theEnclos, enclosAcc: req.params.tagA })
               //res.json(theEnclos);
       })
}

exports.SingeParEnclosHandler = (req,res) => {
	models.Singe.findAll(
        {
            where: { Enclos_ID2: req.params.tagA,
                     id: req.params.tagB
                   }
        })
       .then((singes) => {
         res.json(singes)
       })
       .catch((err) => {
         res.json(err)
       })

}

//Route Pour Post
exports.CreateEnclosHandler = (req,res) => {
    models.Enclos.create({
	  
        name : req.body.name,
        NbreSinge : req.body.NbreSinge,
        ContenanceMax : req.body.ContenanceMax
        
    })
      .then(() => {
        res.render('CreateConfirm.pug')
      })
}

exports.CreateSingesHandler = (req,res) => {
    models.Singe.create({
        username: req.body.username,
        race: req.body.race,
        age: req.body.age,
        nomEnclos: req.body.nomEnclos
        
      })
        .then(() => {
                res.render('CreateConfirm.pug')
        })

}

exports.CreateSingesLinkEnclosHandler = (req,res) => {

    models.Singe.create({
        username: req.body.username,
            race: req.body.race,
            age: req.body.age,
            nomEnclos: req.body.nomEnclos
        
      })
        .then((singe) => {
         models.Enclos.findOne(
         {
             where: { id: req.params.tagA }
         })
        .then((theEnclos) => {
            
            theEnclos.addSinge(singe)
        })
            
            
          res.render('CreateConfirm.pug')
        })
}

//Put Routes
exports.PutSingeHandler = (req,res) => {
    models.Singe.update(
        req.body,
        {
            where: { id : req.params.tagA }
        })
       .then((singes) => {
               res.render('UpdateConfirm.pug')
       })
       .catch((err) =>
       {
           res.json(err)
       })
}

exports.PutEnclosHandler = (req,res) => {
    models.Enclos.update(
        req.body,
        {
            where: { id: req.params.tagA }
        })
       .then((enclos) => {
         res.render('UpdateConfirm.pug')
       })
       .catch((err) =>
       {
           res.json(err)
       })
}

exports.DeleteSingeHandler = (req,res) => {
    models.Singe.destroy({
        where: {
          id : req.params.tagA
        }
      })
        .then((singes) => {
          res.render('DeleteConfirm.pug')
        })
        .catch((err) => {
          res.json(err)
        })
}

exports.DeleteEnclosHandler = (req,res) => {
    models.Singe.destroy({
		where: {  Enclos_ID2 : req.params.tagA }
	}).then(() => {
		
		models.Enclos.destroy({
		where: {  id : req.params.tagA }
		}).then((enclos) => {
		  res.render('DeleteConfirm.pug')
			
		})	  
	})	
}

exports.DeleteSingesLinkEnclosHandler = (req,res) => {
    models.Singe.destroy({
        where: {  Enclos_ID2 : req.params.tagA }
        }).then(() => {
                
          res.render('DeleteConfirm.pug')
                 
        })
        .catch((err) => {
          res.json(err)
        })
}
exports.DeleteSingeLinkEnclosHandler = (req,res) => {
    models.Singe.destroy({
        where: {  id : req.params.tagB }
        }).then(() => {
                
            res.render('DeleteConfirm.pug')
                 
        })
        .catch((err) => {
          res.json(err)
        })
}