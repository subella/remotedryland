var count = time_remaining;

async function playWorkout(){
  for (var set = current_set; set < work_out.length; set++){
    console.log("Time Remaining: " +time_remaining);
    document.getElementById("set").innerHTML = work_out[set]["reps"] + " " +work_out[set]["name"];
    if (set < work_out.length){
      var next_set = +set + 1;
      console.log(next_set);
      document.getElementById("next").innerHTML = "Up Next: " + work_out[next_set]["reps"] + " " +work_out[next_set]["name"];
}
    if (set != current_set){
      time_remaining = work_out[set]["intr"];
    }
    count = time_remaining;
    await new Promise(r => setTimeout(r, time_remaining*1000));
  }

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
    document.getElementById("print").innerHTML = set; 
}

window.onload = playWorkout;
window.setInterval(displayTimer, 1000);

