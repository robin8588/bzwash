exports.getAllCars=function(req, res){
    // Check the request, make sure it is a compatible type
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }
    
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(200);
    
    var cars=[];
    _.forEach(state.cars,function(car){
        cars.push({
        "id": car.id,
        "license": car.license,
        "brand": car.brand,
        "model": car.model,
        "color": car.color,
        "cover":car.cover,
        "level": _.find(state.carWashLevels,{'id':car.levelId}).name
    });
    });
    
    // Send the response body.
    res.json(cars);
};

exports.getACar=function(req, res){
    // Check the request, make sure it is a compatible type
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }
    
    var car=_.find(state.cars,{'id':Number(req.params.id)});
    
    if(car === undefined){
        return res.send(404,'');
    }
    
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(200);
    
    // Send the response body.
    res.json({
        "id": car.id,
        "license": car.license,
        "brand": car.brand,
        "model": car.model,
        "color": car.color,
        "cover":car.cover,
        "level": _.find(state.carWashLevels,{'id':car.levelId}).name
    });
};

exports.addACar=function(req, res){
    // Check the request, make sure it is a compatible type
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }
    
    if(req.body.levelId === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "createCar.levelId": [
                    "levelId 字段是必需的。"
                ]
            }
        });
    }
    
    if(req.body.license === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "createCar.license": [
                    "license 字段是必需的。"
                ]
            }
        });
    }
    
    if(req.body.color === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "createCar.color": [
                    "color 字段是必需的。"
                ]
            }
        });
    }
    
    if(req.body.brand === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "createCar.brand": [
                    "brand 字段是必需的。"
                ]
            }
        });
    }
    
    if(req.body.model === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "createCar.model": [
                    "model 字段是必需的。"
                ]
            }
        });
    }
    
    var newId=_.last(state.cars).id + 1;
    var car={
        "id": newId,
        "license": req.body.license,
        "brand": req.body.brand,
        "model": req.body.model,
        "color": req.body.color,
        "levelId": req.body.levelId,
        "cover":"~/content/cars/"+newId+"/cover.jpg"
    };
    
    state.cars.push(car);
    
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(201);
    
    // Send the response body.
    res.json(car);
};

exports.updateACar=function(req, res){
    // Check the request, make sure it is a compatible type
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }
    
    if(req.body.levelId === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "updateCar.levelId": [
                    "levelId 字段是必需的。"
                ]
            }
        });
    }
    
    if(req.body.license === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "updateCar.license": [
                    "license 字段是必需的。"
                ]
            }
        });
    }
    
    if(req.body.color === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "updateCar.color": [
                    "color 字段是必需的。"
                ]
            }
        });
    }
    
    if(req.body.id === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "updateCar.id": [
                    "id 字段是必需的。"
                ]
            }
        });
    }
    
    if(req.body.brand === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "updateCar.brand": [
                    "brand 字段是必需的。"
                ]
            }
        });
    }
    
    if(req.body.model === undefined){
        return res.send(400,{
            "Message": "请求无效。",
            "ModelState": {
                "updateCar.model": [
                    "model 字段是必需的。"
                ]
            }
        });
    }
    
    if(req.params.id != req.body.id){
        return res.send(400,{
            "Message": "id不匹配"
        });
    }
    
    
    var carIndex=_.findIndex(state.cars,{'id':Number(req.params.id)});
    
    if(carIndex < 0){
        return res.send(404,'');
    }
    
    state.cars[carIndex]=req.body;
    state.cars[carIndex].cover="~/content/cars/"+req.body.id+"/cover.jpg"
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(200);
    
    // Send the response body.
    res.json({
        "id": state.cars[carIndex].id,
        "license": state.cars[carIndex].license,
        "brand": state.cars[carIndex].brand,
        "model": state.cars[carIndex].model,
        "color": state.cars[carIndex].color,
        "cover":state.cars[carIndex].cover,
        "level": _.find(state.carWashLevels,{'id':state.cars[carIndex].levelId}).name
    });
};

exports.delACar=function(req, res) {
    
    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }
    
    var car=_.find(state.cars,{'id':Number(req.params.id)});
    
    if(car === undefined){
        return res.send(404,'');
    }
    
    _.pull(state.cars,car);
    
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.send(200,'');
};
