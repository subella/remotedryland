class User{
  constructor(){
    this.name = "henlo";
  }
  setStat(cname, cvalue){
    Cookies.set(cname, cvalue, {expires :99999});
  }
  getStat(cname){
    if (Cookies.get(cname) == null){
      return null;
    }
    return Cookies.get(cname);
  }
  addRep(cname, value){
    // to handle minutes vs reps
    var cval_array = this.getStat(cname);
    if (cval_array == null){
      this.setStat(cname, value);
      return;
    }else{
      cval_array = cval_array.split(":");
    }
    var val_array = value.split(":");

    console.log(cval_array);
    console.log(val_array);

    if (cval_array.length != val_array.length){
      console.log("Incompatible types");
      return;
    }

    // just reps case
    var val;
    if (cval_array.length == 1){
      val = parseInt(cval_array[0]) + parseInt(value);
    } else {

      var total_seconds;
      if (cval_array[0] != ""){
        total_seconds = 60*parseInt(cval_array[0]) + parseInt(cval_array[1]);
      } else {
        total_seconds = parseInt(cval_array[1]);
      }
      
      var added_seconds;
      if (val_array[0] != ""){
        added_seconds = 60*parseInt(val_array[0]) + parseInt(val_array[1]);
      } else {
        added_seconds = parseInt(val_array[1]);
      }
      
      total_seconds += +added_seconds;

      var minutes = Math.floor(total_seconds / 60); 
      var seconds = Math.floor(total_seconds % 60)+"";
      if (seconds.length == 1) seconds = "0" + seconds;
      val = minutes + ":" + seconds; 
    }
    console.log(val);
    this.setStat(cname, val);
  }
  
  removeAllCookies(){
    Object.keys(Cookies.get()).forEach(function(cookieName) {
        Cookies.remove(cookieName);
        });
  }

  getWorkoutArray(){
    console.log(Cookies.get());
    var keyValuePairs = Cookies.get();
    var arr = []
    for (let [key, value] of Object.entries(keyValuePairs)) {
      if (key != null && value != null)
        arr.push(value + " total " + key + "'s done!");
    }
  return arr
  }



}

user = new User();  
