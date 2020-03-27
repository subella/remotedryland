function parse() {
  var input = document.forms['input']['workout'].value
  document.write(input)
  // fuck my whole life
  // the remnants of what used to parse an excel copy and paste
}

var a = 1
// function convertJson() {
//   var numberOfSets = a;
//   console.log(numberOfSets);
//   var array = [];
//   for (i=1; i<=numberOfSets; i++) {
//     var numberOfExercises = document.getElementById("exercises" + a).value;
//     for (i = 1; i<= numberOfExercises; i++) {
//       array.push({
//         exercise: 
//       })
//     }
//   }
// }

// function saveExercise(exerciseID, intrID, repsID){
//   console.log("EXERCISE ID: " + exerciseID);
//   console.log(intrID);
//   console.log(repsID);
//   var exerciseName =document.getElementById(exerciseID).value;
//   var interval =document.getElementById(intrID).value;
//   var repititions =document.getElementById(repsID).value;

//   array.push({
//     name: exerciseName,
//     intr: interval,
//     reps: repititions
//   });
//   console.log(array);
// }


function addExercises(object) {
  var val = object.value // value that is selected
  var number = object.id[object.id.length-1] // set number
  var container = document.getElementById("container" + number);

  while (container.hasChildNodes()) {
     container.removeChild(container.lastChild);
  }

  for (i=0; i<val; i++) {
    var para = document.createElement("P");
    var exercise_text = document.createTextNode("Exercise " + (i+1) + ":");
    var exercise_input = document.createElement("input");
    exercise_input.type = "text";
    exercise_input.id = "set"+a+"exercise"+(i+1);
    var intr_text = document.createTextNode("Interval: ");
    var intr_input = document.createElement("input");
    intr_input.type = "text";
    intr_input.id = "set"+a+"intr"+(i+1);
    var reps_text = document.createTextNode("Reps: ");
    var reps_input = document.createElement("input");
    reps_input.id = "set"+a+"reps"+(i+1);
    reps_input.type = "text";
    // var btn = document.createElement("BUTTON");   // Create a <button> element
    // btn.innerHTML = "SAVE EXERCISE";  
    // btn.onclick = function() {saveExercise(exercise_input.id, intr_input.id, reps_input.id)};
    para.appendChild(exercise_text);
    para.appendChild(exercise_input);
    para.appendChild(intr_text);
    para.appendChild(intr_input);
    para.appendChild(reps_text);
    para.appendChild(reps_input);
    // para.appendChild(btn);
    container.appendChild(para);
    container.appendChild(document.createElement("br"));
    }
}

function addSet() {
  a += 1
  var set_text = document.createTextNode("Set " + a + ": ");
  var new_set = document.createElement("SELECT");
  new_set.setAttribute("id", "exercises" + a);
  new_set.onchange = function() { addExercises(this) };
  var set_container = document.getElementById("set_container");
  var empty = document.createElement("option");
  empty.text = "# of exercises";
  new_set.add(empty);
  var one = document.createElement("option");
  one.setAttribute("value", "1")
  one.text = "1";
  new_set.add(one);
  var two = document.createElement("option");
  two.setAttribute("value", "2")
  two.text = "2";
  new_set.add(two);
  var three = document.createElement("option");
  three.setAttribute("value", "3")
  three.text = "3";
  new_set.add(three);
  set_container.appendChild(set_text);
  set_container.appendChild(new_set);
  var div = document.createElement("DIV");
  div.setAttribute("id", "container" + a);
  set_container.appendChild(div);
  // set_container.appendChild(document.createElement("br"))
}

function submitJSON() {
  var array = [];
  for (i = 1; i <= a; i++){
    numExercises = document.getElementById("exercises" + i).value;
    for (x = 0; x < 3; x ++) {
      for (j = 1; j <= numExercises; j++) {
        var exerciseID = "set"+i+"exercise"+j;
        var intrID = "set"+i+"intr"+j;
        var repsID = "set"+i+"reps"+j;
        var exerciseName =document.getElementById(exerciseID).value;
        var interval =document.getElementById(intrID).value;
        var repititions =document.getElementById(repsID).value;
        array.push({
          name: exerciseName,
          intr: interval,
          reps: repititions
        });
        array.push({
          name: "rest",
          intr: "15",
          reps: ":15"
        });
      }
    }
  }
  console.log(array);
}
