//HERE I TRY TO COLECT LOCAL STORAGE DATA FIRST ITS COUNT NUMBERS
let generalCount = localStorage.getItem("generalCount");
let meetingCount = localStorage.getItem("meetingCount");
let tripCount = localStorage.getItem("tripCount");

//HERE I TRY TO COLECT LOCAL STORAGE DATA FIRST ITS "COUNT IN STRING FORMAT"
generalCount = JSON.parse(generalCount);
meetingCount = JSON.parse(meetingCount);
tripCount = JSON.parse(tripCount);

//HERE I TRY TO COLECT LOCAL STORAGE DATA FIRST ITS  "ARRAY IN STRING FORMAT"
let generalArray = localStorage.getItem("generalArray");
let meetingArray = localStorage.getItem("meetingArray");
let tripArray = localStorage.getItem("tripArray");

//HERE I TRY TO CONVERT STRING TO ARRAY
let GeneralArray = JSON.parse(generalArray);
let MeetingArray = JSON.parse(meetingArray);
let TripArray = JSON.parse(tripArray);

console.log(generalCount, meetingCount, tripCount);

// ALL VARIABELS DECLARE HERE
var general_arr = [];
let meeting_arr = [];
let trip_arr = [];
let yValues = [0, 0, 0, 0];

let generalId = generalCount;
let meetingId = meetingCount;
let tripId = tripCount;

general_arr = GeneralArray;
meeting_arr = MeetingArray;
trip_arr = TripArray;

//COUNT FUNCTION CALL FOR WHEN CLICK REFRESH BUTTON ALL VALUE ARE COME AFTER THAT
countFunction();

//HERE new values for the graph
yValues[0] = generalCount;
yValues[1] = meetingCount;
yValues[2] = tripCount;
yValues[3] = generalCount + meetingCount + tripCount;

const xValues = ["general", "meeting", "trip", "Total"];

const barColors = ["green", "red", "blue", "orange"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Tasks",
    },
  },
});

//ADD FUNCTION IS MAIN FUNCTION ALL MAJOR EVENTS ARE DOING HERE
function addTask() {
  let generalDateCount = general_arr.map((person) => person.date);

  let dateGeneral = document.querySelector("#bar2-time");

  dateGeneral.innerHTML += generalDateCount[0];

  let option_js = document.querySelector("#options");
  let date_js = document.querySelector("#date");
  let time_js = document.querySelector("#time");
  let name_js = document.querySelector("#namet");
  let msg_js = document.querySelector("#msgt");

  let js_Option = option_js.value;
  let js_date = date_js.value;
  let js_Time = time_js.value;
  let js_Name = name_js.value;
  let js_Msg = msg_js.value;

  if (js_Option === "general") {
    general_arr.push({
      id: generalId,
      option: js_Option,
      date: js_date,
      time: js_Time,
      name: js_Name,
      msg: js_Msg,
    });
    generalId++;
  } else if (js_Option === "meeting") {
    meeting_arr.push({
      id: meetingId,
      option: js_Option,
      date: js_date,
      time: js_Time,
      name: js_Name,
      msg: js_Msg,
    });
    meetingId++;
  } else if (js_Option === "trip") {
    trip_arr.push({
      id: tripId,
      option: js_Option,
      date: js_date,
      time: js_Time,
      name: js_Name,
      msg: js_Msg,
    });
    tripId++;
  }

  storageFunction(); //CALLING STORAGE FUNCTION

  countFunction();

  option_js.value = "";
  date_js.value = "";
  time_js.value = "";
  name_js.value = "";
  msg_js.value = "";

  location.reload(true);

  nextDateTime();
}

//STORE EVERITHING HERE ONLY
function storageFunction() {
  localStorage.setItem("generalArray", JSON.stringify(general_arr));
  localStorage.setItem("meetingArray", JSON.stringify(meeting_arr));
  localStorage.setItem("tripArray", JSON.stringify(trip_arr));

  localStorage.setItem("generalCount", JSON.stringify(generalId));
  localStorage.setItem("meetingCount", JSON.stringify(meetingId));
  localStorage.setItem("tripCount", JSON.stringify(tripId));
}

//DISPLAY COUNT USING INNERHTML
function countFunction() {
  document.querySelector("#general-count").innerHTML = generalId;
  document.querySelector("#meeting-count").innerHTML = meetingId;
  document.querySelector("#trip-count").innerHTML = tripId;
}

// MAPING THE GENERAL ARRAY
function generalFunction() {
  let generalOption = general_arr.map((person) => person.option);
  let generalName = general_arr.map((person) => person.name);
  let generalDate = general_arr.map((person) => person.date);
  let generalTime = general_arr.map((person) => person.time);
  let generalMsg = general_arr.map((person) => person.msg);

  printFunction(
    generalOption,
    generalName,
    generalDate,
    generalTime,
    generalMsg
  );
}

