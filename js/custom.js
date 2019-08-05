(function(){
"use strict";
'use strict';

var access_token = '0fd99ee37b132dd219ef0510cf7c04598f085daf';
// These functions are HEAVILY based on Michael Doran's (UT Arlington) sortLC. 
// I really just translated his Perl into JavaScript.

function normalizeLC(callNumber) {
  // remove initial whitespace
  var cn = callNumber.replace(/^\s*/, '');
  // all alpha to uppercase
  cn = cn.toUpperCase();
  var re = /^([A-Z]{1,3})\s*(\d+)\s*\.*(\d*)\s*\.*\s*([A-Z]*)(\d*)\s*([A-Z]*)(\d*)\s*(.*)$/;
  if (cn.match(re)) {
    var bits = cn.match(re);
    var initialLetters = bits[1];
    var classNumber = bits[2];
    var decimalNumber = bits[3];
    var cutter_1_letter = bits[4];
    var cutter_1_number = bits[5];
    var cutter_2_letter = bits[6];
    var cutter_2_number = bits[7];
    var theTrimmings = bits[8];
    if (cutter_2_letter && !cutter_2_number) {
      theTrimmings = cutter_2_letter + theTrimmings;
      cutter_2_letter = '';
    }
    if (classNumber) {
      classNumber = sprintf("%5s", classNumber);
    }
    decimalNumber = sprintf("%-12s", decimalNumber);
    if (cutter_1_number) {
      cutter_1_number = ' ' + cutter_1_number;
    }
    if (cutter_2_letter) {
      cutter_2_letter = '   ' + cutter_2_letter;
    }
    if (cutter_2_number) {
      cutter_2_number = ' ' + cutter_2_number;
    }
    if (theTrimmings) {
      theTrimmings.replace(/(\.)(\d)/g, '$1 $2');
      theTrimmings.replace(/(\d)\s*-\s*(\d)/g, '$1-$2');
      // not sure about the following line
      theTrimmings.replace(/(\d+)/g, sprintf("%5s", '$1'));
      theTrimmings = '   ' + theTrimmings;
    }
    var normalized = initialLetters + classNumber + decimalNumber + cutter_1_letter + cutter_1_number + cutter_2_letter + cutter_2_number + theTrimmings;
    return normalized;
  } else {
    console.log('We have a problem: ' + callNumber);
    return;
  }
}

function sortLC() {
  var unsortedList = Array.prototype.slice.call(arguments);
  var sortedList = [];
  var normalCallNo;
  var callNumberArray = {};
  var origCallNo = "";
  for (var i = 0; i < unsortedList.length; i++) {
    origCallNo = unsortedList[i];
    normalCallNo = normalizeLC(unsortedList[i]);
    if (normalCallNo) {
      if (!callNumberArray[normalCallNo]) {
        callNumberArray[normalCallNo] = origCallNo;
      }
    }
  }
  var theKeys = Object.keys(callNumberArray);
  var sortedKeys = theKeys.sort();
  for (var j = 0; j < sortedKeys.length; j++) {
    sortedList.push(callNumberArray[sortedKeys[j]]);
  }
  return sortedList;
}
/* eslint-disable */
var app = angular.module('viewCustom', ['angularLoad']);

app.filter('encode', function () {
  return encodeURIComponent;
});

// Bitly permalink
app.controller('prmCopyClipboardBtnAfterController', [function () {

  var vm = this;
  vm.ajax_promise = ajax_promise;
  vm.get_bitlink = get_bitlink;

  function ajax_promise(requestUrl) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', requestUrl);
      xhr.send();
      xhr.onload = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var resp = xhr.responseText;
            var respJson = JSON.parse(resp);
            resolve(respJson);
          } else {
            reject(xhr.status);
          }
        }
      };
    });
  }

  function get_bitlink() {

    var long_url = encodeURIComponent(vm.parentCtrl.text);

    // ignore the "short" link from ExLibris
    if (long_url !== 'undefined' && !long_url.match(/permalink/)) {

      // access_token is defined externally
      var requestUrl = 'https://api-ssl.bitly.com/v3/shorten?callback=?&format=json&access_token=' + access_token + '&login=iclibrary&longUrl=' + long_url;

      ajax_promise(requestUrl).then(function (result) {
        if (result.data.url !== undefined) {
          vm.bitlink = result.data.url;
          var theLink = document.getElementById('ic-bitly');
          theLink.innerHTML = vm.bitlink;
          theLink.href = vm.bitlink;
        } else {
          vm.bitlink = decodeURIComponent(long_url); // not really a bitlink
          var theLink = document.getElementById('ic-bitly');
          theLink.innerHTML = vm.bitlink;
          theLink.href = vm.bitlink;
        }
      }).catch(function (e) {
        console.log('Ajax Problem: ' + e);
      });
    }
  }
}]);

app.component('prmCopyClipboardBtnAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmCopyClipboardBtnAfterController',
  template: '<div class="form-focus layout-padding layout-row ic-bitly-outer-wrapper" layout="row" layout-padding=""><div layout-margin layout-fill class="word-break-all layout-fill ic-bitly-inner-wrapper"><span layout-fill="layout-fill" class="layout-fill"><a href="#" id="ic-bitly">{{$ctrl.get_bitlink()}}</a></span></div></div><br /><button ng-click="$ctrl.saveOffset()" text="$ctrl.bitlink" clipboard="" ng-hide="$ctrl.copySuccessful" type="button" class="button-confirm button-with-icon md-button md-primoExplore-theme md-ink-ripple" on-copied="$ctrl.clipboardSuccess() | translate" on-error="$ctrl.clipboardFailure(err) | translate" id="copy-citation-button" aria-label="nui.permalink.button" aria-hidden="false" style=""><prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="clipboard"></prm-icon><prm-icon-after parent-ctrl="$ctrl"></prm-icon-after><span translate="nui.permalink.button">Copy the Permalink to Clipboard</span><div class="md-ripple-container"></div></button>'
});

