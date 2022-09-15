// Import jQuery
// var jQueryScript = document.createElement("script");  
// jQueryScript.src = "https://code.jquery.com/jquery-3.3.1.min.js";  
// document.getElementsByTagName("head")[0].appendChild(jQueryScript);


var app = angular.module('viewCustom', ['angularLoad', 'ui.router']);

app.filter('encode', function() {
  return encodeURIComponent;
});


// Re-run search when the scope is changed
// Dan got this code from St. Olaf College
app.component('prmTabsAndScopesSelectorAfter',{
  bindings: {parentCtrl: '<'},
  controller: function($scope){
    setTimeout(function() {

      function activateSearch(){
        setTimeout(function(){
          document.getElementsByClassName("zero-margin button-confirm md-button md-primoExplore-theme")[0].click()
        }, 500)
      }

      var searchScopes = document.querySelectorAll('div.simple-search-wrapper [id^="select_option_"]');

      for (let i = 0; i < 6; i++) {
        searchScopes[i].onclick = function(){
          activateSearch();
        };
      }
    }, 500)
  }
});

// External search links
app.controller ('ebscoLinkController', [function($stateParams, $state) {
  this.$onInit = function() {
    {
      // get the view for image paths
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.view = urlParams.get('vid').replace(':', '-');

      function spaceToPlus(str) {
        return str.replace(/\s+/g, '+');
      }

      function convertToEbsco(primoSearch) {
        let ebscoSearchString = '';
        if (!Array.isArray(primoSearch)) {
          ebscoSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
        } else {
          for (let i=0; i<primoSearch.length; i++) {
            const searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
            const conjunction = primoSearch[i].split(/,/)[3] || '';
            switch (primoSearch[i].split(/,/)[0]) {
                case 'title':
                  ebscoSearchString += 'TI+(' + searchTerms + ')';
                  break;
                case 'creator':
                  ebscoSearchString += 'AU+(' + searchTerms + ')';
                  break;
                case 'sub':
                  ebscoSearchString += 'SU+(' + searchTerms + ')';
                  break;
                default: // handles 'any' case
                  ebscoSearchString += '(' + searchTerms + ')';
              }
              if (i !== primoSearch.length - 1) {
                ebscoSearchString += '+' + conjunction + '+';
              }
          }
        }
        return ebscoSearchString;
      }

      function convertToWorldCat(primoSearch) {
        let worldCatSearchString = '';
        if (!Array.isArray(primoSearch)) {
          worldCatSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
        } else {
          for (let i=0; i<primoSearch.length; i++) {
            const searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
            const conjunction = primoSearch[i].split(/,/)[3] || '';
            switch (primoSearch[i].split(/,/)[0]) {
              case 'title':
                worldCatSearchString += 'ti:' + searchTerms;
                break;
              case 'creator':
                worldCatSearchString += 'au:' + searchTerms;
                break
              default:
                worldCatSearchString += 'kw:' + searchTerms;
            }
            if (i !== primoSearch.length - 1) {
              worldCatSearchString += '+';
            }
          }
        }
        return worldCatSearchString;
      }

      function convertToGoogle(primoSearch) {
        let googleSearchString = '';
        if (!Array.isArray(primoSearch)) {
          googleSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
        } else {
          for (let i=0; i<primoSearch.length; i++) {
            const searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
            const conjunction = primoSearch[i].split(/,/)[3] || '';
            googleSearchString += '(' + searchTerms + ')';
            if (i !== primoSearch.length - 1) {
              googleSearchString += '+' + conjunction + '+';
            }
          }
        }
        return googleSearchString;
      }

      const primoSearch = this.parentCtrl.$stateParams.query; // can be a string OR array!

      const proxyString = 'https://ezproxy.ithaca.edu/login?url=';

      const ebscoSearchString = convertToEbsco(primoSearch);
      const googleSearchString = convertToGoogle(primoSearch);
      const worldCatSearchString = convertToWorldCat(primoSearch);
      console.log(worldCatSearchString);

      this.ebscoLabel = 'EBSCO';
      const ebscoBaseUrl = 'https://search.ebscohost.com/login.aspx?direct=true&defaultdb=aph,gnh,apn,ahl,aft,air,ami,rfh,bvh,bxh,boh,buh,cin20,cms,nlebk,eric,hev,8gh,hch,hia,ibh,qth,lxh,lfh,ulh,cmedm,mth,mah,msn,nfh,ofs,phl,tfh,rgr,bwh,ram,rft,sih,s3h,trh,ser,e870sww,e872sww,mft,kah,mzh&type=1&searchMode=Standard&site=ehost-live&scope=site';
      const ebscoSearchUrl = ebscoBaseUrl + '&bquery=' + ebscoSearchString;
      this.ebscoProxiedSearchUrl = proxyString + ebscoSearchUrl;
      
      this.googleLabel = 'Google Scholar';
      const googleBaseUrl = 'https://scholar.google.com/scholar?hl=en&as_sdt=0%2C33&inst=7210957415625843320&q=';
      this.googleProxiedSearchUrl = googleBaseUrl + googleSearchString;

      this.worldCatLabel = 'WorldCat';
      const worldCatBaseUrl = 'https://www.worldcat.org/search?qt=worldcat_org_all&q=';
      this.worldCatProxiedSearchUrl = proxyString + worldCatBaseUrl + worldCatSearchString;
    }
  }
}]);
app.component('prmSearchResultSortByAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'ebscoLinkController',
  template: '<div id="ic-external-links"><h3 ng-class="section-title-header"><span>Try My Search In&hellip;</span></h3><div id="ic-ebsco-link-block"><a href="{{$ctrl.ebscoProxiedSearchUrl}}" target="_blank" id="ic-ebsco-link"><img src="custom/{{$ctrl.view}}/img/ebsco.svg"> {{$ctrl.ebscoLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div><div id="ic-google-link-block"><a href="{{$ctrl.googleProxiedSearchUrl}}" target="_blank" id="ic-google-link"><img src="custom/{{$ctrl.view}}/img/google.svg"> {{$ctrl.googleLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div><div id="ic-worldcat-link-block"><a href="{{$ctrl.worldCatProxiedSearchUrl}}" target="_blank" id="ic-worldcat-link"><img src="custom/{{$ctrl.view}}/img/WorldCat.svg"> {{$ctrl.worldCatLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div></div>'
});



