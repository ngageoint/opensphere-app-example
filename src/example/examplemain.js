goog.provide('example.MainCtrl');
goog.provide('example.mainDirective');

goog.require('example.Module');
goog.require('example.defines');
goog.require('example.map');
goog.require('os.data.OSDataManager');
goog.require('os.ui.AbstractMainCtrl');
goog.require('os.ui.mapDirective');
goog.require('plugin.basemap.BaseMapPlugin');
goog.require('plugin.cesium.Plugin');
goog.require('plugin.file.csv.CSVPlugin');
goog.require('plugin.file.geojson.GeoJSONPlugin');
goog.require('plugin.file.gpx.GPXPlugin');
goog.require('plugin.file.kml.KMLPlugin');
goog.require('plugin.file.shp.SHPPlugin');
goog.require('plugin.ogc.OGCPlugin');
goog.require('plugin.xyz.XYZPlugin');


/**
 * The main application directive.
 * @return {angular.Directive}
 */
example.mainDirective = function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: example.ROOT + 'views/example.html',
    controller: example.MainCtrl,
    controllerAs: 'ctrl'
  };
};


example.Module.directive('exampleMain', [example.mainDirective]);


/**
 * Controller for the main application directive.
 * @param {!angular.Scope} $scope The Angular scope.
 * @param {!angular.$injector} $injector The Angular $injector service.
 * @extends {os.ui.AbstractMainCtrl}
 * @constructor
 * @ngInject
 */
example.MainCtrl = function($scope, $injector) {
  example.MainCtrl.base(this, 'constructor', $scope, $injector, example.ROOT, 'OpenSphere Example App');

  //
  // Configure the data manager.
  //
  // OSDataManager will listen to layer add/remove events on the map and automatically pick up and manage Openlayers
  // data sources for those layers.
  //
  os.dataManager = os.osDataManager = os.data.OSDataManager.getInstance();

  //
  // Create the map instance and listen for it to be initialized. The map directive will make the initialize call so
  // we don't have to do it here.
  //
  var map = os.MapContainer.getInstance();
  map.listenOnce(os.MapEvent.MAP_READY, this.onMapReady_, false, this);

  //
  // Add keyboard/mouse interactions to the map.
  //
  map.setInteractionFunction(example.map.getInteractions);

  //
  // Add UI controls to the map.
  //
  map.setControlFunction(example.map.getControls);

  //
  // Initialize the controller.
  //
  this.initialize();
};
goog.inherits(example.MainCtrl, os.ui.AbstractMainCtrl);


/**
 * Logger for the controller.
 * @type {goog.log.Logger}
 * @private
 * @const
 */
example.MainCtrl.LOGGER_ = goog.log.getLogger('example.MainCtrl');


/**
 * @inheritDoc
 */
example.MainCtrl.prototype.addPlugins = function() {
  // Call the parent method to load default plugins.
  example.MainCtrl.base(this, 'addPlugins');

  //
  // Add support for various server types.
  //
  os.ui.pluginManager.addPlugin(new plugin.ogc.OGCPlugin());
  os.ui.pluginManager.addPlugin(new plugin.xyz.XYZPlugin());

  //
  // Add support for base maps.
  //
  os.ui.pluginManager.addPlugin(new plugin.basemap.BaseMapPlugin());

  //
  // Add support for Cesium 3D globe.
  //
  os.ui.pluginManager.addPlugin(new plugin.cesium.Plugin());

  //
  // Add support for loading various file types.
  //
  os.ui.pluginManager.addPlugin(new plugin.file.csv.CSVPlugin());
  os.ui.pluginManager.addPlugin(new plugin.file.kml.KMLPlugin());
  os.ui.pluginManager.addPlugin(new plugin.file.geojson.GeoJSONPlugin());
  os.ui.pluginManager.addPlugin(new plugin.file.gpx.GPXPlugin());
  os.ui.pluginManager.addPlugin(new plugin.file.shp.SHPPlugin());
};


/**
 * Tasks that should run after the map has been initialized.
 * @param {!goog.events.Event} event The loaded event.
 * @private
 */
example.MainCtrl.prototype.onMapReady_ = function(event) {
  //
  // Initialize plugins after the map is ready, to allow plugins to make changes to the map if necessary.
  //
  this.initPlugins();
};


/**
 * @inheritDoc
 */
example.MainCtrl.prototype.onPluginsLoaded = function(opt_e) {
  example.MainCtrl.base(this, 'onPluginsLoaded', opt_e);

  //
  // Load/restore data providers from settings.
  //
  var dm = os.dataManager;
  try {
    dm.restoreDescriptors();
    dm.updateFromSettings(os.settings);
  } catch (e) {
    goog.log.error(example.MainCtrl.LOGGER_, 'failed restoring descriptors from settings', e);
  }
};
