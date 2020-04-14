function init(current_utc_time){
  var workout_date;
  var workout;
  var work_out_in_progress = false;
  var workout_exists = false;
  var current_date = new Date(current_utc_time);
  var current_time = current_date.getTime();
  for (var workout_index=0; workout_index < workout_list.length; workout_index++){
    var next_date = new Date(workout_list[workout_index]["date"]);
    var workout_time = next_date.getTime();
    var next_workout = workout_list[workout_index]["workout"];
    var workout_total_time = 0;
    for (var exercise=0; exercise < next_workout.length; exercise++){
      workout_total_time += +next_workout[exercise]["intr"]*1000;
    }

    if(current_time > workout_time && current_time < workout_time + workout_total_time){
      workout_in_progress = true;
      workout_exists = true;
      workout = next_workout;
      workout_date = next_date;
      break;
    }else if(current_time < workout_time){
      workout_in_progress = false;
      workout_exists = true;
      workout = next_workout;
      workout_date = next_date;
      break;
    }
  }
  if (!workout_exists){
    document.getElementById("set").innerHTML = "No New Workout Scheduled!";
    return;
  }
  document.getElementById("next_workout").addEventListener("click", function(){printWorkout(workout)}); 
  
  if (workout_in_progress){
    var running_seconds = 0;
    for (var exercise=0; exercise < workout.length; exercise++){
      var elapsed_time = current_time - workout_time;
      var elapsed_seconds = Math.floor(elapsed_time/1000);
      running_seconds += +workout[exercise]["intr"];
      if (running_seconds > elapsed_seconds){
        current_set = exercise;
        current_set_time = running_seconds - elapsed_seconds;
        break;
      }
    }
    startWorkout(workout, current_set, current_set_time);
  }else{
    var hours = Math.floor((workout_total_time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((workout_total_time % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((workout_total_time % (1000 * 60)) / 1000);
    document.getElementById("next").innerHTML = "Next Workout Length: " + hours + "h "
        + minutes + "m " + seconds + "s ";
    startCountdown(workout, workout_date);
  }
}

function startWorkout(workout, current_set, current_set_time){
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
      document.getElementById('ding').play();
      user.addRep(workout[current_set]["name"], workout[current_set]["reps"]);
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
        workoutCompleted();
      }
    }else{
      document.getElementById("timer").innerHTML = Math.floor(count);
    }
  }, 1000);
}


function startCountdown(workout, workout_date){
  document.getElementById("set").innerHTML = "Next Workout in:"
  var workout_time = workout_date.getTime();
  const countdown = async () => {
    const response = await fetch('https://worldtimeapi.org/api/timezone/America/Argentina/Salta');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson.utc_datetime);
    var current_date_global = new Date(myJson.utc_datetime);
    // do something with myJson
    var cnt = setInterval(function() {
        var current_time = current_date_global.getTime();
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
        current_date_global.setSeconds(current_date_global.getSeconds() +1);
        }, 1000);
  }
  countdown();
}

function printWorkout(workout){
  var set = ""; 
  for (var i = 0; i < workout.length; i++){
    set += "<br>" + workout[i]["reps"] + " " + workout[i]["name"];
    }
    var newWindow = window.open();
    newWindow.document.write(set);
}

function workoutCompleted(){
  confetti_div = document.getElementById("confetti_div");
  show = function(){
    confetti_div.style.display = "block";
    setTimeout(hide, 5000); // 5 seconds
   },

   hide = function(){
     confetti_div.style.display = "none";
      //getTime();
      window.open("html/stats.html");
   };
  show();
}


const getTime = async () => {
  const response = await fetch('https://worldtimeapi.org/api/timezone/America/Argentina/Salta');
  const date = await response.json(); //extract JSON from the http response
  // do something with myJson
  current_utc_time = date.utc_datetime;
  init(current_utc_time);
}
window.onload = getTime();
