function parse() {
  var input = document.forms['input']['workout'].value
  document.write(input)
}

function addExercises() {
  var number = document.getElementById("exercises").value;
  var container = document.getElementById("container");

  while (container.hasChildNodes()) {
     container.removeChild(container.lastChild);
  }

  for (i=0; i<number; i++) {
    var para = document.createElement("P");
    var exercise_text = document.createTextNode("Exercise " + (i+1) + ":");
    var exercise_input = document.createElement("input");
    exercise_input.type = "text";
    var intr_text = document.createTextNode("Interval: ");
    var intr_input = document.createElement("input");
    intr_input.type = "text";
    var reps_text = document.createTextNode("Reps: ");
    var reps_input = document.createElement("input");
    reps_input.type = "text";
    para.appendChild(exercise_text);
    para.appendChild(exercise_input);
    para.appendChild(intr_text);
    para.appendChild(intr_input);
    para.appendChild(reps_text);
    para.appendChild(reps_input);
    container.appendChild(para);
    container.appendChild(document.createElement("br"));
    }
}

function test() {
  document.write('hello');
}
