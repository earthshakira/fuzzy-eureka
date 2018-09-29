angular.module('ecommerceApp').directive('employee', function() {
  var directive = {};
  directive.restrict = 'E';
  directive.template = "employee: <b>{{employee.name}}</b> , Id: <b>{{employee.id}}</b>";

  directive.scope = {
    employee: "=name"
  }

  directive.compile = function(element, attributes) {
    element.css("border", "1px solid #cccccc");

    return function($scope, element, attributes) {
      element.html("Employee: <b>"+$scope.employee.name +"</b> , Id: <b>"+$scope.employee.id+"</b><br/>");
      element.css("background-color", "#ffffff");
    };
  }
  return directive;
});