// Map stuff
app.controller('mapController', [function () {

  function drawIndicator(mapHeight, mapWidth, x, y, h, w) {
    // not sure why, but works best if we draw on ALL the possible canvases
    var canvases = document.getElementsByClassName('ic-map-canvas');
    for (var _i = 0; _i < canvases.length; _i++) {
      var theCanvas = canvases.item(_i);
      theCanvas.height = mapHeight;
      theCanvas.width = mapWidth;
      var ctx = theCanvas.getContext('2d');
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = 'fuchsia';
      ctx.fillRect(x, y, w, h);
    }
  }

  // We only care about one instance of this directive
  // There's probably a better way to do this.

  try {
    this.needsMap = this.parentCtrl.item.delivery.GetIt1[0].category === 'Alma-P';
  } catch (e) {
    this.needsMap = false;
  }

  try {
    this.holding = this.parentCtrl.item.delivery.holding;
  } catch (e) {
    this.holding = false;
  }

  if (this.needsMap) {
    this.magicNumber = 1; // which instance
    this.showMapHere = this.parentCtrl.index === this.magicNumber;

    if (this.holding && this.holding.length > 1) {
      this.multipleHoldings = true;
      this.holdingsLocations = [];
      for (var _i2 = 0; _i2 < this.holding.length; _i2++) {
        this.holdingsLocations.push(this.holding[_i2].subLocationCode);
      }
    }

    this.callNumber = '';
    this.location = '';
    this.availability = '';
    this.floor = 0;
    this.showMap = false;
    this.showLocMessage = false;
    this.locationType = '';
    this.x = 0;
    this.y = 0;
    this.width = 0; // width of highlight box
    this.height = 0; // height of highlight box
    this.lookupArray = null;
    this.coordinates = '';
    this.locMessage = '';
    this.side = '';
    this.sideLong = '';
    this.debug = false;
    this.display = { display: 'block' };
    this.mapError = false;
    this.needsMap = false;
    this.normalizeLC = normalizeLC;
    this.sortLC = sortLC;

    // call number
    try {
      var theCallNumber = this.parentCtrl.item.delivery.bestlocation.callNumber;
      theCallNumber = theCallNumber.replace(/^[(\s]+/, '');
      theCallNumber = theCallNumber.replace(/[)\s]+$/, '');
      this.callNumber = theCallNumber;
    } catch (e) {
      this.callNumber = '';
      this.mapError = true;
    }

    // location
    try {
      this.location = this.parentCtrl.item.delivery.bestlocation.subLocationCode;
    } catch (e) {
      this.location = '';
      this.mapError = true;
    }

    // availability
    try {
      this.availability = this.parentCtrl.item.delivery.bestlocation.availabilityStatus;
    } catch (e) {
      this.availability = '';
      this.mapError = true;
    }

    // We only need a map if it's available and
    // has a location OR is a periodical
    if ((this.availability === 'available' || this.availability === 'check_holdings') && this.callNumber || this.location === 'periodical') {

      this.containerWidth = document.getElementById('full-view-container').offsetWidth;

      this.mapAreaRatio = 1; // amount of containerWidth map will occupy
      if (this.containerWidth > 600) {
        this.mapAreaRatio = 0.6;
      } else {
        this.mapAreaRatio = 0.83;
      }
      // console.log(this.mapAreaRatio);
      this.mapWidth = this.containerWidth * this.mapAreaRatio;
      this.mapHeight = 0.58666666667 * this.mapWidth;

      this.showLocMessage = true;
      this.showMap = false;

      // is it in a static location?
      for (var loc in staticLocations) {
        if (loc === this.location) {
          this.showMap = true;
          this.locationType = 'static';
          this.floor = staticLocations[loc].floor;
          this.x = staticLocations[loc].x;
          this.y = staticLocations[loc].y;
          this.width = staticLocations[loc].width;
          this.height = staticLocations[loc].height;
          this.locMessage = staticLocations[loc].message;
        }
      }

      if (this.locationType !== 'static') {

        // didn't match anything in "for" loop, so
        this.locationType = 'dynamic';

        // where should we look for the item?
        switch (this.location) {
          case 'music':
            this.lookupArray = musicStacks;
            break;
          case 'periodical':
            this.lookupArray = perStacks;
            break;
          case 'general':
            this.lookupArray = stacks;
            break;
          default:
            this.lookupArray = null;
            break;
        }
        // console.log(this.lookupArray);

        for (var _i3 = 0; _i3 < this.lookupArray.length; _i3++) {
          var start = this.lookupArray[_i3].start;
          var end = this.lookupArray[_i3].end;
          var test = this.sortLC(start, end, this.callNumber);
          if (this.normalizeLC(test[1]) === this.normalizeLC(this.callNumber) || test.length === 2) {
            this.coordinates = this.lookupArray[_i3];
          }
        }

        if (this.coordinates) {
          this.showMap = true;
          this.floor = this.coordinates.id.split('.')[0];
          this.stack = this.coordinates.id.split('.')[1];
          this.side = this.coordinates.id.split('.')[2];
          if (this.side === 'e') {
            this.sideLong = 'east';
          } else {
            this.sideLong = 'west';
          }
          this.locMessage = 'This item is available at stack ' + this.stack + ', ' + this.sideLong + ' side.';

          this.x = this.coordinates.x;
          this.y = this.coordinates.y;
          this.width = this.coordinates.width;
          this.height = this.coordinates.height;
        } else {
          this.showMap = false;
        }
      }

      if (this.multipleHoldings) {

        this.locMessage += ' It may also be available in ';

        // what locations are there that aren't the "bestlocation"?
        for (var i = 0; i < this.holdingsLocations.length; i++) {

          if (this.holdingsLocations[i] !== this.location) {
            var hl = this.holdingsLocations[i];
            // console.log("hl: " + hl);
            this.staticLocations = "";

            if (staticLocations[hl]) {
              this.locMessage += staticLocations[hl].english;
            } else {
              this.locMessage += hl; // cases where secondary loc isn't static
            }

            // this.locMessage += staticLocations[hl].english;
            if (i === this.holdingsLocations.length - 1) {
              this.locMessage += '.';
            } else {
              this.locMessage += ', ';
            }
          }
        }
      }

      // determine dimensions for the map image
      var mapImage = document.getElementsByClassName('ic-map-img').item(this.magicNumber);
      if (mapImage) {
        this.mapDimensions = { height: this.mapHeight + 'px', width: this.mapWidth + 'px' };
      }

      // make highlighted area proportional
      this.x = this.x * this.mapWidth / 600;
      this.y = this.y * this.mapHeight / 352;
      this.width = this.width * this.mapWidth / 600;
      this.height = this.height * this.mapHeight / 352;

      drawIndicator(this.mapHeight, this.mapWidth, this.x, this.y, this.height, this.width);
    }
  }
}]);
app.component('prmFullViewServiceContainerAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'mapController',
  template: '<div class="ic-map-error" ng-show="$ctrl.needsMap && $ctrl.mapError">SYSTEM ERROR: TRY REFRESHING THE PAGE</div><div class="ic-map-container" ng-show="$ctrl.showMapHere" ng-style="$ctrl.display"><p ng-show="$ctrl.showLocMessage" class="ic-loc-message">{{$ctrl.locMessage}}</p><div ng-show="$ctrl.showMap" class="ic-map-div"><img class="ic-map-img" ng-src="custom/01ITHACACOL_INST-01ITHACACOL_V1/img/floor_{{$ctrl.floor}}.png" ng-style="$ctrl.mapDimensions" ng-show="$ctrl.showMap"><canvas ng-show="$ctrl.showMap" class="ic-map-canvas"></canvas></div></div>'
});

