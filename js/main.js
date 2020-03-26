function init(){
  var current_date = new Date();
  //var workout_date = new Date();
  //workout_date.setHours(22,30,0);
  var current_time = current_date.getTime();
  var workout_date = new Date();
  workout_date = new Date(Date.UTC(workout_date.getUTCFullYear(), workout_date.getUTCMonth(), workout_date.getUTCDate(), 1, 3, 0, 0));
  var workout_time = workout_date.getTime();
  console.log("Workout time: " + workout_date);
  console.log("Current time: " + current_date);
  
  
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
    var elapsed_seconds = Math.floor(elapsed_time/1000);
    console.log("Elapsed: ", elapsed_seconds);
    var running_seconds = 0;
    for (var exercise=0; exercise < workout.length; exercise++){
      running_seconds += +workout[exercise]["intr"];
      if (running_seconds > elapsed_seconds){
        current_set = exercise;
        current_set_time = running_seconds - elapsed_seconds;
        break;
      }
    }
  }
  
  if (workout_in_progress==true){
    startWorkout(workout, current_set, current_set_time, workout_date);
  }else{
    if (current_time <= workout_time){
      startCountdown(workout_date);
    }else{
      workout_date.setDate(workout_date.getDate() + 1);
      startCountdown(workout_date);
    }
  }
}

function startWorkout(workout, current_set, current_set_time, workout_date){
  var count = current_set_time;
  document.getElementById("set").innerHTML = workout[current_set]["reps"] + " " + workout[current_set]["name"];
  document.getElementById("timer").innerHTML = Math.floor(count);
  if (+current_set + 1 < workout.length){
    document.getElementById("next").innerHTML = "Up Next: " + workout[+current_set+1]["reps"] + " " + workout[+current_set+1]["name"];
  }else{
    document.getElementById("next").innerHTML = "Up Next: Workout Completed!! :D";
  }
  
  var cnt = setInterval(function() {
    count --;
    if (count < 0) {
      if (+current_set + 1 < workout.length){
        current_set = +current_set+1;
        count = +workout[current_set]["intr"]-1;
        document.getElementById("set").innerHTML = workout[current_set]["reps"] + " " + workout[current_set]["name"];
        document.getElementById("timer").innerHTML = count;
        if (+current_set + 1 < workout.length){
          document.getElementById("next").innerHTML = "Up Next: " + workout[+current_set+1]["reps"] + " " + workout[+current_set+1]["name"];
        }else{
          document.getElementById("next").innerHTML = "Up Next: Workout Completed!! :D";
        }
      }else{
        clearInterval(cnt);
        document.getElementById("set").innerHTML = "Workout Completed!! :D";
        document.getElementById("timer").innerHTML = "";
        document.getElementById("next").innerHTML = "";
        workout_date.setDate(workout_date.getDate() + 1);
        startCountdown(workout_date);
      }
    }else{
      document.getElementById("timer").innerHTML = Math.floor(count);
    }
  }, 1000);
}


function startCountdown(workout_date){
  document.getElementById("set").innerHTML = "Next Workout in:"
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
      clearInterval(cnt);
      workout_date.setDate(workout_date.getDate()+1);
      startWorkout(workout, 0, workout[0]["intr"]);
    }
  }, 1000);
}

window.onload = init();
