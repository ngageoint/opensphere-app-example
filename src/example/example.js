goog.provide('example');

goog.require('example.Module');
goog.require('example.SettingsInitializer');
goog.require('example.defines');
goog.require('example.mainDirective');
goog.require('os.mixin');
goog.require('os.mixin.cesium');
goog.require('os.net');
goog.require('os.query');
goog.require('os.ui');
goog.require('os.ui.exportManager');


/**
 * Configuration function for `example.Module`. Used to configure the angular module.
 * @param {!angular.$routeProvider} $routeProvider The Angular route provider.
 * @ngInject
 */
example.configureModule = function($routeProvider) {
  $routeProvider.otherwise({
    template: '<example-main></example-main>',
    reloadOnSearch: false
  });
};


/**
 * Load the settings, then manually bootstrap angular.
 */
(function() {
  // configure the Angular module to load the main directive
  example.Module.config(example.configureModule);

  // set up request handlers
  os.net.addDefaultHandlers();

  // initialize settings for the app
  var settingsInitializer = new example.SettingsInitializer();
  settingsInitializer.init();
})();
