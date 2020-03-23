var current_date = new Date();
var workout_date = new Date();
workout_date.setHours(16,45,30);

var current_time = current_date.getTime();
var workout_time = workout_date.getTime();

var workout_total_time = 0;
for (var exercise=0; exercise < workout.length; exercise++){
  workout_total_time += workout[exercise]["intr"];
}

var workout_in_progress = false;
var current_set = 0;
var current_set_time = workout[0]["intr"];
if(current_time > workout_time && current_time < workout_time + workout_total_time){
  workout_in_progress = true;
  var elapsed_time = current_time - workout_time;
  var elapsed_seconds = elapsed_time/1000;
  console.log(elapsed_seconds);
  var running_seconds = 0;
  for (var exercise=0; exercise < workout.length; exercise++){
    running_seconds += +workout[exercise]["intr"];
    console.log("running sec: " + running_seconds);
    if (running_seconds > elapsed_seconds){
      console.log("Running time: " + running_seconds);
      console.log("Elapsed time: " + elapsed_seconds);
      current_set = exercise;
      current_set_time = workout[exercise]["intr"];
      console.log(workout[current_set]["name"]);
      console.log(current_set_time);
      break;
    }
  }
}


if (workout_in_progress){
  startWorkout(workout, current_set, current_set_time);
}else{
  startCountdown(workout_date);
}


function startWorkout(workout, current_set, current_set_time){
  console.log("workout started");
  document.getElementById("set").innerHTML = workout[current_set]["reps"] + " " + workout[current_set]["name"];
  document.getElementById("timer").innerHTML = current_set_time;
  
  var target_time = new Date();
  console.log("now: " + target_time.getTime());
  target_time.setSeconds(target_time.getSeconds() + current_set_time);
  target_time = target_time.getTime();
  console.log("target: " + target_time);
  var cnt = setInterval(function() {
  
    var current_time = new Date().getTime();
  
    var distance =  target_time - current_time;
  
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    if (distance < 0) {
      clearInterval(cnt);
      startWorkout(workout, current_set + 1, workout[+current_set + 1]["intr"]);
    }
  }, 1000);

}




function startCountdown(workout_date){
  var cnt = setInterval(function() {
  
    var current_time = new Date().getTime();
    var workout_time = workout_date.getTime();
  
    var distance = workout_time - current_time;
  
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    if (distance < 0) {
      //clearInterval(cnt);
      workout_date.setDate(workout_date.getDate()+1);
      //document.getElementById("timer").innerHTML = "EXPIRED";
    }
  }, 1000);
}


//var count = time_remaining;
//var set = current_set;
//
//async function playWorkout(){
//  if (set >= work_out.length){
//    window.clearInterval(interval);
//    document.getElementById("set").innerHTML = "Work Out Completed!"
//    document.getElementById("timer").innerHTML = "";
//    document.getElementById("next").innerHTML = "";
//    await new Promise(r => setTimeout(r, 5000));
//    countDownDate.setDate(countDownDate.getDate()+1);
//    countdown();
//      return;
//    }
//
//    console.log("Time Remaining: " +time_remaining);
//    document.getElementById("set").innerHTML = work_out[set]["reps"] + " " +work_out[set]["name"];
//    if (set < work_out.length - 1){
//      var next_set = +set + 1;
//      console.log(next_set);
//      document.getElementById("next").innerHTML = "Up Next: " + work_out[next_set]["reps"] + " " +work_out[next_set]["name"];
//}
//    if (set != current_set){
//      time_remaining = work_out[set]["intr"];
//    }
//    count = time_remaining;
//
//    
//
//}
//
//function displayTimer(callback){
//
//    if (count > 0){
//      count--;
//    }else{
//      set++;
//      callback();
//    }
//    console.log("Count: " + count)
//    document.getElementById("timer").innerHTML = count;
//    
//}
//
//function printWorkout(){
//  var set = ""; 
//  for (var i = 0; i < printed_work_out.length; i++){
//    set += "<br>" + printed_work_out[i][0].rnds + "x ";;
//    for(var j = 0; j < printed_work_out[i].length; j++){
//      if (j > 0)
//        set += "&nbsp&nbsp&nbsp&nbsp&nbsp";
//      set += printed_work_out[i][j].reps + " " +  printed_work_out[i][j].name + "<br>";
//    }
//  }
//    var newWindow = window.open();
//    newWindow.document.write(set);
//    //document.getElementById("print").innerHTML = set; 
//}
//
//
//var countDownDate = new Date();
//function countdown(){
//
//  // uet the date we're counting down to
//  countDownDate.setHours(work_out_time["hours"]);
//  countDownDate.setMinutes(work_out_time["minutes"]);
//  countDownDate.setSeconds(work_out_time["seconds"]);
//  console.log(countDownDate);
//  var now = new Date(new Date().toUTCString());
//  countDownDate = new Date(countDownDate.toUTCString());
//  console.log(now);
//  if (now > countDownDate) { // too late, go to tomorrow
//    countDownDate.setDate(countDownDate.getDate()+1);
//  }
//
//
//  // Update the count down every 1 second
//  var x = setInterval(function() {
//
//      // Get today's date and time
//      var now = new Date(new Date().toUTCString());
//      if (now > countDownDate) { // too late, go to tomorrow
//        location.reload();
//      }
//
//      // Find the distance between now and the count down date
//      var distance = countDownDate - now;
//
//      // Time calculations for days, hours, minutes and seconds
//      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//
//      // Output the result in an element with id="demo"
//      document.getElementById("set").innerHTML = "Next Workout in: "
//      document.getElementById("timer").innerHTML = days + "d " + hours + "h "
//      + minutes + "m " + seconds + "s ";
//
//      // If the count down is over, write some text 
//  }, 1000);
//
//}
//function test(){
//  console.log("calledback");
//}
//
//console.log(work_out_started);
//if (work_out_started == "True"){
//  window.onload = playWorkout;
//  var interval = window.setInterval(function(){displayTimer(playWorkout)}, 1000);
//}else{
//  countdown();
//}
