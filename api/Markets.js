exports.getAll = function (req, res) {
    res.type('application/json');

    // Set the status code of the response.
    res.status(200);

    res.json(state.markets);
};

exports.getOne = function (req, res) {
    res.type('application/json');

    // Set the status code of the response.
    res.status(200);

    var market = _.find(state.markets, { "id": Number(req.params.id) });
    res.json(market);
};