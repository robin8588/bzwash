exports.uploadCarCover=function(req, res){
    if(!req.is('multipart/form-data'))
    {
        return res.send(415,'');
    }
    
    if(req.query.file ===undefined){
        return res.json(400,{"Message": "没有图片"});
    }
    
    if(req.query.id ===undefined){
        return res.json(400,{"Message": "没有ID"});
    }
    
    res.type('application/json');
    res.status(200);
    res.json({
        "path": "~/content/cars/" + req.query.id + "/cover.jpg"
    });
};

exports.uploadWashBefore=function(req, res){
    if(!req.is('multipart/form-data'))
    {
        return res.send(415,'');
    }
    
    if(req.query.file ===undefined){
        return res.json(400,{"Message": "没有图片"});
    }
    
    if(req.query.id ===undefined){
        return res.json(400,{"Message": "没有ID"});
    }
    
    res.type('application/json');
    res.status(200);
    res.json({
        "path": "~/content/orders/" + req.query.id + "/washbefore.jpg"
    });
};

exports.uploadWashAfter=function(req, res){
    if(!req.is('multipart/form-data'))
    {
        return res.send(415,'');
    }
    
    if(req.query.file ===undefined){
        return res.json(400,{"Message": "没有图片"});
    }
    
    if(req.query.id ===undefined){
        return res.json(400,{"Message": "没有ID"});
    }
    
    res.type('application/json');
    res.status(200);
    res.json({
        "path": "~/content/orders/" + req.query.id + "/washafter.jpg"
    });
};