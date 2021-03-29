'use strict'

let [hours, minutes, seconds, totalTime, distance] = [0,0,0,0,0];
let paces = [];

function calculate() {
  paces = [];
  if (!validate()){
    return;
  }
  totalTime = convertPaceToSeconds(hours, minutes, seconds);
  calculatePaceKm(totalTime, distance);
  calculatePaceMiles(totalTime, distance);
  generateTableValues();
}

function validate() {
  hours = parseInt(document.getElementById("hours").value);
  minutes = parseInt(document.getElementById("minutes").value);
  seconds = parseInt(document.getElementById("seconds").value);
  distance = parseInt(document.getElementById("distance").value);
  if (Number.isNaN(hours)){
    hours = 0;
  }
  if (Number.isNaN(minutes)){
    minutes = 0;
  }
  if (Number.isNaN(seconds)){
    seconds = 0;
  }
  if (Number.isNaN(distance)){
    alert("Have any kilometers for me?");
    return false;
  }
  return true;
}

function generateTableValues() {
  // input data from calculations
  // output html values
  // each return will be a new row
  // returns should not overwrite previous data
  // ex output: a row with 3 values, 2 paces and the coresponding time
  let tr = document.createElement("tr");
  let paceTable = document.getElementById("paceTable");
  
  paces.forEach(pace => {
    let td = document.createElement("td");
    td.innerHTML = pace;
    tr.appendChild(td);
  });
  let td = document.createElement("td");
  if (hours != 0) {
    td.innerHTML = hours.toString() + "h" + minutes.toString() + "m" + seconds.toString() + "s";
  } 
  else {
    td.innerHTML = minutes.toString() + "m" + seconds.toString() + "s";
  }
  tr.appendChild(td);

  return paceTable.appendChild(tr);
}

function convertPaceToSeconds(_hours, _minutes, _seconds) {
  [hours, minutes, seconds] = [_hours, _minutes, _seconds];
  if (hours != 0){
    _hours = _hours*60*60;
  }
  if (minutes != 0){
    _minutes = _minutes*60;
  }
  return totalTime = _hours + _minutes + _seconds;
}

function calculatePaceKm(_totalTime, _distance) {
  [totalTime, distance] = [_totalTime, _distance];
  let paceInMinutes = Math.trunc((totalTime/distance)/60);
  let paceInSeconds = Math.fround(((totalTime/distance)/60 % 1)*60);
  paceInMinutes = paceInMinutes.toLocaleString("en-US", {minimumIntegerDigits: 2})
  paceInSeconds = paceInSeconds.toLocaleString("en-US", {minimumIntegerDigits: 2})
  paces.push(paceInMinutes.toString() + "&colon;" + paceInSeconds.toString() + "&#47;km");
}

function calculatePaceMiles(_totalTime, _distance) {
  [totalTime, distance] = [_totalTime, _distance];
  distance = convertDistance(distance);
  let paceInMinutes = Math.trunc((totalTime/distance)/60);
  let paceInSeconds = Math.fround(((totalTime/distance)/60 % 1)*60);
  paceInMinutes = paceInMinutes.toLocaleString("en-US", {minimumIntegerDigits: 2, maximumFractionDigits: 1})
  paceInSeconds = paceInSeconds.toLocaleString("en-US", {minimumIntegerDigits: 2, maximumFractionDigits: 1})
  paces.push(paceInMinutes.toString() + "&colon;" + paceInSeconds.toString() + "&#47;mile");
}

// Written to convert km to miles
function convertDistance(_distance) {
  const conversionConstant = 0.62137;
  return distance = _distance*conversionConstant;
}