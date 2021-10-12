goog.declareModuleId('example.MainUI');

import 'opensphere/src/os/ui/map.js';

import Settings from 'opensphere/src/os/config/settings.js';
import DataManager from 'opensphere/src/os/data/datamanager.js';
import MapEvent from 'opensphere/src/os/map/mapevent.js';
import {setIMapContainer, setMapContainer} from 'opensphere/src/os/map/mapinstance.js';
import MapContainer from 'opensphere/src/os/mapcontainer.js';
import {setDataManager} from 'opensphere/src/os/os.js';
import PluginManager from 'opensphere/src/os/plugin/pluginmanager.js';
import AbstractMainCtrl from 'opensphere/src/os/ui/abstractmainctrl.js';
import BaseMapPlugin from 'opensphere/src/plugin/basemap/basemapplugin.js';
import Plugin from 'opensphere/src/plugin/cesium/cesiumplugin.js';
import CSVPlugin from 'opensphere/src/plugin/file/csv/csvplugin.js';
import GeoJSONPlugin from 'opensphere/src/plugin/file/geojson/geojsonplugin.js';
import GPXPlugin from 'opensphere/src/plugin/file/gpx/gpxplugin.js';
import KMLPlugin from 'opensphere/src/plugin/file/kml/kmlplugin.js';
import SHPPlugin from 'opensphere/src/plugin/file/shp/shpplugin.js';
import OGCPlugin from 'opensphere/src/plugin/ogc/ogcplugin.js';
import XYZPlugin from 'opensphere/src/plugin/xyz/xyzplugin.js';

import {ROOT} from './example.js';
import {getControls, getInteractions} from './examplemap.js';
import Module from './examplemodule.js';

const log = goog.require('goog.log');
const Logger = goog.requireType('goog.log.Logger');


/**
 * The main application directive.
 * @return {angular.Directive}
 */
export const directive = () => ({
  restrict: 'E',
  scope: true,
  templateUrl: ROOT + 'views/example.html',
  controller: Controller,
  controllerAs: 'ctrl'
});

/**
 * The element tag for the directive.
 * @type {string}
 */
export const directiveTag = 'example-main';

// Register the directive.
Module.directive('exampleMain', [directive]);

/**
 * Controller for the main application directive.
 */
export class Controller extends AbstractMainCtrl {
  /**
   * Constructor.
   * @param {!angular.Scope} $scope The Angular scope.
   * @param {!angular.$injector} $injector The Angular $injector service.
   * @ngInject
   */
  constructor($scope, $injector) {
    super($scope, $injector, ROOT, 'OpenSphere Example App');

    //
    // Create the map instance and listen for it to be initialized. The map directive will make the initialize call so
    // we don't have to do it here.
    //
    const map = MapContainer.getInstance();
    map.listenOnce(MapEvent.MAP_READY, this.onMapReady_, false, this);

    //
    // Add keyboard/mouse interactions to the map.
    //
    map.setInteractionFunction(getInteractions);

    //
    // Add UI controls to the map.
    //
    map.setControlFunction(getControls);

    // Set the global map container reference.
    setIMapContainer(map);
    setMapContainer(map);

    //
    // Configure the data manager.
    //
    // DataManager will listen to layer add/remove events on the map and automatically pick up and manage Openlayers
    // data sources for those layers.
    //
    const dataManager = DataManager.getInstance();
    dataManager.setMapContainer(map);
    setDataManager(dataManager);

    //
    // Initialize the controller.
    //
    this.initialize();
  }

  /**
   * @inheritDoc
   */
  addPlugins() {
    // Call the parent method to load default plugins.
    super.addPlugins();

    const pluginManager = PluginManager.getInstance();

    //
    // Add support for various server types.
    //
    pluginManager.addPlugin(new OGCPlugin());
    pluginManager.addPlugin(new XYZPlugin());

    //
    // Add support for base maps.
    //
    pluginManager.addPlugin(new BaseMapPlugin());

    //
    // Add support for Cesium 3D globe.
    //
    pluginManager.addPlugin(new Plugin());

    //
    // Add support for loading various file types.
    //
    pluginManager.addPlugin(new CSVPlugin());
    pluginManager.addPlugin(new KMLPlugin());
    pluginManager.addPlugin(new GeoJSONPlugin());
    pluginManager.addPlugin(new GPXPlugin());
    pluginManager.addPlugin(new SHPPlugin());
  }

  /**
   * Tasks that should run after the map has been initialized.
   * @param {!goog.events.Event} event The loaded event.
   * @private
   */
  onMapReady_(event) {
    //
    // Initialize plugins after the map is ready, to allow plugins to make changes to the map if necessary.
    //
    this.initPlugins();
  }

  /**
   * @inheritDoc
   */
  onPluginsLoaded(opt_e) {
    super.onPluginsLoaded(opt_e);

    //
    // Load/restore data providers from settings.
    //
    var dm = DataManager.getInstance();
    try {
      dm.restoreDescriptors();
      dm.updateFromSettings(Settings.getInstance());
    } catch (e) {
      log.error(logger, 'failed restoring descriptors from settings', e);
    }
  }
}

/**
 * Logger for the controller.
 * @type {Logger}
 */
const logger = log.getLogger('example.MainCtrl');
