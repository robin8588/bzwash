exports.getAll = function (req, res) {
    res.type('application/json');
    res.status(200);
    res.json(state.activities);
};

exports.getOne = function (req, res) {
    var activity = _.find(state.activities, { "id": Number(req.params.id) });
    if (activity === undefined) {
        return res.send(404, '');
    }
    res.type('application/json');
    res.status(200);
    res.json(activity);
};