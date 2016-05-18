/**
 * BZWash API Sandbox
 * 
 */
var startUp = require('./startup.js');
var cars = require('./api/Cars.js');
var account = require('./api/Account.js');
var customer = require('./api/Customers.js');
var market = require('./api/Markets.js');
var carWashLevel = require('./api/CarWashLevels.js');
var quotation = require('./api/Quotations.js');
var activities = require('./api/Activities.js');
var notifications = require('./api/Notifications.js');
var upload = require('./upload/Upload.js');

Sandbox.define('/appStartUp', 'GET', startUp.seed);

Sandbox.define('/token', 'POST', account.token);

Sandbox.define('/api/account/register', 'POST', account.register);

Sandbox.define('/api/account/changepassword', 'POST', account.changePassword);

Sandbox.define('/api/account/logout', 'POST', account.logout);

Sandbox.define('/api/cars', 'POST', cars.addACar);

Sandbox.define('/api/cars/{id}', 'PUT', cars.updateACar);

Sandbox.define('/api/cars/{id}', 'GET', cars.getACar);

Sandbox.define('/api/cars', 'GET', cars.getAllCars);

Sandbox.define('/api/cars/{id}', 'DELETE', cars.delACar);

Sandbox.define('/api/customers', 'GET', customer.getCustomer);

Sandbox.define('/api/customers', 'POST', customer.updateCustomer);

Sandbox.define('/api/markets', 'GET', market.getAll);

Sandbox.define('/api/markets/{id}', 'GET', market.getOne);

Sandbox.define('/api/carwashlevels', 'GET', carWashLevel.getAll);

Sandbox.define('/api/servicequotations', 'GET', quotation.getAll);

Sandbox.define('/api/activities', 'GET', activities.getAll);

Sandbox.define('/api/activities/{id}', 'GET', activities.getOne);

Sandbox.define('/api/notifications', 'GET', notifications.getAll);

Sandbox.define('/upload/cars/cover', 'POST', upload.uploadCarCover);

Sandbox.define('/upload/orders/washbefore', 'POST', upload.uploadWashBefore);

Sandbox.define('/upload/orders/washafter', 'POST', upload.uploadWashAfter);




// Using stateful behaviour to simulate getting all users
Sandbox.define('/orders', 'GET', function (req, res) {
    // retrieve orders or, if there are none init, to empty array
    state.orders = state.orders || [];

    return res.json(state.orders);
});

// Using named route parameters to simulate getting a specific user
Sandbox.define('/order/{id}', 'GET', function (req, res) {
    // retrieve users or, if there are none, init to empty array
    state.orders = state.orders || [];

    // route param {username} is available on req.params
    var id = req.params.id;

    // log it to the console
    console.log("Getting order " + id + " details");

    // use lodash to find the user in the array
    var order = _.find(state.orders, {
        "id": Number(id)
    });

    return res.json(order);
});





Sandbox.define('/balance', 'GET', function (req, res) {

    // Set the type of response, sets the content type.
    res.type('application/json');

    // Set the status code of the response.
    res.status(200);

    // Send the response body.
    res.json({
        "balance": 200
    });
});

Sandbox.define('/addorder', 'POST', function (req, res) {
    // Check the request, make sure it is a compatible type
    if (!req.is('application/json')) {
        return res.send(400, 'Invalid content type, expected application/json');
    }

    // retrieve orders or, if there are none, init to empty array
    state.orders = state.orders || [];


    var order = {
        address: "陕西省西安市", //地址
        lat: "131.1", //纬度
        lng: "128.3", //经度
        carId: 1, //所选车辆ID
        serviceIds: "1,2,3,4", //所选服务ID
        disturb: 1 // 打扰方式（0:不打扰；1:电话;2:短信)
    };

    order = req.body;

    order.status = "下单成功";
    var now = new Date();
    order.createDate = now.toString();
    order.orderNumber = now.getTime();
    order.id = _.last(state.orders).id + 1;

    // persist user by adding to the state object
    state.orders.push(order);

    // Set the type of response, sets the content type.
    res.type('application/json');

    // Set the status code of the response.
    res.status(201);

    // Send the response body.
    res.json(order
    );
});







