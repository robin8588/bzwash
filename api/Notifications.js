exports.getAll = function (req, res) {
    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }
    res.type('application/json');
    res.status(200);
    res.json(state.notifications);
};