// Links for SMS, trace, 'report a problem'
app.controller('prmActionContainerAfterController', [function () {

  // build a permalink (for 'report a problem')
  try {
    var recordid = this.parentCtrl.item.pnx.control.recordid[0];
    if (recordid.match(/^01ITHACACOL/)) {
      this.url = 'https://ithaca-primo.hosted.exlibrisgroup.com/permalink/f/vj27p3/' + recordid;
    } else {
      this.url = 'https://ithaca-primo.hosted.exlibrisgroup.com/permalink/f/1cgqes2/' + recordid;
    }
  } catch (e) {
    this.url = '';
  }

  // call number
  try {
    var theCallNumber = this.parentCtrl.item.delivery.bestlocation.callNumber;
    theCallNumber = theCallNumber.replace(/^[(\s]+/, '');
    theCallNumber = theCallNumber.replace(/[)\s]+$/, '');
    this.callNumber = theCallNumber;
  } catch (e) {
    this.callNumber = '';
  }

  // title
  try {
    this.title = this.parentCtrl.item.pnx.display.title[0];
  } catch (e) {
    this.title = '';
  }

  // author
  try {
    this.author = this.parentCtrl.item.pnx.display.creator[0];
  } catch (e) {
    this.author = '';
  }

  // location
  try {
    this.location = this.parentCtrl.item.delivery.bestlocation.subLocationCode;
  } catch (e) {
    this.location = '';
  }

  // is full text available?
  try {
    this.fullTextAvailability = this.parentCtrl.result.delivery.availability[0];
  } catch (e) {
    this.fullTextAvailability = '';
  }

  // get all PNX addata (for 'report a problem')
  try {
    var addata = this.parentCtrl.item.pnx.addata;
    var addataString = '';
    this.reportFormUrl = 'https://library.ithaca.edu/forms/primo_problem.php?';
    var addataFields = Object.keys(addata);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = addataFields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var addataField = _step.value;

        if (addataField !== 'abstract') {
          addataString += '&' + addataField + '=' + addata[addataField];
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    addataString = encodeURI(addataString.substring(1));
    addataString += '&permalink=' + encodeURI(this.url);
    this.reportFormUrl += addataString;
    // console.log(this.reportFormUrl);
  } catch (e) {
    this.reportFormUrl = '';
  }

  // what is it?
  try {
    this.category = this.parentCtrl.item.delivery.GetIt1[0].category;
  } catch (e) {
    this.category = '';
  }

  this.showSMSLink = Boolean(this.category === 'Alma-P');

  this.showNotOnShelfLink = Boolean(this.category === 'Alma-P' && this.location !== 'multimedia' && this.location != 'reserves');

  this.showReportAProblemLink = Boolean(this.category !== 'Alma-P');
}]);

app.component('prmActionContainerAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmActionContainerAfterController',
  template: '<div class="ic-more-actions"><button class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-primary" ng-show="$ctrl.showSMSLink"><span class="_md-nav-button-text"><a ng-href="https://library.ithaca.edu/services/sms_me.php?title={{$ctrl.title | encode}}&cn={{$ctrl.callNumber | encode}}&loc={{$ctrl.location | encode}}" class="ic-sms-link" target="_blank"><div class="layout-column" layout="column"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="#616161" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg><span class="button-text">SMS</span></div></a></span></button><button class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-primary" ng-show="$ctrl.showNotOnShelfLink"><span class="_md-nav-button-text"><a ng-href="https://library.ithaca.edu/forms/traceform.php?title={{$ctrl.title | encode}}&author={{$ctrl.author | encode}}&cn={{$ctrl.callNumber | encode}}" class="ic-trace-link" target="_blank"><div class="layout-column" layout="column"><prm-icon icon-definition="help-circle-outline" icon-type="svg" svg-icon-set="primo-ui"></prm-icon><span class="button-text">NOT ON SHELF</span></div></a></span></button><button class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-primary" ng-show={{$ctrl.showReportAProblemLink}}><span class="_md-nav-button-text"><a ng-href={{$ctrl.reportFormUrl}} class="ic-report-problem-link" target="_blank"><div class="layout-column" layout="column"><prm-icon icon-definition="error-attention" icon-type="svg" svg-icon-set="primo-ui"></prm-icon><span class="button-text">REPORT A PROBLEM</span></div></a></span></button></div>'
});

// LibAnswers chat widget
(function () {
  var lc = document.createElement('script');lc.type = 'text/javascript';lc.async = 'true';
  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'v2.libanswers.com/load_chat.php?hash=25b1eca60d946c4370ccfa5aacbaf5bf';
  var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(lc, s);
})();

// Google Analytics stuff
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-114536289-1', 'auto'); // Replace with your property ID.
ga('send', 'pageview');

var staticLocations = {
  'leasedbook': { 'floor': '2', 'x': 131, 'y': 156, 'width': 103, 'height': 11, 'message': 'This item is located on the low shelves just inside the main entrance, on the side facing the Circulation/Reserves desk.', 'english': 'Popular Reading' },
  'leasedaud': { 'floor': '2', 'x': 131, 'y': 156, 'width': 103, 'height': 11, 'message': 'This item is located on the low shelves just inside the main entrance, on the side facing the Circulation/Reserves desk.', 'english': 'Audio Books' },
  'newbooks': { 'floor': '2', 'x': 132, 'y': 166, 'width': 101, 'height': 13, 'message': 'This item is located on the low shelves just inside the main entrance, on the side facing the Research Help desk.', 'english': 'New Books' },
  'display': { 'floor': '2', 'x': 198, 'y': 198, 'width': 25, 'height': 27, 'message': 'This item is located at the Research Help Desk.', 'english': 'Display Shelf' },
  'newspaper': { 'floor': '2', 'x': 306, 'y': 140, 'width': 18, 'height': 54, 'message': 'This item is located on the low shelves below the main staircase on the second floor.', 'english': 'Newspapers' },
  'circdesk': { 'floor': '2', 'x': 100, 'y': 91, 'width': 123, 'height': 38, 'message': 'Ask for this item at the Circulation/Reserves desk on the second floor.', 'english': 'Circulation Desk' },
  'refdesk': { 'floor': '2', 'x': 128, 'y': 236, 'width': 110, 'height': 57, 'message': 'Ask for this item at the Research Help desk on the second floor.', 'english': 'Research Help Desk' },
  'popper': { 'floor': '2', 'x': 339, 'y': 197, 'width': 17, 'height': 64, 'message': 'This item is located on the low shelves near the center of the second floor.', 'english': 'Popular Periodicals' },
  'archives': { 'floor': '5', 'x': 338, 'y': 139, 'width': 188, 'height': 83, 'message': 'This item is located in the archives on the fifth floor. Contact Bridget Bower (bbower@ithaca.edu) for access.', 'english': 'Archives' },
  'serling': { 'floor': '5', 'x': 338, 'y': 139, 'width': 188, 'height': 83, 'message': 'This item is located in the archives on the fifth floor. Contact Bridget Bower (bbower@ithaca.edu) for access.', 'english': 'Archives' },
  'reference': { 'floor': '2', 'x': 128, 'y': 236, 'width': 110, 'height': 57, 'message': 'This item is located in the reference stacks behind the Research Help desk on the second floor.', 'english': 'Reference' },
  'microfilm': { 'floor': '4', 'x': 483, 'y': 59, 'width': 39, 'height': 64, 'message': 'This item is located in the metal cases in the southwest corner of the fourth floor, near the restrooms.', 'english': 'Microfilm' },
  'microcard': { 'floor': '4', 'x': 483, 'y': 59, 'width': 39, 'height': 64, 'message': 'This item is located in the metal cases in the southwest corner of the fourth floor, near the restrooms.', 'english': 'Microcard' },
  'microfiche': { 'floor': '4', 'x': 483, 'y': 59, 'width': 39, 'height': 64, 'message': 'This item is located in the metal cases in the southwest corner of the fourth floor, near the restrooms.', 'english': 'Microfiche' },
  'musper': { 'floor': '3', 'x': 153, 'y': 228, 'width': 39, 'height': 86, 'message': 'This item is located in the northeast corner of the third floor, near the administrative offices.', 'english': 'Music Periodicals' },
  'multimedia': { 'floor': '3', 'x': 263, 'y': 95, 'width': 81, 'height': 39, 'message': 'Ask for this item at the Multimedia desk on the third floor.', 'english': 'Multimedia' },
  'musicref': { 'floor': '3', 'x': 433, 'y': 233, 'width': 18, 'height': 78, 'message': 'This item is located near the Music Reference Desk in the NW corner of the third floor.', 'english': 'Music Reference' },
  'miniscore': { 'floor': '3', 'x': 413, 'y': 250, 'width': 21, 'height': 64, 'message': 'This item is located near the Music Reference Desk in the NW corner of the third floor.', 'english': 'Mini scores' },
  'musicfolio': { 'floor': '3', 'x': 413, 'y': 292, 'width': 10, 'height': 23, 'message': 'This item is located near the Music Reference Desk in the NW corner of the third floor.', 'english': 'Music Folio' },
  'oversize': { 'floor': '5', 'x': 303, 'y': 139, 'width': 40, 'height': 82, 'message': 'This item is located in the central area of the fifth floor, near the archives.', 'english': 'Oversize' },
  'folio': { 'floor': '5', 'x': 329, 'y': 187, 'width': 14, 'height': 36, 'message': 'This item is located in the central area of the fifth floor, near the archives.', 'english': 'Folio' },
  'reserves': { 'floor': '2', 'x': 100, 'y': 91, 'width': 123, 'height': 38, 'message': 'Ask for this item at the Circulation/Reserves desk on the second floor.', 'english': 'Circulation Desk' },
  'sheetmusic': { 'floor': '3', 'x': 462, 'y': 271, 'width': 79, 'height': 60, 'message': 'Ask for this item at the Music desk on the third floor.', 'english': 'Sheet Music Collection' },
  'atlascase': { 'floor': '2', 'x': 264, 'y': 184, 'width': 33, 'height': 18, 'message': 'Located in the atlas case near the main staircase on the second floor.', 'english': 'Atlas Case' },
  'citation': { 'floor': '2', 'x': 218, 'y': 188, 'width': 27, 'height': 15, 'message': 'This item is located on a small bookcase in front of the research help desk.', 'english': 'Citation Guides' },
  'ebook': { 'english': 'Ebooks' },
  'icebook': { 'english': 'Ebooks' },
  'eaudio': { 'english': 'Digital Audio' },
  'ejournal': { 'english': 'Online Journals' },
  'escore': { 'english': 'Online Scores' },
  'eresource': { 'english': 'Online Resources' }
};

