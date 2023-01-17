var staticLocations = {
	'leasedbook': { 'floor':'2','x':131,'y':156,'width':103,'height':22, 'message':'This item is located on the low shelves just inside the main entrance.', 'english':'Popular Reading' },
	'leasedaud': { 'floor':'2','x':131,'y':156,'width':103,'height':11, 'message':'This item is located on the low shelves just inside the main entrance, on the side facing the circulation/reserves desk.', 'english':'Audio Books' },
	'newbooks': { 'floor':'2','x':131,'y':166,'width':103,'height':13, 'message':'This item is located on the low shelves just inside the main entrance, on the side facing away from the circulation desk.', 'english':'New Books' },
	'display': { 'floor':'2','x':198,'y':198,'width':25,'height':27, 'message':'This item is located to the right as you come in the main entrance.', 'english':'Display Shelf' },
	'circdesk': { 'floor':'2','x':100,'y':91,'width':123,'height':38, 'message':'Ask for this item at the circulation/reserves desk on the second floor.', 'english':'Circulation Desk' },
	'multimedia' : { 'floor':'2','x':100,'y':91,'width':123,'height':38, 'message':'Request this item in the catalog, then pick up at the circulation/reserves desk on the second floor.', 'english':'Circulation Desk' },
	'mm_noILL' : { 'floor':'2','x':100,'y':91,'width':123,'height':38, 'message':'Request this item in the catalog, then pick up at the circulation/reserves desk on the second floor.', 'english':'Circulation Desk' },
	'archives': { 'floor':'5','x':338,'y':139,'width':188,'height':83, 'message':'This item is located in the archives on the fifth floor.', 'english':'Archives' },
	'serling': { 'floor':'5','x':338,'y':139,'width':188,'height':83, 'message':'This item is located in the archives on the fifth floor.', 'english':'Archives' },
	'reference': { 'floor':'4', 'x':266, 'y':50, 'height':80, 'width':18, 'message':'This item is located on the towers side of the fourth floor', 'english':'Reference' },
	'microfilm': { 'floor':'4','x':483,'y':59,'width':39,'height':64, 'message':'This item is located in the metal cases in the southwest corner of the fourth floor, near the restrooms.', 'english':'Microfilm' },
	'musper': { 'floor':'3','x':170,'y':232,'width':20,'height':81, 'message':'This item is located in the northeast corner of the third floor, near the administrative offices.', 'english':'Music Periodicals' },
	'musicref': { 'floor':'3','x':442,'y':233,'width':10,'height':78, 'message':'This item is located near the music desk in the NW corner of the third floor.', 'english':'Music Reference'},
	'miniscore': { 'floor':'3','x':433,'y':234,'width':10,'height':79, 'message':'This item is located near the music desk in the NW corner of the third floor.', 'english':'Mini scores'},
	'musicfolio': { 'floor':'3','x':413,'y':292,'width':10,'height':23, 'message':'This item is located near the music desk in the NW corner of the third floor.', 'english':'Music Folio'},
	'oversize': { 'floor':'5','x':303,'y':139,'width':40,'height':82, 'message':'This item is located in the central area of the fifth floor, near the archives.', 'english':'Oversize'},
	'folio': { 'floor':'5','x':329,'y':187,'width':14,'height':36, 'message':'This item is located in the central area of the fifth floor, near the archives.', 'english':'Folio'},
	'reserves': { 'floor':'2','x':100,'y':91,'width':123,'height':38, 'message':'Ask for this item at the circulation/reserves desk on the second floor.', 'english':'Circulation Desk' },
	'mmreserve': { 'floor':'2','x':100,'y':91,'width':123,'height':38, 'message':'Ask for this item at the circulation/reserves desk on the second floor.', 'english':'Circulation Desk' },
	'sheetmusic' : { 'floor':'3','x':462,'y':271,'width':79,'height':60, 'message':'Ask for this item at the music desk on the third floor.', 'english': 'Sheet Music Collection' },
	'audio' : { 'floor':'3','x':462,'y':271,'width':79,'height':60, 'message':'Ask for this item at the music desk on the third floor.', 'english': 'Music Reference Desk' },
	'atlascase' : { 'floor':'2', 'x':264, 'y': 184, 'width':33, 'height': 18, 'message':'Located in the atlas case near the main staircase on the second floor.', 'english':'Atlas Case'},
	'citation' : { 'floor':'2', 'x':218, 'y':188, 'width':27, 'height': 15, 'message':'This item is located on a small bookcase on the right as you come in through the main entrance.', 'english':'Citation Guides'},
	'ebook': { 'english':'Ebooks'},
	'icebook': { 'english': 'Ebooks'},
	'eaudio': { 'english':'Digital Audio'},
	'ejournal': { 'english': 'Online Journals'},
	'escore': { 'english': 'Online Scores'},
	'eresource' : { 'english': 'Online Resources'}
};

