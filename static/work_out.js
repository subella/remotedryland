var count = time_remaining-1;

async function playWorkout(){
  for (var set = current_set; set < work_out.length; set++){
    console.log("Time Remaining: " +time_remaining);
    document.getElementById("set").innerHTML = work_out[set]["reps"] + " " +work_out[set]["name"];
    if (set < work_out.length - 1){
      var next_set = +set + 1;
      console.log(next_set);
      document.getElementById("next").innerHTML = "Up Next: " + work_out[next_set]["reps"] + " " +work_out[next_set]["name"];
}
    if (set != current_set){
      time_remaining = work_out[set]["intr"];
    }
    count = time_remaining -1;
    await new Promise(r => setTimeout(r, time_remaining*1000));
  }
    window.clearInterval(interval);
    document.getElementById("set").innerHTML = "Work Out Completed!"
    document.getElementById("timer").innerHTML = "";
    document.getElementById("next").innerHTML = "";
    await new Promise(r => setTimeout(r, 5*1000));
    countDownDate.setDate(countDownDate.getDate()+1);
    countdown();

}

function displayTimer(){
    console.log("Count: " + count)
    document.getElementById("timer").innerHTML = count;
    if (count >= 0){
      count--;
    }
    
}

function printWorkout(){
  var set = ""; 
  for (var i = 0; i < printed_work_out.length; i++){
    set += "<br>" + printed_work_out[i][0].rnds + "x ";;
    for(var j = 0; j < printed_work_out[i].length; j++){
      if (j > 0)
        set += "&nbsp&nbsp&nbsp&nbsp&nbsp";
      set += printed_work_out[i][j].reps + " " +  printed_work_out[i][j].name + "<br>";
    }
  }
    var newWindow = window.open();
    newWindow.document.write(set);
    //document.getElementById("print").innerHTML = set; 
}


var countDownDate = new Date();
function countdown(){

  // Set the date we're counting down to
  countDownDate.setHours(work_out_time["hours"]);
  countDownDate.setMinutes(work_out_time["minutes"]);
  countDownDate.setSeconds(work_out_time["seconds"]);
  var now = new Date();
  if (now > countDownDate) { // too late, go to tomorrow
    countDownDate.setDate(countDownDate.getDate()+1);
  }


  // Update the count down every 1 second
  var x = setInterval(function() {

      // Get today's date and time
      var now = new Date();
      if (now > countDownDate) { // too late, go to tomorrow
        location.reload();
      }

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      document.getElementById("set").innerHTML = "Next Workout in: "
      document.getElementById("timer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
  }, 1000);

}

console.log(work_out_started);
if (work_out_started == "True"){
  window.onload = playWorkout;
  var interval = window.setInterval(displayTimer, 1000);
}else{
  countdown()
}
