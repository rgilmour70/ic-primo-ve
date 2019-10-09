/* eslint-disable */
var app = angular.module('viewCustom', ['angularLoad', 'ui.router']);

app.filter('encode', function() {
  return encodeURIComponent;
});


// EBSCO link (experimental)
app.controller ('ebscoLinkController', [function($stateParams, $state) {

  function convertToEbsco(str) {
    let ebscoSearchString = '';
    const primoSearchArray = str.split(/,\s*/);
      const conjunction = primoSearchArray[3] || '';

      const searchTerms = primoSearchArray[2].replace(/\s/g, '+');

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
        default: // handles 'any' case
          ebscoSearchString = '' + searchTerms;
      }
    if (conjunction) { ebscoSearchString += '+' + conjunction + '+'; }
    return ebscoSearchString;
  }

  // this.primoSearchString = document.getElementById('searchBar').value;
  const primoSearch = this.parentCtrl.$stateParams.query; // can be a string OR array!
  console.log('primoSearch', primoSearch);

  let ebscoSearchString = '';

  if (!Array.isArray(primoSearch)) {
    // simple search
    console.log('simple');
    ebscoSearchString = convertToEbsco(primoSearch);
  } else {
    // compound search
    console.log('compound');
    for (let i=0; i<primoSearch.length; i++) {
      ebscoSearchString += convertToEbsco(primoSearch[i]);
    }
    ebscoSearchString = ebscoSearchString.replace(/\+[A-Z]+\+$/, '');
  }
  console.log('ebscoSearchString', ebscoSearchString);

  this.label = 'Try this search in EBSCO!';
  const proxyString = 'http://ezproxy.ithaca.edu:2048/login?qurl=';
  const baseUrl = 'https://search.ebscohost.com/login.aspx?direct=true&db=aph&db=gnh&db=apn&db=ahl&db=aft&db=air&db=ami&db=rfh&db=bvh&db=bxh&db=boh&db=buh&db=cin20&db=cms&db=nlebk&db=eric&db=hev&db=8gh&db=hch&db=hia&db=ibh&db=qth&db=lxh&db=lfh&db=cmedm&db=mah&db=msn&db=nfh&db=phl&db=tfh&db=rgr&db=bwh&db=rft&db=sih&db=s3h&db=trh&db=ser&type=1&searchMode=Standard&site=ehost-live&scope=site';
  this.searchUrl = encodeURIComponent(baseUrl + '&bquery=' + ebscoSearchString);
  this.proxiedSearchUrl = proxyString + this.searchUrl;
}]);
app.component('prmPersonalizeResultsButtonAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'ebscoLinkController',
  template: '<div><a href="{{$ctrl.proxiedSearchUrl}}" target="_blank">{{$ctrl.label}} <svg height="16px" width="16px"  fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" version="1.1" x="0px" y="0px"><title>Link external</title><desc>Created with Sketch.</desc><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g><rect x="0" y="0" width="24" height="24"></rect><path fill="#3F729B" d="M20.2928932,3 L15.5,3 C15.2238576,3 15,2.77614237 15,2.5 C15,2.22385763 15.2238576,2 15.5,2 L21.5,2 C21.7761424,2 22,2.22385763 22,2.5 L22,8.5 C22,8.77614237 21.7761424,9 21.5,9 C21.2238576,9 21,8.77614237 21,8.5 L21,3.70710678 L11.3535534,13.3535534 C11.1582912,13.5488155 10.8417088,13.5488155 10.6464466,13.3535534 C10.4511845,13.1582912 10.4511845,12.8417088 10.6464466,12.6464466 L20.2928932,3 Z M19,11.6277704 C19,11.351628 19.2238576,11.1277704 19.5,11.1277704 C19.7761424,11.1277704 20,11.351628 20,11.6277704 L20,15.3722296 C20,17.0733452 19.8468648,17.8663442 19.4066412,18.6894908 C19.0114271,19.4284769 18.4284769,20.0114271 17.6894908,20.4066412 C16.8663442,20.8468648 16.0733452,21 14.3722296,21 L8.6277704,21 C6.92665479,21 6.1336558,20.8468648 5.31050916,20.4066412 C4.57152307,20.0114271 3.98857289,19.4284769 3.59335881,18.6894908 C3.15313517,17.8663442 3,17.0733452 3,15.3722296 L3,9.6277704 C3,7.92665479 3.15313517,7.1336558 3.59335881,6.31050916 C3.98857289,5.57152307 4.57152307,4.98857289 5.31050916,4.59335881 C6.1336558,4.15313517 6.92665479,4 8.6277704,4 L12.3722296,4 C12.648372,4 12.8722296,4.22385763 12.8722296,4.5 C12.8722296,4.77614237 12.648372,5 12.3722296,5 L8.6277704,5 C7.0776195,5 6.44057806,5.12301838 5.78210802,5.47517201 C5.21739041,5.77718629 4.77718629,6.21739041 4.47517201,6.78210802 C4.12301838,7.44057806 4,8.0776195 4,9.6277704 L4,15.3722296 C4,16.9223805 4.12301838,17.5594219 4.47517201,18.217892 C4.77718629,18.7826096 5.21739041,19.2228137 5.78210802,19.524828 C6.44057806,19.8769816 7.0776195,20 8.6277704,20 L14.3722296,20 C15.9223805,20 16.5594219,19.8769816 17.217892,19.524828 C17.7826096,19.2228137 18.2228137,18.7826096 18.524828,18.217892 C18.8769816,17.5594219 19,16.9223805 19,15.3722296 L19,11.6277704 Z" fill="#000000" fill-rule="nonzero"></path></g></g></svg></a></div>'
});



