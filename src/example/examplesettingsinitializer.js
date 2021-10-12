goog.declareModuleId('example.SettingsInitializer');

import OSSettingsInitializer from 'opensphere/src/os/config/settingsinitializer.js';


/**
 * Initializes settings for the application and bootstraps Angular.
 */
export default class SettingsInitializer extends OSSettingsInitializer {
  /**
   * Constructor.
   */
  constructor() {
    super();
    this.ngAppModule = 'example';
  }
}
