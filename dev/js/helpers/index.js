const HELPERS = {

  // GET WINDOW SIZE HELPER
  getWindowSize() {
    var v = window;
    var a = 'inner';

    if (!('innerWidth' in v)) {
      a = 'client';
      v = document.documentElement || document.body;
    }

    return {
      width: v[a + 'Width'],
      height: v[a + 'Height'],
    };
  },

  // WINDOW MATCH MEDIA HELPERS
  minWidth(size) {
    let match = window.matchMedia(`(min-width: ${size}px)`).matches;
    return match ? match : false;
  },

  maxWidth(size) {
    let match = window.matchMedia(`(max-width: ${size}px)`).matches;
    return match ? match : false;
  },

};

export default HELPERS;
