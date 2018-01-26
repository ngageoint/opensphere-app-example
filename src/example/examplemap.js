goog.provide('example.map');

goog.require('ol.Collection');
goog.require('ol.interaction.DragPan');
goog.require('os.control.MapMode');
goog.require('os.control.Rotate');
goog.require('os.control.Zoom');
goog.require('os.interaction.DoubleClickZoom');
goog.require('os.interaction.DragZoom');
goog.require('os.interaction.Hover');
goog.require('os.interaction.KeyboardPan');
goog.require('os.interaction.KeyboardTiltRotate');
goog.require('os.interaction.KeyboardZoom');
goog.require('os.interaction.MouseZoom');
goog.require('os.interaction.Reset');
goog.require('os.ui.ol.interaction.MouseWheelZoom');


/**
 * Get UI controls that should be registered with the map.
 * @return {!ol.Collection}
 */
example.map.getControls = function() {
  var controls = [];

  var zoomCtrl = new os.control.Zoom();
  controls.push(zoomCtrl);

  var rotate = new os.control.Rotate();
  controls.push(rotate);

  var mapMode = new os.control.MapMode();
  controls.push(mapMode);

  return new ol.Collection(controls);
};


/**
 * Get interactions that should be registered with the map.
 * @return {!ol.Collection}
 */
example.map.getInteractions = function() {
  // interaction to use ctrl+drag for zooming
  var ctrlZoom = new os.interaction.DragZoom();

  // interaction to disable alt+shift+drag to rotate the map and shift+drag to zoom from the defaults
  var options = {
    delta: 0.2
  };

  // Mouse Wheel zoom AND left+right click and drag zoom
  var mwZoom = new os.ui.ol.interaction.MouseWheelZoom(options);
  var mZoom = new os.interaction.MouseZoom(options);
  var dcZoom = new os.interaction.DoubleClickZoom();

  var dragPan = new ol.interaction.DragPan({
    kinetic: undefined,
    delta: 0.2
  });

  // control the map with the keyboard
  var keyTiltRotate = new os.interaction.KeyboardTiltRotate(options);
  var kbPan = new os.interaction.KeyboardPan();
  var kbZoom = new os.interaction.KeyboardZoom(options);
  var reset = new os.interaction.Reset();

  // Run order is backwards, so 0 index is run last
  return new ol.Collection([
    keyTiltRotate,
    kbPan,
    kbZoom,
    reset,
    ctrlZoom,
    dragPan,
    mwZoom,
    mZoom,
    dcZoom
  ]);
};
