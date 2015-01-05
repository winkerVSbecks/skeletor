'use strict';

angular.module('cssStats', [])
  .controller('statsCtrl', [
    'statsBuilder',
    'charts',
  function(statsBuilder, charts) {

    var vm = this;

    var buildGraphs = function() {
      charts.totalVsUnique(vm.uniquesGraph);
      charts.specificityGraph(vm.specificityGraph);
      charts.rulesizeGraph(vm.rulesizeGraph);
    };

    statsBuilder.init()
      .then(function(model) {

        vm.rulesizeGraph = model.rulesizeGraph;
        vm.specificityGraph = model.specificityGraph;
        vm.stats = model.stats;
        vm.uniques = model.uniques;
        vm.uniquesGraph = model.uniquesGraph;

        buildGraphs();
      });
  }])
  .filter('filesize', function () {
    return function (size) {
      if (isNaN(size))
        size = 0;

      if (size < 1024)
        return size + ' Bytes';

      size /= 1024;

      if (size < 1024)
        return size.toFixed(2) + ' Kb';

      size /= 1024;

      if (size < 1024)
        return size.toFixed(2) + ' Mb';

      size /= 1024;

      if (size < 1024)
        return size.toFixed(2) + ' Gb';

      size /= 1024;

      return size.toFixed(2) + ' Tb';
    };
  });