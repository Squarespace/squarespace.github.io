(function() {
  'use strict';

  /**
   * Only tests for webkit and blink style touch events, not IE style
   * pointer events.
   *
   * @var {Boolean} hasTouchEvents
   */
  var hasTouchEvents = 'ontouchstart' in window;

  /**
   * Kicks off all the scripts for the site.
   *
   * @method init
   */
  var init = function() {
    mobileNav();
  };

  /**
   * A helper function for toggling a class on an element.
   *
   * @method toggleClass
   * @param {Node} el
   * @param {String} classString
   */
  var toggleClass = function(el, classString) {
    if (!el && !classString) {
      return;
    }

    var classRegexp = new RegExp(classString, 'g');

    if (el.className.indexOf(classString) > -1) {
      el.className = el.className.replace(classRegexp, '');
    } else {
      el.className += ' ' + classString;
    }
  };

  /**
   * Binds the click event for the mobile nav.
   *
   * @method mobileNav
   */
  var mobileNav = function() {
    var nav = document.getElementById('nav');
    var navMobileToggle = document.getElementById('nav-mobile-toggle');

    if (!navMobileToggle || !nav) {
      return;
    }

    // On mobile, kill the 300ms delay after a click by binding
    // the callback to touchend instead of click.
    if (hasTouchEvents) {
      var move = false;

      navMobileToggle.addEventListener('touchmove', function(e) {
        e.preventDefault();
        move = true;
      });

      navMobileToggle.addEventListener('touchend', function(e) {
        e.preventDefault();

        if (move === true) {
          move = false;
        } else {
          toggleClass(nav, 'mobile-nav-open');
        }
      });
    } else {
      navMobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleClass(nav, 'mobile-nav-open');
      });
    }
  };

  document.addEventListener('DOMContentLoaded', init);
}());