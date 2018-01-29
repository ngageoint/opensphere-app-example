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

  //
  // +/- zoom buttons
  //
  var zoomCtrl = new os.control.Zoom();
  controls.push(zoomCtrl);

  //
  // Show current rotation, and click to reset.
  //
  var rotate = new os.control.Rotate();
  controls.push(rotate);

  //
  // Toggle between 2D map and 3D globe.
  //
  var mapMode = new os.control.MapMode();
  controls.push(mapMode);

  return new ol.Collection(controls);
};


/**
 * Get interactions that should be registered with the map.
 * @return {!ol.Collection}
 */
example.map.getInteractions = function() {
  //
  // Ctrl+Drag will draw a zoom box.
  //
  var ctrlZoom = new os.interaction.DragZoom();

  var options = {
    delta: 0.2
  };

  //
  // Zoom via mouse wheel, left+right click and drag, or double click.
  //
  var mwZoom = new os.ui.ol.interaction.MouseWheelZoom(options);
  var mZoom = new os.interaction.MouseZoom(options);
  var dcZoom = new os.interaction.DoubleClickZoom();

  var dragPan = new ol.interaction.DragPan({
    kinetic: undefined,
    delta: 0.2
  });

  //
  // Add keyboard controls for:
  //  - Pan map/globe with arrow keys
  //  - Tilt/rotate 3D globe with Shift+arrow keys
  //  - Zoom with +/- and Page Up/Down
  //  - Reset rotation with R, reset entire view with V
  //
  var kbPan = new os.interaction.KeyboardPan();
  var keyTiltRotate = new os.interaction.KeyboardTiltRotate(options);
  var kbZoom = new os.interaction.KeyboardZoom(options);
  var reset = new os.interaction.Reset();

  //
  // Run order is backwards, so 0 index is run last.
  //
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
