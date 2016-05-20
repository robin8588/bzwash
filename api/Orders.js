exports.getAll = function (req,res) {
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }

    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }

    res.type('application/json');

    res.status(200);

    var orders = [];
    _.forEach(state.orders, function (order) {
        orders.push({
            "id": order.OrderId,
            "orderNo": order.OrderNumber,
            "license": order.License,
            "services": order.ServiceNames,
            "park": order.Park,
            "create": order.Create,
            "status": order.Status
        });
    });

    res.json(orders);
};

exports.getOne = function (req, res) {
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }

    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }

    var order = _.find(state.orders, { 'OrderId': Number(req.params.id) });

    if (order === undefined) {
        return res.send(404, '');
    }

    res.type('application/json');

    res.status(200);

    res.json({
        "id": order.OrderId,
        "orderNo": order.OrderNumber,
        "park": order.Park,
        "carType": order.Brand+" "+order.Model,
        "color": order.Color,
        "license": order.License,
        "carImg": order.Cover,
        "note": order.Note,
        "services": order.ServiceNames,
        "lng": order.Longitude,
        "lat": order.Latitude,
        "create": order.Create,
        "arrange": order.Arrange,
        "start": order.Start,
        "finish": order.Finish,
        "startImg": order.StartImg,
        "finishImg": order.FinishImg,
        "status": order.Status,
        "comment": order.Comment,
        "doNotDisturb": order.DoNotDisturb,
        "customerMobile": order.CustomerMobile
    });
};

exports.addOrder = function (req, res) {
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }

    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }

    if (req.body.carId === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "createOrder.carId": [
                    "carId 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.park === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "createOrder.park": [
                    "park 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.lng === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "createOrder.lng": [
                    "lng 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.lat === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "createOrder.lat": [
                    "lat 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.doNotDisturbe === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "createOrder.doNotDisturbe": [
                    "doNotDisturbe 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.serviceIds === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "createOrder.serviceIds": [
                    "serviceIds 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.note === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "createOrder.note": [
                    "note 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.marketId === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "createOrder.marketId": [
                    "marketId 字段是必需的。"
                ]
            }
        });
    }

    var car = _.find(state.cars, { 'id': Number(req.body.carId) });
    if (car === undefined) {
        return res.send(404, "");
    }

    var carWashLevel = _.find(state.carWashLevels, { 'id': Number(car.levelId) });
    if (carWashLevel === undefined) {
        return res.send(404, "");
    }

    var market = _.find(state.markets, { 'id': Number(req.body.carId) });
    if (market === undefined) {
        return res.send(404, "");
    }

    var newId = _.last(state.orders).id + 1;
    var now = new Date();

    var order = {
        "OrderId": newId,
        "OrderNumber": now.getTime(),
        "Park": req.body.park,
        "Longitude": req.body.lng,
        "Latitude": req.body.lat,
        "Create": now.toString(),
        "Arrange": null,
        "Start": null,
        "Finish": null,
        "StartImg": null,
        "FinishImg": null,
        "Comment": null,
        "Note": req.body.note,
        "DoNotDisturb": req.body.doNotDisturb,
        "Status": 0,
        "MarketId": market.id,
        "MarketName": market.name,
        "CarId": car.id,
        "License": car.license,
        "Brand": car.brand,
        "Model": car.model,
        "Color": car.color,
        "Cover": car.cover,
        "CarWashLevelId": carWashLevel.id,
        "CarWashLevelName": carWashLevel.name,
        "CustomerId": 1,
        "CustomerTitle": "王先生",
        "CustomerMobile": "15800000000",
        "CustomerBalance": 500,
        "MemberLevelId": 1,
        "MemberLevelName": "非会员",
        "ServiceIds": req.body.services,
        "ServiceNames": "内饰＋外饰",
        "ServicePrices": 50,
        "WorkerId": 0,
        "WorkerName": null,
        "WorkerMobile": null
    };

    state.orders.push(order);
    res.type('application/json');
    res.status(201);
    res.json(order);
};

exports.updateOrder = function (req, res) {
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }

    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }

    if (req.body.id === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "updateOrder.id": [
                    "id 字段是必需的。"
                ]
            }
        });
    }

    if (req.params.id != req.body.id) {
        return res.send(400, {
            "Message": "id不匹配"
        });
    }


    var orderIndex = _.findIndex(state.orders, { 'id': Number(req.params.id) });

    if (orderIndex < 0) {
        return res.send(404, '');
    }

    if (state.orders[orderIndex].Status == 1) {
        state.orders[orderIndex].Status = 2;
        state.orders[orderIndex].StartImg = req.body.startImg;
        state.orders[orderIndex].Start = new Date();
        res.status(200);
        return res.json(state.orders[orderIndex]);
    } else if (state.orders[orderIndex].Status == 2) {
        state.orders[orderIndex].Status = 3;
        state.orders[orderIndex].FinishImg = req.body.finishImg;
        state.orders[orderIndex].Finish = new Date();
        res.status(200);
        return res.json(state.orders[orderIndex]);
    } else if (state.orders[orderIndex].Status == 3) {
        state.orders[orderIndex].Status = 4;
        state.orders[orderIndex].Comment = req.body.comment;
        res.status(200);
        return res.json(state.orders[orderIndex]);
    }
    res.send(304, '');
};