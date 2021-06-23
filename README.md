This repository contains the front-end customization code for [Ithaca College Library](https://library.ithaca.edu)'s hosted Ex Libris Primo implementation.

The code herein assumes that you are using the [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv) from @ExLibrisGroup.

Our main point of entry for Primo is a search box on the [library home page](https://library.ithaca.edu). The code for the search box is [available on CodePen](https://codepen.io/rgilmour/pen/PKNgWV).


## On Back-End Compatibility

You'll see many lines in the custom JS in this repository that look something like this:

```
this.location = this.parentCtrl.result.delivery.bestlocation.subLocationCode;
```

Lines like these may need to be modified to match the data structure provided by your ILS. If you try to implement this code and see problems, `console.log` the variable and see if it contains what you think it should. If not, you'll probably need to modify the data path. To find the right path, `console.log(this);` within the directive that you're working on. This will log an object to the console and you can drill down through that to find the value you need.


## Acknowledgements

Much of the code here was inspired by, if not copied outright from posts to PRIMO-DISCUSS-L and the IGeLU/ELUNA SIWG Slack channel, both from Ex Libris developers and from my fellow librarians. Material type icons were designed by @dtaylor4444. Thanks to @michaeldoran for the LC call number sorting functions, @alexei for `sprintf.js`, and Abby Juda (Science Librarian, Ithaca College) for many contributions to the code.


## The Customizations

### Icons for Material Types

The material type icons included in the img directory were designed by @dtaylor4444.  His [PrimoIcons](https://github.com/dtaylor4444/PrimoIcons) repository includes an Adobe Illustrator file for the icons as well as the pngs included here.


### Additional Actions

We added three new actions (or "Send To" items) using the `prmSearchResultAvailabilityLineAfter` directive. Each of these links to a form on the library web site. The code in this repository provides no functionality, just the links.

* SMS - text the current record
* Not on Shelf - physical items in open stacks only
* Report a Problem - electronic items only


### EBSCO / Google Scholar / WorldCat Links

We added "Try my search in ..." links for these services to the search results page. These open in a new window. These links do not replicate every aspect of the current search--they just get the main search terms into the service. An enthusiastic programmer who is familiar with the intricacies of the search URLs in these services could probably make them more precise.


### Stack Maps

This is by far the most complex of the customizations. The code relating to the maps is anything but plug-and-play. Some of the details and challenges of implementing a stack map system in Primo are addressed [here](http://rgilmour70.github.io/ic-primo-ve/). The functions for manipulating LC call numbers in `js/3-call_number_functions.js` are JavaScript translations of [sortLC](https://rocky.uta.edu/doran/sortlc/) by @michaeldoran. These functions in turn depend on [sprintf-js](https://github.com/alexei/sprintf.js) by @alexei.