var stacks = [{ 'id': '4.G1.e', 'start': 'AC1 .E8', 'end': 'B802 .V413', 'x': '85', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G1.w', 'start': 'B803 .H324', 'end': 'B1848 .E5 V4 1924', 'x': '95', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G2.e', 'start': 'B1853 .E5 V3 1962', 'end': 'BC135 .C97', 'x': '103', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G2.w', 'start': 'BC135 .D4 1966', 'end': 'BF121 .H25 1965', 'x': '113', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G3.e', 'start': 'BF121 .J2 1983', 'end': 'BF431 .Z9', 'x': '121', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G3.w', 'start': 'BF432 .A1 E38', 'end': 'BF723 .B6 M33 2017', 'x': '131', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G4.e', 'start': 'BF723 .C27 G45 2003', 'end': 'BJ1279 .S55', 'x': '139', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G4.w', 'start': 'BJ1280 .M58 2012', 'end': 'BL470 .G3', 'x': '149', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G5.e', 'start': 'BL473 .A76 2009', 'end': 'BL2525 .R654 1999', 'x': '157', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G5.w', 'start': 'BL2525 .S27 1991', 'end': 'BP75.3 .C36 2010', 'x': '167', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G6.e', 'start': 'BP80 .A45 K4', 'end': 'BR148 .M4', 'x': '175', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G6.w', 'start': 'BR150 .C59 1962', 'end': 'BS1225.55 .K65 2006', 'x': '184', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G7.e', 'start': 'BS1233 .A785 2009', 'end': 'BV3202 .K74 A3 2004', 'x': '193', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G7.w', 'start': 'BV3415 .V35', 'end': 'BX4833.5 .H35 1996', 'x': '204', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G8.e', 'start': 'BX4838 .G74 2000', 'end': 'CB411 .S8', 'x': '211', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G8.w', 'start': 'CB411 .T5 1964', 'end': 'D11.5 .W5 1967', 'x': '220', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G9.e', 'start': 'D13 .A9', 'end': 'D352.8.N4 A3', 'x': '229', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G9.w', 'start': 'D353 .S3', 'end': 'D753 .F5', 'x': '239', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G10.e', 'start': 'D753 .H28', 'end': 'D811 .Y3', 'x': '247', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G10.w', 'start': 'D811.5 .A413', 'end': 'DA140 .T48 1986', 'x': '257', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G11.e', 'start': 'DA142 .C48 2004', 'end': 'DA508.A5 M3 1979', 'x': '265', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G11.w', 'start': 'DA510 .C43 1965', 'end': 'DA920 .M15 1949', 'x': '276', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G12.e', 'start': 'DA925 .A36 1988', 'end': 'DC143 .C6', 'x': '320', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G12.w', 'start': 'DC145 .D7', 'end': 'DD218.2 .S85 1977', 'x': '330', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G13.e', 'start': 'DD219.H6 A3', 'end': 'DF287.P3 P37 2005', 'x': '338', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G13.w', 'start': 'DF503 .B7', 'end': 'DJ411 .A62 K4', 'x': '348', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G14.e', 'start': 'DJK9 .E2 1976', 'end': 'DK274 .R8', 'x': '356', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G14.w', 'start': 'DK274 .S276 1975', 'end': 'DR370 .V8', 'x': '366', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G15.e', 'start': 'DR381.M38 P3', 'end': 'DS118 .R6 1970', 'x': '374', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G15.w', 'start': 'DS119 .G58', 'end': 'DS369.4 .N44', 'x': '384', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G16.e', 'start': 'DS371.2 .A45513 1992', 'end': 'DS705 .E539 1987', 'x': '392', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G16.w', 'start': 'DS706 .C514 1991', 'end': 'DS371.4 .S274 2012', 'x': '402', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G17.e', 'start': 'DT1 .A14 1974/75', 'end': 'DT779.9 .S68', 'x': '411', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G17.w', 'start': 'DT779.9 .S69', 'end': 'E99.C5 H7452 2012', 'x': '420', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G18.e', 'start': 'E99 .C5 J615 2003', 'end': 'E169.1 .C777 1984', 'x': '430', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G18.w', 'start': 'E169.1 .C785 1992', 'end': 'E179.5 .M32 1997', 'x': '438', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G19.e', 'start': 'E180 .K28 1995', 'end': 'E184 .J5 S23 1993', 'x': '482', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G19.w', 'start': 'E184 .K6 E27 1997', 'end': 'E185.86 .S6974 1996', 'x': '492', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G20.e', 'start': 'E185.86 .S698 2005', 'end': 'E302.5 .W74', 'x': '500', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G20.w', 'start': 'E302.6.A2 B4', 'end': 'E448 .R3', 'x': '511', 'y': '222', 'height': '80', 'width': '9' }, { 'id': '4.G21.w', 'start': 'E449 .A1555 1994', 'end': 'E660 .R88', 'x': '473', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G21.e', 'start': 'E660 .W715', 'end': 'E746 .W5', 'x': '464', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G22.w', 'start': 'E747 .A75', 'end': 'E840 .A675 2004', 'x': '456', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G22.e', 'start': 'E840 .B34', 'end': 'F124 .W89', 'x': '446', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G23.w', 'start': 'F125.3.C85 A3 2014', 'end': 'F231.2 .G6 1969', 'x': '438', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G23.e', 'start': 'F232.C43 M67 1998', 'end': 'F656.N6 F5', 'x': '428', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G24.w', 'start': 'F657.B6 M37', 'end': 'F1234 .N495 1999', 'x': '420', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G24.e', 'start': 'F1234 .O73 C37 2017', 'end': 'F2271 .S56 2004', 'x': '411', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G25.w', 'start': 'F2272 .J553', 'end': 'G890 .H4 S3', 'x': '402', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G25.e', 'start': 'G1019 .F8', 'end': 'GN23 .P9 1973', 'x': '392', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G26.w', 'start': 'GN24 .B43', 'end': 'GN656 .K86 1982', 'x': '383', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G26.e', 'start': 'GN657.B64 M75 1982', 'end': 'GV182.3 .U55 1993', 'x': '374', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G27.w', 'start': 'GV183 .B57 1996', 'end': 'GV881.4.T72 P68 2007', 'x': '366', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G27.e', 'start': 'GV883 .C86 2009', 'end': 'H59 .W6 W63', 'x': '356', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G28.w', 'start': 'H61 .A37', 'end': 'HB501 .W559', 'x': '348', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G28.e', 'start': 'HB501 .W89 1988', 'end': 'HC79.I55 W566 2013', 'x': '338', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G29.w', 'start': 'HC79.P6 I58 2010', 'end': 'HC125 .M35', 'x': '330', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '4.G29.e', 'start': 'HC125 .N459 2002', 'end': 'HC1060 .H47 1993', 'x': '320', 'y': '50', 'height': '80', 'width': '9' }, { 'id': '5.G30.w', 'start': 'HD19 .F46 1976', 'end': 'HD58 .W34 1972', 'x': '69', 'y': '21', 'height': '49', 'width': '15' }, { 'id': '5.G31.e', 'start': 'HD58.5 .G35 2009', 'end': 'HD191 .S8 1967', 'x': '86', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G31.w', 'start': 'HD194 .A6', 'end': 'HD4606.N5 B58', 'x': '95', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G32.e', 'start': 'HD4802 .R42', 'end': 'HD6957 .U6 M67 1987', 'x': '104', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G32.w', 'start': 'HD6959 .J33 1995', 'end': 'HD9424 .M6 M496 2006', 'x': '113', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G33.e', 'start': 'HD9426 .I42 W5', 'end': 'HE2583 .S67', 'x': '121', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G33.w', 'start': 'HE2751 .A77', 'end': 'HF5011 .B75', 'x': '130', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G34.e', 'start': 'HF5011 .C3 1968', 'end': 'HF5667 .M18', 'x': '140', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G34.w', 'start': 'HF5667 .O673 2003', 'end': 'HG2411 .N732', 'x': '149', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G35.e', 'start': 'HG2416 .R5 1967', 'end': 'HJ257 .L45', 'x': '156', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G35.w', 'start': 'HJ257 .M33', 'end': 'HM141 .J43', 'x': '166', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G36.e', 'start': 'HM141 .K29 1991', 'end': 'HM1116 .W46 2000', 'x': '174', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G36.w', 'start': 'HM1121 .B37 2002', 'end': 'HN90.R3 L8', 'x': '183', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G37.e', 'start': 'HN90.R3 M3', 'end': 'HQ56 .W648 1991', 'x': '191', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G37.w', 'start': 'HQ57.2 .B87 2011', 'end': 'HQ755.86 .T366 2006', 'x': '201', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G38.e', 'start': 'HQ756 .A8 1995', 'end': 'HQ1059.5.U5 W65 1984', 'x': '209', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G38.w', 'start': 'HQ1060 .A34', 'end': 'HQ1240.5.U6 N36 1998', 'x': '218', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G39.e', 'start': 'HQ1381 .A44 2002', 'end': 'HT166 .W484 2013', 'x': '226', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G39.w', 'start': 'HT167 .A834 1994', 'end': 'HV636 2005.N4 T47 2010', 'x': '235', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G40.e', 'start': 'HV639 .H37 1998', 'end': 'HV4547.A4 F57 2000', 'x': '244', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G40.w', 'start': 'HV4708 .A24 2006', 'end': 'HV6431 .P678 2015', 'x': '253', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G41.e', 'start': 'HV6431 .R53 2006', 'end': 'HV6795.S5 C45 1978', 'x': '261', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G41.w', 'start': 'HV6810.5 .C745 2001', 'end': 'HV9474.F66 K47 2013', 'x': '270', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G42.e', 'start': 'HV9475.A13 A96 1986', 'end': 'J81.4 .M93 2003', 'x': '279', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G42.w', 'start': 'J82 .D2', 'end': 'JC179.V9 R6', 'x': '287', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G43.e', 'start': 'JC181.K4 S2513', 'end': 'JC599.U5 M25', 'x': '296', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G43.w', 'start': 'JC599.U5 M3', 'end': 'JK686 .H7', 'x': '305', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G44.e', 'start': 'JK691 .A52 1965', 'end': 'JL2098.S6 W34', 'x': '313', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G44.w', 'start': 'JL2269.P7 B84', 'end': 'JS1239 .Z7 1969', 'x': '321', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G45.e', 'start': 'JS1240.W37 K37', 'end': 'JX1977 .S94', 'x': '330', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G45.w', 'start': 'JX1977 .T6', 'end': 'KF224.D37 L8', 'x': '339', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G46.e', 'start': 'KF224.E43 C67 1996', 'end': 'KF4166.Z9 V37 1994', 'x': '348', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G46.w', 'start': 'KF4192.5.G8 H85 1985', 'end': 'KF8972.Z9 G74 2003', 'x': '357', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G47.e', 'start': 'KF8990 .P67 2007', 'end': 'LA1013.7 .S35 2011', 'x': '366', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G47.w', 'start': 'LA1040.A4 T45', 'end': 'LB1103 .S6', 'x': '374', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G48.e', 'start': 'LB1105 .R6 1966', 'end': 'LB2343 .W35', 'x': '383', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G48.w', 'start': 'LB2343.3 .C62 2005', 'end': 'LC215 .P75 2008', 'x': '391', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G49.e', 'start': 'LC217 .P47', 'end': 'LC4801 .W65', 'x': '400', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G49.w', 'start': 'LC4802 .B37 1995', 'end': 'N6270 .S84 2005', 'x': '409', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G50.e', 'start': 'N6280 .B813 1966A', 'end': 'N6915 .W6 1963', 'x': '417', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G50.w', 'start': 'N6916 .B76', 'end': 'NA279.C7 G7', 'x': '426', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G51.e', 'start': 'NA280 .E5', 'end': 'NA6311 .N39 2012', 'x': '435', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G51.w', 'start': 'NA6402 .B73 1999', 'end': 'NC1670 .S9', 'x': '443', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G52.e', 'start': 'NC1730 .C37 2009', 'end': 'ND623.B92 S42', 'x': '452', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G52.w', 'start': 'ND623.C2 A4 2006', 'end': 'ND2885 .M38 2011', 'x': '461', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G53.e', 'start': 'ND2888.B3 A43', 'end': 'NX170 .R43 2003', 'x': '470', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G53.w', 'start': 'NX175 .A47 1993', 'end': 'P90 .W8 2001', 'x': '479', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G54.e', 'start': 'P91 .A54 1987', 'end': 'P123 .E95 1982', 'x': '487', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G54.w', 'start': 'P123 .G76', 'end': 'PA4410 .S5 1967', 'x': '496', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G55.e', 'start': 'PA4413 .A2 1975', 'end': 'PC4625 .B6', 'x': '504', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G55.w', 'start': 'PC4640 .L38 1993', 'end': 'PG3021 .T4713 1971', 'x': '513', 'y': '29', 'height': '80', 'width': '9' }, { 'id': '5.G56.e', 'start': 'PG3022 .A413 1964', 'end': 'PG9621.K3 U713 1998', 'x': '528', 'y': '21', 'height': '58', 'width': '14' }, { 'id': '5.G57.e', 'start': 'PH301 .A35', 'end': 'PL5105 .L49', 'x': '487', 'y': '248', 'height': '58', 'width': '14' }, { 'id': '5.G58.w', 'start': 'PL6053 .B7 1991', 'end': 'PN511 .W633 1965', 'x': '513', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G58.e', 'start': 'PN513 .B44', 'end': 'PN1345 .T7', 'x': '504', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G59.w', 'start': 'PN1356 .B76 1997', 'end': 'PN1992.77.X22 D46 1996', 'x': '496', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G59.e', 'start': 'PN1992.8.A3 H5', 'end': 'PN1995.9.A5 B87 2002', 'x': '487', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G60.w', 'start': 'PN1995.9.A68 S46 2006', 'end': 'PN1998 .P24', 'x': '478', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G60.e', 'start': 'PN1998.2 .A24 2011', 'end': 'PN2266 .B73', 'x': '470', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G61.w', 'start': 'PN2266 .C592 1994', 'end': 'PN2782 .S45 1967', 'x': '461', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G61.e', 'start': 'PN2784 .C66 1988', 'end': 'PN4784 .F6 S56 2016', 'x': '452', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G62.w', 'start': 'PN4784.I6 A33 2001', 'end': 'PN6032 .B52', 'x': '443', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G62.e', 'start': 'PN6054 .B3', 'end': 'PN6790.S93 B3713 2009', 'x': '435', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G63.w', 'start': 'PQ11 .G4', 'end': 'PQ1487 .J53 1972', 'x': '426', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G63.e', 'start': 'PQ1489.L2 A38', 'end': 'PQ2157 .E42A', 'x': '417', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G64.w', 'start': 'PQ2157 .E42A', 'end': 'PQ2444 .S5', 'x': '409', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G64.e', 'start': 'PQ2446.A29 W2', 'end': 'PQ2623.O8 Z5536 1978', 'x': '400', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G65.w', 'start': 'PQ2625.A16 Q8', 'end': 'PQ4113 .T894 2007', 'x': '391', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G65.e', 'start': 'PQ4117 .C38 2004', 'end': 'PQ6183 .B00 1948', 'x': '383', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G66.w', 'start': 'PQ6184 .A53 2007', 'end': 'PQ6558 .V5', 'x': '374', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G66.e', 'start': 'PQ6560 1957', 'end': 'PQ7297.F793 Z933 1998', 'x': '365', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G67.w', 'start': 'PQ7297.G23 O8 1994', 'end': 'PQ8549.U7 I68 1996', 'x': '356', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G67.e', 'start': 'PQ8550.13.E5 S44 2012', 'end': 'PR457 .W74 1993', 'x': '348', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G68.w', 'start': 'PR461 .A33 2009', 'end': 'PR858.W6 T6', 'x': '339', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G68.e', 'start': 'PR861 .B76 1985', 'end': 'PR1272 .W4', 'x': '331', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G69.w', 'start': 'PR1281 .W8', 'end': 'PR2539.G6 R3 1974', 'x': '322', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G69.e', 'start': 'PR2541 .C6', 'end': 'PR2949 .T33 1966', 'x': '312', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G70.w', 'start': 'PR2952 .A45 1972', 'end': 'PR3452 .W5', 'x': '304', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G70.e', 'start': 'PR3454 .A9 1966', 'end': 'PR3776 .Z5', 'x': '296', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G71.w', 'start': 'PR3777 .M37 1993', 'end': 'PR4550 .E50', 'x': '287', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G71.e', 'start': 'PR4550 .E6', 'end': 'PR4963 .Y6', 'x': '279', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G72.w', 'start': 'PR4969 .R4', 'end': 'PR5560 .S82 1982', 'x': '271', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G72.e', 'start': 'PR5562 .A1 1900', 'end': 'PR6003.R815 A6', 'x': '262', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G73.w', 'start': 'PR6003.U13 C6 1970', 'end': 'PR6023.A94 Z8', 'x': '252', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G73.e', 'start': 'PR6023.E15 A8 1914', 'end': 'PR6051.Z96 H53 2001', 'x': '244', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G74.w', 'start': 'PR6052.A3184 Z475 1986', 'end': 'PR9275.S263 P4728 1995', 'x': '235', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G74.e', 'start': 'PR9289.9.E33 B4 1982', 'end': 'PS310.W64 S5', 'x': '225', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G75.w', 'start': 'PS312 .D3', 'end': 'PS634 .Y27', 'x': '217', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G75.e', 'start': 'PS634.2 .B475 2016', 'end': 'PS1850 .F63', 'x': '209', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G76.w', 'start': 'PS1851 .H3', 'end': 'PS3053 .D4', 'x': '200', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G76.e', 'start': 'PS3053 .H3', 'end': 'PS3509.V23 A6 1970', 'x': '191', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G77.w', 'start': 'PS3511.A33 E5', 'end': 'PS3523.Y85 E56 1994', 'x': '182', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G77.e', 'start': 'PS3525.A1143 Z5 1968', 'end': 'PS3537.P652 Z59 2012', 'x': '174', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G78.w', 'start': 'PS3537.T143 A8', 'end': 'PS3553.O655 .N 1984b', 'x': '165', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G78.e', 'start': 'PS3553.O7 A5', 'end': 'PS3563.A63 C5', 'x': '157', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G79.w', 'start': 'PS3563.A63665 C84 2001', 'end': 'PS3580.R3 S5 1973', 'x': '148', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G79.e', 'start': 'PS3600.A6 H37 2009', 'end': 'PT2380 .K7 1970', 'x': '139', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G80.w', 'start': 'PT2381 .A1 1954', 'end': 'PT3710.W65 D84 2004', 'x': '131', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G80.e', 'start': 'PT3716 .R3', 'end': 'PZ3.9.F85 Co 1976', 'x': '122', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G81.w', 'start': 'PZ4.A213 LAS', 'end': 'Q143.O4 H35 2002', 'x': '113', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G81.e', 'start': 'Q143.P2 D78', 'end': 'QA39 .G35', 'x': '104', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G82.w', 'start': 'QA39.2 .A88', 'end': 'QA76.95 .W446 2015', 'x': '96', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G82.e', 'start': 'QA90 .B47513 2010', 'end': 'QA297 .O78', 'x': '87', 'y': '248', 'height': '80', 'width': '9' }, { 'id': '5.G83.w', 'start': 'QA297 .R395 1998', 'end': 'QA809 .D4 2010', 'x': '69', 'y': '273', 'height': '60', 'width': '15' }, { 'id': '5.G84.e', 'start': 'QB3 .S52', 'end': 'QD61 .T4 v.23', 'x': '174', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G84.w', 'start': 'QD63.D6 K713', 'end': 'QD601.A1 P46', 'x': '182', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G85.e', 'start': 'QD601.A1 P46', 'end': 'QH506 .V613', 'x': '191', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G85.w', 'start': 'QH507 .H6513 1984', 'end': 'QL431 .W58', 'x': '200', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G86.e', 'start': 'QL434 .C34', 'end': 'QP186 .U63 1990', 'x': '208', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G86.w', 'start': 'QP187 .B46', 'end': 'QP625.N89 C9', 'x': '217', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G87.e', 'start': 'QP671.C8 S36 1996', 'end': 'RA418.5.T73 W5 2003', 'x': '226', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G87.w', 'start': 'RA421 .A32 1995a', 'end': 'RC267 .W45 1996', 'x': '235', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G88.e', 'start': 'RC268 .E35 1984', 'end': 'RC489.A72 U85 1984', 'x': '243', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G88.w', 'start': 'RC489.B4 B4352', 'end': 'RD31.5 .K37 1999', 'x': '252', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G89.e', 'start': 'RD34 .S85', 'end': 'RJ496.S8 W36 1998', 'x': '261', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G89.w', 'start': 'RJ499.A1 A53', 'end': 'SK199 .A73 2001', 'x': '269', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G90.e', 'start': 'SK203 .B37 2001', 'end': 'TN870.5 .G66 1999', 'x': '279', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G90.w', 'start': 'TN871 .A718', 'end': 'TX360.U63 N49 2012', 'x': '287', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G91.e', 'start': 'TX361.A8 A28 2012', 'end': 'Z1004.O83 W75 2014', 'x': '296', 'y': '142', 'height': '80', 'width': '9' }, { 'id': '5.G91.w', 'start': 'Z1005 .A73 1967', 'end': 'ZA4575 .T85 2012', 'x': '305', 'y': '142', 'height': '80', 'width': '9' }];

var perStacks = [{ "id": "4.P1.e", "start": "AG305 .N7", "end": "AP2 .N6763", "x": "86", "y": "50", "height": "80", "width": "9" }, { "id": "4.P1.w", "start": "AP2 .P46", "end": "AP60 .R43", "x": "95", "y": "50", "height": "80", "width": "9" }, { "id": "4.P2.e", "start": "AP92 .T5", "end": "BF789 .D4 A53", "x": "104", "y": "50", "height": "80", "width": "9" }, { "id": "4.P2.w", "start": "BF789 .D4 O4", "end": "E151 .J8", "x": "114", "y": "50", "height": "80", "width": "9" }, { "id": "4.P3.e", "start": "E169.1 .J66", "end": "GN700 .J68", "x": "122", "y": "50", "height": "80", "width": "9" }, { "id": "4.P3.w", "start": "GR1 .I39", "end": "HM251 .J53", "x": "130", "y": "50", "height": "80", "width": "9" }, { "id": "4.P4.e", "start": "HM258 .J67", "end": "JN101 .P3", "x": "140", "y": "50", "height": "80", "width": "9" }, { "id": "4.P4.w", "start": "JN6501 .D45", "end": "LB3062 .I48", "x": "149", "y": "50", "height": "80", "width": "9" }, { "id": "4.P5.e", "start": "LB3454 .L3", "end": "N1 .I6", "x": "158", "y": "50", "height": "80", "width": "9" }, { "id": "4.P5.w", "start": "N1 .J6", "end": "P1 .E58", "x": "168", "y": "50", "height": "80", "width": "9" }, { "id": "4.P6.e", "start": "P1 .F72", "end": "PJ5120 .A2254", "x": "176", "y": "50", "height": "80", "width": "9" }, { "id": "4.P6.w", "start": "PN2 .C4", "end": "PN1993 .A1 F4", "x": "186", "y": "50", "height": "80", "width": "9" }, { "id": "4.P7.e", "start": "PN1993 .A617", "end": "PQ7081 .A1 H57", "x": "195", "y": "50", "height": "80", "width": "9" }, { "id": "4.P7.w", "start": "PQ7081 .A1 R4", "end": "QA1 .A876", "x": "204", "y": "50", "height": "80", "width": "9" }, { "id": "4.P8.e", "start": "QA1 .F5", "end": "QD1 .A67", "x": "212", "y": "50", "height": "80", "width": "9" }, { "id": "4.P8.w", "start": "QD1 .B55", "end": "QH301 .J677", "x": "221", "y": "50", "height": "80", "width": "9" }, { "id": "4.P9.e", "start": "QH301 .J68", "end": "QL750 .B7", "x": "230", "y": "50", "height": "80", "width": "9" }, { "id": "4.P9.w", "start": "QL757 .J68", "end": "QP1 .H84", "x": "239", "y": "50", "height": "80", "width": "9" }, { "id": "4.P10.e", "start": "QP1 .J72", "end": "R15 .A48", "x": "249", "y": "50", "height": "80", "width": "9" }, { "id": "4.P10.w", "start": "R15 .N6", "end": "RC321 .A47", "x": "257", "y": "50", "height": "80", "width": "9" }, { "id": "4.P11.e", "start": "RC321 .J832", "end": "RF297 .A25", "x": "266", "y": "50", "height": "80", "width": "9" }, { "id": "4.P11.w", "start": "RJ53 .P5 P432", "end": "Z119 .G87", "x": "276", "y": "50", "height": "80", "width": "9" }];

var musicStacks = [{ "id": "3.M3.w", "start": "M1 .A13 A4", "end": "M2 .R2384", "x": "403", "y": "231", "height": "84", "width": "10" }, { "id": "3.M3.e", "start": "M2 .R2386", "end": "M3 .G66", "x": "394", "y": "230", "height": "84", "width": "10" }, { "id": "3.M4.w", "start": "M3 .G68", "end": "M3 .S36", "x": "384", "y": "230", "height": "84", "width": "10" }, { "id": "3.M4.e", "start": "M3 .S38242", "end": "M8 .V66 S8", "x": "375", "y": "230", "height": "84", "width": "10" }, { "id": "3.M5.w", "start": "M9 .A28 P5", "end": "M228 .Z8 S4", "x": "365", "y": "230", "height": "84", "width": "10" }, { "id": "3.M5.e", "start": "M229 .B66 C4 2009", "end": "M1001 .E72 O9", "x": "356", "y": "230", "height": "84", "width": "10" }, { "id": "3.M6.w", "start": "M1001 .F527", "end": "M1375 .B631 S58", "x": "346", "y": "230", "height": "84", "width": "10" }, { "id": "3.M6.e", "start": "M1378 .A184 S4 1983", "end": "M1503 .S3635", "x": "337", "y": "230", "height": "84", "width": "10" }, { "id": "3.M7.w", "start": "M1503 .S38 A4", "end": "M1518 .S56", "x": "326", "y": "230", "height": "84", "width": "10" }, { "id": "3.M7.e", "start": "M1520 .B5 F36", "end": "M1622 .S66", "x": "317", "y": "230", "height": "84", "width": "10" }, { "id": "3.M8.w", "start": "M1623 .S38 S5", "end": "ML60 .T67 M8", "x": "306", "y": "230", "height": "84", "width": "10" }, { "id": "3.M8.e", "start": "ML60 .V18", "end": "ML285.5 .R7", "x": "298", "y": "230", "height": "84", "width": "10" }, { "id": "3.M9.w", "start": "ML286 .C28 1991", "end": "ML410 .G46 O813 1988", "x": "254", "y": "230", "height": "84", "width": "10" }, { "id": "3.M9.e", "start": "ML410 .G5 A413 1962", "end": "ML410 .S932 V38 2012", "x": "245", "y": "230", "height": "84", "width": "10" }, { "id": "3.M10.w", "start": "ML410 .S932 V52 1967", "end": "ML420 .M62 H7 1981", "x": "235", "y": "230", "height": "84", "width": "10" }, { "id": "3.M10.e", "start": "ML420 .N37 B6 2010", "end": "ML756 .H64 1993", "x": "226", "y": "230", "height": "84", "width": "10" }, { "id": "3.M11.w", "start": "ML760 .A35 1991", "end": "ML3475 .R66 B6 2008", "x": "217", "y": "230", "height": "84", "width": "10" }, { "id": "3.M11.e", "start": "ML3477 .A48 1992", "end": "ML3918 .U53 S9 2005", "x": "208", "y": "230", "height": "84", "width": "10" }, { "id": "3.M12.w", "start": "ML3920 .A33 1996", "end": "MT130 .Z34 G37 1999", "x": "198", "y": "230", "height": "84", "width": "10" }, { "id": "3.M12.e", "start": "MT135 .C66 2003", "end": "MT956 .S36 R6 2011", "x": "189", "y": "230", "height": "84", "width": "10" }];
(function (window) {
  'use strict';

  var re = {
    not_string: /[^s]/,
    not_bool: /[^t]/,
    not_type: /[^T]/,
    not_primitive: /[^v]/,
    number: /[diefg]/,
    numeric_arg: /bcdiefguxX/,
    json: /[j]/,
    not_json: /[^j]/,
    text: /^[^\x25]+/,
    modulo: /^\x25{2}/,
    placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
    key: /^([a-z_][a-z_\d]*)/i,
    key_access: /^\.([a-z_][a-z_\d]*)/i,
    index_access: /^\[(\d+)\]/,
    sign: /^[\+\-]/
  };

  function sprintf() {
    var key = arguments[0],
        cache = sprintf.cache;
    if (!(cache[key] && cache.hasOwnProperty(key))) {
      cache[key] = sprintf.parse(key);
    }
    return sprintf.format.call(null, cache[key], arguments);
  }

  sprintf.format = function (parse_tree, argv) {
    var cursor = 1,
        tree_length = parse_tree.length,
        node_type = '',
        arg,
        output = [],
        i,
        k,
        match,
        pad,
        pad_character,
        pad_length,
        is_positive = true,
        sign = '';
    for (i = 0; i < tree_length; i++) {
      node_type = get_type(parse_tree[i]);
      if (node_type === 'string') {
        output[output.length] = parse_tree[i];
      } else if (node_type === 'array') {
        match = parse_tree[i]; // convenience purposes only
        if (match[2]) {
          // keyword argument
          arg = argv[cursor];
          for (k = 0; k < match[2].length; k++) {
            if (!arg.hasOwnProperty(match[2][k])) {
              throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
            }
            arg = arg[match[2][k]];
          }
        } else if (match[1]) {
          // positional argument (explicit)
          arg = argv[match[1]];
        } else {
          // positional argument (implicit)
          arg = argv[cursor++];
        }

        if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && get_type(arg) == 'function') {
          arg = arg();
        }

        if (re.numeric_arg.test(match[8]) && get_type(arg) != 'number' && isNaN(arg)) {
          throw new TypeError(sprintf("[sprintf] expecting number but found %s", get_type(arg)));
        }

        if (re.number.test(match[8])) {
          is_positive = arg >= 0;
        }

        switch (match[8]) {
          case 'b':
            arg = parseInt(arg, 10).toString(2);
            break;
          case 'c':
            arg = String.fromCharCode(parseInt(arg, 10));
            break;
          case 'd':
          case 'i':
            arg = parseInt(arg, 10);
            break;
          case 'j':
            arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0);
            break;
          case 'e':
            arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential();
            break;
          case 'f':
            arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
            break;
          case 'g':
            arg = match[7] ? parseFloat(arg).toPrecision(match[7]) : parseFloat(arg);
            break;
          case 'o':
            arg = arg.toString(8);
            break;
          case 's':
            arg = String(arg);
            arg = match[7] ? arg.substring(0, match[7]) : arg;
            break;
          case 't':
            arg = String(!!arg);
            arg = match[7] ? arg.substring(0, match[7]) : arg;
            break;
          case 'T':
            arg = get_type(arg);
            arg = match[7] ? arg.substring(0, match[7]) : arg;
            break;
          case 'u':
            arg = parseInt(arg, 10) >>> 0;
            break;
          case 'v':
            arg = arg.valueOf();
            arg = match[7] ? arg.substring(0, match[7]) : arg;
            break;
          case 'x':
            arg = parseInt(arg, 10).toString(16);
            break;
          case 'X':
            arg = parseInt(arg, 10).toString(16).toUpperCase();
            break;
        }
        if (re.json.test(match[8])) {
          output[output.length] = arg;
        } else {
          if (re.number.test(match[8]) && (!is_positive || match[3])) {
            sign = is_positive ? '+' : '-';
            arg = arg.toString().replace(re.sign, '');
          } else {
            sign = '';
          }
          pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - (sign + arg).length;
          pad = match[6] ? pad_length > 0 ? str_repeat(pad_character, pad_length) : '' : '';
          output[output.length] = match[5] ? sign + arg + pad : pad_character === '0' ? sign + pad + arg : pad + sign + arg;
        }
      }
    }
    return output.join('');
  };

  sprintf.cache = {};

  sprintf.parse = function (fmt) {
    var _fmt = fmt,
        match = [],
        parse_tree = [],
        arg_names = 0;
    while (_fmt) {
      if ((match = re.text.exec(_fmt)) !== null) {
        parse_tree[parse_tree.length] = match[0];
      } else if ((match = re.modulo.exec(_fmt)) !== null) {
        parse_tree[parse_tree.length] = '%';
      } else if ((match = re.placeholder.exec(_fmt)) !== null) {
        if (match[2]) {
          arg_names |= 1;
          var field_list = [],
              replacement_field = match[2],
              field_match = [];
          if ((field_match = re.key.exec(replacement_field)) !== null) {
            field_list[field_list.length] = field_match[1];
            while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
              if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                field_list[field_list.length] = field_match[1];
              } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                field_list[field_list.length] = field_match[1];
              } else {
                throw new SyntaxError("[sprintf] failed to parse named argument key");
              }
            }
          } else {
            throw new SyntaxError("[sprintf] failed to parse named argument key");
          }
          match[2] = field_list;
        } else {
          arg_names |= 2;
        }
        if (arg_names === 3) {
          throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
        }
        parse_tree[parse_tree.length] = match;
      } else {
        throw new SyntaxError("[sprintf] unexpected placeholder");
      }
      _fmt = _fmt.substring(match[0].length);
    }
    return parse_tree;
  };

  var vsprintf = function vsprintf(fmt, argv, _argv) {
    _argv = (argv || []).slice(0);
    _argv.splice(0, 0, fmt);
    return sprintf.apply(null, _argv);
  };

  /**
   * helpers
   */
  function get_type(variable) {
    if (typeof variable === 'number') {
      return 'number';
    } else if (typeof variable === 'string') {
      return 'string';
    } else {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }
  }

  var preformattedPadding = {
    '0': ['', '0', '00', '000', '0000', '00000', '000000', '0000000'],
    ' ': ['', ' ', '  ', '   ', '    ', '     ', '      ', '       '],
    '_': ['', '_', '__', '___', '____', '_____', '______', '_______']
  };
  function str_repeat(input, multiplier) {
    if (multiplier >= 0 && multiplier <= 7 && preformattedPadding[input]) {
      return preformattedPadding[input][multiplier];
    }
    return Array(multiplier + 1).join(input);
  }

  /**
   * export to either browser or node.js
   */
  if (typeof exports !== 'undefined') {
    exports.sprintf = sprintf;
    exports.vsprintf = vsprintf;
  } else {
    window.sprintf = sprintf;
    window.vsprintf = vsprintf;

    if (typeof define === 'function' && define.amd) {
      define(function () {
        return {
          sprintf: sprintf,
          vsprintf: vsprintf
        };
      });
    }
  }
})(typeof window === 'undefined' ? undefined : window);
})();