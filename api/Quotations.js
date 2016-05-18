exports.getAll = function (req, res) {

    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }

    if (req.query.carId === undefined) {
        return res.send(404, '');
    }

    var car = _.find(state.cars, { 'id': Number(req.query.carId) });

    if (car === undefined) {
        return res.send(404, '');
    }

    if (req.query.marketId === undefined) {
        return res.send(404, '');
    }

    var market = _.find(state.markets, { 'id': Number(req.query.marketId) });

    if (market === undefined) {
        return res.send(404, '');
    }

    res.type('application/json');
    res.status(200);
    res.json(state.quotations);
};