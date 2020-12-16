(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customCustomTablePagination', function() {
    return {
      controllerAs: 'ctrl',
      controller: /**
 * The controller is a JavaScript function that augments the AngularJS scope and exposes functions that can be used in the custom widget template
 * 
 * Custom widget properties defined on the right can be used as variables in a controller with $scope.properties
 * To use AngularJS standard services, you must declare them in the main function arguments.
 * 
 * You can leave the controller empty if you do not need it.
 */
function LastTableCtrl($scope, $filter) {

    this.isArray = Array.isArray;
    $scope.filterList = [];
    this.isClickable = function () {
      return $scope.properties.isBound('selectedRow');
    };
    
    this.selectRow = function (row) {
      if (this.isClickable()) {
        $scope.properties.selectedRow = row;
      }
    };
    
   $scope.$watch('search', function (term) {
      var obj = term;
      
      $scope.filterList = $filter('filter')($scope.properties.content, obj);
      $scope.currentPage = 1;
    }); 
   
    $scope.sort = function(name)
    {
        console.log(name);
        $scope.sortKey = name;
        $scope.reverse = !$scope.reverse;
    };
    
    this.isSelected = function(row) {
      return angular.equals(row, $scope.properties.selectedRow);
    };
    
  },
      template: '<div class="table-responsive">\n    <input \n    class="form-control" \n    ng-model = "search" \n    type="text" placeholder="Search">\n    <br>\n<table class="table table-striped" ng-class="{\'table-hover\': ctrl.isClickable()}">\n        <thead>\n            <tr>\n                <th ng-repeat="header in properties.headers"  ng-click="sort(properties.columnsKey[$index])">\n                    {{ header | uiTranslate }}\n                    <span class="glyphicon sort-icon" ng-show="sortKey==properties.columnsKey[$index]" ng-class="{\'glyphicon-chevron-up\':reverse, \'glyphicon-chevron-down\':!reverse}"></span>\n                </th>\n            </tr>\n        </thead>\n        <tbody ng-if="ctrl.isArray(properties.content) && ctrl.isArray(properties.columnsKey)">\n            <tr dir-paginate="row in filterList.length == undefined ? properties.content : filterList | orderBy:sortKey:reverse | itemsPerPage: properties.itemsPerPage | filter : search" ng-click="ctrl.selectRow(row)" ng-class="{\'info\': ctrl.isSelected(row)}" pagination-id="people">\n                <td ng-repeat="column in properties.columnsKey track by $index" >\n                    {{ $eval(column, row) | uiTranslate }}\n                </td>\n            </tr>\n        </tbody>\n        <tbody ng-if="ctrl.isArray(properties.content) && !ctrl.isArray(properties.columnsKey)">\n            <tr dir-paginate="row in properties.content" ng-click="ctrl.selectRow(row)" ng-class="{\'info\': ctrl.isSelected(row)}">\n                <td> {{ row | uiTranslate }} </td>\n            </tr>\n        </tbody>\n    </table>\n    <dir-pagination-controls pagination-id="people" class="pull-right"></dir-pagination-controls>\n</div>\n'
    };
  });
