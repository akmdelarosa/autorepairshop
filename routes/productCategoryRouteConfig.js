function productCategoryRouteConfig(app) {
  this.app = app;
  this.routeTable = [];
  this.init();
}

productCategoryRouteConfig.prototype.init = function () {
  var self = this;
  this.addRoutes();
  this.processRoutes();
}

productCategoryRouteConfig.prototype.processRoutes = function () {
  var self = this;
  self.routeTable.forEach(function (route) {
    if (route.requestType == 'get') {
      self.app.get(route.requestUrl, route.callbackFunction);
    }
    else if (route.requestType == 'post') { }
    else if (route.requestType == 'delete') { }
  });
}

productCategoryRouteConfig.prototype.addRoutes = function () {
  var self = this;


  self.routeTable.push({
    requestType : 'get',
    requestUrl : '/createProductCategory',
    callbackFunction : function (request, response) {
      response.render('createProductCategory', { title : "Create Product Category" })
    }
  });
  
  self.routeTable.push({
    requestType : 'post',
    requestUrl : '/createProductCategory',
    callbackFunction : function (request, response) {
      
      var productCategoryModel = require('../server/model/productCategoryModel.js');

      console.log(request.body);

      productCategoryModel.productCategoryModel.createProductCategory(request.body,
        function (status) {
        response.json(status);
        console.log(status);
      });
    }
  });

  self.routeTable.push({
    requestType : 'get',
    requestUrl : '/viewProductCategory',
    callbackFunction : function (request, response) {
      response.render('viewProductCategory', { title : "View Product Category" })
    }
  });

  self.routeTable.push({
    requestType : 'get',
    requestUrl : '/getAllProductCategory',
    callbackFunction : function (request, response) {
      var productCategoryModel = require('../server/model/productCategoryModel.js');
      productCategoryModel.productCategoryModel.getAllProductCategory (
        function (productCategories) {
          console.log(productCategories);
          response.json({ productCategories : productCategories });
        });
    }
  });

  self.routeTable.push({
    requestType : 'get',
    requestUrl : '/editProductCategory/:productCategoryId',
    callbackFunction : function (request, response) {
      response.render('editProductCategory', { title : "Edit Product Category" })
    }
  });
}

module.exports = productCategoryRouteConfig;