// Map stuff

app.controller ('mapController', [function() {

  this.$onInit = function() {
    {
      function drawIndicator(mapHeight, mapWidth, x, y, h, w) {
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
        console.log(this.location);
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
      // this.needsMap = Boolean(( (this.availability === 'available' || this.availability === 'check_holdings') && this.callNumber && this.physical) || this.location === 'periodical');

      // Slightly different for COVID - reserves weirdness
      this.needsMap = Boolean(( ( (this.availability === 'available' && this.location !== 'reserves') || this.availability === 'check_holdings') && this.callNumber && this.physical) || this.location === 'periodical');

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
              this.staticLocations = "";

              if (staticLocations[hl]) {
                this.locMessage += staticLocations[hl].english;
              } else {
                this.locMessage += hl; // cases where secondary loc isn't static
              }

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
    }
  }

}]);

app.component('prmOpacAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'mapController',
  template: '<div class="ic-map-error" ng-show="$ctrl.needsMap && $ctrl.mapError">SYSTEM ERROR: TRY REFRESHING THE PAGE</div><div class="ic-map-container" ng-style="$ctrl.mapDimensions"><p ng-show="$ctrl.showLocMessage" class="ic-loc-message">{{$ctrl.locMessage}}</p><div ng-show="$ctrl.needsMap" class="ic-map-div"><img class="ic-map-img" ng-src="custom/01ITHACACOL_INST-01ITHACACOL_V1/img/floor_{{$ctrl.floor}}.png" ng-srcset="custom/01ITHACACOL_INST-01ITHACACOL_V1/img/floor_{{$ctrl.floor}}.png 1x, custom/01ITHACACOL_INST-01ITHACACOL_V1/img/floor_{{$ctrl.floor}}@2x.png 2x" ng-style="$ctrl.mapDimensions" ng-show="$ctrl.needsMap"><canvas ng-show="$ctrl.needsMap" class="ic-map-canvas"></canvas></div></div>'
});


// Report a Problem action

app.controller('prmActionContainerAfterController', [function() {
  // console.log(this);
  this.$onInit = function() {
    {
      // build a permalink (for 'report a problem')
      try {
        let recordid = this.parentCtrl.item.pnx.control.recordid[0];
        const start = 'https://ithaca.primo.exlibrisgroup.com/discovery/fulldisplay?docid=';
        const end = '&context=PC&vid=01ITHACACOL_INST:01ITHACACOL_V1';
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
      } catch(e) {
        this.reportFormUrl = '';
      }

      try {
        this.getit = this.parentCtrl.item.delivery.GetIt1;
      } catch(e) {
        this.getit = [];
        console.log(e.message);
      }
    }
  }
}]);
app.component('prmActionListAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmActionContainerAfterController',
  template: `<custom-action 
    name="report_a_problem"
    label="Report a Problem"
    index=8
    icon="ic_report_problem_24px"
    icon-set="action"
    link="{{$ctrl.reportFormUrl}}" 
    />`
});

// app.component('prmGalleryCollectionsListAfter', {
//   template: 'banana'
// })

// LibAnswers chat widget
(function() {
  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'v2.libanswers.com/load_chat.php?hash=88261efafc9e5e717508101165503bda';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
})();




// For someone on the listserv:
// function waitForElm(selector) {
//   return new Promise(resolve => {
//       if (document.querySelector(selector)) {
//           return resolve(document.querySelector(selector));
//       }

//       const observer = new MutationObserver(mutations => {
//           if (document.querySelector(selector)) {
//               resolve(document.querySelector(selector));
//           }
//       });

//       observer.observe(document.body, {
//           childList: true,
//           subtree: true
//       });
//   });
// }
// waitForElm('#getit_link1_0').then((elm) => {
//   const source = document.getElementById('getit_link1_0');
//   let target;
//   try {
//     target = document.getElementById("details");
//   } catch (e) {
//     console.log(`No details: ${e}`);
//   }
//   if (target) {
//     target.appendChild(source);
//   }
// });