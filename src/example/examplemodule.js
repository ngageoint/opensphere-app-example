goog.declareModuleId('example.Module');

/**
 * Angular module 'example'.
 * @type {angular.Module}
 */
const Module = angular.module('example', [
  'ngAnimate',
  'ngSanitize',
  'ngRoute',
  'os.ui'
]);

export default Module;
