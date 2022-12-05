(function(){
"use strict";
'use strict';

var staticLocations = {
  'leasedbook': { 'floor': '2', 'x': 131, 'y': 156, 'width': 103, 'height': 22, 'message': 'This item is located on the low shelves just inside the main entrance.', 'english': 'Popular Reading' },
  'leasedaud': { 'floor': '2', 'x': 131, 'y': 156, 'width': 103, 'height': 11, 'message': 'This item is located on the low shelves just inside the main entrance, on the side facing the circulation/reserves desk.', 'english': 'Audio Books' },
  'newbooks': { 'floor': '2', 'x': 131, 'y': 166, 'width': 103, 'height': 13, 'message': 'This item is located on the low shelves just inside the main entrance, on the side facing away from the circulation desk.', 'english': 'New Books' },
  'display': { 'floor': '2', 'x': 198, 'y': 198, 'width': 25, 'height': 27, 'message': 'This item is located to the right as you come in the main entrance.', 'english': 'Display Shelf' },
  'circdesk': { 'floor': '2', 'x': 100, 'y': 91, 'width': 123, 'height': 38, 'message': 'Ask for this item at the circulation/reserves desk on the second floor.', 'english': 'Circulation Desk' },
  'multimedia': { 'floor': '2', 'x': 100, 'y': 91, 'width': 123, 'height': 38, 'message': 'Request this item in the catalog, then pick up at the circulation/reserves desk on the second floor.', 'english': 'Circulation Desk' },
  'mm_noILL': { 'floor': '2', 'x': 100, 'y': 91, 'width': 123, 'height': 38, 'message': 'Request this item in the catalog, then pick up at the circulation/reserves desk on the second floor.', 'english': 'Circulation Desk' },
  'archives': { 'floor': '5', 'x': 338, 'y': 139, 'width': 188, 'height': 83, 'message': 'This item is located in the archives on the fifth floor.', 'english': 'Archives' },
  'serling': { 'floor': '5', 'x': 338, 'y': 139, 'width': 188, 'height': 83, 'message': 'This item is located in the archives on the fifth floor.', 'english': 'Archives' },
  'reference': { 'floor': '2', 'x': 128, 'y': 236, 'width': 110, 'height': 57, 'message': 'This item is located in the stacks on the right as you come in the main entrance.', 'english': 'Reference' },
  'microfilm': { 'floor': '4', 'x': 483, 'y': 59, 'width': 39, 'height': 64, 'message': 'This item is located in the metal cases in the southwest corner of the fourth floor, near the restrooms.', 'english': 'Microfilm' },
  'musper': { 'floor': '3', 'x': 170, 'y': 232, 'width': 20, 'height': 81, 'message': 'This item is located in the northeast corner of the third floor, near the administrative offices.', 'english': 'Music Periodicals' },
  'musicref': { 'floor': '3', 'x': 442, 'y': 233, 'width': 10, 'height': 78, 'message': 'This item is located near the music desk in the NW corner of the third floor.', 'english': 'Music Reference' },
  'miniscore': { 'floor': '3', 'x': 433, 'y': 234, 'width': 10, 'height': 79, 'message': 'This item is located near the music desk in the NW corner of the third floor.', 'english': 'Mini scores' },
  'musicfolio': { 'floor': '3', 'x': 413, 'y': 292, 'width': 10, 'height': 23, 'message': 'This item is located near the music desk in the NW corner of the third floor.', 'english': 'Music Folio' },
  'oversize': { 'floor': '5', 'x': 303, 'y': 139, 'width': 40, 'height': 82, 'message': 'This item is located in the central area of the fifth floor, near the archives.', 'english': 'Oversize' },
  'folio': { 'floor': '5', 'x': 329, 'y': 187, 'width': 14, 'height': 36, 'message': 'This item is located in the central area of the fifth floor, near the archives.', 'english': 'Folio' },
  'reserves': { 'floor': '2', 'x': 100, 'y': 91, 'width': 123, 'height': 38, 'message': 'Ask for this item at the circulation/reserves desk on the second floor.', 'english': 'Circulation Desk' },
  'mmreserve': { 'floor': '2', 'x': 100, 'y': 91, 'width': 123, 'height': 38, 'message': 'Ask for this item at the circulation/reserves desk on the second floor.', 'english': 'Circulation Desk' },
  'sheetmusic': { 'floor': '3', 'x': 462, 'y': 271, 'width': 79, 'height': 60, 'message': 'Ask for this item at the music desk on the third floor.', 'english': 'Sheet Music Collection' },
  'audio': { 'floor': '3', 'x': 462, 'y': 271, 'width': 79, 'height': 60, 'message': 'Ask for this item at the music desk on the third floor.', 'english': 'Music Reference Desk' },
  'atlascase': { 'floor': '2', 'x': 264, 'y': 184, 'width': 33, 'height': 18, 'message': 'Located in the atlas case near the main staircase on the second floor.', 'english': 'Atlas Case' },
  'citation': { 'floor': '2', 'x': 218, 'y': 188, 'width': 27, 'height': 15, 'message': 'This item is located on a small bookcase on the right as you come in through the main entrance.', 'english': 'Citation Guides' },
  'ebook': { 'english': 'Ebooks' },
  'icebook': { 'english': 'Ebooks' },
  'eaudio': { 'english': 'Digital Audio' },
  'ejournal': { 'english': 'Online Journals' },
  'escore': { 'english': 'Online Scores' },
  'eresource': { 'english': 'Online Resources' }
};

var stacks = [{ "id": "4.G1.e", "start": "AC1 .E8", "end": "B799 .S37 1998", "x": "85", "y": "222", "height": "80", "width": "9" }, { "id": "4.G1.w", "start": "B801 .C35 1998", "end": "B1647.M74 S35 1968", "x": "95", "y": "222", "height": "80", "width": "9" }, { "id": "4.G2.e", "start": "B1649.O344 B68 2011", "end": "B4351.A34 K5", "x": "103", "y": "222", "height": "80", "width": "9" }, { "id": "4.G2.w", "start": "B4372 .E5 1978", "end": "BF38.5 .S52", "x": "113", "y": "222", "height": "80", "width": "9" }, { "id": "4.G3.e", "start": "BF39 .B73 2016", "end": "BF410.C36 F5 2006", "x": "121", "y": "222", "height": "80", "width": "9" }, { "id": "4.G3.w", "start": "BF411 .B2613 1983", "end": "BF722.3 .R36 2002", "x": "131", "y": "222", "height": "80", "width": "9" }, { "id": "4.G4.e", "start": "BF723.A25 F68 1983", "end": "BJ1279 .S55", "x": "139", "y": "222", "height": "80", "width": "9" }, { "id": "4.G4.w", "start": "BJ1280 .M58 2012", "end": "BL470 .G3", "x": "149", "y": "222", "height": "80", "width": "9" }, { "id": "4.G5.e", "start": "BL473 .A76 2009", "end": "BL2525 .W885 1994", "x": "157", "y": "222", "height": "80", "width": "9" }, { "id": "4.G5.w", "start": "BL2527.M7 G63 2013", "end": "BP75.3 .C36 2010", "x": "167", "y": "222", "height": "80", "width": "9" }, { "id": "4.G6.e", "start": "BP80.A45 K4", "end": "BR148 .M4", "x": "175", "y": "222", "height": "80", "width": "9" }, { "id": "4.G6.w", "start": "BR150 .C59 1962", "end": "BR1233 .A785 2009", "x": "184", "y": "222", "height": "80", "width": "9" }, { "id": "4.G7.e", "start": "BR1235 .G8 1964", "end": "BV2853.E2 G64 1994", "x": "193", "y": "222", "height": "80", "width": "9" }, { "id": "4.G7.w", "start": "BV3200 .T5", "end": "BX4838 .G74 2000", "x": "204", "y": "222", "height": "80", "width": "9" }, { "id": "4.G8.e", "start": "BX4844 .P743 2012", "end": "CB411 .W3", "x": "211", "y": "222", "height": "80", "width": "9" }, { "id": "4.G8.w", "start": "CB415 .F563 2015", "end": "D7 .N4", "x": "220", "y": "222", "height": "80", "width": "9" }, { "id": "4.G9.e", "start": "D9 .D5 1967", "end": "D355 .W6", "x": "229", "y": "222", "height": "80", "width": "9" }, { "id": "4.G9.w", "start": "D358 .H56 1975b", "end": "D753.8 .T45", "x": "239", "y": "222", "height": "80", "width": "9" }, { "id": "4.G10.e", "start": "D754.A34 C6 1942", "end": "D810.Y74 K83 2011", "x": "247", "y": "222", "height": "80", "width": "9" }, { "id": "4.G10.w", "start": "D811.A2 B7458 2001", "end": "DA140 .T48 1986", "x": "257", "y": "222", "height": "80", "width": "9" }, { "id": "4.G11.e", "start": "DA142 .C48 2004", "end": "DA508.A5 M3 1979", "x": "265", "y": "222", "height": "80", "width": "9" }, { "id": "4.G11.w", "start": "DA510 .C43 1965", "end": "DA915 .L41", "x": "276", "y": "222", "height": "80", "width": "9" }, { "id": "4.G12.e", "start": "DA920 .E9 1966A", "end": "DC145 .W53 1968", "x": "320", "y": "222", "height": "80", "width": "9" }, { "id": "4.G12.w", "start": "DC146 .A52 F78", "end": "DD219 .T7 D6", "x": "330", "y": "222", "height": "80", "width": "9" }, { "id": "4.G13.e", "start": "DD220 .C36", "end": "DF287.P3 P37 2005", "x": "338", "y": "222", "height": "80", "width": "9" }, { "id": "4.G13.w", "start": "DF503 .B7", "end": "DJ411.A62 K4", "x": "348", "y": "222", "height": "80", "width": "9" }, { "id": "4.G14.e", "start": "DJK9 .E2 1976", "end": "DK273 .S784", "x": "356", "y": "222", "height": "80", "width": "9" }, { "id": "4.G14.w", "start": "DK274.A2 K4834 1983", "end": "DR381.M38 P3", "x": "366", "y": "222", "height": "80", "width": "9" }, { "id": "4.G15.e", "start": "DR417 .D48", "end": "DS118 .R6 1970", "x": "374", "y": "222", "height": "80", "width": "9" }, { "id": "4.G15.w", "start": "DS119 .G58", "end": "DS369.4 .N44", "x": "384", "y": "222", "height": "80", "width": "9" }, { "id": "4.G16.e", "start": "DS371.2 .A45513 1992", "end": "DS707 .C513 1965", "x": "392", "y": "222", "height": "80", "width": "9" }, { "id": "4.G16.w", "start": "DS708 .M14", "end": "DS935.774 .L36 2013", "x": "402", "y": "222", "height": "80", "width": "9" }, { "id": "4.G17.e", "start": "DT1 .A14 1974", "end": "DT797 .Y44", "x": "411", "y": "222", "height": "80", "width": "9" }, { "id": "4.G17.w", "start": "DT823 .T75", "end": "E98.R53 O9813 1999", "x": "420", "y": "222", "height": "80", "width": "9" }, { "id": "4.G18.e", "start": "E98.S3 V5 1966", "end": "E168 .W69", "x": "430", "y": "222", "height": "80", "width": "9" }, { "id": "4.G18.w", "start": "E169 .A36", "end": "E179.5 .M32 1997", "x": "438", "y": "222", "height": "80", "width": "9" }, { "id": "4.G19.e", "start": "E180 .K28 1995", "end": "E184 .J5 Z826 1982", "x": "482", "y": "222", "height": "80", "width": "9" }, { "id": "4.G19.w", "start": "E184 .K6 E27 1997", "end": "E185.86 .S6974 1996", "x": "492", "y": "222", "height": "80", "width": "9" }, { "id": "4.G20.e", "start": "E185.86 .S698 2005", "end": "E302.5 .W74", "x": "500", "y": "222", "height": "80", "width": "9" }, { "id": "4.G20.w", "start": "E302.6 .A2 B4", "end": "E448 .R3", "x": "511", "y": "222", "height": "80", "width": "9" }, { "id": "4.G21.w", "start": "E449 .A1555 1994", "end": "E660 .R88", "x": "473", "y": "50", "height": "80", "width": "9" }, { "id": "4.G21.e", "start": "E660 .W715", "end": "E746 .W5", "x": "464", "y": "50", "height": "80", "width": "9" }, { "id": "4.G22.w", "start": "E747 .A75", "end": "E842.9 .Z45 1992", "x": "456", "y": "50", "height": "80", "width": "9" }, { "id": "4.G22.e", "start": "E843 .C6", "end": "F127.T7 S4", "x": "446", "y": "50", "height": "80", "width": "9" }, { "id": "4.G23.w", "start": "F128.C3 D47 2010", "end": "F231.2 .G6 1969", "x": "438", "y": "50", "height": "80", "width": "9" }, { "id": "4.G23.e", "start": "F232.C43 M67 1998", "end": "F659.D2 B4 1982", "x": "428", "y": "50", "height": "80", "width": "9" }, { "id": "4.G24.w", "start": "F666.S21 S22 1935", "end": "F1234.237 .H37 2018", "x": "420", "y": "50", "height": "80", "width": "9" }, { "id": "4.G24.e", "start": "F1235 A84 2014", "end": "F2271 .S56 2004", "x": "411", "y": "50", "height": "80", "width": "9" }, { "id": "4.G25.w", "start": "F2272 .I58 2007", "end": "G890.H4 S3", "x": "402", "y": "50", "height": "80", "width": "9" }, { "id": "4.G25.e", "start": "G1021 .S56 2003", "end": "GN23 .P9 1973", "x": "392", "y": "50", "height": "80", "width": "9" }, { "id": "4.G26.w", "start": "GN24 .B43", "end": "GN656 .K86 1982", "x": "383", "y": "50", "height": "80", "width": "9" }, { "id": "4.G26.e", "start": "GN657.B64 M75 1982", "end": "GV182.3 .U55 1993", "x": "374", "y": "50", "height": "80", "width": "9" }, { "id": "4.G27.w", "start": "GV183 .B57 1996", "end": "GV883 .C86 2009", "x": "366", "y": "50", "height": "80", "width": "9" }, { "id": "4.G27.e", "start": "GV884 .A1 A33 2017", "end": "H59 .W6 W63", "x": "356", "y": "50", "height": "80", "width": "9" }, { "id": "4.G28.w", "start": "H61 .A37", "end": "HB501.5 .C37 1983", "x": "348", "y": "50", "height": "80", "width": "9" }, { "id": "4.G28.e", "start": "HB5523 .A27 1999", "end": "HC79.Z6 B38", "x": "338", "y": "50", "height": "80", "width": "9" }, { "id": "4.G29.w", "start": "HC85 .F44 2001", "end": "HC125 .W34", "x": "330", "y": "50", "height": "80", "width": "9" }, { "id": "4.G29.e", "start": "HC130.E5 E58 1991", "end": "HC1060 .H47 1993", "x": "320", "y": "50", "height": "80", "width": "9" }, { "id": "5.G30.w", "start": "HD19 .F46 1976", "end": "HD57.7 .Y85 1989", "x": "69", "y": "21", "height": "49", "width": "15" }, { "id": "5.G31.e", "start": "HD58 .B32", "end": "HD191 .S8 1967", "x": "86", "y": "29", "height": "80", "width": "9" }, { "id": "5.G31.w", "start": "HD194 .A6", "end": "HD4606.N5 B58", "x": "95", "y": "29", "height": "80", "width": "9" }, { "id": "5.G32.e", "start": "HD4802 .R42", "end": "HD6960.5 .U5 D45 1981", "x": "104", "y": "29", "height": "80", "width": "9" }, { "id": "5.G32.w", "start": "HD6961 .B57", "end": "HD9397.U6 B87 2011", "x": "113", "y": "29", "height": "80", "width": "9" }, { "id": "5.G33.e", "start": "HD9415 .C6 1966", "end": "HE2583 .S67", "x": "121", "y": "29", "height": "80", "width": "9" }, { "id": "5.G33.w", "start": "HE2751 .A77", "end": "HF5011 .W26", "x": "130", "y": "29", "height": "80", "width": "9" }, { "id": "5.G34.e", "start": "HF5341 .B4", "end": "HF5679 .M374 2003", "x": "140", "y": "29", "height": "80", "width": "9" }, { "id": "5.G34.w", "start": "HF5681.A8 P385 1997", "end": "HG2229 .H3", "x": "149", "y": "29", "height": "80", "width": "9" }, { "id": "5.G35.e", "start": "HG2406 .A536", "end": "HJ263 .P6", "x": "156", "y": "29", "height": "80", "width": "9" }, { "id": "5.G35.w", "start": "HJ268 .R78 2003", "end": "HM217 .A47 1994", "x": "166", "y": "29", "height": "80", "width": "9" }, { "id": "5.G36.e", "start": "HM221 .C35", "end": "HM1116 .W46 2000", "x": "174", "y": "29", "height": "80", "width": "9" }, { "id": "5.G36.w", "start": "HM1121 .B37 2002", "end": "HN90.P8 Z64 2008", "x": "183", "y": "29", "height": "80", "width": "9" }, { "id": "5.G37.e", "start": "HN90.R3 A3 1984", "end": "HQ56 .W648 1991", "x": "191", "y": "29", "height": "80", "width": "9" }, { "id": "5.G37.w", "start": "HQ57.2 .B87 2011", "end": "HQ755.86 .T366 2006", "x": "201", "y": "29", "height": "80", "width": "9" }, { "id": "5.G38.e", "start": "HQ756 .A23 2018", "end": "HQ1059.5 .U5 W65 1984", "x": "209", "y": "29", "height": "80", "width": "9" }, { "id": "5.G38.w", "start": "HQ1060 .G4", "end": "HQ1240.5 .U6 N36 1998", "x": "218", "y": "29", "height": "80", "width": "9" }, { "id": "5.G39.e", "start": "HQ1381 .A44 2002", "end": "HT166 .W484 2013", "x": "226", "y": "29", "height": "80", "width": "9" }, { "id": "5.G39.w", "start": "HT167 .A834 1994", "end": "HV639 .M47 2000", "x": "235", "y": "29", "height": "80", "width": "9" }, { "id": "5.G40.e", "start": "HV640 .A6", "end": "HV4506.W2 L54 1993", "x": "244", "y": "29", "height": "80", "width": "9" }, { "id": "5.G40.w", "start": "HV4547.A4 F57 2000", "end": "HV6431 .W5655 2013", "x": "253", "y": "29", "height": "80", "width": "9" }, { "id": "5.G41.e", "start": "HV6432 .A45 2004", "end": "HV6795.S5 C45 1978", "x": "261", "y": "29", "height": "80", "width": "9" }, { "id": "5.G41.w", "start": "HV6810.5 .C745 2001", "end": "HV9471 .Z55 1995", "x": "270", "y": "29", "height": "80", "width": "9" }, { "id": "5.G42.e", "start": "HV9474.F66 K47 2013", "end": "J81.4 .M93 2003", "x": "279", "y": "29", "height": "80", "width": "9" }, { "id": "5.G42.w", "start": "J82 .D2", "end": "JC186 .P83 S55", "x": "287", "y": "29", "height": "80", "width": "9" }, { "id": "5.G43.e", "start": "JC211 .B265", "end": "JC628 .G3", "x": "296", "y": "29", "height": "80", "width": "9" }, { "id": "5.G43.w", "start": "JF11 .E47", "end": "JK686 .H7", "x": "305", "y": "29", "height": "80", "width": "9" }, { "id": "5.G44.e", "start": "JK691 .A52 1965", "end": "JL2269 .P7 B84", "x": "313", "y": "29", "height": "80", "width": "9" }, { "id": "5.G44.w", "start": "JL2420 .C58 H86 1997", "end": "JS1230 1981 N48", "x": "321", "y": "29", "height": "80", "width": "9" }, { "id": "5.G45.e", "start": "JS1234 .A1 L6", "end": "JX1977.8 .P85 T6", "x": "330", "y": "29", "height": "80", "width": "9" }, { "id": "5.G45.w", "start": "JX1979 .A36", "end": "KF224 .W33 S57", "x": "339", "y": "29", "height": "80", "width": "9" }, { "id": "5.G46.e", "start": "KF225 .A84 B88 2017", "end": "KF3989 .Z9 F67 1989", "x": "348", "y": "29", "height": "80", "width": "9" }, { "id": "5.G46.w", "start": "KF4118 .K5", "end": "KF8745 .W3 P64", "x": "357", "y": "29", "height": "80", "width": "9" }, { "id": "5.G47.e", "start": "KF8748 .B24", "end": "LA627 .R82 1984", "x": "366", "y": "29", "height": "80", "width": "9" }, { "id": "5.G47.w", "start": "LA631 .A47 1990", "end": "LB1062.6 .W55 1998", "x": "374", "y": "29", "height": "80", "width": "9" }, { "id": "5.G48.e", "start": "LB1063 .E213 1964", "end": "LB2346 .M3", "x": "383", "y": "29", "height": "80", "width": "9" }, { "id": "5.G48.w", "start": "LB2350 .C29 1973", "end": "LC368 .B47 1967", "x": "391", "y": "29", "height": "80", "width": "9" }, { "id": "5.G49.e", "start": "LC383 .G4", "end": "N72.R4 W32", "x": "400", "y": "29", "height": "80", "width": "9" }, { "id": "5.G49.w", "start": "N72.S3 B64 1999", "end": "N6494.V53 S6513 2008", "x": "409", "y": "29", "height": "80", "width": "9" }, { "id": "5.G50.e", "start": "N6496.C52 D383 2005", "end": "N6922 .V35", "x": "417", "y": "29", "height": "80", "width": "9" }, { "id": "5.G50.w", "start": "N6923 .B5 B33", "end": "N9165.F8 S5 1971", "x": "426", "y": "29", "height": "80", "width": "9" }, { "id": "5.G51.e", "start": "NA1 .A536", "end": "NA2530 .O36 1998", "x": "435", "y": "29", "height": "80", "width": "9" }, { "id": "5.G51.w", "start": "NA2540 .A97 2011", "end": "NB619.T9 P4", "x": "443", "y": "29", "height": "80", "width": "9" }, { "id": "5.G52.e", "start": "NB620 .A44 1975", "end": "ND497.P3 L56 1985", "x": "452", "y": "29", "height": "80", "width": "9" }, { "id": "5.G52.w", "start": "ND497.R2 A3", "end": "ND1045 .C63 1987", "x": "461", "y": "29", "height": "80", "width": "9" }, { "id": "5.G53.e", "start": "ND1046.M6 I613", "end": "NK3670 .L79", "x": "470", "y": "29", "height": "80", "width": "9" }, { "id": "5.G53.w", "start": "NK3780 .L5", "end": "P40.8 .L369 2002", "x": "479", "y": "29", "height": "80", "width": "9" }, { "id": "5.G54.e", "start": "P41 .F5", "end": "P117.7 .T35 2010", "x": "487", "y": "29", "height": "80", "width": "9" }, { "id": "5.G54.w", "start": "P118 .A5 1984", "end": "PA4410 .S5 1967", "x": "496", "y": "29", "height": "80", "width": "9" }, { "id": "5.G55.e", "start": "PA4413.A7 A67", "end": "PC4625 .B6", "x": "504", "y": "29", "height": "80", "width": "9" }, { "id": "5.G55.w", "start": "PC4640 .L38 1993", "end": "PG3017 .S8 1976", "x": "513", "y": "29", "height": "80", "width": "9" }, { "id": "5.G56.e", "start": "PG3020.5 .M6 R8", "end": "PG9621.K3 U713 1998", "x": "528", "y": "21", "height": "58", "width": "14" }, { "id": "5.G57.e", "start": "PH301 .A35", "end": "PL3748 .Y6", "x": "487", "y": "248", "height": "58", "width": "14" }, { "id": "5.G58.w", "start": "PL4378.65 .E6 S59 2002", "end": "PN511 .W633 1965", "x": "513", "y": "248", "height": "80", "width": "9" }, { "id": "5.G58.e", "start": "PN513 .S22 1971", "end": "PN1962 .G7", "x": "504", "y": "248", "height": "80", "width": "9" }, { "id": "5.G59.w", "start": "PN1967 .A73 1943", "end": "PN1993.45 .A57 1989", "x": "496", "y": "248", "height": "80", "width": "9" }, { "id": "5.G59.e", "start": "PN1993.5 .A1 A35", "end": "PN1995.9 .H6 W46 1996", "x": "487", "y": "248", "height": "80", "width": "9" }, { "id": "5.G60.w", "start": "PN1995.9 .I43 B45 1985", "end": "PN1998 .P24", "x": "478", "y": "248", "height": "80", "width": "9" }, { "id": "5.G60.e", "start": "PN1998.2 .A24 2011", "end": "PN2266.5 W45 1992", "x": "470", "y": "248", "height": "80", "width": "9" }, { "id": "5.G61.w", "start": "PN2267 .C45 2004", "end": "PN3324 .W6", "x": "461", "y": "248", "height": "80", "width": "9" }, { "id": "5.G61.e", "start": "PN3326 .R63", "end": "PN4826 .W58 1991", "x": "452", "y": "248", "height": "80", "width": "9" }, { "id": "5.G62.w", "start": "PN4832 .I57 1991", "end": "PN6072 .M8", "x": "443", "y": "248", "height": "80", "width": "9" }, { "id": "5.G62.e", "start": "PN6081 .A65", "end": "PN6790.S93 T56 2007", "x": "435", "y": "248", "height": "80", "width": "9" }, { "id": "5.G63.w", "start": "PQ11 .G4", "end": "PQ1489.L53 1968", "x": "426", "y": "248", "height": "80", "width": "9" }, { "id": "5.G63.e", "start": "PQ1494.A3 M3", "end": "PQ2157 .E42A", "x": "417", "y": "248", "height": "80", "width": "9" }, { "id": "5.G64.w", "start": "PQ2158 .A45 1976", "end": "PQ2446 .A29 W2", "x": "409", "y": "248", "height": "80", "width": "9" }, { "id": "5.G64.e", "start": "PQ2450.T6 Z98", "end": "PQ2623.O8 Z5536 1978", "x": "400", "y": "248", "height": "80", "width": "9" }, { "id": "5.G65.w", "start": "PQ2625.A16 Q8", "end": "PQ4117 .L66 1996", "x": "391", "y": "248", "height": "80", "width": "9" }, { "id": "5.G65.e", "start": "PQ4134 .K4", "end": "PQ6182 .H5", "x": "383", "y": "248", "height": "80", "width": "9" }, { "id": "5.G66.w", "start": "PQ6183 .B00 1948", "end": "PQ6558 .V5", "x": "374", "y": "248", "height": "80", "width": "9" }, { "id": "5.G66.e", "start": "PQ6560 1957", "end": "PQ7297.F793 Z933 1998", "x": "365", "y": "248", "height": "80", "width": "9" }, { "id": "5.G67.w", "start": "PQ7297.G23 O8 1994", "end": "PQ8517 .T42 1992", "x": "356", "y": "248", "height": "80", "width": "9" }, { "id": "5.G67.e", "start": "PQ8519.A5 A17 1958", "end": "PR457 .W74 1993", "x": "348", "y": "248", "height": "80", "width": "9" }, { "id": "5.G68.w", "start": "PR461 .A33 2009", "end": "PR858.W6 T6", "x": "339", "y": "248", "height": "80", "width": "9" }, { "id": "5.G68.e", "start": "PR861 .B76 1985", "end": "PR1272 .W4", "x": "331", "y": "248", "height": "80", "width": "9" }, { "id": "5.G69.w", "start": "PR1281 .W8", "end": "PR2539.G6 R3 1974", "x": "322", "y": "248", "height": "80", "width": "9" }, { "id": "5.G69.e", "start": "PR2541 .C6", "end": "PR2949 .T33 1966", "x": "312", "y": "248", "height": "80", "width": "9" }, { "id": "5.G70.w", "start": "PR2952 .A45 1972", "end": "PR3452 .W5", "x": "304", "y": "248", "height": "80", "width": "9" }, { "id": "5.G70.e", "start": "PR3454 .A9 1966", "end": "PR3780 .A2 1854", "x": "296", "y": "248", "height": "80", "width": "9" }, { "id": "5.G71.w", "start": "PR3783 .B5", "end": "PR4537 .B74 2004", "x": "287", "y": "248", "height": "80", "width": "9" }, { "id": "5.G71.e", "start": "PR4550 .E50", "end": "PR4969 .R4", "x": "279", "y": "248", "height": "80", "width": "9" }, { "id": "5.G72.w", "start": "PR4971 .P9 1966", "end": "PR5572.Q7 K5", "x": "271", "y": "248", "height": "80", "width": "9" }, { "id": "5.G72.e", "start": "PR5581 .B8", "end": "PR6003.V36 B7 1966", "x": "262", "y": "248", "height": "80", "width": "9" }, { "id": "5.G73.w", "start": "PR6005.A37 Z6", "end": "PR6023.A94 Z8", "x": "252", "y": "248", "height": "80", "width": "9" }, { "id": "5.G73.e", "start": "PR6023.E15 A8 1914", "end": "PR6051.Z96 H53 2001", "x": "244", "y": "248", "height": "80", "width": "9" }, { "id": "5.G74.w", "start": "PR6052.A3184 Z475 1986", "end": "PR9333.9 .K38 L37 2001", "x": "235", "y": "248", "height": "80", "width": "9" }, { "id": "5.G74.e", "start": "PR9340 .C66", "end": "PS310.W64 S5", "x": "225", "y": "248", "height": "80", "width": "9" }, { "id": "5.G75.w", "start": "PS312 .D3", "end": "PS645 .H3", "x": "217", "y": "248", "height": "80", "width": "9" }, { "id": "5.G75.e", "start": "PS647.A35 B57 1990", "end": "PS1850 .F63", "x": "209", "y": "248", "height": "80", "width": "9" }, { "id": "5.G76.w", "start": "PS1851 .H3", "end": "PS3053 .W5", "x": "200", "y": "248", "height": "80", "width": "9" }, { "id": "5.G76.e", "start": "PS3054 .A44 1908a", "end": "PS3509.V23 A6 1970", "x": "191", "y": "248", "height": "80", "width": "9" }, { "id": "5.G77.w", "start": "PS3511.A33 E5", "end": "PS3523.Y85 E56 1994", "x": "182", "y": "248", "height": "80", "width": "9" }, { "id": "5.G77.e", "start": "PS3525.A1143 Z5 1968", "end": "PS3537.U72 S5", "x": "174", "y": "248", "height": "80", "width": "9" }, { "id": "5.G78.w", "start": "PS3539.A516 L6", "end": "PS3553.U8 V6", "x": "165", "y": "248", "height": "80", "width": "9" }, { "id": "5.G78.e", "start": "PS3554.A243 Z46 2017", "end": "PS3563.A99 C5", "x": "157", "y": "248", "height": "80", "width": "9" }, { "id": "5.G79.w", "start": "PS3563.C334 T5 1990", "end": "PS3580.R3 S5 1973", "x": "148", "y": "248", "height": "80", "width": "9" }, { "id": "5.G79.e", "start": "PS3600.A6 H37 2009", "end": "PT2380 .K7 1970", "x": "139", "y": "248", "height": "80", "width": "9" }, { "id": "5.G80.w", "start": "PT2381 .A1 1954", "end": "PT3710.W65 D84 2004", "x": "131", "y": "248", "height": "80", "width": "9" }, { "id": "5.G80.e", "start": "PT3716 .R3", "end": "PZ3.9 .F85 Co 1976", "x": "122", "y": "248", "height": "80", "width": "9" }, { "id": "5.G81.w", "start": "PZ4.A213 LAS", "end": "Q143.S7 N44 2001", "x": "113", "y": "248", "height": "80", "width": "9" }, { "id": "5.G81.e", "start": "Q147 .H37 2011", "end": "QA37.3 .K73 2002", "x": "104", "y": "248", "height": "80", "width": "9" }, { "id": "5.G82.w", "start": "QA39 .G35", "end": "QA76.95 .W446 2015", "x": "96", "y": "248", "height": "80", "width": "9" }, { "id": "5.G82.e", "start": "QA90 .B47513 2010", "end": "QA297.8 .B43 2000", "x": "87", "y": "248", "height": "80", "width": "9" }, { "id": "5.G83.w", "start": "QA298 .I7 T72 1982", "end": "QA809 .D4 2010", "x": "69", "y": "273", "height": "60", "width": "15" }, { "id": "5.G84.e", "start": "QB9 .R67 1998", "end": "QC996 .K35 2005", "x": "174", "y": "142", "height": "80", "width": "9" }, { "id": "5.G84.w", "start": "QD1 .A355", "end": "QE980 .A54 1996", "x": "182", "y": "142", "height": "80", "width": "9" }, { "id": "5.G85.e", "start": "QH11 .D2 1959", "end": "QH506 .V613", "x": "191", "y": "142", "height": "80", "width": "9" }, { "id": "5.G85.w", "start": "QH507 .H6513 1984", "end": "QL431 .W58", "x": "200", "y": "142", "height": "80", "width": "9" }, { "id": "5.G86.e", "start": "QL434 .C34", "end": "QP186 .U63 1990", "x": "208", "y": "142", "height": "80", "width": "9" }, { "id": "5.G86.w", "start": "QP187 .B46", "end": "QP981.W5 C87", "x": "217", "y": "142", "height": "80", "width": "9" }, { "id": "5.G87.e", "start": "QR1 .K54 1999", "end": "RA418.5 .T73 W5 2003", "x": "226", "y": "142", "height": "80", "width": "9" }, { "id": "5.G87.w", "start": "RA421 .A32 1995a", "end": "RC267 .W45 1996", "x": "235", "y": "142", "height": "80", "width": "9" }, { "id": "5.G88.e", "start": "RC268 .E35 1984", "end": "RC488.6 .T83 1986", "x": "243", "y": "142", "height": "80", "width": "9" }, { "id": "5.G88.w", "start": "RC489.A32 S53 2017", "end": "RD31.5 .K37 1999", "x": "252", "y": "142", "height": "80", "width": "9" }, { "id": "5.G89.e", "start": "RD34 .S85", "end": "RJ496.S8 W36 1998", "x": "261", "y": "142", "height": "80", "width": "9" }, { "id": "5.G89.w", "start": "RJ499.A1 A53", "end": "SK199 .A73 2001", "x": "269", "y": "142", "height": "80", "width": "9" }, { "id": "5.G90.e", "start": "SK203 .B37 2001", "end": "TN870.5 .G66 1999", "x": "279", "y": "142", "height": "80", "width": "9" }, { "id": "5.G90.w", "start": "TN871 .A718", "end": "TX360.U63 N49 2012", "x": "287", "y": "142", "height": "80", "width": "9" }, { "id": "5.G91.e", "start": "TX361.A8 A28 2012", "end": "Z1019 .H15 1978", "x": "296", "y": "142", "height": "80", "width": "9" }, { "id": "5.G91.w", "start": "Z1023 .R66 2000", "end": "ZA4575 .T85 2012", "x": "305", "y": "142", "height": "80", "width": "9" }];

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
// Import jQuery
// var jQueryScript = document.createElement("script");  
// jQueryScript.src = "https://code.jquery.com/jquery-3.3.1.min.js";  
// document.getElementsByTagName("head")[0].appendChild(jQueryScript);


var app = angular.module('viewCustom', ['angularLoad', 'ui.router', 'customActions']);

app.filter('encode', function () {
  return encodeURIComponent;
});

// Re-run search when the scope is changed
// Dan got this code from St. Olaf College
app.component('prmTabsAndScopesSelectorAfter', {
  bindings: { parentCtrl: '<' },
  controller: function controller($scope) {
    this.$onInit = function () {
      setTimeout(function () {

        function activateSearch() {
          setTimeout(function () {
            document.getElementsByClassName("zero-margin button-confirm md-button md-primoExplore-theme")[0].click();
          }, 500);
        }

        var searchScopes = document.querySelectorAll('div.simple-search-wrapper [id^="select_option_"]');

        for (var i = 0; i < 6; i++) {
          searchScopes[i].onclick = function () {
            activateSearch();
          };
        }
      }, 500);
    };
  }
});

// External search links
app.controller('ebscoLinkController', [function ($stateParams, $state) {
  this.$onInit = function () {
    {
      var spaceToPlus = function spaceToPlus(str) {
        return str.replace(/\s+/g, '+');
      };

      var convertToEbsco = function convertToEbsco(primoSearch) {
        var ebscoSearchString = '';
        if (!Array.isArray(primoSearch)) {
          ebscoSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
        } else {
          for (var i = 0; i < primoSearch.length; i++) {
            var searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
            var conjunction = primoSearch[i].split(/,/)[3] || '';
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
              default:
                // handles 'any' case
                ebscoSearchString += '(' + searchTerms + ')';
            }
            if (i !== primoSearch.length - 1) {
              ebscoSearchString += '+' + conjunction + '+';
            }
          }
        }
        return ebscoSearchString;
      };

      var convertToWorldCat = function convertToWorldCat(primoSearch) {
        var worldCatSearchString = '';
        if (!Array.isArray(primoSearch)) {
          worldCatSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
        } else {
          for (var i = 0; i < primoSearch.length; i++) {
            var searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
            var conjunction = primoSearch[i].split(/,/)[3] || '';
            switch (primoSearch[i].split(/,/)[0]) {
              case 'title':
                worldCatSearchString += 'ti:' + searchTerms;
                break;
              case 'creator':
                worldCatSearchString += 'au:' + searchTerms;
                break;
              default:
                worldCatSearchString += 'kw:' + searchTerms;
            }
            if (i !== primoSearch.length - 1) {
              worldCatSearchString += '+';
            }
          }
        }
        return worldCatSearchString;
      };

      var convertToGoogle = function convertToGoogle(primoSearch) {
        var googleSearchString = '';
        if (!Array.isArray(primoSearch)) {
          googleSearchString = spaceToPlus(primoSearch.split(/,/)[2]);
        } else {
          for (var i = 0; i < primoSearch.length; i++) {
            var searchTerms = spaceToPlus(primoSearch[i].split(/,/)[2]);
            var conjunction = primoSearch[i].split(/,/)[3] || '';
            googleSearchString += '(' + searchTerms + ')';
            if (i !== primoSearch.length - 1) {
              googleSearchString += '+' + conjunction + '+';
            }
          }
        }
        return googleSearchString;
      };

      // get the view for image paths
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      this.view = urlParams.get('vid').replace(':', '-');

      var primoSearch = this.parentCtrl.$stateParams.query; // can be a string OR array!
      //console.log(primoSearch);

      var proxyString = 'https://ezproxy.ithaca.edu/login?url=';

      var ebscoSearchString = convertToEbsco(primoSearch);
      var googleSearchString = convertToGoogle(primoSearch);
      var worldCatSearchString = convertToWorldCat(primoSearch);

      this.newspaperLabel = 'Newspapers';
      var newspaperBase = 'https://ithaca.primo.exlibrisgroup.com/discovery/npsearch?vid=01ITHACACOL_INST:01ITHACACOL_V1&lang=en&search_scope=MyInst_and_CI';
      this.newspaperSearchUrl = newspaperBase + '&query=' + primoSearch;

      this.ebscoLabel = 'EBSCO';
      var ebscoBaseUrl = 'https://search.ebscohost.com/login.aspx?direct=true&defaultdb=aph,gnh,apn,ahl,aft,air,ami,rfh,bvh,bxh,boh,buh,cin20,cms,nlebk,eric,hev,8gh,hch,hia,ibh,qth,lxh,lfh,ulh,cmedm,mth,mah,msn,nfh,ofs,phl,tfh,rgr,bwh,ram,rft,sih,s3h,trh,ser,e870sww,e872sww,mft,kah,mzh&type=1&searchMode=Standard&site=ehost-live&scope=site';
      var ebscoSearchUrl = ebscoBaseUrl + '&bquery=' + ebscoSearchString;
      this.ebscoProxiedSearchUrl = proxyString + ebscoSearchUrl;

      this.googleLabel = 'Google Scholar';
      var googleBaseUrl = 'https://scholar.google.com/scholar?hl=en&as_sdt=0%2C33&inst=7210957415625843320&q=';
      this.googleProxiedSearchUrl = googleBaseUrl + googleSearchString;

      this.worldCatLabel = 'WorldCat';
      var worldCatBaseUrl = 'https://www.worldcat.org/search?qt=worldcat_org_all&q=';
      this.worldCatProxiedSearchUrl = proxyString + worldCatBaseUrl + worldCatSearchString;
    }
  };
}]);
app.component('prmSearchResultSortByAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'ebscoLinkController',
  template: '<div id="ic-external-links"><h3 ng-class="section-title-header"><span>Try My Search In&hellip;</span></h3><div id="ic-ebsco-link-block"><a href="{{$ctrl.ebscoProxiedSearchUrl}}" target="_blank" id="ic-ebsco-link"><img src="custom/{{$ctrl.view}}/img/ebsco.svg"> {{$ctrl.ebscoLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div><div id="ic-google-link-block"><a href="{{$ctrl.googleProxiedSearchUrl}}" target="_blank" id="ic-google-link"><img src="custom/{{$ctrl.view}}/img/google.svg"> {{$ctrl.googleLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div><div id="ic-worldcat-link-block"><a href="{{$ctrl.worldCatProxiedSearchUrl}}" target="_blank" id="ic-worldcat-link"><img src="custom/{{$ctrl.view}}/img/WorldCat.svg"> {{$ctrl.worldCatLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div><div id="ic-newspaper-link-block"><a href="{{$ctrl.newspaperSearchUrl}}" target="_blank" id="ic-newspaper-link"><img src="custom/{{$ctrl.view}}/img/WorldCat.svg"> {{$ctrl.newspaperLabel}} <prm-icon svg-icon-set="primo-ui" icon-type="svg" icon-definition="open-in-new"></prm-icon></a></div></div>'
});

