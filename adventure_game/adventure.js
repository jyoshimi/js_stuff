
// The game is defined here.
// First the rooms
var livingRoom = new Room("Sitting in the living room, bored. Press k to go to the kitchen, b for the bedroom, and o to go outside");
var kitchen = new Room("Making a quesadilla, yo. Press l to go back to the living room.");
var bedroom = new Room("Siesta time.... Press l to go back to the living room, b for bathroom");
var bathroom1 = new Room("Hmm, out of toilet paper. Press b to go back to the bedroom");
var garden = new Room("I wondered if the previous owners buried anything here? Press l to go to back to the living room.");

// Then a "move map" for each room
livingRoom.moveMap =  {'k': kitchen, 'b':bedroom, 'o':garden};
kitchen.moveMap =  {'l':livingRoom};
bedroom.moveMap =  {'l':livingRoom, 'b':bathroom1};
bathroom1.moveMap = {'b':bedroom};
garden.moveMap =   {'l':livingRoom};

// Set this to the first room
var currentRoom = livingRoom; 

////////////////////////////////////////////////////////

var main = function() {
    showInfo(currentRoom);
};

function updateRoom(key) {
    if(key in currentRoom.moveMap) {
        currentRoom = currentRoom.moveMap[key];
        showInfo();
    }
}

function showInfo() {
    $("body").empty();
    $("body").append("Epic Adventure 2015<br>--------------------------<br>");
    if (currentRoom === undefined) {
        // $("body").append("Say what?  Try another button.<br>");  
        currentRoom = livingRoom; 
    } else {
        $("body").append(currentRoom.description + "<br>");
    }
};

function Room(description) {
    this.description = description;
    this.moveMap;
};

$(document).keypress(function(event){
    updateRoom(String.fromCharCode(event.which)); 
    updateRoom(currentKey);
});

// Don't do jquery stuff until page has loaded
$(document).ready(main);