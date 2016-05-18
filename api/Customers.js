exports.getCustomer = function (req, res) {
    if (req.get('Authorization') == 'undefined') {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }

    // Set the type of response, sets the content type.
    res.type('application/json');

    // Set the status code of the response.
    res.status(200);

    res.json(state.customer);
};

exports.updateCustomer = function (req, res) {
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }

    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }

    if (req.body.name === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "updateCustomer.name": [
                    "name 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.gender === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "updateCustomer.gender": [
                    "gender 字段是必需的。"
                ]
            }
        });
    }

    state.customer = state.customer || {};

    state.customer.name = req.body.name;

    if (req.body.gender === 0) {
        state.customer.gender = "先生";
    } else {
        state.customer.gender = "";
    }

    if (req.body.birthday !== undefined) {
        state.customer.birthday = req.body.birthday;
    }

    res.type('application/json');

    // Set the status code of the response.
    res.status(200);

    res.json(state.customer);
};