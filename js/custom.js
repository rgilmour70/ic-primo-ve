(function(){
"use strict";
'use strict';

/* eslint-disable */
var app = angular.module('viewCustom', ['angularLoad', 'ui.router']);

// Import jQuery
// var jQueryScript = document.createElement("script");  
// jQueryScript.src = "https://code.jquery.com/jquery-3.3.1.min.js";  
// document.getElementsByTagName("head")[0].appendChild(jQueryScript);


app.filter('encode', function () {
  return encodeURIComponent;
});

// EBSCO link
app.controller('ebscoLinkController', [function ($stateParams, $state) {

  function convertToEbsco(str) {
    var ebscoSearchString = '';
    var primoSearchArray = str.split(/,\s*/);
    var conjunction = primoSearchArray[3] || '';

    var searchTerms = primoSearchArray[2].replace(/\s/g, '+');

    switch (primoSearchArray[0]) {
      case 'title':
        ebscoSearchString = 'TI+' + searchTerms;
        break;
      case 'creator':
        ebscoSearchString = 'AU+' + searchTerms;
        break;
      case 'sub':
        ebscoSearchString = 'SU+' + searchTerms;
        break;
      default:
        // handles 'any' case
        ebscoSearchString = '' + searchTerms;
    }
    if (conjunction) {
      ebscoSearchString += '+' + conjunction + '+';
    }
    return ebscoSearchString;
  }

  this.primoSearchString = document.getElementById('searchBar').value;
  var primoSearch = this.parentCtrl.$stateParams.query; // can be a string OR array!

  var ebscoSearchString = '';

  if (!Array.isArray(primoSearch)) {
    // simple search
    ebscoSearchString = convertToEbsco(primoSearch);
  } else {
    // compound search
    for (var i = 0; i < primoSearch.length; i++) {
      ebscoSearchString += convertToEbsco(primoSearch[i]);
    }
    ebscoSearchString = ebscoSearchString.replace(/\+[A-Z]+\+$/, '');
  }

  this.label = 'Try EBSCO';
  var proxyString = 'http://ezproxy.ithaca.edu:2048/login?qurl=';
  var baseUrl = 'https://search.ebscohost.com/login.aspx?direct=true&defaultdb=aph,gnh,apn,ahl,aft,air,ami,rfh,bvh,bxh,boh,buh,cin20,cms,nlebk,eric,hev,8gh,hch,hia,ibh,qth,lxh,lfh,ulh,cmedm,mth,mah,msn,nfh,ofs,phl,tfh,rgr,bwh,ram,rft,sih,s3h,trh,ser,e870sww,e872sww,mft,kah,mzh&type=1&searchMode=Standard&site=ehost-live&scope=site';
  this.searchUrl = encodeURIComponent(baseUrl + '&bquery=' + ebscoSearchString);
  this.proxiedSearchUrl = proxyString + this.searchUrl;

  // send an event to GA
  var ebscoLink = document.getElementById('ic-ebsco-link');
  ebscoLink.addEventListener('click', function (event) {
    ebscoLink.click();
  });
}]);
app.component('prmPersonalizeResultsButtonAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'ebscoLinkController',
  template: '<div id="ic-ebsco-link-block"><a href="{{$ctrl.proxiedSearchUrl}}" target="_blank" id="ic-ebsco-link">{{$ctrl.label}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div>'
});

// Map stuff

// app.controller ('mapController', [function() {
//   console.log(this);

//   function drawIndicator(mapHeight, mapWidth, x, y, h, w) {
//     // not sure why, but works best if we draw on ALL the possible canvases
//     var canvases = document.getElementsByClassName('ic-map-canvas');
//     for (let i=0; i<canvases.length; i++) {
//       var theCanvas = canvases.item(i);
//       theCanvas.height = mapHeight;
//       theCanvas.width = mapWidth;
//       var ctx = theCanvas.getContext('2d');
//       ctx.globalAlpha = 0.6;
//       ctx.fillStyle = 'fuchsia';
//       ctx.fillRect(x, y, w, h);
//     }
//   }

//   // Gather a bunch of information from the current directive.
//   try {
//     this.physical = Boolean(this.parentCtrl.item.delivery.GetIt1[0].category === 'Alma-P' || this.parentCtrl.item.delivery.GetIt1[1].category === 'Alma-P');
//   } catch(e) {
//     this.physical = false;
//   }

//   try {
//     this.holding = this.parentCtrl.item.delivery.holding;
//   } catch(e) {
//     this.holding = false;
//   }

//   try {
//     var theCallNumber = this.parentCtrl.item.delivery.bestlocation.callNumber;
//     theCallNumber = theCallNumber.replace(/^[(\s]+/,'');
//     theCallNumber = theCallNumber.replace(/[)\s]+$/,'');
//     this.callNumber = theCallNumber;
//   } catch(e) {
//     this.callNumber = '';
//     this.mapError = true;
//   }

//   try {
//     this.location = this.parentCtrl.item.delivery.bestlocation.subLocationCode;
//   } catch(e) {
//     this.location = '';
//     this.mapError = true;
//   }

//   try {
//     this.availability = this.parentCtrl.item.delivery.bestlocation.availabilityStatus;
//   } catch(e) {
//     this.availability = '';
//     this.mapError = true;
//   }

//   // Do we need to display a map?
//   this.needsMap = Boolean(( (this.availability === 'available' || this.availability === 'check_holdings') && this.callNumber && this.physical) || this.location === 'periodical');

//   if (this.needsMap) {

//     // are there multiple holdings?
//     if (this.holding && this.holding.length > 1) {
//       this.multipleHoldings = true;
//       this.holdingsLocations = [];
//       for (let i=0; i<this.holding.length; i++) {
//         this.holdingsLocations.push(this.holding[i].subLocationCode);
//       }
//     }

//     this.floor = 0;
//     this.showLocMessage = false;
//     this.staticLocation = false;
//     this.x = 0;
//     this.y = 0;
//     this.width = 0; // width of highlight box
//     this.height = 0; // height of highlight box
//     this.lookupArray = null;
//     this.coordinates = '';
//     this.locMessage = '';
//     this.side = '';
//     this.sideLong = '';
//     this.debug = false;
//     // this.display = { display: 'block' };
//     this.mapError = false;
//     this.normalizeLC = normalizeLC;
//     this.sortLC = sortLC;

//     this.containerWidth = document.getElementById('full-view-container').offsetWidth;

//     this.mapAreaRatio; // amount of containerWidth map will occupy
//     if (this.containerWidth > 1400) {
//       this.mapAreaRatio = 0.5;
//     } else if (this.containerWidth > 600) {
//       this.mapAreaRatio = 0.6;
//     } else {
//       this.mapAreaRatio = 0.83;
//     }

//     this.mapWidth = this.containerWidth * this.mapAreaRatio;
//     this.mapHeight = 0.58666666667 * this.mapWidth;

//     this.showLocMessage = true;

//     console.log('location: ', this.location);
//     console.log(staticLocations);
//     // is it in a static location?
//     for (var loc in staticLocations) {
//       if (loc === this.location) {
//         this.staticLocation = true;
//         this.floor = staticLocations[loc].floor;
//         this.x = staticLocations[loc].x;
//         this.y = staticLocations[loc].y;
//         this.width = staticLocations[loc].width;
//         this.height = staticLocations[loc].height;
//         this.locMessage = staticLocations[loc].message;
//       }
//     }

//     if (!this.staticLocation) {

//       // where should we look for the item?
//       switch(this.location) {
//       case 'music':
//         this.lookupArray = musicStacks;
//         break;
//       case 'periodical':
//         this.lookupArray = perStacks;
//         break;
//       case 'general':
//         this.lookupArray = stacks;
//         break;
//       default:
//         this.lookupArray = null;
//         break;
//       }

//       for (let i=0; i < this.lookupArray.length; i++) {
//         var start = this.lookupArray[i].start;
//         var end = this.lookupArray[i].end;
//         var test = this.sortLC(start, end, this.callNumber);
//         if ( this.normalizeLC(test[1]) === this.normalizeLC(this.callNumber) || test.length === 2) {
//           this.coordinates = this.lookupArray[i];
//         }
//       }

//       if (this.coordinates) {
//         this.floor = this.coordinates.id.split('.')[0];
//         this.stack = this.coordinates.id.split('.')[1];
//         this.side = this.coordinates.id.split('.')[2];
//         if (this.side === 'e') {
//           this.sideLong = 'east';
//         } else {
//           this.sideLong = 'west';
//         }
//         this.locMessage = 'This item is available at stack ' + this.stack + ', ' + this.sideLong + ' side.';

//         this.x = this.coordinates.x;
//         this.y = this.coordinates.y;
//         this.width = this.coordinates.width;
//         this.height = this.coordinates.height;
//       } else {
//         this.needsMap = false;
//       }

//     }

//     if (this.multipleHoldings) {

//       this.locMessage += ' It may also be available in ';

//       // what locations are there that aren't the "bestlocation"?
//       for (var i=0; i < this.holdingsLocations.length; i++) {

//         if (this.holdingsLocations[i] !== this.location) {
//           var hl = this.holdingsLocations[i];
//           // console.log("hl: " + hl);
//           this.staticLocations = "";

//           if (staticLocations[hl]) {
//             this.locMessage += staticLocations[hl].english;
//           } else {
//             this.locMessage += hl; // cases where secondary loc isn't static
//           }

//           // this.locMessage += staticLocations[hl].english;
//           if (i === this.holdingsLocations.length - 1) {
//             this.locMessage += '.';
//           } else {
//             this.locMessage += ', ';
//           }

//         }
//       }

//     }

//     // determine dimensions for the map image
//     var mapImage = document.getElementsByClassName('ic-map-img').item(0);
//     if (mapImage) {
//       this.mapDimensions = { height: this.mapHeight + 'px', width: this.mapWidth + 'px' };
//     }

//     // make highlighted area proportional
//     this.x = this.x * this.mapWidth / 600;
//     this.y = this.y * this.mapHeight / 352;
//     this.width = this.width * this.mapWidth / 600;
//     this.height = this.height * this.mapHeight / 352;

//     drawIndicator(this.mapHeight, this.mapWidth, this.x, this.y, this.height, this.width);

//   }

// }]);

// app.component('prmOpacAfter', {
//   bindings: { parentCtrl: '<' },
//   controller: 'mapController',
//   template: '<div class="ic-map-error" ng-show="$ctrl.needsMap && $ctrl.mapError">SYSTEM ERROR: TRY REFRESHING THE PAGE</div><div class="ic-map-container" ng-style="$ctrl.mapDimensions"><p ng-show="$ctrl.showLocMessage" class="ic-loc-message">{{$ctrl.locMessage}}</p><div ng-show="$ctrl.needsMap" class="ic-map-div"><img class="ic-map-img" ng-src="custom/01ITHACACOL_INST-01ITHACACOL_V1/img/floor_{{$ctrl.floor}}.png" ng-style="$ctrl.mapDimensions" ng-show="$ctrl.needsMap"><canvas ng-show="$ctrl.needsMap" class="ic-map-canvas"></canvas></div></div>'
// });


app.controller('prmActionContainerAfterController', [function () {

  // build a permalink (for 'report a problem')
  try {
    var recordid = this.parentCtrl.item.pnx.control.recordid[0];
    // const start = 'https://ithaca-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=01ITHACACOL_';
    // const end = '&vid=01ITHACACOL_V1&search_scope=01ITHACACOL_EVERYTHING&tab=default_tab&lang=en_US&context=L';
    var start = 'https://ithaca.primo.exlibrisgroup.com/discovery/fulldisplay?docid=';
    var end = '&context=PC&vid=01ITHACACOL_INST:01ITHACACOL_V1&search_scope=MyInst_and_CI&tab=Everything&lang=en';
    this.url = encodeURIComponent(start + recordid + end);
  } catch (e) {
    this.recordid = '';
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

  // get all PNX addata (for 'report a problem')
  try {
    var addata = this.parentCtrl.item.pnx.addata;
    var addataString = '';
    this.reportFormUrl = 'https://library.ithaca.edu/forms/primo_problems.php?origin=primo&';
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
    // addataString += '&permalink=' + encodeURI(this.url);
    this.reportFormUrl += addataString;

    // Add the call number for traces
    this.reportFormUrl += '&callNumber=' + encodeURI(this.callNumber);
    this.reportFormUrl += '&permalink=' + encodeURI(this.url);
    // console.log(this.reportFormUrl);
  } catch (e) {
    this.reportFormUrl = '';
  }

  try {
    this.getit = this.parentCtrl.item.delivery.GetIt1;
  } catch (e) {
    this.getit = [];
    console.log(e.message);
  }
}]);
app.component('prmActionContainerAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmActionContainerAfterController',
  template: '<div class="ic-more-actions"><button class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-primary" ng-show="$ctrl.getit[0].category===\'Alma-P\' || $ctrl.getit[1].category===\'Alma-P\'"><span class="_md-nav-button-text"><a ng-href="https://library.ithaca.edu/services/sms_me.php?title={{$ctrl.title | encode}}&cn={{$ctrl.callNumber | encode}}&loc={{$ctrl.location | encode}}" class="ic-sms-link" target="_blank"><div class="layout-column" layout="column"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="#616161" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg><span class="button-text">SMS</span></div></a></span></button><button class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-primary"><span class="_md-nav-button-text"><a ng-href={{$ctrl.reportFormUrl}} class="ic-report-problem-link" target="_blank"><div class="layout-column" layout="column"><prm-icon icon-definition="error-attention" icon-type="svg" svg-icon-set="primo-ui"></prm-icon><span class="button-text">REPORT A PROBLEM</span></div></a></span></button></div>'
});

// app.controller('prmFacetAfterController', [function() {
//   this.fruit = 'banana';
//   this.parts = document.getElementById('facets').children[0].children[0].children[0];
//   console.log(this);
// }]);
// app.component('prmFacetAfter', {
//   bindings: { parentCtrl: '<' },
//   controller: 'prmFacetAfterController',
//   template: '<span id="ic-expand-tooltip">{{$ctrl.fruit}}</span>',
// });

// This adds the expand my results tooltip
// From Joe Ferguson at UT Knoxville
window.setInterval(function () {
  if ($(".tooltip").length > 0) {} else {
    $("#facets > prm-facet > div > div > div.sidebar-section.margin-top-small.margin-bottom-medium.compensate-padding-left > md-checkbox > div._md-label > span").append("&nbsp;<span class=\"tooltip\">?<span class=\"tooltiptext\">Include items that IC doesn’t own.</span></span>");
    $('.tooltip').hover(function () {
      $(this).find('.tooltiptext').css({ 'visibility': 'visible' });
    }, function () {
      $(this).find('.tooltiptext').css({ 'visibility': 'hidden' });
    });
  }
}, 500);

// LibAnswers chat widget
// (function() {
//   var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
//   lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'v2.libanswers.com/load_chat.php?hash=0e36fb096f988326b1c420ab5ad6af7a';
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
// })();

// Google Analytics stuff
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-114536289-1', 'auto'); // Replace with your property ID.
ga('send', 'pageview');
})();