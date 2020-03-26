function init(){
  var workout_date;
  var workout;
  var work_out_in_progress = false;
  var workout_exists = false;
  for (var workout_index=0; workout_index < workout_list.length; workout_index++){
    var next_date = new Date(workout_list[workout_index]["date"]);
    var workout_time = next_date.getTime();
    var next_workout = workout_list[workout_index]["workout"];
    var workout_total_time = 0;
    for (var exercise=0; exercise < next_workout.length; exercise++){
      workout_total_time += +next_workout[exercise]["intr"]*1000;
    }
    var current_time = new Date().getTime();
    
    //console.log("Next workout: " + next_workout);
    //console.log("Workout time: " + workout_time);
    //console.log("Workout total time: " + workout_total_time);
    //console.log("Workout end: " + (+workout_total_time +workout_time));
    //console.log("Current time: " + current_time);
    //console.log("Workout date: " + next_date);
    //console.log("Current date: " + current_date);

    if(current_time > workout_time && current_time < workout_time + workout_total_time){
      workout_in_progress = true;
      workout_exists = true;
      workout = next_workout;
      workout_date = next_date;
      //console.log("Workout: " + workout);
      //console.log("Workout Date: " + workout_date);
      break;
    }else if(current_time < workout_time){
      workout_in_progress = false;
      workout_exists = true;
      workout = next_workout;
      workout_date = next_date;
      //console.log("Workout: " + workout);
      //console.log("Workout Date: " + workout_date);
      break;
    }
  }
  if (!workout_exists){
    document.getElementById("set").innerHTML = "No New Workout Scheduled!";
    return;
  }
  
  if (workout_in_progress){
    var running_seconds = 0;
    for (var exercise=0; exercise < workout.length; exercise++){
      var current_time = new Date().getTime();
      var elapsed_time = current_time - workout_time;
      var elapsed_seconds = Math.floor(elapsed_time/1000);
      running_seconds += +workout[exercise]["intr"];
      if (running_seconds > elapsed_seconds){
        current_set = exercise;
        current_set_time = running_seconds - elapsed_seconds;
        break;
      }
    }
    startWorkout(workout, current_set, current_set_time, workout_date);
  }else{
    startCountdown(workout, workout_date);
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
        init();
      }
    }else{
      document.getElementById("timer").innerHTML = Math.floor(count);
    }
  }, 1000);
}


function startCountdown(workout, workout_date){
  document.getElementById("set").innerHTML = "Next Workout in:"
  var workout_time = workout_date.getTime();
  var cnt = setInterval(function() {

    var current_time = new Date().getTime();
    var distance = workout_time - current_time;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById("timer").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
  
    if (distance < 0) {
      clearInterval(cnt);
      startWorkout(workout, 0, workout[0]["intr"]);
    }
  }, 1000);
}

window.onload = init();
