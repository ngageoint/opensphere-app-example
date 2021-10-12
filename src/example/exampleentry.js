goog.declareModuleId('exampleentry');

import 'opensphere/src/os/mixin/mixin.js';

import addDefaultHandlers from 'opensphere/src/os/net/adddefaulthandlers.js';

import {directiveTag as mainUi} from './examplemain.js';
import Module from './examplemodule.js';
import SettingsInitializer from './examplesettingsinitializer.js';

/**
 * Configuration function for `Module`. Used to configure the angular module.
 * @param {!angular.$routeProvider} $routeProvider The Angular route provider.
 * @ngInject
 */
export const configureModule = function($routeProvider) {
  $routeProvider.otherwise({
    template: `<${mainUi}></${mainUi}>`,
    reloadOnSearch: false
  });
};

// Configure the Angular module to load the main directive.
Module.config(configureModule);

// Set up request handlers
addDefaultHandlers();

// initialize settings for the app
const settingsInitializer = new SettingsInitializer();
settingsInitializer.init();
