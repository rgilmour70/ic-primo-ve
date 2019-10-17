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
            if (cutter_2_letter && !(cutter_2_number)) {
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
        for (let i = 0; i < unsortedList.length; i++) {
            origCallNo = unsortedList[i];
            normalCallNo = normalizeLC(unsortedList[i]);
            if (normalCallNo) {
                if (! callNumberArray[normalCallNo]) {
                    callNumberArray[normalCallNo] = origCallNo;
                }
            }
        }
        var theKeys = Object.keys(callNumberArray);
        var sortedKeys = theKeys.sort();
        for (let j = 0; j < sortedKeys.length; j++) {
            sortedList.push(callNumberArray[sortedKeys[j]]);
        }
        return sortedList;
    }