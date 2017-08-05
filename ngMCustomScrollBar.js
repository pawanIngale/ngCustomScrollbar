/// <reference path="D:\R&D\MCustomScrollBarDirective\MCustomScrollBarDirective\MCustomScrollBarDirective\angular.js" />
/**
 * @name ngMCustomScrollBarModule
 * @description
 *
 * # ngMCustomScrollBarModule
 *
 * The `ngMCustomScrollBarModule` module provides a support to configure your scrollbar(s).
 * Highly customizable custom scrollbar jQuery plugin which has been transformed into a angular directive.
 * File dependencies "jquery.mCustomScrollbar.min.css", "jquery-<version>.js", "jquery.mCustomScrollbar.concat.js"

 * 
 * ## Example
 * <link href="jquery.mCustomScrollbar.min.css" rel="stylesheet" />
 * <script src="jquery-1.11.3.js"></script>
 * <script src="jquery.mCustomScrollbar.concat.min.js"></script>
 * angular.module('test',['ngMCustomScrollBarModule']);
 * <div ng-m-custom-scroll ng-scroll-config="customScroll" ng-custom-scroll-id="" ng-custom-scroll-class=""></div>
 * 
 * 1)  ng-m-custom-scroll attribute to initialize the mcustomscollbar.
 * 2)  ng-scroll-config attribute to contains the object which user has to set for mcustomscrollbar.
 * 3)  ng-custom-scroll-id <optional> attribute to contains the id on which customscroll bar needs to display.
 * 4)  ng-custom-scroll-class <optional> attribute to contains the class name on which customscroll bar needs to display.
 */

//#region mCustomScrollBar Module
var ngMCustomScrollBar = angular.module('ngMCustomScrollBar', []);
//#endregion

//#region exception handler if jquery.mCustomScrollbar.js file is not loaded
ngMCustomScrollBar.factory('$exceptionHandler', function () {
    return function (exception) {
        if (window.console) console.log("Exception: ", exception.message);
    };
});
//#endregion

