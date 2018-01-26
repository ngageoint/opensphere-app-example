goog.provide('example.SettingsInitializer');

goog.require('os.config.SettingsInitializer');


/**
 * Initializes settings for the application and bootstraps Angular.
 * @extends {os.config.SettingsInitializer}
 * @constructor
 */
example.SettingsInitializer = function() {
  example.SettingsInitializer.base(this, 'constructor');
  this.ngAppModule = 'example';
};
goog.inherits(example.SettingsInitializer, os.config.SettingsInitializer);
