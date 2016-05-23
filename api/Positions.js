exports.addAttendance = function (req, res) {
    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }

    if (req.body.address === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "dto.address": [
                    "address 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.lng === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "dto.lng": [
                    "lng 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.lat === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "dto.lat": [
                    "lat 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.carId === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "dto.type": [
                    "type 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.type == 1 || req.body.type == 2) {
        var now = new Date()
        var attendance = {
            "address": req.body.address,
            "lng": req.body.lng,
            "lat": req.body.lat,
            "type": req.body.type,
            "date": now.toString()
        };
        state.attendances.push(attendance);
        res.send(200, "");

    } else {
        res.send(401, {
            "Message": "位置类型错误"
        });
    }
}

exports.updatePosition = function (req, res) {
    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }

    if (req.body.address === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "dto.address": [
                    "address 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.lng === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "dto.lng": [
                    "lng 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.lat === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "dto.lat": [
                    "lat 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.carId === undefined) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "dto.type": [
                    "type 字段是必需的。"
                ]
            }
        });
    }

    if (req.body.type == 0) {
        var now = new Date()
        var position = {
            "address": req.body.address,
            "lng": req.body.lng,
            "lat": req.body.lat,
            "type": req.body.type,
            "date": now.toString()
        };
        state.positions.push(position);
        res.send(200, "");

    } else {
        res.send(401, {
            "Message": "位置类型错误"
        });
    }
}

exports.getAttendances = function (req, res) {
    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }

    res.type('application/json');

    res.status(200);

    var attendances = [];
    _.forEach(state.attendances, function (attendance) {
        attendances.push({
            "address": attendance.address,
            "type": attendance.type,
            "date": attendance.date
        });
    });

    res.json(attendances);
}