// Map stuff

app.controller('mapController', [function () {

  this.$onInit = function () {
    {
      var drawIndicator = function drawIndicator(mapHeight, mapWidth, x, y, h, w) {
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
      };

      // Gather a bunch of information from the current directive.


      try {
        this.physical = Boolean(this.parentCtrl.item.delivery.GetIt1[0].category === 'Alma-P' || this.parentCtrl.item.delivery.GetIt1[1].category === 'Alma-P');
      } catch (e) {
        this.physical = false;
      }

      try {
        this.holding = this.parentCtrl.item.delivery.holding;
      } catch (e) {
        this.holding = false;
      }

      try {
        var theCallNumber = this.parentCtrl.item.delivery.bestlocation.callNumber;
        theCallNumber = theCallNumber.replace(/^[(\s]+/, '');
        theCallNumber = theCallNumber.replace(/[)\s]+$/, '');
        this.callNumber = theCallNumber;
      } catch (e) {
        this.callNumber = '';
        this.mapError = true;
      }

      try {
        this.location = this.parentCtrl.item.delivery.bestlocation.subLocationCode;
        console.log(this.location);
      } catch (e) {
        this.location = '';
        this.mapError = true;
      }

      try {
        this.availability = this.parentCtrl.item.delivery.bestlocation.availabilityStatus;
      } catch (e) {
        this.availability = '';
        this.mapError = true;
      }

      // Do we need to display a map?
      // this.needsMap = Boolean(( (this.availability === 'available' || this.availability === 'check_holdings') && this.callNumber && this.physical) || this.location === 'periodical');

      // Slightly different for COVID - reserves weirdness
      this.needsMap = Boolean((this.availability === 'available' && this.location !== 'reserves' || this.availability === 'check_holdings') && this.callNumber && this.physical || this.location === 'periodical');

      if (this.needsMap) {

        // are there multiple holdings?
        if (this.holding && this.holding.length > 1) {
          this.multipleHoldings = true;
          this.holdingsLocations = [];
          for (var _i2 = 0; _i2 < this.holding.length; _i2++) {
            this.holdingsLocations.push(this.holding[_i2].subLocationCode);
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

          for (var _i3 = 0; _i3 < this.lookupArray.length; _i3++) {
            var start = this.lookupArray[_i3].start;
            var end = this.lookupArray[_i3].end;
            var test = this.sortLC(start, end, this.callNumber);
            if (this.normalizeLC(test[1]) === this.normalizeLC(this.callNumber) || test.length === 2) {
              this.coordinates = this.lookupArray[_i3];
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
          for (var i = 0; i < this.holdingsLocations.length; i++) {

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
  };
}]);

app.component('prmOpacAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'mapController',
  template: '<div class="ic-map-error" ng-show="$ctrl.needsMap && $ctrl.mapError">SYSTEM ERROR: TRY REFRESHING THE PAGE</div><div class="ic-map-container" ng-style="$ctrl.mapDimensions"><p ng-show="$ctrl.showLocMessage" class="ic-loc-message">{{$ctrl.locMessage}}</p><div ng-show="$ctrl.needsMap" class="ic-map-div"><img class="ic-map-img" ng-src="custom/01ITHACACOL_INST-01ITHACACOL_V1/img/floor_{{$ctrl.floor}}.png" ng-srcset="custom/01ITHACACOL_INST-01ITHACACOL_V1/img/floor_{{$ctrl.floor}}.png 1x, custom/01ITHACACOL_INST-01ITHACACOL_V1/img/floor_{{$ctrl.floor}}@2x.png 2x" ng-style="$ctrl.mapDimensions" ng-show="$ctrl.needsMap"><canvas ng-show="$ctrl.needsMap" class="ic-map-canvas"></canvas></div></div>'
});

// Report a Problem action

app.controller('prmActionListAfterController', [function () {
  // console.log(this);
  this.$onInit = function () {
    {
      // build a permalink (for 'report a problem')
      try {
        var recordid = this.parentCtrl.item.pnx.control.recordid[0];
        var start = 'https://ithaca.primo.exlibrisgroup.com/discovery/fulldisplay?docid=';
        var end = '&context=PC&vid=01ITHACACOL_INST:01ITHACACOL_V1';
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
        this.reportFormUrl += addataString;

        // Add the call number for traces
        this.reportFormUrl += '&callNumber=' + encodeURI(this.callNumber);
        this.reportFormUrl += '&permalink=' + encodeURI(this.url);
      } catch (e) {
        this.reportFormUrl = '';
      }

      try {
        this.getit = this.parentCtrl.item.delivery.GetIt1;
      } catch (e) {
        this.getit = [];
        console.log(e.message);
      }
    }
  };
}]);
app.component('prmActionListAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmActionListAfterController',
  template: '<custom-action \n    name="report_a_problem"\n    label="Report a Problem"\n    index=8\n    icon="ic_report_problem_24px"\n    icon-set="action"\n    link="{{$ctrl.reportFormUrl}}" \n    />'
});

app.component('prmGalleryCollectionsListAfter', {
  template: '<p>For more information about our digital collections, see our <a href="https://libguides.ithaca.edu/digital_library">Digital Collections Guide</a> or contact <a href="mailto:digitalcollections@ithaca.edu">digitalcollections@ithaca.edu</a>. For information on submitting materials to the collection, see our <a href="https://library.ithaca.edu/policies/digitalcollections.php">Digital Collections Content Submission Policies and Guidelines</a>.</p>'
});

// LibAnswers chat widget
(function () {
  var lc = document.createElement('script');lc.type = 'text/javascript';lc.async = 'true';
  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'v2.libanswers.com/load_chat.php?hash=88261efafc9e5e717508101165503bda';
  var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(lc, s);
})();

// Google Books Experiment for Mike Saunders
// Nat'l Library of Scotland
// (function(){
//   const gb = document.createElement('script');
//   gb.type = 'text/javascript';
//   gb.src = 'https://www.google.com/books/jsapi.js';
//   gb.addEventListener('load', () => google.books.load());
//   document.head.appendChild(gb);
// })();

// function waitForElm(selector) {
//   return new Promise(resolve => {
//     if (document.querySelector(selector)) {
//         return resolve(document.querySelector(selector));
//     }
//     const observer = new MutationObserver(mutations => {
//         if (document.querySelector(selector)) {
//             resolve(document.querySelector(selector));
//         }
//     });
//     observer.observe(document.body, {
//         childList: true,
//         subtree: true
//     });
//   });
// }

// app.controller('prmServiceDetailsAfterController', [function() {
//   this.$onInit = async function() {
//     const frame = await waitForElm('#iFrameResizer0');
//     fetch(frame.src)
//       .then(res => res.text())
//       .then(text => new DOMParser().parseFromString(text, 'text/html'))
//       .then(document => {
//         const bCode = document.getElementsByClassName('itemBarcode')[0].innerText || '';
//         if (bCode) {
//           // const canvas = document.getElementById('viewerCanvas');
//           // const viewer = new google.books.DefaultViewer(canvas);
//           // viewer.load('BARCODE:' + bCode);
//           console.log(`BCODE: ${bCode}`);
//         } else {
//           console.log('No barcode');
//         }
//       })
//       .catch( e => {
//         console.log('ERROR', e);
//       });
//   }
// }]);

// app.component('prmServiceDetailsAfter', {
//   bindings: { parentCtrl: '<' },
//   controller: 'prmServiceDetailsAfterController',
//   template: '<div id="viewerCanvas" style="height: 500px; width: 600px; border: 1px solid blue"></div>'
// });
'use strict';

angular.module('customActions', []);

/* eslint-disable max-len */
angular.module('customActions').component('customAction', {
  bindings: {
    name: '@',
    label: '@',
    icon: '@',
    iconSet: '@',
    link: '@',
    index: '<'
  },
  require: {
    prmActionCtrl: '^prmActionList'
  },
  controller: ['customActions', function (customActions) {
    var _this = this;

    this.$onInit = function () {
      _this.action = {
        name: _this.name,
        label: _this.label,
        index: _this.index,
        icon: {
          icon: _this.icon,
          iconSet: _this.iconSet,
          type: 'svg'
        },
        onToggle: customActions.processLinkTemplate(_this.link, _this.prmActionCtrl.item)
      };
      customActions.addAction(_this.action, _this.prmActionCtrl);
    };
    this.$onDestroy = function () {
      return customActions.removeAction(_this.action, _this.prmActionCtrl);
    };
  }]
});

/* eslint-disable max-len */
angular.module('customActions').factory('customActions', function () {
  return {
    /**
     * Adds an action to the actions menu, including its icon.
     * @param  {object} action  action object
     * @param  {object} ctrl    instance of prmActionCtrl
     */
    // TODO coerce action.index to be <= requiredActionsList.length
    addAction: function addAction(action, ctrl) {
      this.addActionIcon(action, ctrl);
      if (!this.actionExists(action, ctrl)) {
        ctrl.actionListService.requiredActionsList.splice(action.index, 0, action.name);
        ctrl.actionListService.actionsToIndex[action.name] = action.index;
        ctrl.actionListService.onToggle[action.name] = action.onToggle;
        ctrl.actionListService.actionsToDisplay.unshift(action.name);
      }
    },
    /**
     * Removes an action from the actions menu, including its icon.
     * @param  {object} action  action object
     * @param  {object} ctrl    instance of prmActionCtrl
     */
    removeAction: function removeAction(action, ctrl) {
      if (this.actionExists(action, ctrl)) {
        this.removeActionIcon(action, ctrl);
        delete ctrl.actionListService.actionsToIndex[action.name];
        delete ctrl.actionListService.onToggle[action.name];
        var i = ctrl.actionListService.actionsToDisplay.indexOf(action.name);
        ctrl.actionListService.actionsToDisplay.splice(i, 1);
        i = ctrl.actionListService.requiredActionsList.indexOf(action.name);
        ctrl.actionListService.requiredActionsList.splice(i, 1);
      }
    },
    /**
     * Registers an action's icon.
     * Called internally by addAction().
     * @param  {object} action  action object
     * @param  {object} ctrl    instance of prmActionCtrl
     */
    addActionIcon: function addActionIcon(action, ctrl) {
      ctrl.actionLabelNamesMap[action.name] = action.label;
      ctrl.actionIconNamesMap[action.name] = action.name;
      ctrl.actionIcons[action.name] = action.icon;
    },
    /**
     * Deregisters an action's icon.
     * Called internally by removeAction().
     * @param  {object} action  action object
     * @param  {object} ctrl    instance of prmActionCtrl
     */
    removeActionIcon: function removeActionIcon(action, ctrl) {
      delete ctrl.actionLabelNamesMap[action.name];
      delete ctrl.actionIconNamesMap[action.name];
      delete ctrl.actionIcons[action.name];
    },
    /**
     * Check if an action exists.
     * Returns true if action is part of actionsToIndex.
     * @param  {object} action  action object
     * @param  {object} ctrl    instance of prmActionCtrl
     * @return {bool}
     */
    actionExists: function actionExists(action, ctrl) {
      return ctrl.actionListService.actionsToIndex.hasOwnProperty(action.name);
    },
    /**
     * Process a link into a function to call when the action is clicked.
     * The function will open the processed link in a new tab.
     * Will replace {pnx.xxx.xxx} expressions with properties from the item.
     * @param  {string}    link    the original link string from the html
     * @param  {object}    item    the item object obtained from the controller
     * @return {function}          function to call when the action is clicked
     */
    processLinkTemplate: function processLinkTemplate(link, item) {
      var processedLink = link;
      var pnxProperties = link.match(/\{(pnx\..*?)\}/g) || [];
      pnxProperties.forEach(function (property) {
        var value = property.replace(/[{}]/g, '').split('.').reduce(function (o, i) {
          try {
            var h = /(.*)(\[\d\])/.exec(i);
            if (h instanceof Array) {
              return o[h[1]][h[2].replace(/[^\d]/g, '')];
            }
            return o[i];
          } catch (e) {
            return '';
          }
        }, item);
        processedLink = processedLink.replace(property, value);
      });
      return function () {
        return window.open(processedLink, '_blank');
      };
    }
  };
});
})();