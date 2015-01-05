'use strict';

angular.module('cssStats')
  .factory('charts', [
  function() {

    var service = {};

    service.totalVsUnique = function(ug) {
      var data = {
        labels: ['Width', 'Height', 'Margin', 'Padding', 'Colour', 'Background Colour'],
        series: [
          [ug.width.total, ug.height.total, ug.margin.total, ug.padding.total, ug.color.total, ug.backgroundColor.total],
          [ug.width.unique, ug.height.unique, ug.margin.unique, ug.padding.unique, ug.color.unique, ug.backgroundColor.unique]
        ]
      };

      var options = {
        seriesBarDistance: 60,
        high: ug.max,
        low: 0,
        axisX: {
          showGrid: false
        },
        centerBars: true
      };

      new Chartist.Bar('.totalVsUnique', data, options)
            .on('draw', function(data) {
              if(data.type === 'bar') {
                data.element.attr({
                  style: 'stroke-width: 40px'
                });
              }
            });
    };

    service.specificityGraph = function(ug) {
      var data = {
        labels: [],
        series: [ ug ]
      };

      var options = {
        axisX: {
          showGrid: false
        }
      };

      new Chartist.Bar('.specificityGraph', data, options)
            .on('draw', function(data) {
              if(data.type === 'bar') {
                data.element.attr({
                  style: 'stroke-width: 2px'
                });
              }
            });
    };

    service.rulesizeGraph = function(ug) {
      var data = {
        labels: [],
        series: [ ug ]
      };

      var options = {
        axisX: {
          showGrid: false
        }
      };

      new Chartist.Bar('.rulesizeGraph', data, options)
            .on('draw', function(data) {
              if(data.type === 'bar') {
                data.element.attr({
                  style: 'stroke-width: 2px'
                });
              }
            });
    };

    return service;
  }]);