var stacks = [
	{"id":"4.G1.e", "start":"AC1 .E8", "end":"B799 .S37 1998", "x":"85", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G1.w", "start":"B801 .C35 1998", "end":"B1647.M74 S35 1968", "x":"95", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G2.e", "start":"B1649.O344 B68 2011", "end":"B4351.A34 K5", "x":"103", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G2.w", "start":"B4372 .E5 1978", "end":"BF38.5 .S52", "x":"113", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G3.e", "start":"BF39 .B73 2016", "end":"BF410.C36 F5 2006", "x":"121", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G3.w", "start":"BF411 .B2613 1983", "end":"BF722.3 .R36 2002", "x":"131", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G4.e", "start":"BF723.A25 F68 1983", "end":"BJ1279 .S55", "x":"139", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G4.w", "start":"BJ1280 .M58 2012", "end":"BL470 .G3", "x":"149", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G5.e", "start":"BL473 .A76 2009", "end":"BL2525 .W885 1994", "x":"157", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G5.w", "start":"BL2527.M7 G63 2013", "end":"BP75.3 .C36 2010", "x":"167", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G6.e", "start":"BP80.A45 K4", "end":"BR148 .M4", "x":"175", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G6.w", "start":"BR150 .C59 1962", "end":"BR1233 .A785 2009", "x":"184", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G7.e", "start":"BR1235 .G8 1964", "end":"BV2853.E2 G64 1994", "x":"193", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G7.w", "start":"BV3200 .T5", "end":"BX4838 .G74 2000", "x":"204", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G8.e", "start":"BX4844 .P743 2012", "end":"CB411 .W3", "x":"211", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G8.w", "start":"CB415 .F563 2015", "end":"D7 .N4", "x":"220", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G9.e", "start":"D9 .D5 1967", "end":"D355 .W6", "x":"229", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G9.w", "start":"D358 .H56 1975b", "end":"D753.8 .T45", "x":"239", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G10.e", "start":"D754.A34 C6 1942", "end":"D810.Y74 K83 2011", "x":"247", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G10.w", "start":"D811.A2 B7458 2001", "end":"DA140 .T48 1986", "x":"257", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G11.e", "start":"DA142 .C48 2004", "end":"DA508.A5 M3 1979", "x":"265", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G11.w", "start":"DA510 .C43 1965", "end":"DA915 .L41", "x":"276", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G12.e", "start":"DA920 .E9 1966A", "end":"DC145 .W53 1968", "x":"320", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G12.w", "start":"DC146 .A52 F78", "end":"DD219 .T7 D6", "x":"330", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G13.e", "start":"DD220 .C36", "end":"DF287.P3 P37 2005", "x":"338", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G13.w", "start":"DF503 .B7", "end":"DJ411.A62 K4", "x":"348", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G14.e", "start":"DJK9 .E2 1976", "end":"DK273 .S784", "x":"356", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G14.w", "start":"DK274.A2 K4834 1983", "end":"DR381.M38 P3", "x":"366", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G15.e", "start":"DR417 .D48", "end":"DS118 .R6 1970", "x":"374", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G15.w", "start":"DS119 .G58", "end":"DS369.4 .N44", "x":"384", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G16.e", "start":"DS371.2 .A45513 1992", "end":"DS707 .C513 1965", "x":"392", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G16.w", "start":"DS708 .M14", "end":"DS935.774 .L36 2013", "x":"402", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G17.e", "start":"DT1 .A14 1974", "end":"DT797 .Y44", "x":"411", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G17.w", "start":"DT823 .T75", "end":"E98.R53 O9813 1999", "x":"420", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G18.e", "start":"E98.S3 V5 1966", "end":"E168 .W69", "x":"430", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G18.w", "start":"E169 .A36", "end":"E179.5 .M32 1997", "x":"438", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G19.e", "start":"E180 .K28 1995", "end":"E184 .J5 Z826 1982", "x":"482", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G19.w", "start":"E184 .K6 E27 1997", "end":"E185.86 .S6974 1996", "x":"492", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G20.e", "start":"E185.86 .S698 2005", "end":"E302.5 .W74", "x":"500", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G20.w", "start":"E302.6 .A2 B4", "end":"E448 .R3", "x":"511", "y":"222", "height":"80", "width":"9"},
	{"id":"4.G21.w", "start":"E449 .A1555 1994", "end":"E660 .R88", "x":"473", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G21.e", "start":"E660 .W715", "end":"E746 .W5", "x":"464", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G22.w", "start":"E747 .A75", "end":"E842.9 .Z45 1992", "x":"456", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G22.e", "start":"E843 .C6", "end":"F127.T7 S4", "x":"446", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G23.w", "start":"F128.C3 D47 2010", "end":"F231.2 .G6 1969", "x":"438", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G23.e", "start":"F232.C43 M67 1998", "end":"F659.D2 B4 1982", "x":"428", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G24.w", "start":"F666.S21 S22 1935", "end":"F1234.237 .H37 2018", "x":"420", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G24.e", "start":"F1235 A84 2014", "end":"F2271 .S56 2004", "x":"411", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G25.w", "start":"F2272 .I58 2007", "end":"G890.H4 S3", "x":"402", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G25.e", "start":"G1021 .S56 2003", "end":"GN23 .P9 1973", "x":"392", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G26.w", "start":"GN24 .B43", "end":"GN656 .K86 1982", "x":"383", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G26.e", "start":"GN657.B64 M75 1982", "end":"GV182.3 .U55 1993", "x":"374", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G27.w", "start":"GV183 .B57 1996", "end":"GV883 .C86 2009", "x":"366", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G27.e", "start":"GV884 .A1 A33 2017", "end":"H59 .W6 W63", "x":"356", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G28.w", "start":"H61 .A37", "end":"HB501.5 .C37 1983", "x":"348", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G28.e", "start":"HB5523 .A27 1999", "end":"HC79.Z6 B38", "x":"338", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G29.w", "start":"HC85 .F44 2001", "end":"HC125 .W34", "x":"330", "y":"50", "height":"80", "width":"9"},
	{"id":"4.G29.e", "start":"HC130.E5 E58 1991", "end":"HC1060 .H47 1993", "x":"320", "y":"50", "height":"80", "width":"9"},
	{"id":"5.G30.w", "start":"HD19 .F46 1976", "end":"HD57.7 .Y85 1989", "x":"69", "y":"21", "height":"49", "width":"15"},
	{"id":"5.G31.e", "start":"HD58 .B32", "end":"HD191 .S8 1967", "x":"86", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G31.w", "start":"HD194 .A6", "end":"HD4606.N5 B58", "x":"95", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G32.e", "start":"HD4802 .R42", "end":"HD6960.5 .U5 D45 1981", "x":"104", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G32.w", "start":"HD6961 .B57", "end":"HD9397.U6 B87 2011", "x":"113", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G33.e", "start":"HD9415 .C6 1966", "end":"HE2583 .S67", "x":"121", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G33.w", "start":"HE2751 .A77", "end":"HF5011 .W26", "x":"130", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G34.e", "start":"HF5341 .B4", "end":"HF5679 .M374 2003", "x":"140", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G34.w", "start":"HF5681.A8 P385 1997", "end":"HG2229 .H3", "x":"149", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G35.e", "start":"HG2406 .A536", "end":"HJ263 .P6", "x":"156", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G35.w", "start":"HJ268 .R78 2003", "end":"HM217 .A47 1994", "x":"166", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G36.e", "start":"HM221 .C35", "end":"HM1116 .W46 2000", "x":"174", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G36.w", "start":"HM1121 .B37 2002", "end":"HN90.P8 Z64 2008", "x":"183", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G37.e", "start":"HN90.R3 A3 1984", "end":"HQ56 .W648 1991", "x":"191", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G37.w", "start":"HQ57.2 .B87 2011", "end":"HQ755.86 .T366 2006", "x":"201", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G38.e", "start":"HQ756 .A23 2018", "end":"HQ1059.5 .U5 W65 1984", "x":"209", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G38.w", "start":"HQ1060 .G4", "end":"HQ1240.5 .U6 N36 1998", "x":"218", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G39.e", "start":"HQ1381 .A44 2002", "end":"HT166 .W484 2013", "x":"226", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G39.w", "start":"HT167 .A834 1994", "end":"HV639 .M47 2000", "x":"235", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G40.e", "start":"HV640 .A6", "end":"HV4506.W2 L54 1993", "x":"244", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G40.w", "start":"HV4547.A4 F57 2000", "end":"HV6431 .W5655 2013", "x":"253", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G41.e", "start":"HV6432 .A45 2004", "end":"HV6795.S5 C45 1978", "x":"261", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G41.w", "start":"HV6810.5 .C745 2001", "end":"HV9471 .Z55 1995", "x":"270", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G42.e", "start":"HV9474.F66 K47 2013", "end":"J81.4 .M93 2003", "x":"279", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G42.w", "start":"J82 .D2", "end":"JC186 .P83 S55", "x":"287", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G43.e", "start":"JC211 .B265", "end":"JC628 .G3", "x":"296", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G43.w", "start":"JF11 .E47", "end":"JK686 .H7", "x":"305", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G44.e", "start":"JK691 .A52 1965", "end":"JL2269 .P7 B84", "x":"313", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G44.w", "start":"JL2420 .C58 H86 1997", "end":"JS1230 1981 N48", "x":"321", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G45.e", "start":"JS1234 .A1 L6", "end":"JX1977.8 .P85 T6", "x":"330", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G45.w", "start":"JX1979 .A36", "end":"KF224 .W33 S57", "x":"339", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G46.e", "start":"KF225 .A84 B88 2017", "end":"KF3989 .Z9 F67 1989", "x":"348", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G46.w", "start":"KF4118 .K5", "end":"KF8745 .W3 P64", "x":"357", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G47.e", "start":"KF8748 .B24", "end":"LA627 .R82 1984", "x":"366", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G47.w", "start":"LA631 .A47 1990", "end":"LB1062.6 .W55 1998", "x":"374", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G48.e", "start":"LB1063 .E213 1964", "end":"LB2346 .M3", "x":"383", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G48.w", "start":"LB2350 .C29 1973", "end":"LC368 .B47 1967", "x":"391", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G49.e", "start":"LC383 .G4", "end":"N72.R4 W32", "x":"400", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G49.w", "start":"N72.S3 B64 1999", "end":"N6494.V53 S6513 2008", "x":"409", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G50.e", "start":"N6496.C52 D383 2005", "end":"N6922 .V35", "x":"417", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G50.w", "start":"N6923 .B5 B33", "end":"N9165.F8 S5 1971", "x":"426", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G51.e", "start":"NA1 .A536", "end":"NA2530 .O36 1998", "x":"435", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G51.w", "start":"NA2540 .A97 2011", "end":"NB619.T9 P4", "x":"443", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G52.e", "start":"NB620 .A44 1975", "end":"ND497.P3 L56 1985", "x":"452", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G52.w", "start":"ND497.R2 A3", "end":"ND1045 .C63 1987", "x":"461", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G53.e", "start":"ND1046.M6 I613", "end":"NK3670 .L79", "x":"470", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G53.w", "start":"NK3780 .L5", "end":"P40.8 .L369 2002", "x":"479", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G54.e", "start":"P41 .F5", "end":"P117.7 .T35 2010", "x":"487", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G54.w", "start":"P118 .A5 1984", "end":"PA4410 .S5 1967", "x":"496", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G55.e", "start":"PA4413.A7 A67", "end":"PC4625 .B6", "x":"504", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G55.w", "start":"PC4640 .L38 1993", "end":"PG3017 .S8 1976", "x":"513", "y":"29", "height":"80", "width":"9"},
	{"id":"5.G56.e", "start":"PG3020.5 .M6 R8", "end":"PG9621.K3 U713 1998", "x":"528", "y":"21", "height":"58", "width":"14"},
	{"id":"5.G57.e", "start":"PH301 .A35", "end":"PL3748 .Y6", "x":"487", "y":"248", "height":"58", "width":"14"},
	{"id":"5.G58.w", "start":"PL4378.65 .E6 S59 2002", "end":"PN511 .W633 1965", "x":"513", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G58.e", "start":"PN513 .S22 1971", "end":"PN1962 .G7", "x":"504", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G59.w", "start":"PN1967 .A73 1943", "end":"PN1993.45 .A57 1989", "x":"496", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G59.e", "start":"PN1993.5 .A1 A35", "end":"PN1995.9 .H6 W46 1996", "x":"487", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G60.w", "start":"PN1995.9 .I43 B45 1985", "end":"PN1998 .P24", "x":"478", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G60.e", "start":"PN1998.2 .A24 2011", "end":"PN2266.5 W45 1992", "x":"470", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G61.w", "start":"PN2267 .C45 2004", "end":"PN3324 .W6", "x":"461", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G61.e", "start":"PN3326 .R63", "end":"PN4826 .W58 1991", "x":"452", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G62.w", "start":"PN4832 .I57 1991", "end":"PN6072 .M8", "x":"443", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G62.e", "start":"PN6081 .A65", "end":"PN6790.S93 T56 2007", "x":"435", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G63.w", "start":"PQ11 .G4", "end":"PQ1489.L53 1968", "x":"426", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G63.e", "start":"PQ1494.A3 M3", "end":"PQ2157 .E42A", "x":"417", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G64.w", "start":"PQ2158 .A45 1976", "end":"PQ2446 .A29 W2", "x":"409", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G64.e", "start":"PQ2450.T6 Z98", "end":"PQ2623.O8 Z5536 1978", "x":"400", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G65.w", "start":"PQ2625.A16 Q8", "end":"PQ4117 .L66 1996", "x":"391", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G65.e", "start":"PQ4134 .K4", "end":"PQ6182 .H5", "x":"383", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G66.w", "start":"PQ6183 .B00 1948", "end":"PQ6558 .V5", "x":"374", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G66.e", "start":"PQ6560 1957", "end":"PQ7297.F793 Z933 1998", "x":"365", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G67.w", "start":"PQ7297.G23 O8 1994", "end":"PQ8517 .T42 1992", "x":"356", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G67.e", "start":"PQ8519.A5 A17 1958", "end":"PR457 .W74 1993", "x":"348", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G68.w", "start":"PR461 .A33 2009", "end":"PR858.W6 T6", "x":"339", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G68.e", "start":"PR861 .B76 1985", "end":"PR1272 .W4", "x":"331", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G69.w", "start":"PR1281 .W8", "end":"PR2539.G6 R3 1974", "x":"322", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G69.e", "start":"PR2541 .C6", "end":"PR2949 .T33 1966", "x":"312", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G70.w", "start":"PR2952 .A45 1972", "end":"PR3452 .W5", "x":"304", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G70.e", "start":"PR3454 .A9 1966", "end":"PR3780 .A2 1854", "x":"296", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G71.w", "start":"PR3783 .B5", "end":"PR4537 .B74 2004", "x":"287", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G71.e", "start":"PR4550 .E50", "end":"PR4969 .R4", "x":"279", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G72.w", "start":"PR4971 .P9 1966", "end":"PR5572.Q7 K5", "x":"271", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G72.e", "start":"PR5581 .B8", "end":"PR6003.V36 B7 1966", "x":"262", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G73.w", "start":"PR6005.A37 Z6", "end":"PR6023.A94 Z8", "x":"252", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G73.e", "start":"PR6023.E15 A8 1914", "end":"PR6051.Z96 H53 2001", "x":"244", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G74.w", "start":"PR6052.A3184 Z475 1986", "end":"PR9333.9 .K38 L37 2001", "x":"235", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G74.e", "start":"PR9340 .C66", "end":"PS310.W64 S5", "x":"225", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G75.w", "start":"PS312 .D3", "end":"PS645 .H3", "x":"217", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G75.e", "start":"PS647.A35 B57 1990", "end":"PS1850 .F63", "x":"209", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G76.w", "start":"PS1851 .H3", "end":"PS3053 .W5", "x":"200", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G76.e", "start":"PS3054 .A44 1908a", "end":"PS3509.V23 A6 1970", "x":"191", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G77.w", "start":"PS3511.A33 E5", "end":"PS3523.Y85 E56 1994", "x":"182", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G77.e", "start":"PS3525.A1143 Z5 1968", "end":"PS3537.U72 S5", "x":"174", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G78.w", "start":"PS3539.A516 L6", "end":"PS3553.U8 V6", "x":"165", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G78.e", "start":"PS3554.A243 Z46 2017", "end":"PS3563.A99 C5", "x":"157", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G79.w", "start":"PS3563.C334 T5 1990", "end":"PS3580.R3 S5 1973", "x":"148", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G79.e", "start":"PS3600.A6 H37 2009", "end":"PT2380 .K7 1970", "x":"139", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G80.w", "start":"PT2381 .A1 1954", "end":"PT3710.W65 D84 2004", "x":"131", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G80.e", "start":"PT3716 .R3", "end":"PZ3.9 .F85 Co 1976", "x":"122", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G81.w", "start":"PZ4.A213 LAS", "end":"Q143.S7 N44 2001", "x":"113", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G81.e", "start":"Q147 .H37 2011", "end":"QA37.3 .K73 2002", "x":"104", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G82.w", "start":"QA39 .G35", "end":"QA76.95 .W446 2015", "x":"96", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G82.e", "start":"QA90 .B47513 2010", "end":"QA297.8 .B43 2000", "x":"87", "y":"248", "height":"80", "width":"9"},
	{"id":"5.G83.w", "start":"QA298 .I7 T72 1982", "end":"QA809 .D4 2010", "x":"69", "y":"273", "height":"60", "width":"15"},
	{"id":"5.G84.e", "start":"QB9 .R67 1998", "end":"QC996 .K35 2005", "x":"174", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G84.w", "start":"QD1 .A355", "end":"QE980 .A54 1996", "x":"182", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G85.e", "start":"QH11 .D2 1959", "end":"QH506 .V613", "x":"191", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G85.w", "start":"QH507 .H6513 1984", "end":"QL431 .W58", "x":"200", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G86.e", "start":"QL434 .C34", "end":"QP186 .U63 1990", "x":"208", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G86.w", "start":"QP187 .B46", "end":"QP981.W5 C87", "x":"217", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G87.e", "start":"QR1 .K54 1999", "end":"RA418.5 .T73 W5 2003", "x":"226", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G87.w", "start":"RA421 .A32 1995a", "end":"RC267 .W45 1996", "x":"235", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G88.e", "start":"RC268 .E35 1984", "end":"RC488.6 .T83 1986", "x":"243", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G88.w", "start":"RC489.A32 S53 2017", "end":"RD31.5 .K37 1999", "x":"252", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G89.e", "start":"RD34 .S85", "end":"RJ496.S8 W36 1998", "x":"261", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G89.w", "start":"RJ499.A1 A53", "end":"SK199 .A73 2001", "x":"269", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G90.e", "start":"SK203 .B37 2001", "end":"TN870.5 .G66 1999", "x":"279", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G90.w", "start":"TN871 .A718", "end":"TX360.U63 N49 2012", "x":"287", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G91.e", "start":"TX361.A8 A28 2012", "end":"Z1019 .H15 1978", "x":"296", "y":"142", "height":"80", "width":"9"},
	{"id":"5.G91.w", "start":"Z1023 .R66 2000", "end":"ZA4575 .T85 2012", "x":"305", "y":"142", "height":"80", "width":"9"}
];

var perStacks = [
	{"id":"4.P1.e", "start":"AG305 .N7", "end":"AP2 .N67", "x":"86", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P1.w", "start":"AP2 .P46", "end":"AP60 .R43", "x":"95", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P2.e", "start":"AP92 .T5", "end":"BF789 .D4 A53", "x":"104", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P2.w", "start":"BF789 .D4 O4", "end":"E151 .J8", "x":"114", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P3.e", "start":"E169.1 .J66", "end":"GN700 .J68", "x":"122", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P3.w", "start":"GR1 .I39", "end":"HM251 .J53", "x":"130", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P4.e", "start":"HM263 .P767", "end":"JN101 .P3", "x":"140", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P4.w", "start":"JN6501 .D45", "end":"LB2342.8 .J68", "x":"149", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P5.e", "start":"LB3062 .I48", "end":"N1 .I6", "x":"158", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P5.w", "start":"N1 .S9", "end":"P1 .A1", "x":"168", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P6.e", "start":"P1 .F72", "end":"PJ5120 .A2254", "x":"176", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P6.w", "start":"PN2 .C5", "end":"PN1993 .A1 F4", "x":"186", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P7.e", "start":"PN1993 .A617", "end":"PQ7081 .A1 H57", "x":"195", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P7.w", "start":"PQ7081 .A1 R4", "end":"Q1 .N2", "x":"204", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P8.e", "start":"QA1 .N28", "end":"QD1 .A67", "x":"212", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P8.w", "start":"QD1 .B55", "end":"QL750 .A5", "x":"221", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P9.e", "start":"QL755 .A1", "end":"QL755 .A2", "x":"230", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P9.w", "start":"QL757 .J68", "end":"QP1 .J72", "x":"239", "y":"50", "height":"80", "width":"9"},
	{"id":"4.P10.e", "start":"R11 .A87", "end":"Z119 .G87", "x":"249", "y":"50", "height":"80", "width":"9"}
];

var musicStacks = [
	{"id":"3.M3.w", "start":"M1 .A13 A4", "end":"M2 .R2384", "x":"403", "y":"231", "height":"84", "width":"10"},
	{"id":"3.M3.e", "start":"M2 .R2386", "end":"M3 .G66", "x":"394", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M4.w", "start":"M3 .G68", "end":"M3 .S36", "x":"384", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M4.e", "start":"M3 .S38242", "end":"M8 .V66 S8", "x":"375", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M5.w", "start":"M9 .A28 P5", "end":"M228 .Z8 S4", "x":"365", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M5.e", "start":"M229 .B66 C4 2009", "end":"M1001 .E72 O9", "x":"356", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M6.w", "start":"M1001 .F527", "end":"M1375 .B631 S58", "x":"346", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M6.e", "start":"M1378 .A184 S4 1983", "end":"M1503 .S3635", "x":"337", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M7.w", "start":"M1503 .S38 A4", "end":"M1518 .S56", "x":"326", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M7.e", "start":"M1520 .B5 F36", "end":"M1622 .S66", "x":"317", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M8.w", "start":"M1623 .S38 S5", "end":"ML60 .T67 M8", "x":"306", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M8.e", "start":"ML60 .V18", "end":"ML285.5 .R7", "x":"298", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M9.w", "start":"ML286 .C28 1991", "end":"ML410 .G46 O813 1988", "x":"254", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M9.e", "start":"ML410 .G5 A413 1962", "end":"ML410 .S932 V38 2012", "x":"245", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M10.w", "start":"ML410 .S932 V52 1967", "end":"ML420 .M62 H7 1981", "x":"235", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M10.e", "start":"ML420 .N37 B6 2010", "end":"ML756 .H64 1993", "x":"226", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M11.w", "start":"ML760 .A35 1991", "end":"ML3475 .R66 B6 2008", "x":"217", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M11.e", "start":"ML3477 .A48 1992", "end":"ML3918 .U53 S9 2005", "x":"208", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M12.w", "start":"ML3920 .A33 1996", "end":"MT130 .Z34 G37 1999", "x":"198", "y":"230", "height":"84", "width":"10"},
	{"id":"3.M12.e", "start":"MT135 .C66 2003", "end":"MT956 .S36 R6 2011", "x":"189", "y":"230", "height":"84", "width":"10"}
];