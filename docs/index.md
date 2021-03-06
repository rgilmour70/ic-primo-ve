# Building a "Find in Stacks" Mapping System for Your Library

As online access to library resources has become the norm, the ability to find items in a library's stacks using a call number seems to be on the decline among students. In order to address this problem, Ithaca College Library has implemented a tool in our discovery system to assist students by displaying a map indicating the location of each physical library item.

![Sample Map](images/sample_map.png)

We are often asked about how to implement such a tool. Of course, we're happy to share this code (as part of our Primo VE customization package) with anyone who wants it, but the programming is only one part of the map system. On this page, I hope to document the system as a whole, including the organizational challenges as well as the technical ones. This will help you decide if such a project is worthwhile for your institution and to what extent the code provided here will work for your needs.

Because of the host of variables involved in a mapping system, this is *not* "plug and play" software. You will need at least a little JavaScript (and preferably AngularJS) experience in order to customize and implement it. In particular, you will need to create your own version of `js/1-mapData.js` (instructions follow) and you will need to edit `js/4-ic-custom.js`, especially if your stack designations differ significantly from those used at Ithaca College.

This system can only draw rectangles. If you need to highlight areas using other shapes, you may need to do some significant coding (and probably math!) to make that work.


## Planning Your Mapping Project

### Define Your Locations

Before you even open your code editor, there are a lot of decisions to make. Most libraries have multiple locations. At Ithaca College, we have about eighteen, including archives, general stacks, multimedia collection, periodicals, newspapers, reference, reserves, over-sized, etc. For the purposes of the mapping project, we divided these into two groups based on the type of mapping they would need.

**Static** locations are those that need mapping only to the collection level. These include collections that are small enough that just getting the student to the collection is adequate (e.g., newspapers, popular periodicals) as well as collections that are "closed stack," requiring interaction with a staff member for the student to access an item (e.g., multimedia, reserves). In the case of the closed stack locations, we decided that the map should simply direct students to the appropriate service desk.

**Dynamic** locations are those for which the map will indicate a specific location within the collection. This will include a library's general stacks area. At Ithaca College, we also decided to dynamically map our music book collection and our bound periodicals collection.

### Decide on Granularity for Dynamic Locations

We decided that for the dynamic locations, we would specify location to the level of one side of a shelving unit. Anecdotal evidence from staff members suggested that students who had trouble finding an item were usually in the wrong area of the stacks altogether, so we felt that specifying location to the level of stack face should be adequate. In deciding on the level of granularity for your map data, remember that *collections move.* The more granular you make your data, the more frequently you will have to update it to account for shifting in the stacks.

### Naming and Stack Signs

A mapping system will be most effective if it is coupled with clear, highly visible stack signs that unambiguously designate the location in whatever system is used in the maps. As mentioned above, at Ithaca College we have three dynamically mapped locations: general stacks, music stacks, and bound periodicals. We numbered the shelving units as G1, G2, etc. for the general stacks, and used M and P, respectively, to prefix numbers for the music and periodical stacks. The stacks in all three of these collections are oriented north-south, so we indicate the side of a shelving unit with "east" or "west." "M8.e," for instance, would indicate the east side of the eighth shelving unit in the music collection.

![Stack Signs](images/stackSign.jpg)


## Collecting Call Number Data

For each "mapping unit" (in IC's case, one stack face), you'll need to collect beginning and end call numbers. This data can be recorded in a JSON-ish manner as follows:

    var musicStacks = [
        {
            "id" : "3.M3.w", 
            "start" : "M1 .A13 A4", 
            "end" : "M2 .R2384"
        },
        {
            "id" : "3.M3.e", 
            "start" : "M2 .R2386", 
            "end" : "M3 .H26"
        },
        {
            "id" : "3.M4.w", 
            "start" : "M3 .H262", 
            "end" : "M3 .S3912"
        },
        // and so forth
    ];

Notice the construction of the id values. They have the format:

    [floor].[stack designation].[side of shelving unit]

The code in `js/4-ic-custom.js` assumes that you are using this triplet system for the ids. If you are not, you will need to modify the `mapController` controller accordingly.

Put this and other location information in a file called `js/1-map-data.js`. (The number prefixes on filenames ensure that the JS is compiled in the desired order.) You'll need an array like the one above for each of your dynamically mapped locations.


## Building the Maps and Adding Coordinate Data

You'll need to create a map of each floor of your library. Try to keep these maps simple, emphasizing the stacks and any landmark features (stairwells, pillars) that will help students to orient. The map need not be to scale: it just needs to show your locations clearly, with enough room for a "highlight" effect to be applied to emphasize a single mapping unit. Save your maps as png files in the `img` directory, using the naming scheme `floor_[number].png`.

Once you have your map image files completed, you'll need to define the areas that you want highlighted for each location. Open one of your floor maps in Adobe Photoshop and activate the "info" panel. This will display x and y values for the point where your cursor is located on the image and will display height and width for any shape that you highlight with the cursor.

![Determining map coordinates with Photoshop](images/determiningCoordinates.png)

You will need x, y, height, and width values for each of your static locations and for each of the mapping units within your dynamic locations. The x and y coordinates are for the top left corner of the rectangle.

This data should be added to your `js/1-map-data.js` file as follows:

    var staticLocations = {
        'leasedbook': 
            { 
                'floor':'2',
                'x':131,
                'y':156,
                'width':103,
                'height':22, 
                'message':'This item is located on the low shelves just inside the main entrance.', 
                'english':'Popular Reading' 
            },
        'leasedaud': 
            { 
                'floor':'2',
                'x':131,
                'y':156,
                'width':103,
                'height':11, 
                'message':'This item is located on the low shelves just inside the main entrance, on the side facing the circulation/reserves desk.', 
                'english':'Audio Books' 
            },
        'newbooks': 
            { 
                'floor':'2',
                'x':207,
                'y':166,
                'width':26,
                'height':13, 
                'message':'This item is located on the low shelves just inside the main entrance, on the side facing the research help desk.', 'english':'New Books' 
            },
        // and so forth
    };

Add x, y, height, and width values to the arrays that you already established for the dynamic locations:

    var musicStacks = [
        {
            "id" : "3.M3.w", 
            "start" : "M1 .A13 A4", 
            "end" : "M2 .R2384",
            "x" : 403,
            "y" : 230,
            "height" : 84,
            "width" : 10
        },
        {
            "id" : "3.M3.e", 
            "start" : "M2 .R2386", 
            "end" : "M3 .H26",
            "x" : 394,
            "y" : 230,
            "height" : 84,
            "width" : 10
        },
        {
            "id" : "3.M4.w", 
            "start" : "M3 .H262", 
            "end" : "M3 .S3912",
            "x" : 384,
            "y" : 230,
            "height" : 84,
            "width" : 10
        },
        // and so forth
    ];

You should have a JavaScript array like the one above for each of your dynamic locations.


## Editing the mapController

This would be a good time to look over the `mapController` controller in `js/4-ic-custom.js` and see what changes need to be made to match your particular case. The file is commented to help you with this process.

For instance, if you are using a different system of stack designations, you will need to edit the floor/stack/side code starting around line 280.