//MAPING THE MEETING ARRAY
function meetingFunction() {
  let meetingOption = meeting_arr.map((person) => person.option);
  let meetingName = meeting_arr.map((person) => person.name);
  let meetingDate = meeting_arr.map((person) => person.date);
  let meetingTime = meeting_arr.map((person) => person.time);
  let meetingMsg = meeting_arr.map((person) => person.msg);

  printFunction(
    meetingOption,
    meetingName,
    meetingDate,
    meetingTime,
    meetingMsg
  );
}

// MAPING THE TRIP ARRAY
function tripFunction() {
  let tripOption = trip_arr.map((person) => person.option);
  let tripName = trip_arr.map((person) => person.name);
  let tripDate = trip_arr.map((person) => person.date);
  let tripTime = trip_arr.map((person) => person.time);
  let tripMsg = trip_arr.map((person) => person.msg);

  printFunction(tripOption, tripName, tripDate, tripTime, tripMsg);
}

function printFunction(Option, Name, date, time, msg) {
  console.log(Option.length);
  // document.write(`  event   name    messages  <br> <br>`);
  if (Option.length == 0) {
    document.write("no values");
  } else {
    for (i = 0; i < Option.length; i++) {
      document.write(
        `
        ${Option[i]}  ---> ${Name[i]}  ----> ${date[i]}  ----> ${time[i]}  ----> ${msg[i]}  ----> 
        <button  
        style = "background-color : rgb(251, 46, 46); width : 80px; height: 25px; border: 2px solid black; border-radius: 10px;  cursor: pointer;" 
        id=${i} value=${Option[i]} onclick="deleteFunction(id,value)">delete</button> 
       <br><br>`
      );
    }
  }
  document.write(`
    <br>
    <button 
    style = "background-color :rgb(10, 245, 73); width : 80px; height: 25px; border: 2px solid black; border-radius: 10px;  cursor: pointer;"
    onclick=location.reload(true)>go back</button> `);
}

function deleteFunction(id, event) {
  if (event == "general") {
    general_arr.splice(id, 1);

    if (generalId <= 0) {
      generalId = 0;
    } else {
      generalId--;
    }

    document.open();

    storageFunction();

    generalFunction();
  } else if (event == "meeting") {
    meeting_arr.splice(id, 1);

    if (meetingId <= 0) {
      meetingId = 0;
    } else {
      meetingId--;
    }

    document.open();

    storageFunction();

    meetingFunction();
  }
  if (event == "trip") {
    trip_arr.splice(id, 1);

    if (tripId <= 0) {
      tripId = 0;
    } else {
      tripId--;
    }

    document.open();

    storageFunction();

    tripFunction();
  }
}
let countGeneral = 0;
let countMeeting = 0;

function nextDateTimeGeneral() {
  let dateGeneral = document.querySelector("#bar2-date");
  let timeGeneral = document.querySelector("#bar2-time");
  let nameGeneral = document.querySelector("#bar2-name");

  let generalDateCount = general_arr.map((person) => person.date);
  let generalTimeCount = general_arr.map((person) => person.time);
  let generalNameCount = general_arr.map((person) => person.name);

  if (generalDateCount[0] == undefined) {
    dateGeneral.innerHTML += "";
    timeGeneral.innerHTML = "no values";
    nameGeneral.innerHTML += "";
    countGeneral = 0;
  } else if (countGeneral === 0) {
    dateGeneral.innerHTML = ` Date : ${generalDateCount[0]}`;
    timeGeneral.innerHTML = ` Time : ${generalTimeCount[0]}`;
    nameGeneral.innerHTML = ` Name : <br>${generalNameCount[0]}`;
    countGeneral = 1;
  }
}

function nextDateTimeMeeting() {
  let dateMeeting = document.querySelector("#bar1-date");
  let timeMeeting = document.querySelector("#bar1-time");
  let nameMeeting = document.querySelector("#bar1-name");

  let meetingDateCount = meeting_arr.map((person) => person.date);
  let meetingTimeCount = meeting_arr.map((person) => person.time);
  let meetingNameCount = meeting_arr.map((person) => person.name);

  if (meetingDateCount[0] == undefined) {
    dateMeeting.innerHTML += "";
    timeMeeting.innerHTML = "no values";
    nameMeeting.innerHTML += "";
    countMeeting = 0;
  } else if (countMeeting === 0) {
    dateMeeting.innerHTML = ` Date : ${meetingDateCount[0]}`;
    timeMeeting.innerHTML = ` Time : ${meetingTimeCount[0]}`;
    nameMeeting.innerHTML = ` Name : <br>${meetingNameCount[0]}`;
    countMeeting = 1;
  }
}
