var a = 1

// $(document).ready(function() {

//   $("#myform").change(function() {

//     var el = $(this) ;
//     var number = document.getElementById("set").value;
//     System.out.println(number);
//     })
// });

// $("#set").on("change", function() {
//   var val = $(this).val(), $div = $("#input-holder"),fields="&nbsp;";
//   switch (val) {
//       case "individual":
//         fields='<label>Your name: </label><input type="text" /><input type="text"/>';
//         break;
//       case "school":
//         fields='<label>School: </label><input type="text" />';
//         break;
//   }
//   $div.html(fields);
// });


// function addExercises() {
//   var number = document.getElementById("exercises" + a).value;
//   var container = document.getElementById("container" + a);

//   // while (container.hasChildNodes()) {
//   //    container.removeChild(container.lastChild);
//   // }
$("#exercises1").change(function () {
  var numInputs = $(this).val();
  for (var i = 0; i < numInputs; i++)
    $("#container1").append('<input name="inputs[]" />');
});

  // for (i=0; i<number; i++) {
  //   var para = document.createElement("P");
  //   var exercise_text = document.createTextNode("Exercise " + (i+1) + ":");
  //   var exercise_input = document.createElement("input");
  //   exercise_input.type = "text";
  //   var intr_text = document.createTextNode("Interval: ");
  //   var intr_input = document.createElement("input");
  //   intr_input.type = "text";
  //   var reps_text = document.createTextNode("Reps: ");
  //   var reps_input = document.createElement("input");
  //   reps_input.type = "text";
  //   para.appendChild(exercise_text);
  //   para.appendChild(exercise_input);
  //   para.appendChild(intr_text);
  //   para.appendChild(intr_input);
  //   para.appendChild(reps_text);
  //   para.appendChild(reps_input);
  //   container.appendChild(para);
  //   container.appendChild(document.createElement("br"));
  //   }
// }

function addSet() {
  a += 1
  var set_text = document.createTextNode("Set " + a + ": ");
  var new_set = document.createElement("SELECT");
  new_set.setAttribute("id", "exercises" + a);
  new_set.onchange = function() { addExercises() };
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
  set_container.appendChild(document.createElement("br"))
}

function test() {
  document.write('hello');
}

function toJSON() {
	$('#myform').serializeJSON();
  e.preventDefault();
}
/* $.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

$(function() {
  $('form').submit(function() {
    $('#result').text(JSON.stringify($('form').serializeObject()));
    return false;
  });
}); */
