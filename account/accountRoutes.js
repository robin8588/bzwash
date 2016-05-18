exports.register=function(req, res){
    // Check the request, make sure it is a compatible type
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    if (req.body.password != req.body.confirmPassword) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "model.ConfirmPassword": [
                    "密码和确认密码不匹配。"
                ]
            }
        });
    }
    
    state.users = state.users || [];
    
    if (_.findIndex(state.users, ['mobile', req.body.mobile]) >= 0) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "": [
                    "名称  已被使用。"
                ]
            }
        });
    }
    
    state.users.push(req.body);
    
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(200);
    
    // Send the response body.
    res.send('');
};

exports.changePassword=function(req,res){
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }
    
    if (!req.get('Authorization')) {
        return res.send(401, {
            "Message": "已拒绝为此请求授权。"
        });
    }
    
    if (req.body.newPassword != req.body.confirmPassword) {
        return res.send(400, {
            "Message": "请求无效。",
            "ModelState": {
                "model.confirmPassword": [
                    "密码和确认密码不匹配。"
                ]
            }
        });
    }
    
    res.type('application/json');
    
    res.status(200);
    
    res.send('');
};

exports.logout=function(req,res){
    res.send(200,'');
};