angular.module('app').controller('cityCtrl', function ($scope, cityFactory) {
    this.cities = cityFactory.getCities();
    this.propertyName = 'temp';
    this.getWeather = function () {
        var _weather = this.weather;
        if (!_weather == '') {
            $.get('http://api.openweathermap.org/data/2.5/weather?q=' + _weather + '&units=imperial&appid=3761fa3e3ac15273740c5f92057f5976', function (weather) {
                cityFactory.pushWeather(weather);
                $scope.$apply();
            }, "json");
        } else {
            alert('Input something');
        }
        this.weather = '';
        getMin();
    };
    function getMin() {
        setInterval(function () {
            cityFactory.getMin();
            $scope.$apply();
        }, 1000);
    };
    this.visited = function (cities) {
        cityFactory.visited(cities);
    };
    this.toVisit = function (cities) {
        cityFactory.toVisit(cities);
    };
    this.clear = function () {
        localStorage.clear();
        location.reload();
    };
    this.delete = function (del) {
        cityFactory.delete(del);
    };
    if (localStorage.length !== 0) {
        cityFactory.pushTo();
        getMin();
    };
    this.refresh = function () {
        location.reload();
    };
    this.sortBy = function (propertyName) {
        this.reverse = (this.propertyName === propertyName) ? !this.reverse : true;
        this.propertyName = propertyName;
    };
    if (localStorage.length == 0) {
        this.container = false;
        this.startApp = true;
        this.start = function () {
            this.container = true;
            this.startApp = false;
        };
    } else {
        this.container = true;
        this.startApp = false;
    };
});