//#region mCustomScrollBar Directive
ngMCustomScrollBar.directive("ngMCustomScroll", ['$log', function ($log) {
    var directive = {};
    directive.restrict = 'A';//directive restricted to an "attribute" only
    directive.scope = {
        config: '&?ngScrollConfig', //set mCustomScrollBar properties values
    }
    directive.compile = function (element, attributes) {
        var linkFunction = function ($scope, iElement, iAttrs, controller, transcludeFn) {
            createCustomScrollbar();
            function createCustomScrollbar() {
                var configValues = undefined;
                if (typeof ($scope.config) != "undefined")
                    configValues = $scope.config();//accessing the config set by user to override the values of mCustomScrollBar properties
                var divToSetScrollbar = undefined;
                if (iAttrs && iAttrs.ngCustomScrollId)//check if divId has passed in ngCustomScrollId attribute
                {
                    divToSetScrollbar = angular.element("#" + iAttrs.ngCustomScrollId);
                    if (configValues)
                        configValues.liveSelector = "#" + iAttrs.ngCustomScrollId;
                }
                else if (iAttrs && iAttrs.ngCustomScrollClass)//check if class name has passed in ngCustomScrollClass attribute
                {
                    divToSetScrollbar = angular.element("." + iAttrs.ngCustomScrollClass);
                    if (configValues)
                        configValues.liveSelector = "." + iAttrs.ngCustomScrollClass;
                }
                else
                    divToSetScrollbar = iElement;
                divToSetScrollbar.mCustomScrollbar(setmCustomScrollBarObj(configValues));//init mCustomScrollbar on the element
                //set the ngScrollConfig properties
                function setmCustomScrollBarObj(scopeConfig) {
                    //#region mCustomScrollBarObj
                    var mCustomScrollBarObj = {
                        set_width: scopeConfig ? (checkValid(scopeConfig.set_width, "boolean,number,string") ? scopeConfig.set_width : false) : false,
                        /*optional element width: boolean, pixels, percentage*/
                        set_height: scopeConfig ? (checkValid(scopeConfig.set_height, "boolean,number,string") ? scopeConfig.set_height : false) : false,
                        /*optional element height: boolean, pixels, percentage*/
                        horizontalScroll: scopeConfig ? (checkValid(scopeConfig.horizontalScroll, "boolean") ? scopeConfig.horizontalScroll : false) : false,
                        /*scroll horizontally: boolean*/
                        scrollInertia: scopeConfig ? (checkValid(scopeConfig.scrollInertia, "number") ? scopeConfig.scrollInertia : 950) : 950,
                        /*scrolling inertia: integer (milliseconds)*/
                        mouseWheel: scopeConfig ? (checkValid(scopeConfig.mouseWheel, "boolean") ? scopeConfig.mouseWheel : true) : true,
                        /*mousewheel support: boolean*/
                        mouseWheelPixels: scopeConfig ? (checkValid(scopeConfig.mouseWheelPixels, "number,string") ? scopeConfig.mouseWheelPixels : "auto") : "auto",
                        /*mousewheel pixels amount: integer, "auto"*/
                        autoDraggerLength: scopeConfig ? (checkValid(scopeConfig.autoDraggerLength, "boolean") ? scopeConfig.autoDraggerLength : true) : true,
                        /*auto-adjust scrollbar dragger length: boolean*/
                        autoHideScrollbar: scopeConfig ? (checkValid(scopeConfig.autoHideScrollbar, "boolean") ? scopeConfig.autoHideScrollbar : false) : false,
                        /*auto-hide scrollbar when idle*/
                        scrollButtons: { /*scroll buttons*/
                            enable: scopeConfig ? (scopeConfig.scrollButtons ? (checkValid(scopeConfig.scrollButtons.enable, "boolean") ? scopeConfig.scrollButtons.enable : true) : true) : true,
                            /*scroll buttons support: boolean*/
                            scrollType: scopeConfig ? (scopeConfig.scrollButtons ? (checkValid(scopeConfig.scrollButtons.scrollType, "string") ? scopeConfig.scrollButtons.scrollType : "continuous") : "continuous") : "continuous",
                            /*scroll buttons scrolling type: "continuous", "pixels"*/
                            scrollSpeed: scopeConfig ? (scopeConfig.scrollButtons ? (checkValid(scopeConfig.scrollButtons.scrollSpeed, "number,string") ? scopeConfig.scrollButtons.scrollSpeed : "auto") : "auto") : "auto",
                            /*scroll buttons continuous scrolling speed: integer, "auto"*/
                            scrollAmount: scopeConfig ? (scopeConfig.scrollButtons ? (checkValid(scopeConfig.scrollButtons.scrollAmount, "number") ? scopeConfig.scrollButtons.scrollAmount : 40) : 40) : 40
                            /*scroll buttons pixels scroll amount: integer (pixels)*/
                        },
                        advanced: {
                            updateOnBrowserResize: scopeConfig ? (scopeConfig.advanced ? (checkValid(scopeConfig.advanced.updateOnBrowserResize, "boolean") ? scopeConfig.advanced.updateOnBrowserResize : true) : true) : true,
                            /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
                            updateOnContentResize: scopeConfig ? (scopeConfig.advanced ? (checkValid(scopeConfig.advanced.updateOnContentResize, "boolean") ? scopeConfig.advanced.updateOnContentResize : true) : true) : true,
                            /*auto-update scrollbars on content resize (for dynamic content): boolean*/
                            autoExpandHorizontalScroll: scopeConfig ? (scopeConfig.advanced ? (checkValid(scopeConfig.advanced.autoExpandHorizontalScroll, "boolean") ? scopeConfig.advanced.autoExpandHorizontalScroll : false) : false) : false,
                            /*auto-expand width for horizontal scrolling: boolean*/
                            autoScrollOnFocus: scopeConfig ? (scopeConfig.advanced ? (checkValid(scopeConfig.advanced.autoScrollOnFocus, "boolean") ? scopeConfig.advanced.autoScrollOnFocus : true) : true) : true,
                            /*auto-scroll on focused elements: boolean*/
                            normalizeMouseWheelDelta: scopeConfig ? (scopeConfig.advanced ? (checkValid(scopeConfig.advanced.normalizeMouseWheelDelta, "boolean") ? scopeConfig.advanced.normalizeMouseWheelDelta : false) : false) : false /*normalize mouse-wheel delta (-1/1)*/
                        },
                        callbacks: {
                            onInit: scopeConfig ? (scopeConfig.callbacks ? (scopeConfig.callbacks.OnInit) : angular.noop) : angular.noop,
                            onScrollStart: scopeConfig ? (scopeConfig.callbacks ? (scopeConfig.callbacks.OnScrollStart) : angular.noop) : angular.noop,
                            onScroll: scopeConfig ? (scopeConfig.callbacks ? (scopeConfig.callbacks.OnScroll) : angular.noop) : angular.noop,
                            whileScrolling: scopeConfig ? (scopeConfig.callbacks ? (scopeConfig.callbacks.WhileScrolling) : angular.noop) : angular.noop
                        },
                        live: scopeConfig ? (scopeConfig.live ? (checkValid(scopeConfig.live, "boolean,string") ? scopeConfig.live : false) : false) : false,
                        liveSelector: scopeConfig ? (scopeConfig.liveSelector ? (checkValid(scopeConfig.liveSelector, "string") ? scopeConfig.liveSelector : null) : null) : null,
                        contentTouchScroll: scopeConfig ? (checkValid(scopeConfig.contentTouchScroll, "boolean") ? scopeConfig.contentTouchScroll : true) : true,
                        /*scrolling by touch-swipe content: boolean*/
                        theme: scopeConfig ? (checkValid(configValues.theme, "string") ? configValues.theme : 'dark') : 'dark'
                    }
                    return mCustomScrollBarObj;
                    //#endregion
                }
                //function to validate the scrollConfig properties values.
                function checkValid(value, checkValTypeOf) {
                    var typeMatch = false;
                    if (value == false || value) {
                        var valArrayTypeOf = checkValTypeOf.split(',');
                        for (var i = 0; i < valArrayTypeOf.length; i++) {
                            typeMatch = typeof (value) == valArrayTypeOf[i].toLowerCase();
                        }
                        return typeMatch;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        return linkFunction;
    }
    return directive;
}]);
//#endregion

/* mCustomScroll bar Demo
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <link href="../jquery.mCustomScrollbar.min.css" rel="stylesheet" />
    <style>
        .content {
            width: 250px;
            max-height: 200px;
            border: 1px solid gray;
            overflow: auto;
            height: auto;
        }

        #DivData1 {
            height: 200px;
        }

        #abc {
            height: 200px;
        }

        .label {
            width: 250px;
            float: left;
            padding: 12px;
        }
    </style>
    <script src="../jquery-1.11.3.js"></script>
    <script src="../angular.js"></script>
    <script src="../jquery.mCustomScrollbar.js"></script>
    <script src="myMCustomScrollBarDemoController.js"></script>
    <script src="ngMCustomScrollBar.js"></script>
</head>
<body data-ng-app="myMCustomScrollBarDemo" data-ng-controller="myMCustomScrollBarDemoController">
    <div class="label">
        <label>Using ng-m-custom-scroll</label>
        <div class="content" ng-m-custom-scroll>
            <div id="DivData">
                <div data-ng-repeat="item in Items">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
    <div class="label">
        <label>Using ng-custom-scroll-id</label>
        <div class="content" ng-m-custom-scroll ng-scroll-config="configScroll" ng-custom-scroll-id="DivData1" ng-custom-scroll-class="">
            <div id="DivData1">
                <div data-ng-repeat="item in Items">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
    <div class="label">
        <label>Using ng-custom-scroll-class</label>
        <div class="content" ng-m-custom-scroll ng-scroll-config="configScroll1" ng-custom-scroll-id="" ng-custom-scroll-class="customClass">
            <div id="abc">
                <div data-ng-repeat="item in Items">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</body>
</html>
/// <reference path="myMCustomScrollBarDemoDirective.js" />
var myMCustomScrollBarDemo = angular.module('myMCustomScrollBarDemo', ['ngMCustomScrollBar']);
myMCustomScrollBarDemo.controller('myMCustomScrollBarDemoController', ['$scope', '$compile', '$http', function ($scope, $compile, $http) {
    $scope.Items = [];
    $scope.getScrollData = function () {
        $http.get('http://localhost:54845/api/ScrollBarDataAPI/scrollBarData').success(function (data) {
            $('#abc').addClass('customClass');
            $scope.Items = data;
        }).error(function (err) {
            console.log(err);
        });
    }
    $scope.getScrollData();
    $scope.configScroll = { scrollButtons: { enable: false }, theme: "dark", live: "once" };
    $scope.configScroll1 = { scrollButtons: { enable: true }, theme: "dark", live: "once" };
}]);
*/
