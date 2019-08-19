/* eslint-disable */
var app = angular.module('viewCustom', ['angularLoad']);

app.filter('encode', function() {
  return encodeURIComponent;
});



// Map stuff
app.controller('mapController', [function() {

  function drawIndicator(mapHeight, mapWidth, x, y, h, w) {
    // not sure why, but works best if we draw on ALL the possible canvases
    var canvases = document.getElementsByClassName('ic-map-canvas');
    for (let i=0; i<canvases.length; i++) {
      var theCanvas = canvases.item(i);
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
  } catch(e) {
    this.needsMap = false;
  }

  try {
    this.holding = this.parentCtrl.item.delivery.holding;
  } catch(e) {
    this.holding = false;
  }

  if (this.needsMap) {
    this.magicNumber = 1;  // which instance
    this.showMapHere = this.parentCtrl.index === this.magicNumber;

    if (this.holding && this.holding.length > 1) {
      this.multipleHoldings = true;
      this.holdingsLocations = [];
      for (let i=0; i<this.holding.length; i++) {
        this.holdingsLocations.push(this.holding[i].subLocationCode);
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
      theCallNumber = theCallNumber.replace(/^[(\s]+/,'');
      theCallNumber = theCallNumber.replace(/[)\s]+$/,'');
      this.callNumber = theCallNumber;
    } catch(e) {
      this.callNumber = '';
      this.mapError = true;
    }

    // location
    try {
      this.location = this.parentCtrl.item.delivery.bestlocation.subLocationCode;
    } catch(e) {
      this.location = '';
      this.mapError = true;
    }

    // availability
    try {
      this.availability = this.parentCtrl.item.delivery.bestlocation.availabilityStatus;
    } catch(e) {
      this.availability = '';
      this.mapError = true;
    }

    // We only need a map if it's available and
    // has a location OR is a periodical
    if ( ( (this.availability === 'available' || this.availability === 'check_holdings') && this.callNumber) || this.location === 'periodical' ) {

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
        switch(this.location) {
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

        for (let i=0; i < this.lookupArray.length; i++) {
          var start = this.lookupArray[i].start;
          var end = this.lookupArray[i].end;
          var test = this.sortLC(start, end, this.callNumber);
          if ( this.normalizeLC(test[1]) === this.normalizeLC(this.callNumber) || test.length === 2) {
            this.coordinates = this.lookupArray[i];
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
        for (var i=0; i < this.holdingsLocations.length; i++) {

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



app.controller('prmActionContainerAfterController', [function() {

  console.log(this);

  // build a permalink (for 'report a problem')
  try {
    let recordid = this.parentCtrl.item.pnx.control.recordid[0];
    // const start = 'https://ithaca-primo.hosted.exlibrisgroup.com/primo-explore/fulldisplay?docid=01ITHACACOL_';
    // const end = '&vid=01ITHACACOL_V1&search_scope=01ITHACACOL_EVERYTHING&tab=default_tab&lang=en_US&context=L';
    const start = 'https://ithaca.primo.exlibrisgroup.com/discovery/fulldisplay?docid=';
    const end = '&context=PC&vid=01ITHACACOL_INST:01ITHACACOL_V1&search_scope=MyInst_and_CI&tab=Everything&lang=en';
    this.url = encodeURIComponent(start + recordid + end);
  } catch(e) {
    this.recordid = '';
    this.url = '';
  }

  // call number
  try {
    var theCallNumber = this.parentCtrl.item.delivery.bestlocation.callNumber;
    theCallNumber = theCallNumber.replace(/^[(\s]+/,'');
    theCallNumber = theCallNumber.replace(/[)\s]+$/,'');
    this.callNumber = theCallNumber;
  } catch(e) {
    this.callNumber = '';
  }

  // title
  try {
    this.title = this.parentCtrl.item.pnx.display.title[0];
  } catch(e) {
    this.title = '';
  }

  // author
  try {
    this.author = this.parentCtrl.item.pnx.display.creator[0];
  } catch(e) {
    this.author = '';
  }

  // location
  try {
    this.location = this.parentCtrl.item.delivery.bestlocation.subLocationCode;
  } catch(e) {
    this.location = '';
  }

  // get all PNX addata (for 'report a problem')
  try {
    const addata = this.parentCtrl.item.pnx.addata;
    let addataString = '';
    this.reportFormUrl = 'https://library.ithaca.edu/forms/primo_problems.php?origin=primo&';
    const addataFields = Object.keys(addata);
    for (const addataField of addataFields) {
      if (addataField !== 'abstract') {
        addataString += '&' + addataField + '=' + addata[addataField];
      }
    }
    addataString = encodeURI(addataString.substring(1));
    // addataString += '&permalink=' + encodeURI(this.url);
    this.reportFormUrl += addataString;

    // Add the call number for traces
    this.reportFormUrl += '&callNumber=' + encodeURI(this.callNumber);
    this.reportFormUrl += '&permalink=' + encodeURI(this.url);
    // console.log(this.reportFormUrl);
  } catch(e) {
    this.reportFormUrl = '';
  }

  try {
    this.getit = this.parentCtrl.item.delivery.GetIt1;
  } catch(e) {
    this.getit = [];
    console.log(e.message);
  }

}]);
app.component('prmActionContainerAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmActionContainerAfterController',
  template: '<div class="ic-more-actions"><button class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-primary" ng-show="$ctrl.getit[0].category===\'Alma-P\' || $ctrl.getit[1].category===\'Alma-P\'"><span class="_md-nav-button-text"><a ng-href="https://library.ithaca.edu/services/sms_me.php?title={{$ctrl.title | encode}}&cn={{$ctrl.callNumber | encode}}&loc={{$ctrl.location | encode}}" class="ic-sms-link" target="_blank"><div class="layout-column" layout="column"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="#616161" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg><span class="button-text">SMS</span></div></a></span></button><button class="_md-nav-button md-accent md-button md-primoExplore-theme md-ink-ripple md-primary"><span class="_md-nav-button-text"><a ng-href={{$ctrl.reportFormUrl}} class="ic-report-problem-link" target="_blank"><div class="layout-column" layout="column"><prm-icon icon-definition="error-attention" icon-type="svg" svg-icon-set="primo-ui"></prm-icon><span class="button-text">REPORT A PROBLEM</span></div></a></span></button></div>',
});

// LibAnswers chat widget
(function() {
  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'v2.libanswers.com/load_chat.php?hash=25b1eca60d946c4370ccfa5aacbaf5bf';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();


// Google Analytics stuff
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-114536289-1', 'auto');  // Replace with your property ID.
ga('send', 'pageview');
