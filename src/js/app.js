// Essentials
require('./essential/main');

// Layout
require('./layout/main');

// Sidebar
require('./sidebar/main');

// Owl Carousel
require('./media/carousel/main');

// // Maps
// window.initGoogleMaps = require('./maps/google/main');
// require('./maps/_maps');
window.googleMapsOnLoad = require("./maps/custom");

require('./main.js');