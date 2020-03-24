function init(){
  var current_date = new Date();
  var current_date_utc = new Date(current_date.getTime() + current_date.getTimezoneOffset() * 60000);
  var workout_date = new Date();
  workout_date.setHours(21,05,0);
  var workout_date_utc = new Date(workout_date.getTime() + workout_date.getTimezoneOffset() * 60000);
  
  var current_time = current_date_utc.getTime();
  var workout_time = workout_date_utc.getTime();
  
  var workout_total_time = 0;
  for (var exercise=0; exercise < workout.length; exercise++){
    workout_total_time += +workout[exercise]["intr"]*1000;
  }
  
  var workout_in_progress = false;
  var current_set = 0;
  var current_set_time = workout[0]["intr"];
  if(current_time > workout_time && current_time < workout_time + workout_total_time){
    workout_in_progress = true;
    var elapsed_time = current_time - workout_time;
    var elapsed_seconds = elapsed_time/1000;
    //console.log(elapsed_seconds);
    var running_seconds = 0;
    for (var exercise=0; exercise < workout.length; exercise++){
      running_seconds += +workout[exercise]["intr"]+1;
      if (running_seconds > elapsed_seconds){
        current_set = exercise;
        current_set_time = running_seconds - elapsed_seconds;
        break;
      }
    }
  }
  
  if (workout_in_progress==true){
    startWorkout(workout, current_set, current_set_time);
  }else{
    if (current_time <= workout_time){
      startCountdown(workout_date_utc);
    }else{
      workout_date.setDate(workout_date.getDate() + 1);
      startCountdown(workout_date_utc);
    }
  }
}

function startWorkout(workout, current_set, current_set_time){
  document.getElementById("set").innerHTML = workout[current_set]["reps"] + " " + workout[current_set]["name"];
  document.getElementById("timer").innerHTML = current_set_time;
  if (+current_set + 1 < workout.length){
    document.getElementById("next").innerHTML = "Up Next: " + workout[+current_set+1]["reps"] + " " + workout[+current_set+1]["name"];
  }else{
    document.getElementById("next").innerHTML = "Up Next: Workout Completed!! :D";
  }
  
  var count = current_set_time;
  var cnt = setInterval(function() {
    count --;
    if (count < 0) {
      clearInterval(cnt);
      if (+current_set + 1 < workout.length){
        startWorkout(workout, current_set + 1, workout[+current_set + 1]["intr"]);
      }else{
        document.getElementById("set").innerHTML = "Workout Completed!! :D";
        document.getElementById("timer").innerHTML = "";
        document.getElementById("next").innerHTML = "";
         
      }
    }else{
      document.getElementById("timer").innerHTML = count;
    }
  }, 1000);
}

function startCountdown(workout_date){
  document.getElementById("set").innerHTML = "Next Workout in:"
  var cnt = setInterval(function() {
  
    var current_date = new Date()
    var current_date_utc = new Date(current_date.getTime() + current_date.getTimezoneOffset() * 60000);
    var current_time = current_date_utc.getTime();
    var workout_time = workout_date.getTime();
  
    var distance = workout_time - current_time;
  
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    if (distance < 0) {
      clearInterval(cnt);
      workout_date.setDate(workout_date.getDate()+1);
      startWorkout(workout, 0, workout[0]["intr"]);
    }
  }, 1000);
}

window.onload = init();
