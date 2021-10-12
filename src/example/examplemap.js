goog.declareModuleId('example.map');

import MapMode from 'opensphere/src/os/control/mapmodecontrol.js';
import Rotate from 'opensphere/src/os/control/rotatecontrol.js';
import Zoom from 'opensphere/src/os/control/zoomcontrol.js';
import DoubleClickZoom from 'opensphere/src/os/interaction/doubleclickzoominteraction.js';
import DragZoom from 'opensphere/src/os/interaction/dragzoominteraction.js';
import KeyboardPan from 'opensphere/src/os/interaction/keyboardpaninteraction.js';
import KeyboardTiltRotate from 'opensphere/src/os/interaction/keyboardtiltrotateinteraction.js';
import KeyboardZoom from 'opensphere/src/os/interaction/keyboardzoominteraction.js';
import MouseZoom from 'opensphere/src/os/interaction/mousezoominteraction.js';
import Reset from 'opensphere/src/os/interaction/resetinteraction.js';
import MouseWheelZoom from 'opensphere/src/os/ui/ol/interaction/mousewheelzoominteraction.js';

const Collection = goog.require('ol.Collection');
const DragPan = goog.require('ol.interaction.DragPan');


/**
 * Get UI controls that should be registered with the map.
 * @return {!Collection}
 */
export const getControls = function() {
  var controls = [];

  //
  // +/- zoom buttons
  //
  var zoomCtrl = new Zoom();
  controls.push(zoomCtrl);

  //
  // Show current rotation, and click to reset.
  //
  var rotate = new Rotate();
  controls.push(rotate);

  //
  // Toggle between 2D map and 3D globe.
  //
  var mapMode = new MapMode();
  controls.push(mapMode);

  return new Collection(controls);
};

/**
 * Get interactions that should be registered with the map.
 * @return {!Collection}
 */
export const getInteractions = function() {
  //
  // Ctrl+Drag will draw a zoom box.
  //
  var ctrlZoom = new DragZoom();

  var options = {
    delta: 0.2
  };

  //
  // Zoom via mouse wheel, left+right click and drag, or double click.
  //
  var mwZoom = new MouseWheelZoom(options);
  var mZoom = new MouseZoom(options);
  var dcZoom = new DoubleClickZoom();

  var dragPan = new DragPan({
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
  var kbPan = new KeyboardPan();
  var keyTiltRotate = new KeyboardTiltRotate(options);
  var kbZoom = new KeyboardZoom(options);
  var reset = new Reset();

  //
  // Run order is backwards, so 0 index is run last.
  //
  return new Collection([
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
