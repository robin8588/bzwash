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
var orders = require('./api/Orders.js');
var positions = require('./api/positions.js');
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

Sandbox.define('/api/orders', 'GET', orders.getAll);

Sandbox.define('/api/orders/{id}', 'GET', orders.getOne);

Sandbox.define('/api/orders', 'POST', orders.addOrder);

Sandbox.define('/api/orders/{id}', 'PUT', orders.updateOrder);

Sandbox.define('/api/positions', 'GET', positions.getAttendances);

Sandbox.define('/api/positions', 'POST', positions.addAttendance);

Sandbox.define('/api/positions', 'PUT', positions.updatePosition);

Sandbox.define('/upload/cars/cover', 'POST', upload.uploadCarCover);

Sandbox.define('/upload/orders/washbefore', 'POST', upload.uploadWashBefore);

Sandbox.define('/upload/orders/washafter', 'POST', upload.uploadWashAfter);