// Map stuff

app.controller ('mapController', [function() {
  console.log(this);

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

  // Gather a bunch of information from the current directive.
  try {
    this.physical = Boolean(this.parentCtrl.item.delivery.GetIt1[0].category === 'Alma-P' || this.parentCtrl.item.delivery.GetIt1[1].category === 'Alma-P');
  } catch(e) {
    this.physical = false;
  }

  try {
    this.holding = this.parentCtrl.item.delivery.holding;
  } catch(e) {
    this.holding = false;
  }

  try {
    var theCallNumber = this.parentCtrl.item.delivery.bestlocation.callNumber;
    theCallNumber = theCallNumber.replace(/^[(\s]+/,'');
    theCallNumber = theCallNumber.replace(/[)\s]+$/,'');
    this.callNumber = theCallNumber;
  } catch(e) {
    this.callNumber = '';
    this.mapError = true;
  }

  try {
    this.location = this.parentCtrl.item.delivery.bestlocation.subLocationCode;
  } catch(e) {
    this.location = '';
    this.mapError = true;
  }

  try {
    this.availability = this.parentCtrl.item.delivery.bestlocation.availabilityStatus;
  } catch(e) {
    this.availability = '';
    this.mapError = true;
  }

  // Do we need to display a map?
  this.needsMap = Boolean(( (this.availability === 'available' || this.availability === 'check_holdings') && this.callNumber && this.physical) || this.location === 'periodical');

  if (this.needsMap) {

    // are there multiple holdings?
    if (this.holding && this.holding.length > 1) {
      this.multipleHoldings = true;
      this.holdingsLocations = [];
      for (let i=0; i<this.holding.length; i++) {
        this.holdingsLocations.push(this.holding[i].subLocationCode);
      }
    }

    this.floor = 0;
    this.showLocMessage = false;
    this.staticLocation = false;
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
    // this.display = { display: 'block' };
    this.mapError = false;
    this.normalizeLC = normalizeLC;
    this.sortLC = sortLC;

    this.containerWidth = document.getElementById('full-view-container').offsetWidth;
    
    this.mapAreaRatio; // amount of containerWidth map will occupy
    if (this.containerWidth > 1400) {
      this.mapAreaRatio = 0.5;
    } else if (this.containerWidth > 600) {
      this.mapAreaRatio = 0.6;
    } else {
      this.mapAreaRatio = 0.83;
    }

    this.mapWidth = this.containerWidth * this.mapAreaRatio;
    this.mapHeight = 0.58666666667 * this.mapWidth;

    this.showLocMessage = true;

    console.log(this.location);

    // is it in a static location?
    for (var loc in staticLocations) {
      if (loc === this.location) {
        this.staticLocation = true;
        this.floor = staticLocations[loc].floor;
        this.x = staticLocations[loc].x;
        this.y = staticLocations[loc].y;
        this.width = staticLocations[loc].width;
        this.height = staticLocations[loc].height;
        this.locMessage = staticLocations[loc].message;
      }
    }

    if (!this.staticLocation) {

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

      for (let i=0; i < this.lookupArray.length; i++) {
        var start = this.lookupArray[i].start;
        var end = this.lookupArray[i].end;
        var test = this.sortLC(start, end, this.callNumber);
        if ( this.normalizeLC(test[1]) === this.normalizeLC(this.callNumber) || test.length === 2) {
          this.coordinates = this.lookupArray[i];
        }
      }

      if (this.coordinates) {
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
        this.needsMap = false;
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
    var mapImage = document.getElementsByClassName('ic-map-img').item(0);
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

}]);

app.component('prmOpacAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'mapController',
  template: '<div class="ic-map-error" ng-show="$ctrl.needsMap && $ctrl.mapError">SYSTEM ERROR: TRY REFRESHING THE PAGE</div><div class="ic-map-container" ng-style="$ctrl.mapDimensions"><p ng-show="$ctrl.showLocMessage" class="ic-loc-message">{{$ctrl.locMessage}}</p><div ng-show="$ctrl.needsMap" class="ic-map-div"><img class="ic-map-img" ng-src="custom/01ITHACACOL_INST-01ITHACACOL_V1/img/floor_{{$ctrl.floor}}.png" ng-style="$ctrl.mapDimensions" ng-show="$ctrl.needsMap"><canvas ng-show="$ctrl.needsMap" class="ic-map-canvas"></canvas></div></div>'
});



app.controller('prmActionContainerAfterController', [function() {

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
