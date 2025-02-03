// STATE TO STRING FOR TRACKING AND COMPARISON
function getStateString(states) {
  return `${states[0]},${states[1]},${states[2]}`;
}

// SET TO TRACK VISITED STATES (CAN BE A LIST OR ARRAY)
let visitedStates = new Set();
/*
  TOTAL STATES IN THIS CASE ARE 8
  A,DIRTY,DIRTY
  A,DIRTY,CLEAN
  A,CLEAN,DIRTY
  A,CLEAN,CLEAN
  B,DIRTY,DIRTY
  B,DIRTY,CLEAN
  B,CLEAN,DIRTY
  B,CLEAN,CLEAN
*/
const TOTAL_STATES = 8;

/*
  REFLEX AGENT FUNCTION
  THIS IS THE ORIGINAL FUNCTION THAT WAS PROVIDED
  IT WILL BE USED TO DETERMINE THE ACTION TO BE TAKEN
*/
function reflex_agent(location, state) {
  if (state == "DIRTY") return "CLEAN";
  else if (location == "A") return "RIGHT";
  else if (location == "B") return "LEFT";
}

// RANDOM FUNCTION TO DETERMINE IF A ROOM SHOULD BE DIRTY
function randomlyDirty(states) {
  // ONLY IF BOTH ROOMS ARE CLEAN THEN THERE IS A 70% CHANCE OF DIRTYING A ROOM
  const bothClean = states[1] === "CLEAN" && states[2] === "CLEAN";
  const probability = bothClean ? 0.7 : 0.3;

  if (Math.random() < probability) {
    const room = Math.random() < 0.5 ? 1 : 2;
    if (states[room] === "CLEAN") {
      states[room] = "DIRTY";
      document.getElementById("log").innerHTML += "<br>A ROOM HAS BEEN DIRTY!! " + (room === 1 ? "A" : "B") + "!";
    }
  }
}

function test(states) {
  // REGISTER THE CURRENT STATE AS VISITED
  let current = visitedStates.size;
  const currentState = getStateString(states);
  visitedStates.add(currentState);
  let newcount = visitedStates.size;
  // IF THE SIZE OF THE SET INCREASED THEN IT MEANS A NEW STATE WAS VISITED
  if (newcount > current) {
    document.getElementById("log").innerHTML += "<br><b><i>New visited state: " + currentState + " ("+visitedStates.size+ ")</i></b>";
  }
  var location = states[0];
  var state = states[0] == "A" ? states[1] : states[2];
  var action_result = reflex_agent(location, state);

  document.getElementById("log").innerHTML += "<br>Location: " + location +
    " | Action: " + action_result +
    " | Other room state: " + (location == "A" ? states[2] : states[1]);

  // DO THE ACTION THAT WAS DETERMINED BY THE REFLEX AGENT FUNCTION AND UPDATE THE STATES
  if (action_result == "CLEAN") {
    if (location == "A") states[1] = "CLEAN";
    else if (location == "B") states[2] = "CLEAN";
  }
  else if (action_result == "RIGHT") states[0] = "B";
  else if (action_result == "LEFT") states[0] = "A";

  // IF THE AGENT MOVED THEN THERE IS A CHANCE OF DIRTYING A ROOM
  if (action_result == "RIGHT" || action_result == "LEFT") {
    randomlyDirty(states);
  }

  // CHECK IF ALL STATES HAVE BEEN VISITED
  if (visitedStates.size === TOTAL_STATES) {
    document.getElementById("log").innerHTML += "<br>Every possible state has been visited!";
    // Forzar limpieza final
    if (states[1] === "DIRTY" || states[2] === "DIRTY") {
      setTimeout(function () { test(states); }, 2000);
    } else {
      document.getElementById("log").innerHTML += "<br>Cleaning completed!";
      return;
    }
  } else {
    setTimeout(function () { test(states); }, 2000);
  }
}

// VERY FIRST CALL TO THE FUNCTION WITH THE STATE: A,DIRTY,DIRTY
var states = ["A", "DIRTY", "DIRTY"];
test(states);