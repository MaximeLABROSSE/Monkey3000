exports.InformationEnclosChecker = (req, res) => {
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

exports.InformationSingeChecker = (req, res) => {
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

exports.addSinge = (req, res) => {

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

exports.removesinge = (req, res) => {
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