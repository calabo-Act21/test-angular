(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', '$http', '$scope', 'exception', 'logger'];
  /* @ngInject */
  function DashboardController($q, $http, $scope, exception, logger) {
    var vm = this;
    vm.peopleArray = [];
    vm.title = 'Dashboard';

    activate();

    function activate() {
      var promises = [getPeople()];
      return $q.all(promises).then(function () {
        logger.info('Activated Dashboard View');
      });
    }

    function getPeople() {
      return $http.get('/api/people')
        .then(function (response) {
          vm.peopleArray = response.data;
          return vm.peopleArray;
        })
        .catch(function (e) {
          return exception.catcher('XHR Failed for getPeople')(e);
        });
    }

    $scope.deletePeople = function (people) {
      return $http.delete('/api/people/' + people.id)
        .then(function (response) {
          if (response.data.success) {
            for (var i = 0; i < this.peopleArray.length; i++) {
              var element = this.peopleArray[i];
              if (element == people) {
                this.peopleArray.splice(i, 1);
              }
            }
          }
        })
        .catch(function (e) {
          return exception.catcher('XHR Failed for delete people with id = ' + people.id)(e);
        });
    };
  }
})();
