This repository contains the front-end customization code for [Ithaca College Library](https://library.ithaca.edu)'s hosted Ex Libris Primo implementation.

The code herein assumes that you are using the [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv) from @ExLibrisGroup.

Our main point of entry for Primo is a search box on the [library home page](https://library.ithaca.edu). The code for the search box is [available on CodePen](https://codepen.io/rgilmour/pen/PKNgWV).


## On Back-End Compatibility

You'll see many lines in the custom JS in this repository that look something like this:

```this.location = this.parentCtrl.result.delivery.bestlocation.subLocationCode;```

Lines like these may need to be modified to match the data structure provided by your ILS. If you try to implement this code and see problems, `console.log` the variable and see if it contains what you think it should. If not, you'll probably need to modify the data path. To find the right path, `console.log(this);` within the directive that you're working on. This will log an object to the console and you can drill down through that to find the value you need.


## Acknowledgements

Much of the code here was inspired by, if not copied outright from posts to PRIMO-DISCUSS-L and the IGeLU/ELUNA SIWG Slack channel, both from Ex Libris developers and from my fellow librarians. Material type icons were designed by @dtaylor4444. Thanks to @michaeldoran for the LC call number sorting functions, @alexei for `sprintf.js`, and Abby Juda (Science Librarian, Ithaca College) for many contributions to the code.


## The Customizations

### Icons for Material Types

The material type icons included in the img directory were designed by @dtaylor4444.  His [PrimoIcons](https://github.com/dtaylor4444/PrimoIcons) repository includes an AI file for the icons as well as the pngs included here.


### Access Link in Item View

By default, there is a "Full text available" message that appears both in results-list view and near the top of the item view. In the former case, it is a link; in the latter it is not. This seemed like bad UI, so we wrote code on the `prmSearchResultAvailabilityLineAfter` directive to rebuild the item view instance as a link.


### "Not on Shelf" Link

For physical items in open-stack areas, we provide a "Not on shelf" link that autopopulates a trace form on the library's web site. The JavaScript code collects data for title, author, and call number and uses those values to construct the link. As with the access link above, this is implemented on the `prmSearchResultAvailabilityLineAfter` directive.


### "Text This Record" Link

This is the third and final customization implemented on the `prmSearchResultAvailabilityLineAfter` directive. As with the "Not on Shelf" link, the JavaScript collects some data elements and uses them to construct a link to a form on the library's site. The actual sending of the SMS message is done by PHP on the library's server, not by any code in this front-end repository.


### Bitly Permalinks

This feature uses the [Bitly API](https://dev.bitly.com/) to create short bitlinks, which are displayed instead of the default, very long, permalinks. It uses the `prmCopyClipboardBtnAfter` directive. To use this feature, you will need to register with Bitly and get an access token. Once you have your access token, you can either add it directly into the `get_bitlink()` function or put it in a separate JS file as follows:

```const access_token = your_access_token_goes_here;```


### Stack Maps

This is by far the most complex of the customizations. The code relating to the maps is anything but plug-and-play. Some of the details and challenges of implementing a stack map system in Primo are addressed [here](http://rgilmour70.github.io/stackMaps/). The functions for manipulating LC call numbers in `js/call_number_functions.js` are JavaScript translations of [sortLC](https://rocky.uta.edu/doran/sortlc/) by @michaeldoran. These functions in turn depend on [sprintf-js](https://github.com/alexei/sprintf.js) by @alexei.


